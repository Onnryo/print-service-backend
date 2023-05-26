module.exports = (sequelize, Sequelize) => {
    const Part = sequelize.define("part", {
        cost: {
            type: Sequelize.DECIMAL(10,2),
        },
        eta: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
        status_history: {
            type: Sequelize.STRING,
        },
    });

    return Part;
};
