module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("request", {
        title: {
            type: Sequelize.STRING,
        },
        body: {
            type: Sequelize.STRING,
        },
        link: {
            type: Sequelize.STRING,
        },
        estimated_cost: {
            type: Sequelize.DECIMAL(10,2),
        },
        total_cost: {
            type: Sequelize.DECIMAL(10,2),
        },
        estimated_time: {
            type: Sequelize.TIME,
        },
        total_time: {
            type: Sequelize.TIME,
        },
        status: {
            type: Sequelize.STRING,
        },
        status_history: {
            type: Sequelize.STRING,
        },
    });

    return Request;
};
