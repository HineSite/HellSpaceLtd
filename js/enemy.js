class Enemy
{
    static #ID = 0;

    constructor (context, asset, x, y, damage, speed, difficulty, isBoss, width) {
        this.id = Enemy.#ID++;
        this.context = context;
        this.asset = asset;
        this.dead = false;
        this.label = 'enemy_' + this.id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = (width ?? 100);
        this.height = 100;
        this.damage = damage;
        this.direction = 0;
        this.isBoss = isBoss;
        this.difficulty = difficulty;
        this.lasers = [];

        this.object = context.matter.add.image(x, y, asset, null, { isSensor: true, mass: 1, ignoreGravity: true, isStatic: false, label: this.label, width: this.width, height: this.height }).setInteractive();
        sizeBlock(this.object, this.width, this.height);

        this.health = new HealthBar(context, this.object, 100, 0x00cc00, 'top');
    }

    explode (context) {
        this.destroy();

        if (this.isBoss) {
            if (_level.level === 2) {
                _level2BossDestroyed = true;
            }
            else if (_level.level === 3) {
                _level3BossDestroyed = true;
            }
        }
    }

    hit () {
        this.health.decreaseHealth(this.damage);
    }

    shoot (context) {
        if (getRandomInt(0, 1000) > this.difficulty) {
            let laser = new Laser(context, this.id, 'laser1', this.object.x, this.object.y);
            this.lasers.push(laser);

            if (getRandomInt(0, 100) > 80) {
                laser.playSound();
            }
        }
    }

    update (context, time, delta) {
        if (this.dead) {
            return;
        }

        this.health.update(context, time, delta);

        for (let i = 0; i < this.lasers.length; i++) {
            this.lasers[i].update(context, time, delta);
        }

        if (this.object.x < -this.width) {
            this.object.setVelocity(this.speed, 0);
            this.direction = 1;
        }
        else if (this.object.x > (_canvasWidth + this.width)) {
            this.object.setVelocity(-this.speed, 0);
            this.direction = 0;
        }
        else {
            this.shoot(context);

            if (this.direction === 1) {
                this.object.setVelocity(this.speed, 0);
            }
            else {
                this.object.setVelocity(-this.speed, 0);
            }
        }
    }

    destroy () {
        this.dead = true;
        this.object.y = -8000;
        this.health.destroy();
        this.object = null;
    }
}