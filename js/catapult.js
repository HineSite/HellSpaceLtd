class Catapult
{
    constructor (context, x, y)
    {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 80;
        this.object = spawnBlock(context, 'catapult_sent', 'catapult', x, y, this.width, this.height, true, true);
        this.object.setCollisionCategory(false);
        this.powerBar = new PowerBar(context, this.object, 0, 0xffffff, 'top');
    }
}
