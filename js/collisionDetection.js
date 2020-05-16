export function detectCollisionY(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;
  let rightSideOfBall = ball.position.x + ball.size;
  let leftSideOfBall = ball.position.x;

  let topOfObject = gameObject.position.y;
  let bottomOfObject = gameObject.position.y + gameObject.height;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    leftSideOfBall >= leftSideOfObject - ball.size / 2 &&
    rightSideOfBall <= rightSideOfObject + ball.size / 2
  ) {
    return true;
  } else {
    return false;
  }
}
export function detectCollisionX(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;
  let rightSideOfBall = ball.position.x + ball.size;
  let leftSideOfBall = ball.position.x;

  let topOfObject = gameObject.position.y;
  let bottomOfObject = gameObject.position.y + gameObject.height;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  if (
    bottomOfBall < topOfObject + gameObject.height &&
    topOfBall > bottomOfObject - gameObject.height &&
    leftSideOfBall <= rightSideOfObject &&
    rightSideOfBall >= leftSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}

//export function detectCollisionY(ball, gameObject) {

//}
