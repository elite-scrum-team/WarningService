'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Warnings", deps: [SubCategories]
 *
 **/

var info = {
    "revision": 2,
    "name": "added Warning table",
    "created": "2019-01-09T12:38:15.938Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Warnings",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "image": {
                "type": Sequelize.STRING,
                "field": "image"
            },
            "description": {
                "type": Sequelize.TEXT,
                "field": "description"
            },
            "userID": {
                "type": Sequelize.INTEGER,
                "field": "userID"
            },
            "locationID": {
                "type": Sequelize.INTEGER,
                "field": "locationID"
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
            "SubCategoryId": {
                "type": Sequelize.INTEGER,
                "field": "SubCategoryId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "SubCategories",
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
