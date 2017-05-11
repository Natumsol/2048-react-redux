import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title, Score, BestScore, Tips, ButtonGroup, Menu } from './HeaderComponents';

const mapStateToProps = (state) => {
  return {
    score: state.main.score,
    bestScore: state.main.score,
    mode: state.main.mode,
    tip: state.main.tip,
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        restart: () => {
            dispatch({
                type:'RESTART_GAME'
            })
        }
    }
}
class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='header'>
                <Title  />
                <Score score={this.props.score} />
                <BestScore bestScore = {this.props.bestScore} />
                <Tips mode={this.props.mode} tip={this.props.tip}  />
                <ButtonGroup action={{restart:this.props.restart}}  />
                <Menu />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);