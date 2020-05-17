import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import { buildLevel, level1 } from "./levels.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  WIN: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.lives = 3;
    this.gameObjects = [];
    this.gamestate = GAMESTATE.MENU;
    this.bricks = [];
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    new InputHandler(this.paddle, this);
  }

  run() {
    this.gamestate = GAMESTATE.RUNNING;
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;

    this.bricks = buildLevel(this, level1);

    this.gameObjects = [this.ball, this.paddle, ...this.bricks];
  }

  restart() {
    this.start();
    this.lives = 3;
    this.ball.position = { x: 10, y: 300 };
    this.ball.speed = { x: 10, y: -10 };
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if(this.bricks.length === 0) {
      this.gamestate === GAMESTATE.WIN;
    }

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER ||
      this.gamestate === GAMESTATE.WIN
    )
      return;
    
    this.gameObjects.forEach(object => object.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      object => !object.markedForDeletion
    );
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.font = "30pt Quicksand";
      ctx.fillStyle = "#D0E271";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      let bricks = buildLevel(this, level1);

      this.gameObjects = [this.ball, this.paddle, ...bricks];
      ctx.font = "30pt Quicksand";
      ctx.fillStyle = "#D0E271";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press 's' to Play Game",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.font = "30pt Quicksand";
      ctx.fillStyle = "#D0E271";
      ctx.textAlign = "center";
      ctx.fillText("Game Over: Press 'r' to Restart Game", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.RUNNING) {
      ctx.font = "10pt Quicksand";
      ctx.fillStyle = "#D0E271";
      ctx.fillText(
        "Lives: ",
        20,
        this.gameHeight / 2
      );
      if(this.lives >2) {
        ctx.drawImage(this.ball.image,35,this.gameHeight / 2 + 32, this.ball.size,this.ball.size)
      }
      if(this.lives >1) {
        ctx.drawImage(this.ball.image,35,this.gameHeight / 2 + 16, this.ball.size,this.ball.size)
      }
      ctx.drawImage(this.ball.image,35,this.gameHeight / 2, this.ball.size,this.ball.size)
    }
    if (this.gamestate === GAMESTATE.WIN) {
      ctx.font = "30pt Quicksand";
      ctx.fillStyle = "#D0E271";
      ctx.textAlign = "center";
      ctx.fillText("Winner: Press 'r' to Restart Game", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
