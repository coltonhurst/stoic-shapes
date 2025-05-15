/*
    The class representing a circle. This is
    the main enemy in the game.

    Types: ^ or v move up and down
           < or > move left & right
*/
class Circle {
    constructor(id, name, type, x, y, size, color) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
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
