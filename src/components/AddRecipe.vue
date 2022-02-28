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
      <!-- <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <textarea name="ingredients"
          class="form-control"
          id="ingredients"
          required
          v-model="Recipe.ingredients"
          rows="3"
        />
      </div>
      <div class="form-group">
        <label for="steps">Steps</label>
        <textarea
        type="text"
          class="form-control"
          id="steps"
          required
          v-model="Recipe.steps"
          name="steps"
          rows="3"
        />
      </div> -->
       <div class="form-group">
            <label>Ingredients</label>
            <div class="ingredient" v-for="i in Recipe.ingredientRows" :key="i">
              <input class="form-control" type="text" v-model="Recipe.ingredients[i - 1]" />
            </div>
            <button class="btn-info" type="button" @click="addNewIngredient">Add Ingredient</button>
          </div>

          <div class="form-group">
            <label>Method</label>
            <div class="method" v-for="i in Recipe.methodRows" :key="i">
              <textarea class="form-control" v-model="Recipe.method[i - 1]"></textarea>
            </div>
            <button class="btn-info" type="button" @click="addNewStep">Add step</button>
          </div>

  <div class="form-group">
    <label for="image">image url</label>
    <input v-model="Recipe.image" type="text" class="form-control" id="image">
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
import { ref } from 'vue';

export default {
  setup () {
      const Recipe = ref({
      title: '',
      description: '',
      ingredients: [],
      method: [],
      ingredientRows: 1,
      methodRows: 1,
      image: "",
    });
   const popupOpen = ref(false);
   
    const togglePopup = () => {
      popupOpen.value = !popupOpen.value;
    }
      const addNewIngredient = () => {
      Recipe.value.ingredientRows++;
    }
   const addNewStep = () => {
      Recipe.value.methodRows++;
    }
    Recipe.value = {
        title: '',
        description: '',
        ingredients: [],
        method: [],
        image: "",
        ingredientRows: 1,
        methodRows: 1
      };
      togglePopup();
      return {
      Recipe,
      togglePopup,
      popupOpen,
      addNewStep,
      addNewIngredient,
    }
    },
    
  name: "add-Recipe",
  methods: {
    saveRecipe() {
      var data = {
        title: this.Recipe.title,
        description: this.Recipe.description,
        ingredients: this.Recipe.ingredients,
        method: this.Recipe.method,
        image: this.Recipe.image,
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
        ingredients: "",
        steps: "",
        image: "",
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
