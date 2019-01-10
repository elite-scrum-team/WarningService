'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "MainCategories", deps: []
 * createTable "SubCategories", deps: [MainCategories]
 * createTable "Warnings", deps: [SubCategories]
 * createTable "Comments", deps: [Warnings]
 * createTable "Contracts", deps: [Warnings]
 * createTable "Images", deps: [Warnings]
 * createTable "Statuses", deps: [Warnings]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial migration",
    "created": "2019-01-10T15:14:32.915Z",
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
    },
    {
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
                "description": {
                    "type": Sequelize.TEXT,
                    "field": "description"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId"
                },
                "LocationId": {
                    "type": Sequelize.INTEGER,
                    "field": "LocationId"
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
    },
    {
        fn: "createTable",
        params: [
            "Comments",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "comment": {
                    "type": Sequelize.TEXT,
                    "field": "comment"
                },
                "image": {
                    "type": Sequelize.STRING,
                    "field": "image"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId"
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
    },
    {
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
                "GroupId": {
                    "type": Sequelize.INTEGER,
                    "field": "GroupId"
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
    },
    {
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
    },
    {
        fn: "createTable",
        params: [
            "Statuses",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title"
                },
                "description": {
                    "type": Sequelize.TEXT,
                    "field": "description"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId"
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
