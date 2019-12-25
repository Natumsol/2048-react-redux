
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


function doMove(bricks, brickNumberPerRow, pos) {
  let brickTemp = initBrick(brickNumberPerRow),// temp for move
    brick_2 = deepClone(bricks),
    i, j, k,
    needNewBrick = false;
  let currentScore = 0;
  switch (pos) {
    case "up": {
      if (canMove(bricks, bricks.length, pos)) {
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
      if (canMove(bricks, bricks.length, pos)) {
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
      if (canMove(bricks, bricks.length, pos)) {
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
      if (canMove(bricks, bricks.length, pos)) {
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
          return true
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
          return true
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
          return true
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
          return true
        }
      }
      break;
    }
  }

  return false;
}


function check(bricks, brickNumberPerRow = 4) {
  // if there is brick which is equal to this.end,game over;
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


function getBestMove(bricks, runs = 100) {
  let bestScore = 0;
  let bestMove = null;
  let moves = 0;
  ['up', 'down', 'left', 'right'].forEach(pos => {
    const { meanMoves, meanScore } = mutilRandomMove(bricks, pos, 100);
    if (meanScore > bestScore) {
      bestScore = meanScore;
      moves = meanMoves
      bestMove = pos
    }
  })

  // console.log('bestMove: ' + bestMove + ', bestScore: ' + bestScore, ', moves:' + moves);
  return {
    bestMove,
    bestScore
  }
}

function mutilRandomMove(bricks, pos, runs = 100) {
  let totalScore = 0, totalMoves = 0;
  for (let i = 0; i < runs; i++) {
    const { score, moves } = randomMove(bricks, pos);
    totalMoves += moves;
    totalScore += score;
  }
  return { meanScore: totalScore / runs, meanMoves: totalMoves / runs };
}

function randomMove(bricks, pos) {
  bricks = deepClone(bricks);
  let totalScore = 0; //总分
  let score = 0; //单次得分
  let moves = 0; // 移动总步数

  while (!check(bricks, bricks.length)) {
    [bricks, score] = doMove(bricks, bricks.length, pos);
    totalScore += score;
    moves++;
    pos = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)]
  }

  return {
    score: totalScore,
    moves
  }
}

// function getNextStep(brick) {
//   const candidates = [];
//   const check = {
//     'up': 0x8,
//     'down': 0x4,
//     'left': 0x2,
//     'right': 0x1
//   };
//   ['up', 'down', 'left', 'right'].forEach(pos => {
//     var isMoveable = canMove(brick, brick.length, pos)
//     let score = 0, next_scores = [], next_brick;
//     if (isMoveable & check[pos]) {
//       [next_brick, score] = doMove(brick, brick.length, pos, isMoveable);
//       ['up', 'down', 'left', 'right'].forEach(pos => {
//         var isMoveable = canMove(next_brick, next_brick.length, pos)
//         if (isMoveable & check[pos]) {
//           next_scores.push(doMove(next_brick, next_brick.length, pos, isMoveable)[1])
//         }
//       })
//       candidates.push({
//         pos,
//         score: score + Math.max(...next_scores)
//       })
//     }
//   })
//   return {
//     brick,
//     step: candidates.sort((a, b) => b.score - a.score)[0]
//   }
// }



const fs = require('fs');
function generateData(epoch = 1) {
  for (let i = 0; i < epoch; i++) {
    let bricks = initBrick(4);
    let totalScore = 0;
    let track = [];
    let score = 0;
    bricks = genBrick(bricks, bricks.length);
    let { bestMove } = getBestMove(bricks, 100);
    while (!check(bricks, bricks.length)) {
      [bricks, score] = doMove(bricks, bricks.length, bestMove);
      totalScore += score;
      track.push({
        move: bestMove,
        bricks,
        score: totalScore
      })
      bestMove = getBestMove(bricks, 50).bestMove
    }
    fs.writeFile(`data_${i}.json`, JSON.stringify(track, null, 2));
  }
}

generateData(10)