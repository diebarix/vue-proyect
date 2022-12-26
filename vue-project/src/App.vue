<template>

  <Navbar/>

  <main class="container">
    <Modal :show="editTodoForm.show" @close="editTodoForm.show = false">
      <template #header>
        <h2>Edit todo</h2>
      </template>

      <template #content>
        <form class="edit-todo-form">
          <div><label>Todo title</label></div>
          <input type="text" v-model="editTodoForm.todo.title"/>
        </form>
      </template>

      <template #footer>
        <div class="edit-todo-modal-footer">
          <Btn class="edit-todo-submit-btn" type="secondary" @click="updateTodo">Submit</Btn>
          <Btn type="danger" @click="editTodoForm.show = false">close</Btn>
        </div>
      </template>
    </Modal>

    <Alert message="The line is empty, write anything" v-bind:show="isAlert" @close="isAlert == true ? isAlert = false : isAlert = true"
    type="warning"
    />
    
    <section>
      <AddTodoForm @submit="addTodo"/>
    </section>

    <section>
      <Todo v-for="todo in todos" :key="todo.id" :title="todo.title" @remove="removeTodo(todo.id)" @edit="showEditTodoForm(todo)"/>
    </section>

  </main>
</template>

<script>
//En vue los componentes hijos se encargar de emitir eventos que despues los padres podran pasarles funciones o logica para que funcionen
//La jerarquia es que los padres les pasan a los hijos, al contrario en react que las funciones las hace el hijo y se las pasa al padre
  import AddTodoForm from "./components/AddTodoForm.vue";
import Btn from "./components/Btn.vue";
import Modal from "./components/Modal.vue";
import Navbar from "./components/Navbar.vue";
import Alert from "./components/ShowAlert.vue";
import Todo from "./components/Todo.vue";

  export default{
    //Añadimos los componentes que tendra este
    components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    Modal,
    Btn
},

    data() {
      return {
        todoTitle: "",
        todos: [],
        isAlert: false,
        //editTodoForm.show: false
        editTodoForm: {
          show: false,
          todo: {
            id: 0,
            title: ""
          }
        },
        name: "pepe",
      }
    },

    methods: {
      addTodo(title) {
        if(title === "") {
          this.isAlert = true
          return
        }

        // (Forma mutable) this.todos.push(this.todoTitle);
        // (Forma inmutable) this.todos.concat(this.todoTitle);
        this.todos = this.todos.concat({
          title,
          id: Math.floor(Math.random() * 1000)
        })
      },

      showEditTodoForm(todo) {
        this.editTodoForm.show = true;
        this.editTodoForm.todo = {...todo};
      },

      updateTodo() {
        const todo = this.todos.find(todo => todo.id === this.editTodoForm.todo.id);
        todo.title = this.editTodoForm.todo.title;
        this.editTodoForm.show = false
      },

      removeTodo(id) {
        //Hacemos el todo inmutable(que no lo modificamos directamente, si no, hacemos una copia, y luego hacemos los cambios ahi)
          //Ya que si fuera mutable, se modificaria directamente en el todo original
        this.todos = this.todos.filter(t => t.id !== id)
      }

    }

  }


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