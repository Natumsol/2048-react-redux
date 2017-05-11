import { combineReducers } from "redux";

function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'INIT_GAME':
            return Object.assign({}, state, {
                score: 0,
                bestScore: 0,
                tip: ':you have option to undo your last move.',
                mode: 'Practice mode',
                deskWidth: 480,
                isWin: false,
                isLose: false
            });
        case 'RESTART_GAME':
            return Object.assign({}, state, {
                score: 0,
                bestScore: Math.max(state.score, state.bestScore),
            });
        case 'WIN':
            return Object.assign({}, state, {
                isWin: true,
            });
        case 'LOSE':
            return Object.assign({}, state, {
                isLose: true,
            });
        default:
            return state;
    }
}

function brciksReducer(state = {
    bricks: [],
    brickNumberPerRow: 4,
    undoBricks: []
}, action) {
    var bricks;
    switch (action.type) {
        case 'INIT_GAME':
            bricks = (new Array(4).fill([])).map(v => (new Array(action.brickNumberPerRow)).fill(0));
            bricks = genBrick(bricks, action.brickNumberPerRow);
            bricks = genBrick(bricks, action.brickNumberPerRow);
            return Object.assign({}, state, {
                bricks: bricks,
                undoBricks: [],
                brickNumberPerRow: action.brickNumberPerRow
            });
        case 'RESTART_GAME':
            bricks = (new Array(4).fill([])).map(v => (new Array(state.brickNumberPerRow)).fill(0));
            bricks = genBrick(bricks, state.brickNumberPerRow);
            bricks = genBrick(bricks, state.brickNumberPerRow);
            return Object.assign({}, state, {
                bricks: bricks
            });
        case 'GENERATE_BRICK':
            var current = genBrick(JSON.parse(JSON.stringify(state.bricks)), state.brickNumberPerRow);
            state.undoBricks.push(JSON.parse(JSON.stringify(state.bricks)));
            return Object.assign({}, state, {
                bricks: current
            });
        case 'UNDO':
            var current = state.undoBricks.pop();
            if (current) {
                return Object.assign({}, state, {
                    bricks: current
                });
            }
            return state;
        default:
            return state;
    }
}

function genBrick(bricks, brickNumberPerRow) {
    do {
        var row = Math.floor((Math.random()) * brickNumberPerRow);
        var col = Math.floor((Math.random()) * brickNumberPerRow);
    }
    while (bricks[row][col] != 0)

    var rand = Math.floor(Math.random() * 10 + 1)
    if (rand < 7) {
        bricks[row][col] = 2;
    } else {
        bricks[row][col] = 4;
    }

    return bricks;
}


function move(bricks, pos) {
    
}

export default combineReducers({
    bricks: brciksReducer,
    main: mainReducer
})