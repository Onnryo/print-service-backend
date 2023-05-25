const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
    return; /*
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a Comment
    const comment = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
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
    */
};

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
    return; /*
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

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
    */
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
    return; /*
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
    */
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
    return; /*
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
    */
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
    return; /*
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
    */
};

// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
    return; /*
    Comment.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Comments were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all comments.",
            });
        });
    */
};

// Find all published Comments
exports.findAllPublished = (req, res) => {
    return; /*
    Comment.findAll({ where: { published: true } })
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
    */
};
