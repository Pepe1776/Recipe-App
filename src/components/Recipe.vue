<template>
  <div v-if="currentRecipe" class="edit-form">
    <h4>Recipe</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentRecipe.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentRecipe.description"
        />
      </div>
      <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <input
          type="text"
          class="form-control"
          id="ingredients"
          v-model="currentRecipe.ingredients"
        />
      </div>
      <div class="form-group">
        <label for="method">Method</label>
        <input
          type="text"
          class="form-control"
          id="method"
          v-model="currentRecipe.method"
        />
      </div>

      <img alt="image" :src="currentRecipe.image" />

<!-- 
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentRecipe.published ? "Published" : "Pending" }}
      </div> -->
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentRecipe.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <!-- <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button> -->

    <button class="badge badge-danger mr-2" @click="deleteRecipe">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateRecipe">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Recipe...</p>
  </div>
</template>

<script>
import RecipeDataService from "../services/RecipeDataService";

export default {
  name: "Recipe",
  props: ["Recipe"],
  data() {
    return {
      image_url: null,
      currentRecipe: null,
      message: "",
    };
  },
  watch: {
    Recipe: function(Recipe) {
      this.currentRecipe = { ...Recipe };
      this.message = "";
    },

  },
  methods: {
imgd() {
  this.image_url = this.currentRecipe.image
},

    updatePublished(status) {
      RecipeDataService.update(this.currentRecipe.key, {
        published: status,
      })
        .then(() => {
          this.currentRecipe.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateRecipe() {
      const data = {
        title: this.currentRecipe.title,
        description: this.currentRecipe.description,
      };

      RecipeDataService.update(this.currentRecipe.key, data)
        .then(() => {
          this.message = "The Recipe was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteRecipe() {
      RecipeDataService.delete(this.currentRecipe.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentRecipe = { ...this.Recipe }
  },
  computed: {
  
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
