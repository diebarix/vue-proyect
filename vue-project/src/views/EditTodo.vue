<template>
<Spinner class="spinner" v-if="isLoading" />

<Alert :message="alert.message" :show="alert.show" variant="danger"/>

<div v-if="todo !== null" class="form">
  <h1>Edit Todo</h1>
  <form class="edit-todo-form">
      <div>
        <label>Title </label>
      </div>
      <input type="text" v-model="todo.title"/>
      <div>
        <label>Description</label>
      </div>
      <input type="text" v-model="todo.description"/>
      <div>
        <label>Date</label>
      </div>
      <input type="date" v-model="todo.date"/>
  </form>

  <div class="submit">
    <Btn :disabled="isUpdatingTodo" @click="submit">
    <Spinner v-if="isUpdatingTodo"/>
    <span v-else>Submit</span>
    </Btn>
  </div>
</div>
</template>

<script setup>
import Btn from "@/components/Btn.vue";
import { useFetch } from "../composables/fetch.js";
import Spinner from "../components/Spinner.vue";
import Alert from "../components/ShowAlert.vue";
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const props = defineProps(['id'])

const alert = reactive({message: "", show: false})

const isUpdatingTodo = ref(false)

const router = useRouter()


const { data: todo, isLoading} = useFetch(`/api/todos/${props.id}`, {
  onError: () => {
    alert.show = true
    alert.message = "Failed loading todos"
  }
})

async function submit() {
  isUpdatingTodo.value = true
  try {
    await axios.put(`/api/todos/${props.id}`, todo.value)
    router.push('/')
  } catch (e) {
    alert.show = true
    alert.message = "Failed updating todo"
  }
  isUpdatingTodo.value = false
}
</script>

<style scoped>

.form {
  background-color: var(--navbar-color);
  padding: 20px;
  border-radius: 10px;
}

.edit-todo-form > input {
  width: 100%;
  height: 30px;
  border: 1px solid var(--secondary-color);
  margin-bottom: 20px;
}

.edit-todo-modal-footer {
  display: flex;
  justify-content: end;
  padding: 16px;
}

.edit-todo-submit-btn {
  margin-right: 5px;
}

.submit {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}

.submit button {
  height: 50px;
  width: 80px;
}

.spinner {
  margin: auto;
}
</style>