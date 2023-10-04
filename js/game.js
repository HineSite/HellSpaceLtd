const _canvas = document.getElementById('gameCanvas');
const _canvasWidth = 1024;
const _canvasHeight = 700;
const _canvasCenterX = (_canvasWidth * .5);
const _canvasCenterY = (_canvasHeight * .5);

var _config = {
    type: Phaser.CANVAS,
    mode: Phaser.Scale.FIT,
    canvas: _canvas,
    width: _canvasWidth,
    height: _canvasHeight,
    backgroundColor: '#bdeaf2',
    physics: {
        default: 'matter',
        fps: 30,
        matter: {
            /*debug: {

                showAxes: false,
                showAngleIndicator: true,
                angleColor: 0xe81153,

                showBroadphase: false,
                broadphaseColor: 0xffb400,

                showBounds: false,
                boundsColor: 0xffffff,

                showVelocity: true,
                velocityColor: 0x00aeef,

                showCollisions: true,
                collisionColor: 0xf5950c,

                showSeparations: false,
                separationColor: 0xffa500,

                showBody: true,
                showStaticBody: true,
                showInternalEdges: true,

                renderFill: false,
                renderLine: true,

                fillColor: 0x106909,
                fillOpacity: 1,
                lineColor: 0x28de19,
                lineOpacity: 1,
                lineThickness: 1,

                staticFillColor: 0x0d177b,
                staticLineColor: 0x1327e4,

                showSleeping: true,
                staticBodySleepOpacity: 1,
                sleepFillColor: 0x464646,
                sleepLineColor: 0x999a99,

                showSensors: true,
                sensorFillColor: 0x0d177b,
                sensorLineColor: 0x1327e4,

                showPositions: true,
                positionSize: 4,
                positionColor: 0xe042da,

                showJoint: true,
                jointColor: 0xe0e042,
                jointLineOpacity: 1,
                jointLineThickness: 2,

                pinSize: 4,
                pinColor: 0x42e0e0,

                springColor: 0xe042e0,

                anchorColor: 0xefefef,
                anchorSize: 4,

                showConvexHulls: true,
                hullColor: 0xd703d0
            }*/
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let _game = new Phaser.Game(_config);

function preload ()
{
    //audio
    this.load.audio("boyGrunt", "audio/boy-grunt.m4a");
    this.load.audio("femaleGrunt", "audio/female-grunt_1.m4a");
    this.load.audio("manGrunt", "audio/man-grunt-deep.m4a");
    this.load.audio("oldLadyGrunt", "audio/old-lady-grunt.m4a");
    this.load.audio("deepBoing", "audio/deep-boing.m4a");
    this.load.audio("boing", "audio/boing.m4a");
    this.load.audio("weeee", "audio/weeee.mp3");
    this.load.audio("DrumBass", "audio/Drum&Bass.m4a");
    this.load.audio("happyAlien", "audio/happy-alien.m4a");
    this.load.audio("ominousWithMusk", "audio/ominous-with-musk.m4a");
    this.load.audio("wind", "audio/Wind.m4a");
    this.load.audio("birds", "audio/Birds.m4a");
    this.load.audio("laser1", "audio/laser1.m4a");
    this.load.audio("laser2", "audio/laser2.m4a");
    this.load.audio("evilLaugh", "audio/Elon-Musk-Evil-Laugh.mp3");
    this.load.audio("eightBitExplodeHigh", "audio/8bit-explosion-high.m4a");
    this.load.audio("eightBitExplodeLow", "audio/8bit-explosion-low.m4a");
    this.load.audio("wilhelmScream", "audio/Wilhelm-Scream.m4a");

    this.load.svg('background', '/images/background.svg', { width: _canvasWidth, height: 2100 });
    //climb images
    this.load.image('characterRed', '/images/climb/red-shirt-climb_01.png', { width: 50, height: 80 });
    this.load.image('characterGreen', '/images/climb/green-shirt-climb01.png', { width: 50, height: 80 });
    this.load.image('characterPink', '/images/climb/pink-gma-climb_01.png', { width: 50, height: 80 });
    this.load.image('characterPurple', '/images/climb/purple-gma-climb_01.png', { width: 50, height: 80 });
    this.load.image('characterBuff', '/images/climb/buff-guy-climb01.png', { width: 50, height: 80 });
    this.load.image('characterBoots', '/images/climb/boots-guy-climb01.png', { width: 50, height: 80 });
    //idle images
    this.load.image('characterRedIdle', '/images/idle/red-shirt-idle.png', { width: 50, height: 80 });
    this.load.image('characterGreenIdle', '/images/idle/green-shirt-idle.png', { width: 50, height: 80 });
    this.load.image('characterPinkIdle', '/images/idle/pink-gma-idle.png', { width: 50, height: 80 });
    this.load.image('characterPurpleIdle', '/images/idle/purple-gma-idle.png', { width: 50, height: 80 });
    this.load.image('characterBuffIdle', '/images/idle/buff-guy-idle.png', { width: 50, height: 80 });
    this.load.image('characterBootsIdle', '/images/idle/boots-guy-idle.png', { width: 50, height: 80 });
    //fall images
    this.load.image('characterRedFall', '/images/fall/red-shirt-fall.png', { width: 50, height: 80 });
    this.load.image('characterGreenFall', '/images/fall/green-shirt-fall.png', { width: 50, height: 80 });
    this.load.image('characterPinkFall', '/images/fall/pink-gma-fall.png', { width: 50, height: 80 });
    this.load.image('characterPurpleFall', '/images/fall/purple-gma-fall.png', { width: 50, height: 80 });
    this.load.image('characterBuffFall', '/images/fall/buff-guy-fall.png', { width: 50, height: 80 });
    this.load.image('characterBootsFall', '/images/fall/boots-guy-fall.png', { width: 50, height: 80 });

    this.load.image('enemy', '/images/platform.png');
    this.load.image('platform', '/images/platform.png');
    this.load.image('level_line', '/images/level-line.png');
    this.load.image('catapult_sent', '/images/catapult-sent.png');
    this.load.image('catapult_ready', '/images/catapult-ready.png');

    this.load.image('moon', '/images/moon.png');
    this.load.image('mars', '/images/mars.png');
    this.load.image('musk', '/images/musk.png');
    this.load.svg('spaceship1', '/images/spaceship1.svg', { width: 100, height: 100 });
    this.load.svg('spaceship2', '/images/spaceship2.svg', { width: 100, height: 100 });
    this.load.image('laser1', '/images/laser2.png');

    this.load.image('tower1', '/images/crowd-1.png');
    this.load.image('tower2', '/images/crowd-2.png');
    this.load.image('tower3', '/images/crowd-3.png');
    this.load.image('tower4', '/images/crowd-4.png');
    this.load.image('tower5', '/images/crowd-5.png');
}

let _charW = 45;
let _charH = (_charW * 1.5);

let _level = null;
let _chars = [];
let _towerChars = [];
let _towerFirstAttachment = false;
let _towerCharsL1 = [];
let _towerCharsL2 = [];
let _towerCharsL3 = [];
let _curCat = null;
let _mouseDown = false;

function create () {
    this.boyGrunt = this.sound.add("boyGrunt");
    this.femaleGrunt = this.sound.add("femaleGrunt");
    this.manGrunt = this.sound.add("manGrunt");
    this.oldLadyGrunt = this.sound.add("oldLadyGrunt");
    this.weeee = this.sound.add("weeee");
    this.boing = this.sound.add("boing");
    this.deepBoing = this.sound.add("deepBoing");
    this.DrumBass = this.sound.add("DrumBass");
    this.happyAlien = this.sound.add("happyAlien");
    this.ominousWithMusk = this.sound.add("ominousWithMusk");
    this.wind = this.sound.add("wind");
    this.birds = this.sound.add("birds");
    this.evilLaugh = this.sound.add("evilLaugh");
    this.eightBitExplodeHigh = this.sound.add("eightBitExplodeHigh");
    this.eightBitExplodeLow = this.sound.add("eightBitExplodeLow");
    this.wilhelmScream = this.sound.add("wilhelmScream");

    // Make sure background is the first item loaded!
    const background = this.matter.add.image(_canvasWidth * .5, _canvasHeight - (2100 * .5), 'background', null, { isStatic: true, label: 'background', width: _canvasWidth });

    _level = new Level(this);

    const marsPoints = _level.pointsAtLevel(3);
    const moonPoints = _level.pointsAtLevel(2);
    const mars = this.matter.add.image(200, marsPoints.top + 100, 'mars', null, { isStatic: true, label: 'mars', width: 400 });
    const moon = this.matter.add.image(_canvasWidth - 200, moonPoints.top + 250, 'moon', null, { isStatic: true, label: 'moon', width: 300 });
    _level.spawnLine(this);

    // init scene 1 sounds
    if (_level.level === 1) {
        this.DrumBass.play({volume: 0.15});
        this.DrumBass.loop = true;
        _level.levelSound = this.birds;
    }

    spawnTower(this);

    _curCat = new Catapult(this, _canvasWidth - 120, _canvasHeight);

    //_level.next(this);
    //this.time.addEvent({ delay: 800, callback: () => { _level.next(this); }, loop: false });
    //this.time.addEvent({ delay: 4000, callback: () => { _level.next(this); }, loop: false });

    this.input.on('pointerdown', (pointer) => {
        if (_level.paused || _level.gameOver)
            return;

        _mouseDown = true;
    }, this);

    this.input.on('pointerup', (pointer) => {
        if (_level.paused || _level.gameOver)
            return;

        if (!_mouseDown)
            return;

        _mouseDown = false;

        if (_curCat != null) {
            let mouse = getMouse();
            let angle = Phaser.Math.Angle.Between(mouse.x, mouse.y, _curCat.x, _curCat.y);


            if (getRandomInt(0, 10) >= 5 ) {
                this.deepBoing.play({volume: 0.55});
            } else{
                this.boing.play({volume: 0.55});
            }
            const char = new Character(this, 1, 'cur', _curCat.x + (_curCat.width * .5), _curCat.y, false, true);
            if (getRandomInt(0, 100) > 75) {
                this.weeee.play({volume: 0.35});
            } else if (char.charKey[0] === 'characterRed') {
                this.boyGrunt.play({volume: 0.35});
            }else if (char.charKey[0] === 'characterGreen') {
                this.femaleGrunt.play({volume: 0.35});
            }else if (char.charKey[0] === 'characterPink' || char.charKey[0] === 'characterPurple') {
                this.oldLadyGrunt.play({volume: 0.35});
            }else if (char.charKey[0] === 'characterBuff' || char.charKey[0] === 'characterBoots') {
                this.manGrunt.play({volume: 0.35});
            }
            char.object.body.isStatic = false;
            char.object.setVelocity(-Math.cos(angle) * _curCat.powerBar.power * .3, -Math.sin(angle) * _curCat.powerBar.power * .6);
            _chars.push(char);

            _curCat.powerBar.setPower(0);
        }
    }, this);


    this.matter.world.on('collisionstart', (event, bodyA, bodyB) =>  {
        if (_level.paused || _level.gameOver)
            return;

        if (_level.level === 2) {
            _level.levelSound = this.wind;
        }

        if (_level.level === 3) {
            _level.levelSound = this.wind;
        }

        if ((bodyA.label.startsWith('tower_') && bodyB.label.startsWith('cur_')) || (bodyB.label.startsWith('tower_') && bodyA.label.startsWith('cur_'))) {
            const body = (bodyA.label.startsWith('cur_') ? bodyA : bodyB);
            const id = body.label.split('_')[1];
            const curChar = removeFromListByProp(_chars, 'id', id, null);
            if (curChar == null) {
                console.log('bad collision | bodyA: ' + bodyA.label + ' | bodyB: ' + bodyB.label);
                return;
            }

            this.weeee.stop();

            body.label = 'tower_' + id;
            body.isStatic = true;
            body.parent.ignoreGravity = true;

            _towerFirstAttachment = true;

            curChar.updateTexture(this, 0,'tower');

            _towerChars.push(curChar);

            if (curChar.object.y < _level.bottom) { // if in view
                if (_level.level === 1) {
                    _towerCharsL1.push(curChar);
                }
                else if (_level.level === 2) {
                    _towerCharsL2.push(curChar);
                }
                else if (_level.level === 3) {
                    _towerCharsL3.push(curChar);
                }
            }

            // Why is curChar.object.height 480?
            if ((curChar.object.y - (_charH * .5)) < _level.line.y) {
                _level.next(this);

                if (_level.level === 2) {
                    //_towerCharsL1 = _towerChars.splice(0);
                    _towerFirstAttachment = false;

                    this.DrumBass.stop();
                    this.happyAlien.play({volume: 0.55});
                    this.happyAlien.loop = true;
                }
                else if (_level.level === 3) {
                    //_towerCharsL2 = _towerChars.splice(0);
                    _towerFirstAttachment = false;

                    this.happyAlien.stop();
                    this.ominousWithMusk.play({volume: 0.8});
                    this.ominousWithMusk.loop = true;
                }
                else if (_level.level === 4) {
                    //_towerCharsL3 = _towerChars.splice(0);
                    _towerFirstAttachment = false;

                    _level.gameOver = true;
                    _level.gameWon = true;

                    console.log('win');
                    const myWinModal = new bootstrap.Modal('#WinModal');
                    myWinModal.show();
                    showModalCover();
                }
            }
        }




        if ((bodyA.label.startsWith('enemy_') && bodyB.label.startsWith('cur_')) || (bodyB.label.startsWith('enemy_') && bodyA.label.startsWith('cur_'))) {
            const curBody = (bodyA.label.startsWith('cur_') ? bodyA : bodyB);
            const enemyBody = (bodyA.label.startsWith('enemy_') ? bodyA : bodyB);
            const curId = curBody.label.split('_')[1];
            const enemyId = enemyBody.label.split('_')[1];
            const curChar = removeFromListByProp(_chars, 'id', curId, null);
            const enemy = getFromListByProp(_enemies, 'id', enemyId, null);

            if (curChar && enemy) {
                curChar.explode();
                enemy.hit();

                if (enemy.health.hp === 0) {
                    removeFromListByProp(_enemies, 'id', enemyId, null);
                    if (getRandomInt(0, 10) > 5) {
                        this.eightBitExplodeHigh.play({volume: 0.25});
                    } else {
                        this.eightBitExplodeLow.play({volume: 0.25});
                    }
                    enemy.explode();
                }
            }
        }





        if ((bodyA.label.startsWith('laser1_') && bodyB.label.startsWith('tower_')) || (bodyB.label.startsWith('laser1_') && bodyA.label.startsWith('tower_'))) {
            const body = (bodyA.label.startsWith('tower_') ? bodyA : bodyB);
            const laserBody = (bodyA.label.startsWith('laser1_') ? bodyA : bodyB);
            const id = body.label.split('_')[1];
            const enemyId = laserBody.label.split('_')[1];
            const laserId = laserBody.label.split('_')[2];

            if (id == null || id === '' || enemyId == null || enemyId === '' || laserId == null || laserId === '') {
                return;
            }


            let levelTower = _towerCharsL1;
            if (_level.level === 2) {
                levelTower = _towerCharsL2
            } else if (_level.level === 3) {
                levelTower = _towerCharsL3
            }

            const char = removeFromListByProp(_towerChars, 'id', id, null);
            removeFromListByProp(levelTower, 'id', id, null); // remove from level tower too;
            if (!char) {
                return; // strange
            }

            const enemy = getFromListByProp(_enemies, 'id', enemyId, null);
            if (!enemy) {
                return; // if enemy no longer exists, ignore it's lasers
            }

            const laser = removeFromListByProp(enemy.lasers, 'id', laserId, null);

            body.label = 'tower-fall';
            body.isStatic = false;
            body.parent.ignoreGravity = false;
            char.object.setCollisionCategory(false);
            char.updateTexture(this, 2,'tower');
            if (getRandomInt(0, 10) > 9) {
                this.wilhelmScream.play();
            }

            laser.object.setAlpha(0);
            laser.object.setCollisionCategory(false);
            laser.object.y = -8000;


            if (_towerFirstAttachment && levelTower.length === 0) {
                _level.gameOver = true;
                _level.gameWon = false;

                this.evilLaugh.play({volume: 0.5});
                console.log('lose');
                const myWinModal = new bootstrap.Modal('#LoseModal');
                myWinModal.show();
                showModalCover();
            }
        }
    });
}

let _lastEnemySpawn = 0;
let _enemies = [];

function update (time, delta) {
    if (_level) {
        _level.update(this, time, delta);
    }

    if (_level.paused)
        return;


    enemySpawner(this);
    for (let i = 0; i < _enemies.length; i++) {
        _enemies[i].update(this, time, delta);
    }


    if (_mouseDown && _curCat != null) {
        _curCat.powerBar.increasePower(2);
    }
}
