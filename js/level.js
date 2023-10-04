class Level
{
    constructor (context)
    {
        this.paused = false;
        this.panning = false;
        this.level = 1;
        this.oldLine = null; //hacks
        this.line = null;
        this.top = 0;
        this.bottom = 0;
        this.midPoint = 0;
        this.context = context;
        this.gameOver = false;
        this.gameWon = false;
        this.levelSound = null;

        this.calculatePoints();
    }

    pointsAtLevel (level) {
        let frame = (_canvasHeight - 150);
        let frameTravel = (frame * (level - 1));
        return {
            midPoint: (_canvasCenterY - frameTravel),
            top: (0 - frameTravel),
            bottom: (_canvasHeight - frameTravel),
        }
    }

    calculatePoints() {
        let points = this.pointsAtLevel(this.level);
        this.midPoint = points.midPoint;
        this.top = points.top;
        this.bottom =  points.bottom;

        console.log('bot: ' + this.bottom + ' | mid: ' + this.midPoint + ' | top: ' + this.top);
    }

    next (context) {
        this.level++;
        this.paused = true;

        if (this.level < 4) {
            this.panning = true;
        }

        _lastEnemySpawn = Date.now();

        this.calculatePoints();
        this.oldLine = this.line;
        this.spawnLine(context);

        _curCat = new Catapult(context, _canvasWidth - 120, this.bottom);


        for (let i = 0; i < _enemies.length; i++) {
            _enemies[i].destroy();
        }
    }

    spawnLine (context) {
        this.line = context.matter.add.image((_canvasWidth * .5), this.top + 50, 'level_line', null, { isSensor: true, isStatic: true, label: 'level_line', width: _canvasWidth });
    }

    update (context, time, delta) {
        if (this.panning && context.cameras.main.midPoint.y > this.midPoint) {
            let midPoint = context.cameras.main.midPoint.y - 10;
            if (midPoint <= this.midPoint) {
                midPoint = this.midPoint;
                this.panning = false;
                this.paused = false;
            }

            this.oldLine.setAlpha(this.oldLine.alpha - 10);
            context.cameras.main.centerOn(_canvasWidth * .5, midPoint);
        }

        if(getRandomInt(0, 1500) > 1499) {
            this.levelSound.play({volume: 1});
        }
    }
}
