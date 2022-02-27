<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/RecipeList" class="navbar-brand">Recipe List</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/Recipe" class="nav-link">Recipe</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/AddRecipe" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <h2>Recipes</h2>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style scoped>
.container h2 {
  text-align: center;
  margin: 25px auto;
}
</style>