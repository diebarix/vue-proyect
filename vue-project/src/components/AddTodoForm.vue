<template>
    <form class="add-todo-form">
        <input v-model="todoTitle" type="text" placeholder="Todo Title" />
        <div>
          <Btn :disabled="isLoading" class="btn"  @click="$emit('submit', todoTitle)">
            <Spinner v-if="isLoading"/>
            <span v-else>Add Todo</span>
          </Btn>
        </div>
    </form>
</template>

<script setup>
import Btn from './Btn.vue';
import Spinner from "../components/Spinner.vue";
import { ref } from "vue";

const todoTitle = ref("")

const props = defineProps({
  isLoading: {
        default: false,
        type: Boolean
      }
})

const emit = defineEmits(["submit"])

</script>

<style>
.add-todo-form {
  display: flex;
  justify-content: space-between;
}
.add-todo-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
}
.btn {
    height: 50px;
}

</style>