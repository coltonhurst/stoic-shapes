/*
    The class representing an area,
    used as the start or finish area.

    Options for areaType: "start", "finish"

    Implements draw().
*/
class Area {
    constructor(id, name, areaType, x, y, size, color) {
        this.id = id;
        this.name = name;
        this.areaType = areaType;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    /*
        `ctx` is the canvas 2d context to draw to.
    */
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export { Area };
