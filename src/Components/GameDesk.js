import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameDesk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                width: this.props.deskWidth / this.props.brickNumberPerRow * .85,
                height: this.props.deskWidth / this.props.brickNumberPerRow * .85,
                margin: this.props.deskWidth / this.props.brickNumberPerRow * .075
            }
        }
    }


    render() {
        return (
            <div className='game-desk'>
                {this.props.bricks.map(row => row.map((brick, index) => {
                    console.log(index);
                    if((index + 1) === this.props.brickNumberPerRow) return <Brick style={this.state.style} className='clear' value={brick} />
                    return <Brick style={this.state.style} value={brick} />
                }))}
            </div>
        )
    }
}

GameDesk.propTypes = {
    bricks: PropTypes.arrayOf(PropTypes.array).isRequired

};

GameDesk.defaultProps = {
    bricks: (new Array(4)).fill([]).map(v => (new Array(4)).fill(Math.floor(Math.random() * 10))),
    deskWidth: 480, // 默认桌面宽度
    brickNumberPerRow: 4 // 每行方块数
};

class Brick extends Component {
    render() {
        return (
            <div className='brick' style={this.props.style}>{this.props.value !== 0 ? this.props.value : ''}</div>
        )
    }
}

Brick.propTypes = {
    value: PropTypes.number,
    style: PropTypes.object
};

export default GameDesk;