import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        bricks: state.bricks.bricks,
        deskWidth: state.main.deskWidth,
        brickNumberPerRow: state.bricks.brickNumberPerRow
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        restart: () => {
            dispatch({
                type: 'RESTART_GAME'
            })
        }
    }
}
class GameDesk extends Component {
    constructor(props) {
        super(props);
        let width = this.props.deskWidth / this.props.brickNumberPerRow * .85,
            height = this.props.deskWidth / this.props.brickNumberPerRow * .85,
            margin = this.props.deskWidth / this.props.brickNumberPerRow * .075;
        this.state = {
            style: {
                width: width,
                height: height,
                margin: margin,
                lineHeight: height + "px"
            }
        }
    }

    render() {
        const fontSizeTable = { // 字体大小表
            '2': '4.25em',
            '4': '4.25em',
            '8': '4.25em',
            '16': '3em',
            '32': '3em',
            '64': '3em',
            '128': '2.75em',
            '256': '2.75em',
            '512': '2.75em',
            '1024': '1.81em',
            '2048': '1.81em'
        };
        return (
            <div className='game-desk clearfix'>
                {this.props.bricks.map(row => row.map((brick, index) => {
                    return <Brick key={index} style={Object.assign({}, this.state.style, {
                        fontSize: fontSizeTable[brick],
                        fontWeight: 700
                    })} value={brick} />
                }))}
            </div>
        )
    }
}

GameDesk.propTypes = {
    bricks: PropTypes.arrayOf(PropTypes.array).isRequired,
    deskWidth: PropTypes.number.isRequired,
    brickNumberPerRow: PropTypes.number.isRequired
};

GameDesk.defaultProps = {
    bricks: (new Array(4)).fill([]).map(v => (new Array(4)).fill(Math.pow(2, Math.floor(1 + Math.random() * 10)))),
    deskWidth: 480, // 默认桌面宽度
    brickNumberPerRow: 4 // 每行方块数
};

class Brick extends Component {
    render() {
        let cssName = '';
        if (this.props.value !== 0) cssName = 'brick element-' + this.props.value;
        else cssName = 'brick';
        return (
            <div className={cssName} style={this.props.style}>{this.props.value !== 0 ? this.props.value : ''}</div>
        )
    }
}

Brick.propTypes = {
    value: PropTypes.number,
    style: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDesk);