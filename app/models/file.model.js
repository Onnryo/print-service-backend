module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
        name: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
        },
    });

    return File;
};
