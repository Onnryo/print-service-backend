const db = require("../models");
const Part = db.parts;
const Op = db.Sequelize.Op;

// Create and Save a new Part
exports.create = (req, res) => {
    return; /*
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a Part
    const part = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };

    // Save Part in the database
    Part.create(part)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Part.",
            });
        });
    */
};

// Retrieve all Parts from the database.
exports.findAll = (req, res) => {
    return; /*
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Part.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving parts.",
            });
        });
    */
};

// Find a single Part with an id
exports.findOne = (req, res) => {
    return; /*
    const id = req.params.id;

    Part.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Part with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Part with id=" + id,
            });
        });
    */
};

// Update a Part by the id in the request
exports.update = (req, res) => {
    return; /*
    const id = req.params.id;

    Part.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Part was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Part with id=${id}. Maybe Part was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Part with id=" + id,
            });
        });
    */
};

// Delete a Part with the specified id in the request
exports.delete = (req, res) => {
    return; /*
    const id = req.params.id;

    Part.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Part was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Part with id=${id}. Maybe Part was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Part with id=" + id,
            });
        });
    */
};

// Delete all Parts from the database.
exports.deleteAll = (req, res) => {
    return; /*
    Part.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Parts were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all parts.",
            });
        });
    */
};

// Find all published Parts
exports.findAllPublished = (req, res) => {
    return; /*
    Part.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving parts.",
            });
        });
    */
};
