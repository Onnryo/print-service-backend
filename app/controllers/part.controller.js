const db = require("../models");
const Part = db.parts;
const Op = db.Sequelize.Op;

// Create and Save a new Part
exports.create = (req, res) => {
    // Validate request
    if (!req.body.requestId) {
        res.status(400).send({
            message: "requestId can not be empty!",
        });
        return;
    } else if (!req.body.fileId) {
        res.status(400).send({
            message: "fileId can not be empty!",
        });
        return;
    }

    const cost = 0.00;
    const eta = "00:00:00";
    const status = "Pending";
    const status_history = Date.now().toString() + " - Pending";
    

    // Create a Part
    const part = {
        requestId: req.body.requestId,
        fileId: req.body.fileId,
        batchId: req.body.batchId ? req.body.batchId : false,
        cost: req.body.cost ? req.body.cost : cost,
        eta: req.body.eta ? req.body.eta : eta,
        status: status,
        status_history: status_history,
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
};

// Retrieve all Parts from the database.
exports.findAll = (req, res) => {
    const status = req.query.status;
    var condition = status ? { status: { [Op.iLike]: `%${status}%` } } : null;

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
};

// Find a single Part with an id
exports.findOne = (req, res) => {
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
};

// Update a Part by the id in the request
exports.update = (req, res) => {
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
};

// Delete a Part with the specified id in the request
exports.delete = (req, res) => {
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
};
