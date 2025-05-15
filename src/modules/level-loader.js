import { blank } from './levels/blank.js';
import { welcome } from './levels/welcome.js';
import { Spongebob9000 } from './levels/Spongebob9000.js';

/*
    This class is used for loading levels. The loadLevel() function
    is purposely static, so you don't need to create an instance
    of this class.
*/
class LevelLoader {
    static levels = {
        blank: () => blank(),
        welcome: () => welcome(),
		Spongebob9000: () => Spongebob9000(),
    };

    static loadLevel(levelName) {
        try {
            if (levelName != undefined && levelName != null && levelName.length > 0) {
                return this.levels[levelName]();
            }
        } catch {
            return null;
        }

        return null;
    }
}

export { LevelLoader };
