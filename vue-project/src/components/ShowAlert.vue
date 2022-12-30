<template>
    <div v-if="show" class="alert-danger" :style="{backgroundColor}">
        <div>{{ message }}</div>
        <div @click="close" class="close-danger">&times;</div>
    </div>
    
</template>

<script setup>
import { BackgroundColorProps, useBackgroundColor } from "../composables/backgroundColor";
//Solamente con <script setup> podemos hacer defineProps()
//defineProps No es una funcion
const props = defineProps({
            message: {
                required: true,
                type: String
            },
            show: {
                required: true,
                type: Boolean,
            },
            ...BackgroundColorProps
})
    const emit = defineEmits(['close'])

    const backgroundColor = useBackgroundColor(props)


function close() {
    emit('close')
}

        //Eventos que emite este componente

/*        methods: {
            closeAlert() {
                // con "$" podemos acceder a eventos
                this.$emit("close")
            }
        }*/

</script>

<style scoped>
.alert-danger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--danger-color);
  margin-bottom: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
  height: 50px;
}

.close-danger {
  cursor: pointer;
  font-size: 2.9rem;
}
</style>