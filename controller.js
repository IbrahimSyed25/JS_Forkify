import * as model from "./model.js";
import recipeView from "./view/viewRecipe.js";
import searchView from "./view/searchrecipe.js";
import resultsView from "./view/resultsView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";

// show recipe function
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    await model.loadRecipe(id);
    // console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchRecipe = async function () {
  try {
    const query = searchView.getquery();

    if (!query) return;
    await model.loadSearchResults(query);

    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.loadSearchResultsPerPage(model.state.search.page));
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err);
  }
};
const controlServings = function (updateTo) {
  model.updateServings(updateTo);
  recipeView.render(model.state.recipe);
};

const init = function () {
  bookmarksView.addHandlerRender(controlRenderBookmark);
  searchView.addHandlerRender(controlSearchRecipe);
  //   console.log(recipeView);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerclick(controlServings);
  paginationView.addpaginationcontroller(paginationcontrol);
  recipeView.addHandlerBookmark(controlbookmark);
};
const paginationcontrol = function (goto) {
  resultsView.render(model.loadSearchResultsPerPage(goto));
  paginationView.render(model.state.search);
};
const controlbookmark = function () {
  model.addBookmark(model.state.recipe);
  console.log(model.state.bookmark);
  bookmarksView.render(model.state.bookmark);
  persistBookmarks();
};
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(model.state.bookmark));
};
const controlRenderBookmark = function () {
  bookmarksView.render(model.state.bookmark);
};
init();
