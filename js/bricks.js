import { detectCollisionY, detectCollisionX } from "./collisionDetection.js";

export default class Bricks {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");

    this.game = game;

    this.position = position;
    this.width = 20;
    this.height = 20;

    this.markedForDeletion = false;
  }

  update() {
    let collisionY = false;
    let collisionX = false;
    if (detectCollisionY(this.game.ball, this)) {
      collisionY = true;
      this.markedForDeletion = true;
    }
    if (detectCollisionX(this.game.ball, this)) {
      collisionX = true;
      this.markedForDeletion = true;
    }
    if (collisionY) {
        this.game.ball.speed.y = -this.game.ball.speed.y;
    }
    if (collisionX) {
        this.game.ball.speed.x = -this.game.ball.speed.x;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
