
let _platform = null;
let _platformDirection = true;


function scaleBlock(image, scaleX, scaleY) {
    if (scaleX == null)
        scaleX = 1;

    if (scaleY == null)
        scaleY = scaleX;

    image.width *= scaleX;
    image.height *= scaleY;
    image.displayWidth *= scaleX;
    image.displayHeight *= scaleY;
}

function sizeBlock(image, width, height) {
    if (width != null) {
        image.width = width;
        image.displayWidth = width;
    }

    if (height != null) {
        image.height = height;
        image.displayHeight = height;
    }
}

function positionBlock(image, x, y) {
    if (x != null)
        image.x = x + (image.width * .5);

    if (y != null)
        image.y = y - (image.height * .5);
}

function moveBlock(image, deltaX, deltaY) {
    if (deltaX != null)
        image.x += deltaX;

    if (deltaY != null)
        image.y += deltaY;
}

var prev = null;
function spawnBlock(context, asset, label, x, y, width, height, ignoreGravity, isStatic, mass) {
    if (width != null)
        x = x + (width * .5);

    if (height != null)
        y = y - (height * .5);

    if (mass == null)
        mass = 1;

    if (!ignoreGravity)
        ignoreGravity = false;

    if (!isStatic)
        isStatic = false;

    const block = context.matter.add.image(x, y, asset, null, { isSensor: true, mass: mass, ignoreGravity: ignoreGravity, isStatic: isStatic, label: label });

    if (prev) {
        //context.matter.add.joint(prev, block, 80, 0.9);
    }
    prev = block;

    sizeBlock(block, width, height);

    return block;
}


function shakeTower() {
    _platform.setVelocity(_platformDirection ? .2 : -.2, 0);
    _platformDirection = !_platformDirection;
}

function createPlatform(context) {
    _platform = context.matter.add.image(0, 0, 'platform', null, { isStatic: true });
    _platform.body.label = "platform";
    _platform.immovable = true;

    _platform.drawDebug = true;
    sizeBlock(_platform, _canvasWidth - 200, 15);
    positionBlock(_platform,  100, _canvasHeight + 16);

    context.time.addEvent({ delay: 100, callback: () => { shakeTower(); }, loop: true });
}

function createLevelLine(context) {
    _platform = context.matter.add.image(0, 0, 'platform', null, { isStatic: true });
    _platform.body.label = "platform";
    _platform.immovable = true;

    _platform.drawDebug = true;
    sizeBlock(_platform, _canvasWidth - 200, 15);
    positionBlock(_platform,  100, _canvasHeight + 16);

    context.time.addEvent({ delay: 100, callback: () => { shakeTower(); }, loop: true });
}

function spawnTower(context) {
    let y = _canvasHeight;
    //y = 250;
    let b = spawnBlock(context, 'tower1', 'tower_', (_canvasCenterX - 210) + 57, y, 57, 95, true, true);
    b = spawnBlock(context, 'tower2', 'tower_', b.x + (b.width * .5), y, 58, 129, true, true);
    b = spawnBlock(context, 'tower3', 'tower_', b.x + (b.width * .5), y, 57, 150, true, true);
    b = spawnBlock(context, 'tower4', 'tower_', b.x + (b.width * .5), y, 57, 150, true, true);
    b = spawnBlock(context, 'tower5', 'tower_', b.x + (b.width * .5), y, 57, 113, true, true);
}

function getMouse() {
    return {
        x: _game.input.mousePointer.x,
        y: (_game.input.mousePointer.y + _level.top)
    };
}

function getRandomInt(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getFromListByProp(list, prop, value, defaultValue) {
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.hasOwnProperty(prop) && item[prop] == value) {
            return item;
        }
    }

    return defaultValue;
}

function removeFromListByProp(list, prop, value, defaultValue) {
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.hasOwnProperty(prop) && item[prop] == value) {
            list.splice(i, 1);
            return item;
        }
    }

    return defaultValue;
}

let _test = false;
let _level3BossSpawned = false;
let _level3BossDestroyed = false;
let _level2BossSpawned = false;
let _level2BossDestroyed = false;

function enemySpawner(context) {
    if (_test) {
        if (_enemies.length === 0) {
            let enemy = new Enemy(context,
                'musk',
                -100,
                _level.top + 100,
                33,
                4,
                850,
                true,
                150
            );

            _enemies.push(enemy);
        }

        return;
    }

    if (_level.gameOver || !_towerFirstAttachment) {
        return;
    }

    let now = Date.now();
    if ((_lastEnemySpawn + 35000) < now) {
        _lastEnemySpawn = now;
        return; // give delay
    }

    if ((_lastEnemySpawn + 10000) > now) {
        return;
    }

    if ((_level.level === 2 && _level2BossDestroyed) || (_level.level === 3 && _level3BossDestroyed)) {
        return;
    }

    if (_level.level === 2 && !_level2BossSpawned) {
        _level2BossSpawned = true;
        _lastEnemySpawn = now;

        let enemy = new Enemy(context,
            'spaceship2',
            getRandomInt(0, 10) > 5 ? -100 : _canvasWidth + 100,
            _level.top + 100,
            50,
            getRandomInt(2, 4),
            965,
            true
        );

        _enemies.push(enemy);
    }
    else if (_level.level === 3 && !_level3BossSpawned) {
        _level3BossSpawned = true;
        _lastEnemySpawn = now;

        let enemy = new Enemy(context,
            'musk',
            getRandomInt(0, 10) > 5 ? -100 : _canvasWidth + 100,
            _level.top + 100,
            33,
            getRandomInt(3, 5),
            965,
            true,
            150
        );

        _enemies.push(enemy);
    }
    else if (_level.level > 1 && _enemies.length < 3) {
        _lastEnemySpawn = now;

        let enemy = new Enemy(context,
            'spaceship1',
            getRandomInt(0, 10) > 5 ? -100 : _canvasWidth + 100,
            _level.top + 100,
            100,
            getRandomInt(2, 4),
            985
        );

        _enemies.push(enemy);
    }
}
