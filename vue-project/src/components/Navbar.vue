<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/logo.svg" width="50" />
      <div class="brand">Todo List App</div>
    </div>

    <div class="link">
      <ul>
        <li><RouterLink to="/">Home </RouterLink></li>
        <li><RouterLink to="/todos/add">Add-Todo </RouterLink></li>
        <li><RouterLink to="/about"> About</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--navbar-color);
  padding: 10px;
  margin-bottom: 30px;
}
.brand {
  font-size: 2rem;
}

.logo {
  display: flex;
  align-items: center;
}

.link ul {
  display: flex;
  align-items: center;
  padding: 20px;
  list-style: none;
  margin: 0;
}

.link a {
  font-size: 30px;
  margin-left: 19px;
  text-decoration: none;
  color: var(--text-color)
}

a.router-link-active {
  color: var(--accent-color);
}

@media (max-width: 680px){
  .navbar {
    display: block;
  }

  .link {
    margin-top: 10px;
  }

  .link ul {
    margin: 0;
    padding: 0;
    
  }

  .link a {
    font-size: 20px;
  }
}
</style>