const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.requests = require("./request.model.js")(sequelize, Sequelize);
db.parts = require("./part.model.js")(sequelize, Sequelize);
db.batches = require("./batch.model.js")(sequelize, Sequelize);
db.files = require("./file.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

// 1-n User -> Request
db.users.hasMany(db.requests, { as: "requests" });
db.requests.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});
// 1-n Request -> File
db.requests.hasMany(db.files, { as: "files" });
db.files.belongsTo(db.requests, {
    foreignKey: "requestId",
    as: "request",
});
// 1-n User -> Comment
db.users.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});
// 1-n Request -> Comment
db.requests.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.requests, {
    foreignKey: "requestId",
    as: "request",
});
// 1-n Request -> Part
db.requests.hasMany(db.parts, { as: "parts" });
db.parts.belongsTo(db.requests, {
    foreignKey: "requestId",
    as: "request",
});
// 1-n File -> Part
db.files.hasMany(db.parts, { as: "parts" });
db.parts.belongsTo(db.files, {
    foreignKey: "fileId",
    as: "file",
});
// 1-n Batch -> Part
db.batches.hasMany(db.parts, { as: "parts" });
db.parts.belongsTo(db.batches, {
    foreignKey: "batchId",
    as: "batch",
});

module.exports = db;
