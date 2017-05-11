import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Title, Score, BestScore, Tips, ButtonGroup, Menu } from './HeaderComponents';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='header'>
                <Title />
                <Score />
                <BestScore />
                <Tips />
                <ButtonGroup />
                <Menu />
            </div>
        )
    }
}

export default Header;