import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = '82ca3f7ee2f2124875447030859b067b';

class App extends Component {
  state = {
    recipes: []
  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value //拿到submit的內容
    e.preventDefault(); //沒加這行的話console那邊會因為一直被refresh所以顯示的東西會一閃即逝
    const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=30`);
    
    const data = await api_call.json();
    this.setState({ recipes: data.recipes })
    console.log(this.state.recipes)
  }
  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes: recipes }); //如果兩個名字一樣可以直接用this.setState({ recipes })
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;