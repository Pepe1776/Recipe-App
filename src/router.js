import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/Recipe",
    alias: "/Recipe",
    name: "Recipe",
    component: () => import("./components/RecipeList")
  },
  {
    path: "/addRecipe",
    name: "addRecipe",
    component: () => import("./components/AddRecipe")
  },
  {
    path: "/RecipeList",
    name: "RecipeList",
    component: () => import("./components/RecipeList")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;