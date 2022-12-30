<template>
    <Modal :show="show" @close="$emit('close')">
      <template #header>
        <h2>Edit todo</h2>
      </template>

      <template #content>
        <form class="edit-todo-form">
          <div><label>Todo title</label></div>
          <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
        </form>
      </template>

      <template #footer>
        <div class="edit-todo-modal-footer">
          <Btn class="edit-todo-submit-btn" variant="secondary" @click="$emit('submit')">Submit</Btn>
          <Btn variant="danger" @click="$emit('close')">close</Btn>
        </div>
      </template>
    </Modal>
</template>

<script setup>
import Modal from "./Modal.vue";
import Btn from "./Btn.vue";

//v-model se tranforma en algo de bajo nivel, en que los usamos para input, y usamo algo como $event.target.value, y podemos obtener el valor de ese input
const props = defineProps(['modelValue', 'show'])

//con update:modelValue utilizamos el model del padre
const emit = defineEmits(['close', 'submit', "update:modelValue"])
</script>

<style scoped>
.edit-todo-form > input {
  width: 100%;
  height: 30px;
  border: 1px solid var(--secondary-color);
}

.edit-todo-modal-footer {
  display: flex;
  justify-content: end;
  padding: 16px;
}

.edit-todo-submit-btn {
  margin-right: 5px;
}
</style>