module.exports = (sequelize, Sequelize) => {
    const Batch = sequelize.define("batch", {
        cost: {
            type: Sequelize.DECIMAL(10,2),
        },
        eta: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
    });

    return Batch;
};
