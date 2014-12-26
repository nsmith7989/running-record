
function padNum (num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports = function(scoreObj) {
    var percentIncorrect = ((scoreObj.incorrectPositions.length / scoreObj.currentWord) * 100);
    var percentageCorrect = (100 - percentIncorrect).toFixed(2);

    var secondsTotalSeconds = Math.round(scoreObj.timeElapsed / 1000);
    var minutes = (secondsTotalSeconds / 60) % 60;
    var seconds = (secondsTotalSeconds % 60);

    return {
        percentageCorrect: percentageCorrect,
        time: padNum(Math.floor(minutes), 2) + ':' + padNum(seconds, 2)

    }
};