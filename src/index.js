import { InputHandler } from './modules/input-handler.js'
import { Map } from './modules/map.js'
import { Player } from './modules/player.js'
import { Wall } from './modules/wall.js'

// ----- START -----
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let inputHandler = new InputHandler();
let player = new Player(0, "player", 40, 40, 20, 1, "red");
let map = new Map(0, "TestMap");
let playerStoppedMoving = true; // used to "snap" player to pixel grid

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

    // Build the map
    let mapData = [
        ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "w", "w", "w", "w", "w", "w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "w"],
        ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
    ];

    // Load the mapData into the map
    map.load(mapData);
    
    // Add player to map
    map.spawn(player);
}

function gameLoop() {
    // Clear the screen
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Move the player
    if (inputHandler.hasDir()) {
        playerStoppedMoving = false;
        draw_player_direction(ctx, inputHandler.getDirectionFromKeys());
        player.move(inputHandler.getDirectionFromKeys(), map.entities);
    } else if (!playerStoppedMoving) {
        playerStoppedMoving = true;
        player.move(null, map.entities);
    }

    // Map calls entity draw() functions
    map.drawAll(ctx);

    // Call gameLoop()
    requestAnimationFrame(gameLoop);
}

function draw_player_direction(ctx, dir) {
    ctx.fillStyle = "red";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dir, (canvas.width / 2), (canvas.height / 2));
}
