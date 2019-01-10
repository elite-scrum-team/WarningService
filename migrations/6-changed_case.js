'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "userID" from table "Comments"
 * removeColumn "GroupID" from table "Contracts"
 * removeColumn "userID" from table "Statuses"
 * removeColumn "locationID" from table "Warnings"
 * removeColumn "userID" from table "Warnings"
 * addColumn "userId" to table "Comments"
 * addColumn "GroupId" to table "Contracts"
 * addColumn "userId" to table "Statuses"
 * addColumn "locationId" to table "Warnings"
 * addColumn "userId" to table "Warnings"
 *
 **/

var info = {
    "revision": 6,
    "name": "changed case",
    "created": "2019-01-10T10:20:40.244Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Comments", "userID"]
    },
    {
        fn: "removeColumn",
        params: ["Contracts", "GroupID"]
    },
    {
        fn: "removeColumn",
        params: ["Statuses", "userID"]
    },
    {
        fn: "removeColumn",
        params: ["Warnings", "locationID"]
    },
    {
        fn: "removeColumn",
        params: ["Warnings", "userID"]
    },
    {
        fn: "addColumn",
        params: [
            "Comments",
            "userId",
            {
                "type": Sequelize.INTEGER,
                "field": "userId"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Contracts",
            "GroupId",
            {
                "type": Sequelize.INTEGER,
                "field": "GroupId"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Statuses",
            "userId",
            {
                "type": Sequelize.INTEGER,
                "field": "userId"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Warnings",
            "locationId",
            {
                "type": Sequelize.INTEGER,
                "field": "locationId"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Warnings",
            "userId",
            {
                "type": Sequelize.INTEGER,
                "field": "userId"
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
