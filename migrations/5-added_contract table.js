'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Contracts", deps: [Warnings]
 *
 **/

var info = {
    "revision": 5,
    "name": "added contract table",
    "created": "2019-01-09T12:52:17.445Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Contracts",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "description": {
                "type": Sequelize.TEXT,
                "field": "description"
            },
            "GroupID": {
                "type": Sequelize.INTEGER,
                "field": "GroupID"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "WarningId": {
                "type": Sequelize.INTEGER,
                "field": "WarningId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Warnings",
                    "key": "id"
                },
                "allowNull": true
            }
        },
        {}
    ]
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
