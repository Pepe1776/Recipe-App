<template>
	<div class="currentRecipe">
		<router-link to="/">&lt; Back</router-link>
		<h1>{{ currentRecipe.title }}</h1>
		<p class="desc">{{ currentRecipe.description }}</p>
		<hr />
		<div class="ingredients">
			<h3>Ingredients</h3>
			<ul>
				<li v-for="(ingredient, i) in currentRecipe.ingredients" :key="i">
					{{ ingredient }}
				</li>
			</ul>
		</div>
		<div class="method">
			<h3>Method</h3>
			<ol>
				<li v-for="(step, i) in currentRecipe.method" :key="i">
					<span v-html="cleanText(step)"></span>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
import RecipeDataService from "../services/RecipeDataService";
import RecipeDetails from "./Recipe";

export default {
  name: "Recipe",
  props: ["Recipe"],
  data() {
    return {
      currentRecipe: [],
      message: "",
      RecipeDetails
    };
  },
  watch: {
    Recipe: function(Recipe) {
      this.currentRecipe = { ...Recipe };
      this.message = "";
    },
  },
  methods: {
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
};
// export default {
// 	computed: {
// 		currentRecipe () {
// 			return this.$store.state.currentRecipes.find(currentRecipe => currentRecipe.slug === this.$route.params.slug)
// 		}
// 	},
// 	methods: {
// 		cleanText (text) {
// 			return text.replace(/\n/g, '<br />')
// 		}
// 	}
// }
</script>

<style>
.currentRecipe {
	padding: 1rem;
	max-width: 768px;
	margin: 0 auto;
}
.desc {
	font-size: 1.125rem;
	line-height: 1.4;
	margin-bottom: 1rem;
}
hr {
	margin-bottom: 1rem;
}
h3 {
	margin-bottom: 1rem;
}
.ingredients {
	padding: 1rem;
	background-color: #081c33;
	border-radius: 0.5rem;
	margin-bottom: 2rem;
}
.ingredients ul li {
	list-style-position: inside;
	line-height: 1.4;
	margin-bottom: 1rem;
}
.method ol li {
	margin-bottom: 2rem;
	padding-bottom: 1rem;
	list-style-position: inside;
	border-bottom: 1px solid #EEE;
}
</style>