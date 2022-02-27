<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="Recipe.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="Recipe.description"
          name="description"
        />
      </div>

      <button @click="saveRecipe" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newRecipe">Add</button>
    </div>
  </div>
</template>

<script>
import RecipeDataService from "../services/RecipeDataService";

export default {
  name: "add-Recipe",
  data() {
    return {
      Recipe: {
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveRecipe() {
      var data = {
        title: this.Recipe.title,
        description: this.Recipe.description,
        published: false
      };

      RecipeDataService.create(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newRecipe() {
      this.submitted = false;
      this.Recipe = {
        title: "",
        description: "",
        published: false
      };
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
