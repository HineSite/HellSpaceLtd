class PowerBar
{
    constructor (context, object, power, color, position)
    {
        this.stroke = context.add.graphics();
        this.bar = context.add.graphics();
        this.power = power;
        this.color = color;
        this.position = position;
        this.x = (object.x - (object.width * .5) - 12);
        this.y = (object.y - 38);
        this.barY = (object.y + (object.height * .5)) - 4;
        this.barMax = (object.height - 8);

        this.width = 10;
        this.barWidth = (this.width - 2);
        this.height = (object.height - 4);

        this.stroke.lineStyle(0x000000);
        this.stroke.strokeRect(this.x, this.y, this.width, this.height);

        this.setPower(power);
    }

    increasePower(power) {
        this.setPower(this.power + power);
    }

    setPower(power) {
        if (power < 0 || power > 100) {
            power = 0;
        }

        this.power = power;
        let powerSize = ((this.barMax * .01) * power);

        this.bar.clear();
        this.bar.fillStyle(this.color);
        this.bar.fillRect(this.x + 1, this.barY, this.barWidth, - Math.min(powerSize, this.barMax));
    }
}