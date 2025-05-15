import { InputHandler } from './modules/input-handler.js'
import { Map } from './modules/map.js'
import { Player } from './modules/player.js'
import { LevelLoader } from './modules/level-loader.js';
import { Circle } from './modules/circle.js'

// ----- START -----
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let inputHandler = new InputHandler();
let player = new Player(0, "player", 40, 40, 20, 1, "red");
let map = new Map(0, "TestMap");
let playerMoving = false; // used to "snap" player to pixel grid

setup();
gameLoop();
// -----------------

function setup() {
    // Set canvas size
    canvas.width = 700;
    canvas.height = 400;

    // Add event listeners for input
    window.addEventListener("keydown", function (event) {
        inputHandler.keyDown(event.code);
    });
    window.addEventListener("keyup", function (event) {
        inputHandler.keyUp(event.code);
    });

    // Add event listener for the levelLoader
    let levelLoaderButton = document.getElementById("levelLoaderButton");
    levelLoaderButton.addEventListener("click", function () {
        loadLevel();
    });

    // Load the default level & player
    let defaultLevelKey = "welcome";
    let defaultLevelName = "Welcome";
    document.getElementById("levels").value = defaultLevelKey;
    loadLevel(defaultLevelKey, defaultLevelName);
}

function gameLoop() {
    // Clear the screen
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Check the win condition
    if (!player.winCondition && !player.loseCondition) {
        // Move the player
        if (inputHandler.hasDir()) {
            playerMoving = true;
            //drawPlayerDirection(ctx, inputHandler.getDirectionFromKeys()); // uncomment for debugging
            player.move(inputHandler.getDirectionFromKeys(), map.entities);
        }
        // If the player was moving last iteration but
        // isn't moving any longer (b/c hasDir() is false)
        else if (playerMoving) {
            playerMoving = false;
            player.move(null, map.entities); // snap to grid
        }
    } else if (player.loseCondition) {
        player.loseCondition = false;
        loadLevel(); // shouldn't do it this way but ... fix it later
    } else if (player.winCondition) {
        win(ctx);
    }

    // Map calls entity draw() functions
    map.drawAll(ctx);

    // Call gameLoop()
    requestAnimationFrame(gameLoop);
}

/*
    loadLevel() first attempts to load the level passed in.
    If it can't, it will attempt to load the level selected.
    If it can't, it will display an error message.
*/
function loadLevel(levelKey, levelName) {
    if (levelKey != undefined && levelKey != null && levelKey.length > 0
        && levelName != undefined && levelName != null && levelName.length > 0
    ) {
        //console.log("Attempting to load level (passed in): " + levelKey);
        let loadedLevel = LevelLoader.loadLevel(levelKey);

        if (loadedLevel != undefined && loadedLevel != null && loadedLevel.length > 0) {
            map.load(loadedLevel, player);
            document.getElementById("levelName").innerHTML = levelName;
            player.winCondition = false;
        } else {
            alert("Error: can't find this level");
        }
    } else {
        let levelSelectElement = document.getElementById("levels");
        let levelKey = levelSelectElement.value;
        let levelName = levelSelectElement[levelSelectElement.selectedIndex].text;

        //console.log("Attempting to load level (selected): " + levelKey);
        let loadedLevel = LevelLoader.loadLevel(levelKey);

        if (loadedLevel != undefined && loadedLevel != null && loadedLevel.length > 0) {
            map.load(loadedLevel, player);
            document.getElementById("levelName").innerHTML = levelName;
            player.winCondition = false;
        } else {
            alert("Error: can't find this level");
        }
    }
}

function win(ctx) {
    ctx.fillStyle = "red";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("You win!", (canvas.width / 2), (canvas.height / 2));
}

function drawPlayerDirection(ctx, dir) {
    ctx.fillStyle = "red";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dir, (canvas.width / 2), (canvas.height / 2));
}
