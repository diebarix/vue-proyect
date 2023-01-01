<template>
<Spinner class="spinner" v-if="isPostingTodo" />

<Alert :message="alert.message" :show="alert.show" variant="danger"/>

<div class="form">
  <h1>Add Todo</h1>
  <form class="edit-todo-form">
      <div>
        <label>Title </label>
      </div>
      <input type="text" v-model="todos.title"/>

      <div>
        <label>Description</label>
      </div>
      <input type="text" v-model="todos.description"/>

      <div>
        <label>Date</label>
      </div>
      <input type="date" v-model="todos.date"/>
  </form>

  <div class="submit">
    <Btn :disabled="isPostingTodo" @click="submit">
    <Spinner v-if="isPostingTodo"/>
    <span v-else>Submit</span>
    </Btn>
  </div>
</div>
</template>

<script setup>
import Btn from "@/components/Btn.vue";
import Spinner from "../components/Spinner.vue";
import Alert from "../components/ShowAlert.vue";
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const alert = reactive({message: "", show: false})

const router = useRouter()

/*const Title = ref("")
const Description = ref("")
const Date = ref("")*/
const todos = reactive({
    type: Object,
    default: () => ({
      title: "",
      description: "",
      date: null,
    }),
})

const isPostingTodo = ref(false)

  async function submit() {
  try {
    isPostingTodo.value = true
    await axios.post('/api/todos', {
      title: todos.title,
      description: todos.description,
      date: todos.date
        })
  router.push("/")
  } catch (e) {
    alert.show = true
    alert.message = "Failed updating todo"
  }
  isPostingTodo.value = false
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