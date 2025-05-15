import { Area } from './area.js'
import { Wall } from './wall.js'

/*
    The class representing a map.

    Every entity on the map should have an id
    and implement the draw() function.
*/
class Map {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.entities = [];
    }

    /*
        A private function used during load()

        Will create an entity and "spawn" it based
        on the key in mapData.
    */
    #spawnDuringLoad(id, row, column, key) {
        // Define default colors
        const WALL_SIZE = 20;
        const WALL_COLOR = "black";
        const AREA_START_SIZE = 20;
        const AREA_START_COLOR = "lightgray";
        const AREA_FINISH_SIZE = 20;
        const AREA_FINISH_COLOR = "lightgreen";

        // Spawn entities
        switch (key) {
            case "w":
                this.spawn(new Wall(id, "wall", column * 20, row * 20, WALL_SIZE, WALL_COLOR));
                //console.log("Spawned a wall at: (" + row + ", " + column + ")");
                break;
            case "s":
                this.spawn(new Area(id, "area", "start", column * 20, row * 20, AREA_START_SIZE, AREA_START_COLOR));
                //console.log("Spawned a start area at: (" + row + ", " + column + ")");
                break;
            case "f":
                this.spawn(new Area(id, "area", "finish", column * 20, row * 20, AREA_FINISH_SIZE, AREA_FINISH_COLOR));
                //console.log("Spawned a finish area at: (" + row + ", " + column + ")");
                break;
        }
    }

    /*
        Takes a 2D array representing the map, as well as the
        player, & spawns the entities in accordingly.

        Returns true if the load succeeded, false if not.

        - mapData should be 20 rows x 35 columns
        - entity representations in the array:
            - 'w' = wall
            - 's' = starting player area
            - 'f' = finish area
    */
    load(mapData, player) {
        // Verify mapData is an array and there are 20 rows
        if (!Array.isArray(mapData) || mapData.length != 20) {
            console.error("Error during load, mapData is not an array OR there are not 35 columns.");
            console.log("mapData is an array: " + Array.isArray(mapData));
            console.log("mapData has " + mapData.length + " rows.");
            return false;
        }

        // Verify each row in mapData has 35 columns
        for (let i = 0; i < mapData.length; i++) {
            if (mapData[i].length != 35) {
                return false;
            }
        }

        // Clear the current data
        this.entities = [];

        // Spawn each entity based on mapData
        let id = 1;
        let playerStartingAreaFound = false;

        for (let i = 0; i < mapData.length; i++) {
            for (let j = 0; j < mapData[i].length; j++) {
                // Spawn the entity
                this.#spawnDuringLoad(id, i, j, mapData[i][j]);
                id++;

                // Spawn the player
                if (!playerStartingAreaFound && mapData[i][j] == "s") {
                    player.x = j * 20;
                    player.y = i * 20;
                    playerStartingAreaFound = true;
                }
            }
        }

        // Spawn the player last so it's on top of all other entities on the canvas
        if (playerStartingAreaFound) {
            this.spawn(player);
        }
    }

    /*
        Adds an entity to the map.
        The entity must have an id and
        implement draw().

        Todo: add draw() requirement check

        Returns:
          true: if the entity was added successfully
          false: if the entity was not added successfully
    */
    spawn(entity) {
        // Return false if entity is undefined, null, or hasn't implemented the draw function
        if (entity == undefined || entity == null || !Object.hasOwn(entity, "id")) {
            return false;
        }

        // Add the entity to the list
        try {
            this.entities.push(entity);
        } catch (error) {
            return false;
        }

        // Success
        return true;
    }

    /*
        Destroys all entities with a matching id.
    */
    destroy(entityId) {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].id == entityId) {
                this.entities.splice(i, 1);
            }
        }
    }

    /*
        Calls the draw function for all entities on the map
        using the passed ctx.
    */
    drawAll(ctx) {
        this.entities.forEach(function (entity) {
            entity.draw(ctx);
        });
    }
}

export { Map };
