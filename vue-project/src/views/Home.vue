<template>
      <Alert :message="alert.message" :show="alert.show" @close="alert.show = false" :variant = "alert.variant"
      />
      
      <section>
        <AddTodoForm :isLoading="isPostingTodo" @submit="addTodo"/>
      </section>
    
      <section>
        <Spinner v-if="isLoading" class="spinner"/> 
        <div v-else>
          <Todo v-for="todo in todos" :key="todo.id" :title="todo.title" @remove="removeTodo(todo.id)" @edit="$router.push(`/todos/${todo.id}/edit`)"/>
        </div>
      </section>
  
  </template>
  
  <script setup>
  //En vue los componentes hijos se encargar de emitir eventos que despues los padres podran pasarles funciones o logica para que funcionen
  //La jerarquia es que los padres les pasan a los hijos, al contrario en react que las funciones las hace el hijo y se las pasa al padre
    import AddTodoForm from "@/components/AddTodoForm.vue";
  import Alert from "@/components/ShowAlert.vue";
  import Todo from "@/components/Todo.vue";
  import Spinner from "@/components/Spinner.vue"
  import axios from "axios"
  import { useFetch } from "@/composables/fetch";
  import { ref, reactive } from "vue";
  
      //Cuando usamos "ref" siempre para acceder a el tiene que ser con ".value"
      const alert = reactive({
        show: false,
        message: "",
        variant: "danger"
      })
      const isPostingTodo = ref(false)
      const editTodoForm = reactive({
        show: false,
            todo: {
              id: 0,
              title: ""
            }
      })
  
  const { data: todos, isLoading } = useFetch("/api/todos", {
    onError: () => showAlert("Failed loading todos")
  })
  //Mira el ref y cuando cambie ponga el valor nuevo y el antiguo
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