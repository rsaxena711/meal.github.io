const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const mealDetailPage = document.getElementById("mealDetailPage");
const mealDetailContainer = document.getElementById("mealDetailContainer");
const backButton = document.getElementById("backButton");

let meals = [];

const fetchMeals = async (query) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    meals = data.meals || [];
    displaySearchResults(meals);
};

const displaySearchResults = meals => {
    searchResults.innerHTML = "";

    meals.forEach(meal => {
        const resultItem = document.createElement("li");
        resultItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p class='caption'>${meal.strMeal}</p>
            <button class="favorite-btn"><img src='https://clipart.info/images/ccovers/1484710002Heart-PNG-clipart-min.png'></button>
        `;
        const favoriteBtn = resultItem.querySelector(".favorite-btn");
        favoriteBtn.addEventListener("click", () => addToFavorites(meal));
        searchResults.appendChild(resultItem);
    });
};

const openMealDetailPage = meal => {
    mealDetailPage.style.display = "block";
    displayMealDetail(meal);
};

const closeMealDetailPage = () => {
    mealDetailPage.style.display = "none";
};

const displayMealDetail = meal => {
    mealDetailContainer.innerHTML = `
        <button id="closeDetailButton"><img src='https://openclipart.org/image/800px/183568' width='30px'></button>
        <h2>${meal.strMeal}</h2>
        <img class='big' src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        
    `;
    const closeDetailButton = document.getElementById("closeDetailButton");
    closeDetailButton.addEventListener("click", closeMealDetailPage);
};

searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    fetchMeals(query);
});

searchResults.addEventListener("click", event => {
    const mealItem = event.target.closest("li");
    if (mealItem) {
        const mealName = mealItem.querySelector("p").textContent;
        const selectedMeal = meals.find(meal => meal.strMeal === mealName);
        if (selectedMeal) {
            openMealDetailPage(selectedMeal);
        }
    }
});

backButton.addEventListener("click", closeMealDetailPage);

fetchMeals('a');