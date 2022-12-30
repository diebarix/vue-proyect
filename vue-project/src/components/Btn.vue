<template>
    <button :style="{backgroundColor}" @click.prevent="$emit('click')" :class="{circle : applyCircleClass}" v-bind="$attrs">
        <slot />
    </button>
</template>

<script setup>
//Este boton los podemos reutilizar donde queramos
import { computed } from "vue";
import { BackgroundColorProps, useBackgroundColor } from "../composables/backgroundColor";

const props = defineProps({
        //Nos van a pasar por props si tiene forma de circulo o no en booleano
        circle: {
            default: false,
            type: Boolean,
        },

        ...BackgroundColorProps
})

const emit = defineEmits(['click'])

const backgroundColor = useBackgroundColor(props)

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