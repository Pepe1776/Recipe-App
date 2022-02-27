import firebase from "../firebase";

const db = firebase.ref("/Recipes");

class RecipeDataService {
  getAll() {
    return db;
  }

  create(Recipe) {
    return db.push(Recipe);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new RecipeDataService();
