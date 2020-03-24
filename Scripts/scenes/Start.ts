module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    private _background: objects.Image;
    private _startButton: objects.Image;
    private _instructionsButton: objects.Image;
    private _furyLabel: objects.Image;
    private _theDestroyerLabel: objects.Image;

    // PUBLIC PROPERTIES

    // CONTRUCTOR
    constructor() {
      super();

      this._background = new objects.Image(
        util.BACKGROUND_PATH_GAME,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );

      this._furyLabel = new objects.Image(
        util.FURY_PATH,
        480,
        100,
        500,
        150,
        true
      );

      this._theDestroyerLabel = new objects.Image(
        util.THE_DESTROYER_PATH,
        480,
        240,
        400,
        100,
        true
      );



      this._startButton = new objects.Image(
        util.PLAY_BUTTON,
        480,
        450,
        150,
        50,
        true
      );

      this._instructionsButton = new objects.Image(
        util.INSTRUCTION_BUTTON,
        480,
        530,
        150,
        50,
        true
      );


      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this._background);
      this.addChild(this._startButton);
      this.addChild(this._instructionsButton)
      this.addChild(this._furyLabel)
      this.addChild(this._theDestroyerLabel)
      this.Main();
    }

    public Update(): void { }

    // TODO:consolidate stage cleared scene
    public Main(): void {
      this._startButton.HoverOn();
      // this._startButton.on("click", function() {
      //   util.GameConfig.SCENE_STATE = scenes.State.FIRST;
      //   // initialize the scores for players
      //   util.GameConfig.PLAYER_A_SCORE = 0;
      //   util.GameConfig.PLAYER_B_SCORE = 0;
      //   // util.GameConfig.SCENE_STATE = scenes.State.SECOND;
      // });

      // for Third level testing
      this._startButton.on("click", function () {
        util.GameConfig.SCENE_STATE = scenes.State.THIRD;
        // initialize the scores for players
        util.GameConfig.PLAYER_A_SCORE = 0;
        util.GameConfig.PLAYER_B_SCORE = 0;
        // util.GameConfig.SCENE_STATE = scenes.State.SECOND;
      });

      this._instructionsButton.HoverOn();
      this._instructionsButton.on("click", function () {
        util.GameConfig.SCENE_STATE = scenes.State.INSTRUCTIONS;
      });

    }
  }
}
