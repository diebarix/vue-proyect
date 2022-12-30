<template>
    <div v-if="show" class="alert-danger" :style="{backgroundColor}">
        <div>{{ message }}</div>
        <div @click="close" class="close-danger">&times;</div>
    </div>
    
</template>

<script setup>
import { computed } from "vue";
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
            variant: {
                required: false,
                default: "danger",
            //Restringo a ciertos valores esta propiedad
                validator(value) {
                    return ["danger", "warning", "info", "success", "secondary"].includes(value);
                }
            }
})
    const emit = defineEmits(['close'])

    const backgroundColor = computed(() => {
                const options = {
                    danger: "var(--danger-color)",
                    info: "var(--info-color)",
                    warning: "var(--warning-color)",success: "var(--accent-color)",
                    secondary: "var(--secondary-color)",
                }    

                return options[props.variant];
            })

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