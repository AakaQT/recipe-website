const container = document.querySelector(".container");
const errorText = document.createElement("h1");
errorText.innerHTML = "Failed to find recipes";
container.appendChild(errorText)
errorText.style.display = "none";

async function fetchFoodData(){
    try{
        
        const apiKey = "7dbea316855a44fcb5701486becf19eb";
        const search = document.getElementById("search").value;
        const container = document.querySelector(".container");
        
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeNutrition=true&query=${search}`);

        if(!response.ok){
            throw new Error("Network error!");
        }
        
        const data = await response.json();
        if(data.totalResults <= 0){
            throw new Error("Could not find any recipes")
        }

        document.querySelectorAll(".card-container").forEach(el => el.remove())
        
        errorText.style.display = "none";

        for(let i = 0; i < data.number; i++){
            const cardContainer = document.createElement("div");
            const recipeCard = document.createElement("div");
            cardContainer.classList.add("card-container");
            cardContainer.appendChild(recipeCard);
            recipeCard.classList.add("card");
            const foodImg = document.createElement("img");
            foodImg.classList.add("image");
            foodImg.src = data.results[i].image;
            const recipeName = document.createElement("h2");
            const details = document.createElement("div");
            details.classList.add("details")
            recipeName.innerHTML = data.results[i].title;
            details.appendChild(recipeName);
            recipeCard.appendChild(foodImg);
            recipeCard.appendChild(details);
            container.appendChild(cardContainer);
        }
        
        console.log(data);
    }
    catch(error){
        console.error(error);
        errorText.style.display = "block";
    }

}