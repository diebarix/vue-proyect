<template>
<div ref="modal" v-show="show" class="modal">
<div class="modal-content">
  <div class="modal-header">
    <slot name="header"/>
  </div>

  <div class="modal-body">
    <slot name="content"/>
  </div>
  
  <div class="modal-footer">
    <slot name="footer"/>
  </div>
</div>

</div>
</template>

<script setup>
//v-if elimina el html del dom si es falso
//v-show cambia el display none de css automaticamente
//window.addEventListener("click", e => console.log(e.target))
 import {ref, reactive, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  show: {
            default: false
        }
})

const modal = ref(null)

const emit = defineEmits(['close'])

const clickListener = 
            (e) => {
            if (e.target === modal.value) {
                emit('close');
            }
            }

const closeOnEscapeListener = 
            e => {
              if (e.key === "Escape") {
                  emit('close')
                }
            }

onMounted(() => {
        //Es una poco antiintuitivo pero tenemos que poner que si le das click al modal se cierre ya que toda la pantalla se convierte en el modal y si le das en algo adentro, o input, submit, etc, lo toma como algo especifico, y no el "modal" general
        window.addEventListener("click", clickListener),
        window.addEventListener("keydown", closeOnEscapeListener)
})

onBeforeUnmount(() => {
  window.removeEventListener("click", clickListener)
  window.removeEventListener("keydown", closeOnEscapeListener)
})


</script>

<style scoped>
.modal {
  position: fixed; 
  z-index: 1; 
  padding-top: 100px; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgba(0,0,0,0.4); 
}
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

.modal-header {
  padding: 2px 16px;
  background-color: var(--accent-color);
  color: white;
}

.modal-body {
    padding: 16px;
    background-color: var(--background-color);
}

.modal-footer {
  padding: 2px 16px;
  background-color: var(--accent-color);
  color: white;
}
</style>