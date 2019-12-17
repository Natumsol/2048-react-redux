import React, { Component } from 'react';
import Header from './Components/Header';
import { connect } from 'react-redux';
import GameDesk from './Components/GameDesk';
import './App.css';

const mapDispatchToProps = (dispatch) => {
  return {
    move: (pos) => {
      dispatch({
        type: 'MOVE',
        pos: pos
      })
    },
    restart: () => {
      dispatch({
        type: 'RESTART_GAME'
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    gameOver: state.bricks.gameOver
  }
}
class App extends Component {
  componentDidMount() {
    var self = this;
    document.addEventListener('keydown', function (event) {
      var keycode = event.keyCode;
      if (keycode === 87 || keycode === 38) {
        self.props.move('up');
      }
      else if (keycode === 83 || keycode === 40) {
        self.props.move('down');
      }
      else if (keycode === 65 || keycode === 37) {
        self.props.move('left');
      }
      else if (keycode === 68 || keycode === 39) {
        self.props.move('right');
      }
    });
  }

  componentDidUpdate() {
    if(this.props.gameOver) {
      if(window.confirm("游戏似乎已结束，是否重新开始？")) {
        this.props.restart();
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <GameDesk />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
