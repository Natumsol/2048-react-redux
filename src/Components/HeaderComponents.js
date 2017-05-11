import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** 标题组件 */
const Title = () => (<div className='title pull-left '>2048-Lite</div>);

/** 计分组件 */
class Score extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='score pull-left'>
            <span className='score-title'>SCORE</span>
            <span className='detail'>{this.props.score}</span>
        </div>)
    }
}

Score.defaultProps = {
    score: 0
};

Score.propTypes = {
    score: PropTypes.number.isRequired
};

/** 最高得分组件 */

class BestScore extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='score pull-left '>
            <span className='score-title'>BEST</span>
            <span className='detail'>{this.props.bestScore}</span>
        </div>)
    }
}

BestScore.defaultProps = {
    bestScore: 0
};

BestScore.propTypes = {
    bestScore: PropTypes.number.isRequired
};


/** 提示组件 */

class Tips extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='tips'>
                <strong>{this.props.mode}</strong>
                <span>{this.props.tips}</span>
            </div>
        )
    }
}

Tips.defaultProps = {
    mode: 'Practice mode',
    tips: ':you have option to undo your last move.'
};

Tips.propTypes = {
    mode: PropTypes.string.isRequired,
    tips: PropTypes.string.isRequired
};

/** 按钮组件 */


class ButtonGroup extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='button-group'>
                <div className='btn' onClick={this.props.restart}> RESTART </div>
                <div className='btn pull-right' onClick={this.props.undo}> UNDO </div>
            </div>
        )
    }
}

ButtonGroup.propTypes = {
    restart: PropTypes.func,
    undo: PropTypes.func
};



const Menu = () => (<div></div>);

export { Title, Score, BestScore, Tips, ButtonGroup, Menu };