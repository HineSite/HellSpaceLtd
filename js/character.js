let _climbArr = [
    ['characterRed','characterRedIdle','characterRedFall'],
    ['characterGreen','characterGreenIdle','characterGreenFall'],
    ['characterPink','characterPinkIdle','characterPinkFall'],
    ['characterPurple','characterPurpleIdle','characterPurpleFall'],
    ['characterBuff','characterBuffIdle','characterBuffFall'],
    ['characterBoots','characterBootsIdle','characterBootsFall']
];

class Character
{
    static #ID = 0;

    constructor(context, assetIndex, label, x, y, ignoreGravity, isStatic, mass) {
        const charKey = _climbArr[getRandomInt(0, 5)];

        this.id = Character.#ID++;
        this.context = context;
        this.label = label + '_' + this.id;
        this.charKey = charKey;
        this.asset = charKey[assetIndex];
        this.spawnTime = Date.now();

        if (mass == null)
            mass = 1;

        if (!ignoreGravity)
            ignoreGravity = false;

        if (!isStatic)
            isStatic = false;

        this.object = context.matter.add.image(x, y, this.asset, null, { isSensor: true, mass: mass, ignoreGravity: ignoreGravity, isStatic: isStatic, label: this.label, width: _charW, height: _charH }).setInteractive();
        sizeBlock(this.object, _charW, _charH);
    }

    getCurrentTimestamp() {
        return Date.now()
    }

    despawn(cooldown) {
        if ((this.getCurrentTimestamp() - this.spawnTime) >= cooldown)
            this.object.x = -500;
    }

    updateTexture(context, assetIndex, label) {
        this.object.setTexture(this.charKey[assetIndex]);
        this.asset = this.charKey[assetIndex];
    }

    explode(context) {
        this.object.y = -8000;
    }
}
