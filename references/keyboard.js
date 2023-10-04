function create () {
    this.input.keyboard.on('keydown-ENTER', function () {
        _curChar = spawnBlock(this, 'character', 'cur', 1, _canvasHeight, 50, 80);
    }, this);

    this.input.keyboard.on('keydown-A', function () {
        moveBlock(_curChar, -5);
    }, this);

    this.input.keyboard.on('keydown-W', function () {
        moveBlock(_curChar, null, -5);
    }, this);

    this.input.keyboard.on('keydown-S', function () {
        moveBlock(_curChar, null, 5);
    }, this);

    this.input.keyboard.on('keydown-D', function () {
        moveBlock(_curChar, 5);
    }, this);

    this.input.keyboard.on('keydown-SPACE', function () {
        _curChar = spawnBlock(this, 'character', 'cur', rightCatapult.x, rightCatapult.y, 50, 80);
        _curChar.setVelocity(-11, -20);
    }, this);
}


this.object.setOnCollide(pair => {
    // pair.bodyA
    // pair.bodyB
    console.log('collide');
});