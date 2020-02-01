// IIFE -- Immediately Invoked Function Expression
// means? is an anonymous self-executing function
let Game = (function () {
    // initialize the needed object
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;

    let backgroundImg: createjs.Bitmap;
    let playerA: objects.Player;
    let playerB: objects.Player;

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */

    function Start(): void {
        console.log(`%c Game Started!`, "color: lightblue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        Main();
    }

    function Update(): void {
        playerA.Update();
        stage.update();
    }


    function Main(): void {
        console.log(`%c Main Started...`, "color: green; font-size: 16px;");

        // first stage
        firstStage();
    }

    // Logan Kim Begins


    // Logan Kim Ends
    // Kei Mizubuchi Begins
    function firstStage(): void {
        playerA = new objects.Player();
        stage.addChild(playerA);
    }

    // attach keydown event to the window
    window.addEventListener('keydown', keyPressed);

    function keyPressed(event: KeyboardEvent) {
        console.log('keydown: ' + event.keyCode);
        if (event.keyCode === 38) {
            playerA.moveUp();
        } else if (event.keyCode === 40) {
            playerA.moveDown();
        } else if (event.keyCode === 37) {
            playerA.moveLeft();
        } else if (event.keyCode === 39) {
            // right
            playerA.moveRight();
        }
    }


    // Kei Mizubuchi Ends
    // Hand Li Begins


    // Hang Li Ends
    // Ygor Almeida Begins


    // Ygor Almeida Ends

    window.addEventListener('load', Start);
})();