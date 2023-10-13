import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [cocktail, setCocktail] = useState({});
  const [glass, setGlass] = useState('');
  const [ingredient, setIngredient] = useState([]);

  const fetchRandomCocktail = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = response.data;
        if (data && data.drinks) {
          setCocktail(data.drinks[0]);
          setGlass(data.drinks[0].strGlass);
          
        

        const cocktailIngredient = [];
        for (let i =1; i <= 15; i++) {
          const ingredient = data.drinks[0][`strIngredient${i}`];
          const measure = data.drinks[0][`strMeasure${i}`]
          if (ingredient) {
            cocktailIngredient.push(`${measure} ${ingredient}`);
          }
        }
        setIngredient(cocktailIngredient);
      }
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => {
    fetchRandomCocktail();
  }, []);
  return (
    <div id="container">
    <h1>Random Cocktail</h1>
    {cocktail.strDrink && (
      <div>
        <h2>{cocktail.strDrink}</h2>
        <h4>Glass:</h4>
        <p>{cocktail.strGlass}</p>
        <h4>Ingredients:</h4>
        <ul>
          {ingredient.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h4>Instructions:</h4>
        <p>{cocktail.strInstructions}</p>
        <button id="button" onClick={fetchRandomCocktail}>Get new cocktail</button>
      </div>
      
    )}
  </div>
);
}

  


export default App;
