import React, { Component } from 'react';
import Header from './Components/Header';
import GameDesk from './Components/GameDesk';
import './App.css';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Header />
        <GameDesk />
      </div>
    );
  }
}

export default App;
