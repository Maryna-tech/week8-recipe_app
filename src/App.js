import './App.css';
import { useEffect, useState } from 'react';
import video from'./food.mp4';
import image from './fry.jpeg';
import MyRecipesComponents from './MyRecipesComponent';

//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=b6295c57&app_key=%2085ad9381e73326f495d45174bd902eb8%09

function App() {
const MY_ID = "b6295c57";
const MY_KEY = "85ad9381e73326f495d45174bd902eb8";

const[mySearch, setMySearch] = useState("");
const[myRecipes, setMyRecipes] = useState([]);
const[wordSubmitted, setWordSubmitted] = useState("grilled lobster");

useEffect(()=> {
const getRecipe = async()=>{
  const response = await fetch (`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);

  const data = await response.json();
  setMyRecipes(data.hits)
}

getRecipe()
}, [wordSubmitted])

const myRecipeSearch =(e)=>{
  console.log(e.target.value)
  setMySearch(e.target.value)
}

const finalSearch =(e) =>{
  e.preventDefault()
  setWordSubmitted(mySearch)
}

  return (
    <div className="App">

      <div className='container'>
        <video autoPlay muted loop>
          <source src={video} type='video/mp4'/>
        </video>
        <h1>Find a Recipe</h1>
        </div>

      <div className='container'>
          <form onSubmit={finalSearch}>
            <input className='search' onChange={myRecipeSearch} value={mySearch}/>
            <div className='container'>
              <button><img src={image} alt='icon'/></button>
            </div>
          </form>
        </div>
  
        {myRecipes.map((element, index)=>(
          <MyRecipesComponents key={index}
          label={element.recipe.label}
          image={element.recipe.image} 
          calories={element.recipe.calories}
          ingredients={element.recipe.ingredientLines}/>
        ))}

    </div>
  );
}

export default App;
