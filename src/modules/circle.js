/*
    The class representing a circle. This is
    the main enemy in the game.

    Types: ^ or v move up and down
           < or > move left & right
*/
class Circle {
    constructor(id, name, type, x, y, size, speed, color) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
    }

    /*
        This moves the circle based on the current direction (type).
        If the circle encounters a wall, the direction will be flipped,
        giving the circle a basic "bounce" effect.

        This method / architecture for enemy movement
        is extremely inefficient and can be refactored.
    */
    move(entities) {
        let newX = this.x;
        let newY = this.y;

        // Change newX and newY based on the current "type"
        // (which is starting direction, and then from that
        // point the current direction)
        // This helps us determine if next game loop we are
        // colliding with a wall.
        switch (this.type) {
            case "^":
                newY -= this.speed;
                break;
            case ">":
                newX += this.speed;
                break;
            case "v":
                newY += this.speed;
                break;
            case "<":
                newX -= this.speed;
                break;
        }

        // Loop through each entity, flip the direction
        // if the circle is colliding with a wall
        for (let i = 0; i < entities.length; i++) {
            if (entities[i].name == "wall") {
                let colliding_on_x_axis = (newX + this.size > entities[i].x) && (newX - this.size < entities[i].x + entities[i].size);
                let colliding_on_y_axis = (newY + this.size > entities[i].y) && (newY - this.size < entities[i].y + entities[i].size);
                let colliding = colliding_on_x_axis && colliding_on_y_axis;

                if (colliding) {
                    switch (this.type) {
                        case "^":
                            newY = this.y;
                            this.type = "v";
                            break;
                        case ">":
                            newX = this.x;
                            this.type = "<";
                            break;
                        case "v":
                            newY = this.y;
                            this.type = "^";
                            break;
                        case "<":
                            newX = this.x;
                            this.type = ">";
                            break;
                    }
                }
            }
        }

        // Move the circle
        this.x = newX;
        this.y = newY;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

export { Circle };
