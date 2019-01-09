'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "MainCategories", deps: []
 * createTable "SubCategories", deps: [MainCategories]
 *
 **/

var info = {
    "revision": 1,
    "name": "inital migration",
    "created": "2019-01-09T12:08:54.316Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "MainCategories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "categoryName": {
                    "type": Sequelize.STRING,
                    "field": "categoryName"
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "SubCategories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "categoryName": {
                    "type": Sequelize.STRING,
                    "field": "categoryName"
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
                "MainCategoryId": {
                    "type": Sequelize.INTEGER,
                    "field": "MainCategoryId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "MainCategories",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
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
