<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Recipes List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(Recipe, index) in Recipes"
          :key="index"
          @click="setActiveRecipe(Recipe, index)"
        >
          {{ Recipe.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllRecipes">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentRecipe">
        <Recipe-details
          :Recipe="currentRecipe"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Recipe...</p>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeDataService from "../services/RecipeDataService";
import RecipeDetails from "./Recipe";

export default {
  name: "Recipes-list",
  components: { RecipeDetails },
  data() {
    return {
      Recipes: [],
      currentRecipe: null,
      currentIndex: -1
    };
  },
  methods: {
    onDataChange(items) {
      let _Recipes = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _Recipes.push({
          key: key,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });

      this.Recipes = _Recipes;
    },

    refreshList() {
      this.currentRecipe = null;
      this.currentIndex = -1;
    },

    setActiveRecipe(Recipe, index) {
      this.currentRecipe = Recipe;
      this.currentIndex = index;
    },

    removeAllRecipes() {
      RecipeDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    RecipeDataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    RecipeDataService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
