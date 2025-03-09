/*
    The InputHandler class handles input from the keyboard.
    There should only be one instance of this class.

    The keys[] array represents the keys that are currently
    pressed as directions.

    Use the getDirectionFromKeys() function to get the
    cardinal and ordinal directions used to control the player.

    keyDown() and keyUp() should be called from event listeners.
*/
class InputHandler {
    constructor() {
        this.keys = [];
    }

    hasDir() {
        return this.keys.length > 0;
    }

    /*
        Call this from an event listener.
        Example:

        window.addEventListener("keydown", function (event) {
            inputHandler.keyDown(event.code);
        });
    */
    keyDown(code) {
        if (code != undefined && code != null) {
            if (code == "ArrowUp" && this.keys.indexOf("N") == -1) {
                this.keys.push("N");
            } else if (code == "ArrowDown" && this.keys.indexOf("S") == -1) {
                this.keys.push("S");
            } else if (code == "ArrowLeft" && this.keys.indexOf("W") == -1) {
                this.keys.push("W");
            } else if (code == "ArrowRight" && this.keys.indexOf("E") == -1) {
                this.keys.push("E");
            }
        }
    }

    /*
        Call this from an event listener.
        Example:

        window.addEventListener("keyup", function (event) {
            inputHandler.keyUp(event.code);
        });
    */
    keyUp(code) {
        if (code != undefined && code != null) {
            if (code == "ArrowUp" && this.keys.indexOf("N") != -1) {
                this.keys.splice(this.keys.indexOf("N"), 1);
            } else if (code == "ArrowDown" && this.keys.indexOf("S") != -1) {
                this.keys.splice(this.keys.indexOf("S"), 1);
            } else if (code == "ArrowLeft" && this.keys.indexOf("W") != -1) {
                this.keys.splice(this.keys.indexOf("W"), 1);
            } else if (code == "ArrowRight" && this.keys.indexOf("E") != -1) {
                this.keys.splice(this.keys.indexOf("E"), 1);
            }
        }
    }

    /*
        From the keys that are currently pressed,
        stored in keys[], this returns the cardinal
        and ordinal direction for player movement.

        If there is no direction to determine, this returns null.
    */
    getDirectionFromKeys() {
        if (this.keys != undefined && this.keys != null && this.keys.length != 0) {
            let north = this.keys.indexOf("N") != -1;
            let east = this.keys.indexOf("E") != -1;
            let south = this.keys.indexOf("S") != -1;
            let west = this.keys.indexOf("W") != -1;

            if (north && east)
                return "NE";
            else if (east && south)
                return "SE";
            else if (south && west)
                return "SW";
            else if (north && west)
                return "NW";
            else if (north)
                return "N";
            else if (east)
                return "E";
            else if (south)
                return "S";
            else if (west)
                return "W";
        }

        return null;
    }
}

export { InputHandler };
