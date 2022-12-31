import { createRouter, createWebHistory} from "vue-router"
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import EditTodo from "./views/EditTodo.vue"

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/about",
        component: About
    },
    {
        path: "/todos/:id/edit",
        component: EditTodo,
        props: true
    }
]

//Creamos un router
//Le decimos como queremos el historial y las rutas
const router = createRouter({
//El router va a funcionar con el historial de navegador, y se va a mover mediante ello, asi no recarga la pagina
    history: createWebHistory(),
    routes,
})

export {router}