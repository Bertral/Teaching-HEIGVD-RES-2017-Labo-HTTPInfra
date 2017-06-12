var Chance = require('chance');
var Express = require('express');
var express = Express();
var chance = new Chance();

express.get('/', function(req, res) {
    res.send(rollDie());
});

express.listen(3000, function() {
    console.log('App de lancer de dés sur port 3000');
});

function rollDie() {
    return {
        type: "d6",
        result: chance.natural({min: 1, max: 6})
    };
}
