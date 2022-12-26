<template>
    <section>
      <div class="todo">
        <p>{{ title }}</p>
        <div>
            
          <Btn circle type="secondary" @click="$emit('edit')" class="btn edit-todo-btn"><Pencil/></Btn>

          <Btn circle type="danger" @click="$emit('remove')" class="btn">&times;</Btn>
        </div>
      </div>
    </section>
</template>

<script>
//En "circle" si solo ponemos la propiedad por defecto lo pone en true, sin tener que especificarlo

    //En template
    //          <Btn @click="@$emit('remove')" class="remove-todo-btn">&times;</Btn>
    import Btn from "./Btn.vue";
    import Pencil from "./icons/Pencil.vue";
    export default {
        components: { Btn, Pencil },
/*        props: {
            showTodo: {
                required: true,
            },
            deleteTask: {
                required: false
            }
            emits: ["edit"]
        },*/
        props: {
            title: {
                required: true,
                type: String,
            },
        },
        emits: ["remove", "edit"],
    }

</script>

<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}
.todo > div {
    display: flex;
}
.edit-todo-btn {
    margin-right: 5px;
}

.btn {
  height: 40px;
  width: 40px;
  font-size: 30px;
}
</style>