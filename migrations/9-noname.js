'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "image" from table "Warnings"
 *
 **/

var info = {
    "revision": 9,
    "name": "noname",
    "created": "2019-01-10T14:34:42.111Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["Warnings", "image"]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
