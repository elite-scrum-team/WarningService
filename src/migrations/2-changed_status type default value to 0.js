'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "type" on table "Statuses"
 * changeColumn "description" on table "Warnings"
 *
 **/

var info = {
    "revision": 2,
    "name": "changed status type default value to 0",
    "created": "2019-01-11T14:12:29.341Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Statuses",
            "type",
            {
                "type": Sequelize.INTEGER,
                "field": "type",
                "defaultValue": 0
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Warnings",
            "description",
            {
                "type": Sequelize.TEXT,
                "field": "description",
                "allowNull": false
            }
        ]
    }
];

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
