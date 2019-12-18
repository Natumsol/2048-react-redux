import { combineReducers } from "redux";

function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'INIT_GAME':
            return Object.assign({}, state, {
                tip: ':you have option to undo your last move.',
                mode: 'Practice mode',
                deskWidth: 480,
            });
        default:
            return state;
    }
}

function brciksReducer(state = {
    bricks: [],
    brickNumberPerRow: 4,
    undoBricks: [],
    gameOver: false,
    score: 0,
    bestScore: 0,
}, action) {
    var bricks, current;
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
                bricks: bricks,
                score: 0,
                bestScore: Math.max(state.score, state.bestScore)
            });
        case 'GENERATE_BRICK':
            current = genBrick(JSON.parse(JSON.stringify(state.bricks)), state.brickNumberPerRow);
            state.undoBricks.push(JSON.stringify(state.bricks));
            return Object.assign({}, state, {
                bricks: current
            });
        case 'UNDO':
            current = JSON.parse(state.undoBricks.pop());
            if (current) {
                return Object.assign({}, state, {
                    bricks: current,
                    undoBricks: state.undoBricks.slice(0),
                    score: current.map(v => v.reduce((a, b) => a + b)).reduce((a, b) => a + b),
                });
            }
            return state;
        case 'MOVE':
            var isMoveable = canMove(state.bricks, state.brickNumberPerRow, action.pos);
            var currentScore;
            [current, currentScore] = doMove(state.bricks, state.brickNumberPerRow, action.pos, isMoveable)
            return Object.assign({}, state, {
                bricks: current,
                gameOver: check(state.bricks, state.brickNumberPerRow, state.gameOver),
                score: state.score + currentScore,
                undoBricks: state.undoBricks.concat(JSON.stringify(state.bricks))
            });
        default:
            return state;
    }
}

function genBrick(bricks, brickNumberPerRow) {
    do {
        var row = Math.floor((Math.random()) * brickNumberPerRow);
        var col = Math.floor((Math.random()) * brickNumberPerRow);
    }
    while (bricks[row][col] !== 0)

    var rand = Math.floor(Math.random() * 10 + 1)
    if (rand < 7) {
        bricks[row][col] = 2;
    } else {
        bricks[row][col] = 4;
    }

    return bricks;
}


function doMove(bricks, brickNumberPerRow, pos, isMoveable) {
    let brickTemp = initBrick(brickNumberPerRow),// temp for move
        brick_2 = deepClone(bricks),
        i, j, k,
        needNewBrick = false;
    let currentScore = 0;
    switch (pos) {
        case "up": {
            if (isMoveable & 0x8) {
                for (i = 0; i < brickNumberPerRow; i++) {

                    for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                        brickTemp[k][i] = brick_2[j][i] ? (k++ , brick_2[j][i]) : 0;
                    }// clear zero for each clo

                    for (j = 0; j < brickNumberPerRow - 1; j++) {
                        if (brickTemp[j][i] === brickTemp[j + 1][i] && brickTemp[j][i]) {
                            brickTemp[j][i] *= 2;
                            currentScore += brickTemp[j][i];
                            brickTemp[j + 1][i] = 0;
                        }
                    }// merge

                    for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                        brick_2[j][i] = 0;
                        brick_2[k][i] = brickTemp[j][i] ? (k++ , brickTemp[j][i]) : 0;
                    }//clear zero
                    needNewBrick = true;
                }
            }
            break;
        }
        case "down": {
            if (isMoveable & 0x4) {
                for (i = 0; i < brickNumberPerRow; i++) {

                    for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                        brickTemp[k][i] = brick_2[j][i] ? (k-- , brick_2[j][i]) : 0;
                    }// clear zero for each row

                    for (j = brickNumberPerRow - 1; j > 0; j--) {
                        if (brickTemp[j][i] === brickTemp[j - 1][i] && brickTemp[j][i]) {
                            brickTemp[j][i] *= 2;
                            currentScore += brickTemp[j][i];
                            brickTemp[j - 1][i] = 0;
                        }
                    }// merge

                    for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                        brick_2[j][i] = 0;
                        brick_2[k][i] = brickTemp[j][i] ? (k-- , brickTemp[j][i]) : 0;
                    }//clear zero
                }
                needNewBrick = true;
            }
            break;
        }
        case "left": {
            if (isMoveable & 0x2) {
                for (i = 0; i < brickNumberPerRow; i++) {

                    for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                        brickTemp[i][k] = brick_2[i][j] ? (k++ , brick_2[i][j]) : 0;
                    }// clear zero for each clo

                    for (j = 0; j < brickNumberPerRow - 1; j++) {
                        if (brickTemp[i][j] === brickTemp[i][j + 1] && brickTemp[i][j]) {
                            brickTemp[i][j] *= 2;
                            currentScore += brickTemp[i][j];
                            brickTemp[i][j + 1] = 0;
                        }
                    }// merge

                    for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                        brick_2[i][j] = 0;
                        brick_2[i][k] = brickTemp[i][j] ? (k++ , brickTemp[i][j]) : 0;
                    }//clear zero

                }
                needNewBrick = true;

            }
            break;
        }

        case "right": {
            if (isMoveable & 0x1) {
                for (i = 0; i < brickNumberPerRow; i++) {

                    for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                        brickTemp[i][k] = brick_2[i][j] ? (k-- , brick_2[i][j]) : 0;
                    }// clear zero for each row

                    for (j = brickNumberPerRow - 1; j > 0; j--) {
                        if (brickTemp[i][j] === brickTemp[i][j - 1] && brickTemp[i][j]) {
                            

                            brickTemp[i][j] *= 2;
                            currentScore += brickTemp[i][j];
                            brickTemp[i][j - 1] = 0;
                        }
                    }// merge

                    for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                        brick_2[i][j] = 0;
                        brick_2[i][k] = brickTemp[i][j] ? (k-- , brickTemp[i][j]) : 0;
                    }//clear zero
                }
                needNewBrick = true;
            }
            break;
        }
        default: ;
    }
    console.log('currentScore', currentScore)
    return [needNewBrick ? genBrick(brick_2, brickNumberPerRow) : brick_2, currentScore];
}

