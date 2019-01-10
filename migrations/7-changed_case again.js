'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "userId" from table "Comments"
 * removeColumn "userId" from table "Statuses"
 * removeColumn "locationId" from table "Warnings"
 * removeColumn "userId" from table "Warnings"
 * addColumn "UserId" to table "Comments"
 * addColumn "UserId" to table "Statuses"
 * addColumn "LocationId" to table "Warnings"
 * addColumn "UserId" to table "Warnings"
 *
 **/

var info = {
    "revision": 7,
    "name": "changed case again",
    "created": "2019-01-10T10:27:29.692Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Comments", "userId"]
    },
    {
        fn: "removeColumn",
        params: ["Statuses", "userId"]
    },
    {
        fn: "removeColumn",
        params: ["Warnings", "locationId"]
    },
    {
        fn: "removeColumn",
        params: ["Warnings", "userId"]
    },
    {
        fn: "addColumn",
        params: [
            "Comments",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Statuses",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Warnings",
            "LocationId",
            {
                "type": Sequelize.INTEGER,
                "field": "LocationId"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Warnings",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId"
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
