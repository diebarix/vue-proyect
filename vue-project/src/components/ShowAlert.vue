<template>
    <div v-if="show" class="alert-danger" :style="{backgroundColor}">
        <div>{{ message }}</div>
        <div @click="$emit('close')" class="close-danger">&times;</div>
    </div>
    
</template>

<script>
//en template, en close-danger, si hacemos esto @click="show = false" esta MAL, ya que estamos modificando la propiedad y no sus datos

    export default {
        //No usamos data(), ya que esto no es un dato, por que no lo controla este componente, si no, que es una propiedad del componente "padre", por eso se lo pasamo por props
            //props: ["show", "message", "type"],
        props: {
            message: {
                required: true,
                type: String
            },
            show: {
                required: true,
                type: Boolean,
            },
            type: {
                required: false,
                default: "danger",
            //Restringo a ciertos valores esta propiedad
                validator(value) {
                    return ["danger", "warning", "info"].includes(value);
                }
            }
        }, 
        //Propiedades especiales
        computed: {
            backgroundColor() {
                const options = {
                    danger: "var(--danger-color)",
                    info: "var(--info-color)",
                    warning: "var(--warning-color)",
                }

                return options[this.type];
            }
        },

        //Eventos que emite este componente
        emits: ['close'],

/*        methods: {
            closeAlert() {
                // con "$" podemos acceder a eventos
                this.$emit("close")
            }
        }*/
    }
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