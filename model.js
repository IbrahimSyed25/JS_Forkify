export const state = {
  recipe: {},
  search: {
    results: [],
    resultsperpage: 10,
    page: 1,
  },
  bookmark: [],
  bookmarked: false,
};

export const loadRecipe = async function (id) {
  try {
    // console.log(id);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    // console.log(res, data);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    state.search.page = 1;
  } catch (err) {
    // console.log("load recipe");
    // console.log(err);
    throw err;
  }
};
// loadRecipe("5ed6604591c37cdc054bc886");
export const loadSearchResults = async function (query) {
  try {
    // console.log(query);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    // console.log(data);
    if (Array.isArray(data.data.recipes) && data.data.recipes.length === 0)
      throw new Error("No results found for query");
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    // console.log(err);
    throw err;
  }
};
// // loadSearchResults("pizza");
export const loadSearchResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsperpage;
  const end = page * state.search.resultsperpage - 1;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    if (ing.quantity !== "some") {
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    } else {
      ing.quantity = "some";
    }
  });
  state.recipe.servings = newServings;
};
export const addBookmark = function (recipe) {
  state.bookmark.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
const init = function () {
  const data = localStorage.getItem("bookmarks");
  state.bookmark = JSON.parse(data);
  // console.log(state.bookmark);
};
init();
