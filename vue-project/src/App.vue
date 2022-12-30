<template>

  <Navbar/>

  <main class="container">
    <EditTodoForm 
      :show="editTodoForm.show"
      @close="editTodoForm.show = false"
      @submit="updateTodo"
      v-model="editTodoForm.todo.title"
    />

    <Alert :message="alert.message" v-bind:show="alert.show" @close="alert.show = false" :variant = "alert.variant"
    />
    
    <section>
      <AddTodoForm :isLoading="isPostingTodo" @submit="addTodo"/>
    </section>
  
    <section>
      <Spinner v-if="isLoading" class="spinner"/> 
      <div v-else>
        <Todo v-for="todo in todos" :key="todo.id" :title="todo.title" @remove="removeTodo(todo.id)" @edit="showEditTodoForm(todo)"/>
      </div>
    </section>

  </main>
</template>

<script setup>
//En vue los componentes hijos se encargar de emitir eventos que despues los padres podran pasarles funciones o logica para que funcionen
//La jerarquia es que los padres les pasan a los hijos, al contrario en react que las funciones las hace el hijo y se las pasa al padre
  import AddTodoForm from "./components/AddTodoForm.vue";
import Navbar from "./components/Navbar.vue";
import Alert from "./components/ShowAlert.vue";
import Todo from "./components/Todo.vue";
import Spinner from "./components/Spinner.vue"
import axios from "axios"
import EditTodoForm from "./components/EditTodoForm.vue";
import { ref, reactive } from "vue";

    //Cuando usamos "ref" siempre para acceder a el tiene que ser con ".value"
    const todos = ref([])
    const alert = reactive({
      show: false,
      message: "",
      variant: "danger"
    })
    const isLoading = ref(false)
    const isPostingTodo = ref(false)
    const editTodoForm = reactive({
      show: false,
          todo: {
            id: 0,
            title: ""
          }
    })

    async function fetchTodos() {
        isLoading.value = true
        try {
          const res = await axios.get('/api/todos')
          //const res = await fetch('http://localhost:8080/todos')
          //this.todos = await res.json()
          //con axios no hace falta el await
          todos.value = await res.data

        } catch (e) {
          showAlert("Failed loading todos")
        }
        isLoading.value = false
      }

      fetchTodos()

      function showAlert(message, variant = "danger") {
        alert.show = true
        alert.message = message
        alert.variant = variant
      }

      async function addTodo(title) {
        if(title === "") {
          showAlert("Todo title is required")
          return
        }

        isPostingTodo.value = true
        const res = await axios.post('/api/todos', {
          title
        })
        isPostingTodo.value = false
        // (Forma mutable) this.todos.push(this.todoTitle);
        // (Forma inmutable) this.todos.concat(this.todoTitle);
        /*this.todos = this.todos.concat({
          title,
          id: Math.floor(Math.random() * 1000)
        })*/

        todos.value.concat(res.data)
        fetchTodos()
      }

      function showEditTodoForm(todo) {
        editTodoForm.show = true;
        editTodoForm.todo = {...todo};
      }

      async function updateTodo() {
        const todo = todos.value.find(todo => todo.id === editTodoForm.todo.id);
        const name = editTodoForm.todo.title;
        await axios.put(`/api/todos/${todo.id}`, {
          title: name
        })
        
        todo.title = name
        fetchTodos()
        editTodoForm.show = false
      }

      async function removeTodo(id) {
        await axios.delete(`/api/todos/${id}`)
        fetchTodos()
        //Hacemos el todo inmutable(que no lo modificamos directamente, si no, hacemos una copia, y luego hacemos los cambios ahi)
          //Ya que si fuera mutable, se modificaria directamente en el todo original
        //this.todos = this.todos.filter(t => t.id !== id)
      }


</script>

<style scoped>

.spinner {
  margin: auto;
  margin-top: 30px;
}
</style>