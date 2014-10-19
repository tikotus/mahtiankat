
var keyFunctions = {
};

var keyConflict = false;

function _numKeysDown() {
    var count = 0;
    for (a in keyFunctions) {
        count+= game.input.keyboard.isDown(a) ? 1 : 0;
    }
    return count;
}

function keyhandler(key, acceleration, maxvalue) {
    var valueFunc = _keyValue(key, acceleration, maxvalue);
    if (keyFunctions[key]) {
        keyFunctions[key].push(valueFunc);
    } else {
        keyFunctions[key]=[valueFunc];
        game.input.keyboard.addKeyCapture(key);
    }
    return valueFunc;
}

function checkConcurrentKeys() {
    var keys = _numKeysDown();
    if (keys>1 || (keyConflict && keys>0)) {
        if (!keyConflict) {
            handsoffSound.play('', 0, 1, false);
        }
        keyConflict = true;
    } else {
        keyConflict = false;
    }
}

function _keyValue(key, acceleration, maxvalue) {
    var pressedTime = 0;
    var currentValue = 0;

    return function(elapsed) {
        if (keyConflict || !game.input.keyboard.isDown(key)) {
            pressedTime=0;
            currentValue=0;
            return 0;
        } else {
            pressedTime+=elapsed;
            currentValue=Math.min(pressedTime*acceleration, maxvalue);
            return currentValue*elapsed;
        }
    };
}
