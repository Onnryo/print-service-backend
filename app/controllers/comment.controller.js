const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
        res.status(400).send({
            message: "text can not be empty!",
        });
        return;
    } else if (!req.body.userId) {
        res.status(400).send({
            message: "userId can not be empty!",
        });
        return;
    } else if (!req.body.requestId) {
        res.status(400).send({
            message: "requestId can not be empty!",
        });
        return;
    }

    // Create a Comment
    const comment = {
        text: req.body.text,
        userId: req.body.userId,
        requestId: req.body.requestId,
    };

    // Save Comment in the database
    Comment.create(comment)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Comment.",
            });
        });
};

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
    const text = req.query.text;
    var condition = text ? { text: { [Op.iLike]: `%${text}%` } } : null;

    Comment.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving comments.",
            });
        });
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Comment with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Comment with id=" + id,
            });
        });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Comment was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Comment with id=" + id,
            });
        });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + id,
            });
        });
};
