'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Images", deps: [Warnings]
 *
 **/

var info = {
    "revision": 8,
    "name": "noname",
    "created": "2019-01-10T11:57:47.985Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Images",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "url": {
                "type": Sequelize.STRING,
                "field": "url"
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
