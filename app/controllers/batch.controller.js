const db = require("../models");
const Batch = db.batches;
const Op = db.Sequelize.Op;

// Create and Save a new Batch
exports.create = (req, res) => {
    return; /*
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a Batch
    const batch = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };

    // Save Batch in the database
    Batch.create(batch)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Batch.",
            });
        });
    */
};

// Retrieve all Batches from the database.
exports.findAll = (req, res) => {
    return; /*
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Batch.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving batches.",
            });
        });
    */
};

// Find a single Batch with an id
exports.findOne = (req, res) => {
    return; /*
    const id = req.params.id;

    Batch.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Batch with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Batch with id=" + id,
            });
        });
    */
};

// Update a Batch by the id in the request
exports.update = (req, res) => {
    return; /*
    const id = req.params.id;

    Batch.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Batch was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Batch with id=${id}. Maybe Batch was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Batch with id=" + id,
            });
        });
    */
};

// Delete a Batch with the specified id in the request
exports.delete = (req, res) => {
    return; /*
    const id = req.params.id;

    Batch.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Batch was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Batch with id=${id}. Maybe Batch was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Batch with id=" + id,
            });
        });
    */
};

// Delete all Batches from the database.
exports.deleteAll = (req, res) => {
    return; /*
    Batch.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Batches were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all batches.",
            });
        });
    */
};

// Find all published Batches
exports.findAllPublished = (req, res) => {
    return; /*
    Batch.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving batches.",
            });
        });
    */
};
