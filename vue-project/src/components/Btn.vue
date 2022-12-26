<template>
    <button :style="{backgroundColor}" @click.prevent="$emit('click')" :class="{circle : applyCircleClass}">
        <slot />
    </button>
</template>

<script>
//Este boton los podemos reutilizar donde queramos
export default {
    //Definimos el tipo de boton
    props: {
        type: {
                required: false,
                default: "success",
            //Restringo a ciertos valores esta propiedad
                validator(value) {
                    const options = ["danger", "warning", "info", "success", "secondary"];

                    return options.includes(value)
                }
            },
        //Nos van a pasar por props si tiene forma de circulo o no en booleano
        circle: {
            default: false,
            type: Boolean,
        }
    },
    //Ponemos las opciones como propiedad
    computed: {
            backgroundColor() {
                const options = {
                    danger: "var(--danger-color)",
                    info: "var(--info-color)",
                    warning: "var(--warning-color)",success: "var(--accent-color)",
                    secondary: "var(--secondary-color)",
                }

                return options[this.type];
            },
            //Es una funcion que se ejecuta y se asigna como propiedad
            applyCircleClass() {
        // Si esto devuelve true, esto se asigna a una propiedad
                return this.circle;
            }
        },


    emits: ['click'],
}
</script>

<style scoped>
button {
  color: var(--text-color);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle{
    border-radius: 50%;
}
</style>