const recipecontainer = document.querySelector(".recipe");
// show recipe function
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    const res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    console.log(res, data);
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };

    // rendering the recipe
    const markup = `
    <figure class="recipe__fig">
         <img src="${recipe.imageUrl}" alt="${
      recipe.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
        <span>${recipe.title}</span>
        </h1>
    </figure>
          <div class="recipe__details">
        <div class="recipe__info">
            <div class="recipe_firstrow">
                <img src="img/icon clock.png" alt="clock" class="recipe__info-icon" />
                <div class="recipe-text">
                    ${recipe.cookingTime} Minutes
                </div>
                <!-- <span class="recipe__info-data recipe__info-data--minutes">45</span>
                <span class="recipe__info-text">minutes</span> -->
            </div>
            <div class="recipe_firstrow">
                <img src="img/userimage.png" alt="userimage" class="recipe__info-icon" />
                <div class="recipe-text">
                   ${recipe.servings} servings
                </div>
            </div>
            <div class="recipe_firstrow">
                <img src="img/plus circle.png" alt="plus" class="recipe__infoplus-icon" />  
                <img src="img/minuscircle.png" alt="minus" class="recipe__infominus-icon" />   
                <img src="img/Bookmark (2).png" alt="bookmark" class="recipe__infobookmark-icon" />
            </div>
               
        </div>
        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map((ing) => {
                if (ing.quantity === null) {
                  ing.quantity = "some";
                }
                return `
                <li class="recipe__ingredient">
                ${ing.quantity} ${ing.unit}${ing.description}  
              </li>`;
              })
              .join("")}
            </ul>
        </div>
  
        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
                recipe.publisher
              }</span>. Please check out
              directions at their website.
            <a
                class="btn--small recipe__btn"
                href="${recipe.sourceUrl}"
                target="_blank"
                >
                Here
            </a>
            </p>
            
          </div>
          `;
    console.log(markup);
    recipecontainer.insertAdjacentHTML("afterbegin", markup);
    // recipecontainer.insertAdjacentElement("afterbegin", markup);
  } catch (err) {
    alert(err);
  }
};
showRecipe();
