class Laser
{
    static #ID = 0;

    constructor (context, enemyId, asset, x, y, speed) {
        this.id = Laser.#ID++;
        this.context = context;
        this.asset = asset;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.label = 'laser1_' + enemyId + '_' + this.id;
        this.width = 3;
        this.height = 3;
        this.dead = false;
        this.sounds = [
            context.sound.add("laser1"),
            context.sound.add("laser2")
        ];

        this.object = context.matter.add.image(x, y, asset, null, { isSensor: true, mass: 1, ignoreGravity: true, isStatic: false, label: this.label, width: this.width, height: this.height }).setInteractive();
        sizeBlock(this.object, this.width, this.height);

        this.object.setVelocity(0, 8);
    }

    playSound() {
        this.sounds[getRandomInt(0, 1)].play({volume: 0.25});
    }

    update (context, time, delta) {
        if (this.dead) {
            return;
        }
    }

    destroy () {
        this.dead = true;
        this.object.y = -8000;
        this.object = null;
    }
}