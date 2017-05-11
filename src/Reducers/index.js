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
        case 'MOVE':
            var { isMoveable, next } = canMove(state.bricks, state.brickNumberPerRow, action.pos);
            if (isMoveable !== 0xf) return Object.assign({}, state, {
                bricks: genBrick(next)
            });
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





function canMove(bricks, brickNumberPerRow, pos) {
    var isMoveable = 0x0000; // initialize isMoveable;
    var brickTemp = new Array();
    var brick_2 = new Array();
    var i, j, k;
    var flag = true;
    for (i = 0; i < brickNumberPerRow; i++) {
        brickTemp[i] = new Array();
        brick_2[i] = new Array();
        for (j = 0; j < brickNumberPerRow; j++) {
            brickTemp[i][j] = 0;
            brick_2[i][j] = 0;

        }
    }

    switch (pos) {
        case "up": {
            for (i = 0; i < brickNumberPerRow; i++) {

                for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                    brickTemp[k][i] = bricks[j][i] ? (k++ , bricks[j][i]) : 0;
                }// clear zero for each clo

                for (j = 0; j < brickNumberPerRow - 1; j++) {
                    if (brickTemp[j][i] == brickTemp[j + 1][i] && brickTemp[j][i]) {
                        brickTemp[j][i] *= 2;
                        brickTemp[j + 1][i] = 0;
                    }
                }// merge

                for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                    brick_2[j][i] = 0;
                    brick_2[k][i] = brickTemp[j][i] ? (k++ , brickTemp[j][i]) : 0;
                }//clear zero

                for (j = 0; j < brickNumberPerRow; j++) {
                    flag = flag && (brick_2[j][i] == bricks[j][i]);
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
                    if (brickTemp[j][i] == brickTemp[j - 1][i] && brickTemp[j][i]) {
                        brickTemp[j][i] *= 2;
                        brickTemp[j - 1][i] = 0;

                    }
                }// merge

                for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                    brick_2[j][i] = 0;
                    brick_2[k][i] = brickTemp[j][i] ? (k-- , brickTemp[j][i]) : 0;
                }//clear zero

                for (j = 0; j < brickNumberPerRow; j++) {
                    flag = flag && (brick_2[j][i] == bricks[j][i]);
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
                    if (brickTemp[i][j] == brickTemp[i][j + 1] && brickTemp[i][j]) {
                        brickTemp[i][j] *= 2;
                        brickTemp[i][j + 1] = 0;
                    }
                }// merge

                for (j = 0, k = 0; j < brickNumberPerRow; j++) {
                    brick_2[i][j] = 0;
                    brick_2[i][k] = brickTemp[i][j] ? (k++ , brickTemp[i][j]) : 0;
                }//clear zero

                for (j = 0; j < brickNumberPerRow; j++) {
                    flag = flag && (brick_2[i][j] == bricks[i][j]);
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
                    if (brickTemp[i][j] == brickTemp[i][j - 1] && brickTemp[i][j]) {
                        brickTemp[i][j] *= 2;
                        brickTemp[i][j - 1] = 0;
                    }
                }// merge

                for (j = brickNumberPerRow - 1, k = brickNumberPerRow - 1; j >= 0; j--) {
                    brick_2[i][j] = 0;
                    brick_2[i][j] = brickTemp[i][j] ? (k-- , brickTemp[i][j]) : 0;
                }//clear zero

                for (j = 0; j < brickNumberPerRow; j++) {
                    flag = flag && (brick_2[i][j] == bricks[i][j]);
                }
                if (!flag) {
                    isMoveable |= 0x1;
                    break;
                }
            }
            break;
        }
    }

    return {
        isMoveable: isMoveable,
        next: brick_2
    }
}

export default combineReducers({
    bricks: brciksReducer,
    main: mainReducer
})