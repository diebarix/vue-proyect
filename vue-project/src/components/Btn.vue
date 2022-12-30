<template>
    <button :style="{backgroundColor}" @click.prevent="$emit('click')" :class="{circle : applyCircleClass}" v-bind="$attrs">
        <slot />
    </button>
</template>

<script setup>
//Este boton los podemos reutilizar donde queramos
import { computed } from "vue";

const props = defineProps({
    variant: {
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
})

const emit = defineEmits(['click'])

const backgroundColor = computed(() => {
    const options = {
                    danger: "var(--danger-color)",
                    info: "var(--info-color)",
                    warning: "var(--warning-color)",success: "var(--accent-color)",
                    secondary: "var(--secondary-color)",
                }

                return options[props.variant];
})

const applyCircleClass = computed(() => {
    return props.circle;
})

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

.btn:disabled {
    opacity: 80%;
}

.circle{
    border-radius: 50%;
}
</style>