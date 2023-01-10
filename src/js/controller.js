//import icons from "../img/icons.svg" // Parcel 1
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { uploadRecipe } from './model.js';
import {MODAL_CLOSE_SEC} from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const ControlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    //console.log(id);
    if (!id) return;
    recipeView.renderSpiner();
    // 0) Update results view to Mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1-) Loading Recipe
    await model.loadRecipe(id); // Async function Promise döndürücek onun için await yazdık.

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
    console.log("121",model.state.recipe);


  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }

};
const ControlSearchResults = async function () {
  try {
    resultsView.renderSpiner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search result
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());
    //console.log(model.state.search);
    // 4) Render initial Pagination
    paginationView.render(model.state.search);
    // 5) Bookmarks update select
    bookmarksView.update(model.state.bookmarks);

  } catch (err) {
    console.log(err);
  }
};
const ControlPagination = function (page) {
  resultsView.render(model.getSearchResultsPage(page));
  console.log(model.state.search);
  // 4) Render initial Pagination
  paginationView.render(model.state.search);
};

const ControlServings = function(newServings){
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
  // Update the recipe view
}
const controlAddBookmark = function(){

  // 1) Add/ Remove bokmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) Update recipe view
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks
    bookmarksView.render(model.state.bookmarks);
    console.log("bookmark  ",model.state.recipe);
}
const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}
  const controlAddRecipe = async function(newRecipe){
    try {
      addRecipeView.renderSpiner();
      //1) Model Uploadrecipe
      await  uploadRecipe(newRecipe);

      //2) Success Mesage
      addRecipeView.renderMessage();
      // 3) Render bookMarkView
      bookmarksView.render(model.state.bookmarks);
      // Change ID in URl
        window.history.pushState(null,"",`#${model.state.recipe.id}`);
      //4) Close Form window
      setTimeout(function(){addRecipeView._toggleWindow()},MODAL_CLOSE_SEC * 1000);
    }
    catch (err){
      addRecipeView.renderError(err);
      console.log("x.", err);
    }
  }

const init = function () {
  bookmarksView.addHandlerBookmark(controlBookmarks);
  recipeView.addHandlerRender(ControlRecipes);
  searchView.addHandlerSearch(ControlSearchResults);
  paginationView.addHandlerClick(ControlPagination);
  recipeView.addHandlerAddbookmark(controlAddBookmark);
  recipeView.addHandlerUpdateServings(ControlServings);
  addRecipeView.addHandlerUpload(controlAddRecipe)
};
init();

// window.addEventListener('hashchange', showRecipes);
// window.addEventListener('load', showRecipes);
