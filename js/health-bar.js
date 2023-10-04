class HealthBar
{
    static #HEIGHT = 40;
    constructor (context, object, hp, color)
    {
        this.stroke = context.add.graphics();
        this.bar = context.add.graphics();
        this.object = object;
        this.hp = hp;
        this.color = color;
        this.x = (object.x - (object.width * .5) - 12);
        this.y = (object.y - 5);
        this.barY = (object.y + (HealthBar.#HEIGHT * .5)) + 9;
        this.barMax = (HealthBar.#HEIGHT - 8);

        this.width = 10;
        this.barWidth = (this.width - 2);
        this.height = (HealthBar.#HEIGHT - 4);

        this.stroke.lineStyle(0x000000);
        this.stroke.strokeRect(this.x, this.y, this.width, this.height);

        this.setHealth(hp);
    }

    update (context, time, delta) {
        this.x = (this.object.x - (this.object.width * .5) - 12);
        this.y = (this.object.y - 5);
        this.barY = (this.object.y + (HealthBar.#HEIGHT * .5)) + 9;


        this.stroke.clear();
        this.stroke.lineStyle(0x000000);
        this.stroke.strokeRect(this.x, this.y, this.width, this.height);

        this.setHealth(this.hp); // redraw
    }

    decreaseHealth (hp) {
        this.setHealth(this.hp - hp);
    }

    setHealth (hp) {
        if (hp <= 3) { // rounding errors
            hp = 0;
        }

        if (hp > 100) {
            hp = 100;
        }

        this.hp = hp;
        let hpSize = ((this.barMax * .01) * hp);

        this.bar.clear();
        this.bar.fillStyle(this.color);
        this.bar.fillRect(this.x + 1, this.barY, this.barWidth, - Math.min(hpSize, this.barMax));
    }

    destroy () {
        this.bar.clear();
        this.stroke.clear();
    }
}