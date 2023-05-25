const db = require("../models");
const Request = db.requests;
const Op = db.Sequelize.Op;

// Create and Save a new Request
exports.create = (req, res) => {
    return; /*
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a Request
    const request = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };

    // Save Request in the database
    Request.create(request)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Request.",
            });
        });
    */
};

// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
    return; /*
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Request.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving requests.",
            });
        });
    */
};

// Find a single Request with an id
exports.findOne = (req, res) => {
    return; /*
    const id = req.params.id;

    Request.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Request with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Request with id=" + id,
            });
        });
    */
};

// Update a Request by the id in the request
exports.update = (req, res) => {
    return; /*
    const id = req.params.id;

    Request.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Request was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Request with id=${id}. Maybe Request was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Request with id=" + id,
            });
        });
    */
};

// Delete a Request with the specified id in the request
exports.delete = (req, res) => {
    return; /*
    const id = req.params.id;

    Request.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Request was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Request with id=${id}. Maybe Request was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Request with id=" + id,
            });
        });
    */
};

// Delete all Requests from the database.
exports.deleteAll = (req, res) => {
    return; /*
    Request.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Requests were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all requests.",
            });
        });
    */
};

// Find all published Requests
exports.findAllPublished = (req, res) => {
    return; /*
    Request.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving requests.",
            });
        });
    */
};