/*  判断是否能移动  */
function canMove(bricks, brickNumberPerRow, pos) {
    let isMoveable = 0x0000, // 初始化;
        brickTemp = initBrick(brickNumberPerRow),
        brick_2 = initBrick(brickNumberPerRow),
        i, j, k,
        flag = true;

    switch (pos) {
        case "up": {
            for (i = 0; i < brickNumberPerRow; i++) {

                for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                    brickTemp[k][i] = bricks[j][i] ? (k++ , bricks[j][i]) : 0;
                }// clear zero for each clo

                for (j = 0; j < brickNumberPerRow - 1; j++) {
                    if (brickTemp[j][i] === brickTemp[j + 1][i] && brickTemp[j][i]) {
                        brickTemp[j][i] *= 2;
                        brickTemp[j + 1][i] = 0;
                    }
                }// merge

                for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                    brick_2[j][i] = 0;
                    brick_2[k][i] = brickTemp[j][i] ? (k++ , brickTemp[j][i]) : 0;
                }//clear zero

                for (j = 0; j < brickNumberPerRow; j++) {
                    flag = flag && (brick_2[j][i] === bricks[j][i]);
                }
                if (!flag) {
                    isMoveable |= 0x8;
                    break;
                }
            }
            break;
        }

        case "down": {
            for (i = 0; i < brickNumberPerRow; i++) {

                for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                    brickTemp[k][i] = bricks[j][i] ? (k-- , bricks[j][i]) : 0;
                }// clear zero for each row

                for (j = brickNumberPerRow - 1; j > 0; j--) {
                    if (brickTemp[j][i] === brickTemp[j - 1][i] && brickTemp[j][i]) {
                        brickTemp[j][i] *= 2;
                        brickTemp[j - 1][i] = 0;

                    }
                }// merge

                for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                    brick_2[j][i] = 0;
                    brick_2[k][i] = brickTemp[j][i] ? (k-- , brickTemp[j][i]) : 0;
                }//clear zero

                for (j = 0; j < brickNumberPerRow; j++) {
                    flag = flag && (brick_2[j][i] === bricks[j][i]);
                }

                if (!flag) {
                    isMoveable |= 0x4;
                    break;
                }
            }
            break;
        }
        case "left": {
            for (i = 0; i < brickNumberPerRow; i++) {

                for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                    brickTemp[i][k] = bricks[i][j] ? (k++ , bricks[i][j]) : 0;
                }// clear zero for each clo

                for (j = 0; j < brickNumberPerRow - 1; j++) {
                    if (brickTemp[i][j] === brickTemp[i][j + 1] && brickTemp[i][j]) {
                        brickTemp[i][j] *= 2;
                        brickTemp[i][j + 1] = 0;
                    }
                }// merge

                for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                    brick_2[i][j] = 0;
                    brick_2[i][k] = brickTemp[i][j] ? (k++ , brickTemp[i][j]) : 0;
                }//clear zero

                for (j = 0; j < brickNumberPerRow; j++) {
                    flag = flag && (brick_2[i][j] === bricks[i][j]);
                }

                if (!flag) {
                    isMoveable |= 0x2;
                    break;
                }
            }

            break;
        }

        case "right": {
            for (i = 0; i < brickNumberPerRow; i++) {

                for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                    brickTemp[i][k] = bricks[i][j] ? (k-- , bricks[i][j]) : 0;
                }// clear zero for each row

                for (j = brickNumberPerRow - 1; j > 0; j--) {
                    if (brickTemp[i][j] === brickTemp[i][j - 1] && brickTemp[i][j]) {
                        brickTemp[i][j] *= 2;
                        brickTemp[i][j - 1] = 0;
                    }
                }// merge

                for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                    brick_2[i][j] = 0;
                    brick_2[i][j] = brickTemp[i][j] ? (k-- , brickTemp[i][j]) : 0;
                }//clear zero

                for (j = 0; j < brickNumberPerRow; j++) {
                    flag = flag && (brick_2[i][j] === bricks[i][j]);
                }
                if (!flag) {
                    isMoveable |= 0x1;
                    break;
                }
            }
            break;
        }
        default: ;
    }

    return isMoveable;
}


function check(bricks, brickNumberPerRow, gameOver) {
    if (gameOver) {
        return gameOver;
    }// if there is brick which is equal to this.end,game over;
    for (var i = 0; i < brickNumberPerRow; i++) {
        if (bricks[i].some(function (item, index, array) {
            return item === 0;
        })) {
            return false;
        }//if there is still zero brick ,game continue;
    }

    for (i = 0; i < brickNumberPerRow; i++) {
        for (var j = 0; j < brickNumberPerRow - 1; j++) {
            if (bricks[i][j] === bricks[i][j + 1]) {
                return false;
            }
        }
        for (j = 0; j < brickNumberPerRow - 1; j++) {
            if (bricks[j][i] === bricks[j + 1][i]) {
                return false;
            }
        }
    }// 如果有两个相邻的方块，则游戏未结束;

    return true;
}
function initBrick(brickNumberPerRow) {
    return (new Array(brickNumberPerRow)).fill([]).map(v => (new Array(brickNumberPerRow)).fill(0))
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
export default combineReducers({
    bricks: brciksReducer,
    main: mainReducer
})