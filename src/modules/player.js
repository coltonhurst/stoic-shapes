/*
    The class representing the player.

    Implements move() and draw().
*/
class Player {
    constructor(id, name, x, y, size, speed, color) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
    }

    /*
        `dir` represents the direction to move the player.
        Strings representing Cardinal & Ordinal Directions
        should be passed in for the 'dir' parameter.

        NW  N  NE
          \ | /
        W --|-- E
          / | \
        SW  S  SE
    */
    move(dir, entities) {
        const DIAGONAL_SPEED_MODIFIER = 1.41;

        let newX = this.x;
        let newY = this.y;

        // Change newX and newY based on dir
        switch (dir) {
            case undefined:
            case null:
                // When the player stops moving, align to the
                // nearest integer grid location. This helps
                // retain a crisp look when not moving.
                newX = Math.round(newX);
                newY = Math.round(newY);
                break;
            case "N":
                newY = newY - this.speed;
                break;
            case "NE":
                newX = newX + (this.speed / DIAGONAL_SPEED_MODIFIER);
                newY = newY - (this.speed / DIAGONAL_SPEED_MODIFIER);
                break;
            case "E":
                newX = newX + this.speed;
                break;
            case "SE":
                newX = newX + (this.speed / DIAGONAL_SPEED_MODIFIER);
                newY = newY + (this.speed / DIAGONAL_SPEED_MODIFIER);
                break;
            case "S":
                newY = newY = newY + this.speed;
                break;
            case "SW":
                newX = newX - (this.speed / DIAGONAL_SPEED_MODIFIER);
                newY = newY + (this.speed / DIAGONAL_SPEED_MODIFIER);
                break;
            case "W":
                newX = newX - this.speed;
                break;
            case "NW":
                newX = newX - (this.speed / DIAGONAL_SPEED_MODIFIER);
                newY = newY - (this.speed / DIAGONAL_SPEED_MODIFIER);
                break;
        }

        // Check for collisions
        // Each entity should have an x, y, and size
        if (dir != undefined && dir != null) {
            // Loop through all entities
            for (let i = 0; i < entities.length; i++) {
                // Handle wall collision
                if (entities[i].name == "wall") {
                    let colliding_on_x_axis = (newX + this.size > entities[i].x) && (newX < entities[i].x + entities[i].size);
                    let colliding_on_y_axis = (newY + this.size > entities[i].y) && (newY < entities[i].y + entities[i].size);
                    let colliding = colliding_on_x_axis && colliding_on_y_axis;

                    if (colliding) {
                        switch (dir) {
                            case "N":
                                newY = entities[i].y + entities[i].size;
                                break;
                            case "NE":
                                // If the wall is equally above and to the right of the player's
                                // current location (diagonal)
                                if ((this.y >= entities[i].y + entities[i].size) && (this.x + this.size <= entities[i].x)) {
                                    // Remove the x-axis "speed" modifier, artificially
                                    // forcing the player only up (N) for a frame, to avoid
                                    // the perfect diagonal collision bug.
                                    // We also don't want to restrict movement here, which would
                                    // prevent wall sliding against adjacent flush walls.
                                    newX = this.x;
                                }
                                // If the wall is above the player's current location
                                else if (this.y >= entities[i].y + entities[i].size) {
                                    newY = entities[i].y + entities[i].size;
                                }
                                // If the wall is to the right of the player's current location
                                else if (this.x + this.size <= entities[i].x) {
                                    newX = entities[i].x - this.size;
                                }
                                break;
                            case "E":
                                newX = entities[i].x - this.size;
                                break;
                            case "SE":
                                // If the wall is equally below and to the right of the player's
                                // current location (diagonal)
                                if ((this.y + this.size <= entities[i].y) && (this.x + this.size <= entities[i].x)) {
                                    // Remove the x-axis "speed" modifier, artificially
                                    // forcing the player only down (S) for a frame, to avoid
                                    // the perfect diagonal collision bug.
                                    // We also don't want to restrict movement here, which would
                                    // prevent wall sliding against adjacent flush walls.
                                    newX = this.x;
                                }
                                // If the wall is below the player's current location
                                else if (this.y + this.size <= entities[i].y) {
                                    newY = entities[i].y - this.size;
                                }
                                // If the wall is to the right of the player's current location
                                else if (this.x + this.size <= entities[i].x) {
                                    newX = entities[i].x - this.size;
                                }
                                break;
                            case "S":
                                newY = entities[i].y - this.size;
                                break;
                            case "SW":
                                // If the wall is equally below and to the left of the player's
                                // current location (diagonal)
                                if ((this.y + this.size <= entities[i].y) && (this.x >= entities[i].x + entities[i].size)) {
                                    // Remove the x-axis "speed" modifier, artificially
                                    // forcing the player only down (S) for a frame, to avoid
                                    // the perfect diagonal collision bug.
                                    // We also don't want to restrict movement here, which would
                                    // prevent wall sliding against adjacent flush walls.
                                    newX = this.x;
                                }
                                // If the wall is below the player's current location
                                else if (this.y + this.size <= entities[i].y) {
                                    newY = entities[i].y - this.size;
                                }
                                // If the wall is to the left of the player's current location
                                else if (this.x >= entities[i].x + entities[i].size) {
                                    newX = entities[i].x + entities[i].size;
                                }
                                break;
                            case "W":
                                newX = entities[i].x + entities[i].size;
                                break;
                            case "NW":
                                // If the wall is equally above and to the left of the player's
                                // current location (diagonal)
                                if ((this.y >= entities[i].y + entities[i].size) && (this.x >= entities[i].x + entities[i].size)) {
                                    // Remove the x-axis "speed" modifier, artificially
                                    // forcing the player only up (N) for a frame, to avoid
                                    // the perfect diagonal collision bug.
                                    // We also don't want to restrict movement here, which would
                                    // prevent wall sliding against adjacent flush walls.
                                    newX = this.x;
                                }
                                // If the wall is above the player's current location
                                else if (this.y >= entities[i].y + entities[i].size) {
                                    newY = entities[i].y + entities[i].size;
                                }
                                // If the wall is to the left of the player's current location
                                else if (this.x >= entities[i].x + entities[i].size) {
                                    newX = entities[i].x + entities[i].size;
                                }
                                break;
                        }
                    }
                }
            }
        }

        this.x = newX;
        this.y = newY;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export { Player };
