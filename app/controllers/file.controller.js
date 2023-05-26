const db = require("../models");
const File = db.files;
const Op = db.Sequelize.Op;

// Create and Save a new File
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "name can not be empty!",
        });
        return;
    } else if (!req.body.type) {
        res.status(400).send({
            message: "type can not be empty!",
        });
        return;
    } else if (!req.body.requestId) {
        res.status(400).send({
            message: "requestId can not be empty!",
        });
        return;
    }

    // Create a File
    const file = {
        name: req.body.name,
        type: req.body.type,
        requestId: req.body.requestId,
    };

    // Save File in the database
    File.create(file)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the File.",
            });
        });
};

// Retrieve all Files from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    File.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving files.",
            });
        });
};

// Find a single File with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    File.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find File with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving File with id=" + id,
            });
        });
};

// Update a File by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    File.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "File was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update File with id=${id}. Maybe File was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating File with id=" + id,
            });
        });
};

// Delete a File with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    File.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "File was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete File with id=${id}. Maybe File was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete File with id=" + id,
            });
        });
};

// Retrieve all Parts from File
exports.fetchParts = (req, res) => {
    return; /*
    File.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Files were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all files.",
            });
        });
    */
};
