import { detectCollisionY, detectCollisionX } from "./collisionDetection";

export default class Bricks {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");

    this.game = game;

    this.position = position;
    this.width = 40;
    this.height = 40;

    this.markedForDeletion = false;
  }

  update() {
    if (detectCollisionY(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
    if (detectCollisionX(this.game.ball, this)) {
      this.game.ball.speed.x = -this.game.ball.speed.x;
      this.markedForDeletion = true;
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
