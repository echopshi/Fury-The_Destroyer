/**
 * COSMOS Games
 *
 * April 12, 2020
 *
 * Contributors:
 * - Logan J. Kim
 * - Kei Mizubuchi
 * - Hang Li
 * - Ygor Almeida
 *
 * Description:
 * Fury, the Destroyers, is two players single screen submarine game which is designed to bring joys
 * to number of people who play this game. This game will contain three stages.
 * Players level up once the stage is cleared by meeting all conditions including eliminating all enemies on a map.
 *
 * Versions:
 * - v4.0 Final Release
 * - v3.0 Beta Release
 * - v2.0 Alpha Release
 * - v1.0 Pre-Alpha Release
 */

module scenes {
  /**
   *
   * @export
   * @class MoveInstruction
   * @extends {objects.Scene}
   */
  export class MoveInstruction extends objects.Scene {
    // PRIVATE INSTANCE MEMBER
    // images
    private _background: objects.Image;
    private _baseA: objects.Image;
    private _baseB: objects.Image;

    // movement counts
    private _playerAMove: number = 3;
    private _playerBMove: number = 3;
    private _playerAMoveFinish: boolean = false;
    private _playerBMoveFinish: boolean = false;

    // game objects
    private _playerA: objects.Player;
    private _playerB: objects.Player;

    // labels
    private _playerAInstruction: objects.Label;
    private _playerBInstruction: objects.Label;
    private _instructionLabel: objects.Label;

    // PUBLIC INSTANCE MEMBER
    public keyPressedStates: boolean[]; // to detect which keys are down

    // CONSTRUCTOR
    /**
     * Creates an instance of MoveInstruction.
     * @memberof MoveInstruction
     */
    constructor() {
      super();

      // background
      this._background = new objects.Image(
        util.BACKGROUND_PATH_GAME1,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );

      // bases
      this._baseA = new objects.Image(
        "./Assets/images/baseA1.png",
        0,
        0,
        100,
        100,
        true
      );
      this._baseA.position = this.setRandomLocation();

      this._baseB = new objects.Image(
        "./Assets/images/baseB1.png",
        0,
        0,
        100,
        100,
        true
      );
      this._baseB.position = this.setRandomLocation();

      // player A
      this._playerA = new objects.Player(
        util.GameConfig.ATLAS,
        "submarineA",
        util.PLAYER_A_POS.x,
        util.PLAYER_A_POS.y,
        "PlayerA"
      );

      // player B
      this._playerB = new objects.Player(
        util.GameConfig.ATLAS,
        "submarineB",
        util.PLAYER_B_POS.x,
        util.PLAYER_B_POS.y,
        "PlayerB"
      );

      // player A instruction label
      this._playerAInstruction = new objects.Label(
        "Player A: Press WASD key to move",
        "20px",
        util.FONT_FAMILY,
        "black",
        10,
        10,
        false
      );

      // player B instruction label
      this._playerBInstruction = new objects.Label(
        "Player B: press arrow key to move",
        "20px",
        util.FONT_FAMILY,
        "black",
        585,
        10,
        false
      );

      // instruction label
      this._instructionLabel = new objects.Label(
        "Go find your base",
        "20px",
        util.FONT_FAMILY,
        "red",
        380,
        35,
        false
      );

      // key pressed state
      this.keyPressedStates = [];

      this.Start();
    }

    // PRIVATE METHODS

    // PUBLIC METHODS
    /**
     * add objects to the scene
     *
     * @memberof MoveInstruction
     */
    public Start(): void {
      this.addChild(this._background);
      this.addChild(this._baseA);
      this.addChild(this._baseB);
      this.addChild(this._playerA);
      this.addChild(this._playerB);
      this.addChild(this._playerAInstruction);
      this.addChild(this._instructionLabel);
      this.addChild(this._playerBInstruction);
      this.Main();
    }

    /**
     * update function
     *
     * @memberof MoveInstruction
     */
    public Update(): void {
      // detect keys to make movement
      this.detectPressedKeys();

      // detect the base collision
      this.detectBaseCollision(this._baseA, this._playerA);
      this.detectBaseCollision(this._baseB, this._playerB);
    }

    public Main(): void {}

    public detectBaseCollision(
      base: objects.Image,
      target: objects.Player
    ): void {
      // check AABB collision
      managers.Collision.AABBCheck(base, target);

      if (target.isColliding) {
        switch (target.name) {
          case "PlayerA":
            {
              // move the base A
              this._playerAMove -= 1;
              if (this._playerAMove < 1) {
                this.removeChild(this._baseA);
                this._playerAMoveFinish = true;
              } else {
                this._baseA.position = this.setRandomLocation();
              }
            }
            break;
          case "PlayerB":
            {
              // move the base B
              this._playerBMove -= 1;
              if (this._playerBMove < 1) {
                this.removeChild(this._baseB);
                this._playerBMoveFinish = true;
              } else {
                this._baseB.position = this.setRandomLocation();
              }
            }
            break;
        }
      }

      if (this._playerAMoveFinish && this._playerBMoveFinish) {
        // move to the next scene
        util.GameConfig.SCENE_STATE = scenes.State.SHOOT_INSTRUCTION;
      }
    }

    public setRandomLocation(): objects.Vector2 {
      // generate position at random
      let randomX = Math.floor(Math.random() * util.STAGE_W);
      let randomY = Math.floor(
        Math.random() * util.STAGE_H + util.STAGE_BOUNDARY_TOP
      );

      return new objects.Vector2(randomX, randomY);
    }

    /**
     * Method for detecting which key is pressed
     *
     * @memberof MoveInstruction
     */
    public detectPressedKeys(): void {
      // move either up (Up) or down (DOWN)
      if (this.keyPressedStates[util.Key.UP]) {
        this._playerB.moveUp();
      } else if (this.keyPressedStates[util.Key.DOWN]) {
        this._playerB.moveDown();
      }

      // move either left (LEFT) or right (RIGHT)
      if (this.keyPressedStates[util.Key.LEFT]) {
        this._playerB.moveLeft();
      } else if (this.keyPressedStates[util.Key.RIGHT]) {
        this._playerB.moveRight();
      }

      // move either up (W) or down (S)
      if (this.keyPressedStates[util.Key.W]) {
        this._playerA.moveUp();
      } else if (this.keyPressedStates[util.Key.S]) {
        this._playerA.moveDown();
      }

      // move either left (A) or right (D)
      if (this.keyPressedStates[util.Key.A]) {
        this._playerA.moveLeft();
      } else if (this.keyPressedStates[util.Key.D]) {
        this._playerA.moveRight();
      }
    }
  }
}