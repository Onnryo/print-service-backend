const db = require("../models");
const Request = db.requests;
const Op = db.Sequelize.Op;
const multer = require("multer");

// Set up multer middleware
const upload = multer().none();

// Create and Save a new Request
exports.create = (req, res) => {
    // Invoke the multer middleware
    upload(req, res, (err) => {
        if (err) {
            res.status(500).send({
                message: "Error occurred while processing form data.",
            });
            return;
        }

        // Access form data properties
        const { title, body, link, userId } = req.body;

        // Validate request
        if (!title || !body) {
            res.status(400).send({
                message: "title or body cannot be empty!",
            });
            return;
        } else if (!userId) {
            res.status(400).send({
                message: "userId cannot be empty!",
            });
            return;
        }

        // Create a Request
        const estimated_cost = 0.0;
        const total_cost = 0.0;
        const estimated_time = "00:00:00";
        const total_time = "00:00:00";
        const status = "Pending";
        const status_history = Date.now().toString() + " - Pending";

        const request = {
            title,
            body,
            link: link ? link : null,
            estimated_cost,
            total_cost,
            estimated_time,
            total_time,
            status,
            status_history,
            userId,
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
    });
};

// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
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
};

// Find a single Request with an id
exports.findOne = (req, res) => {
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
};

// Update a Request by the id in the request
exports.update = (req, res) => {
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
};

// Delete a Request with the specified id in the request
exports.delete = (req, res) => {
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
};

// Retrieve all Parts from Request.
exports.fetchParts = (req, res) => {
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

// Retrieve all Comments from Request.
exports.fetchComments = (req, res) => {
    const requestId = req.params.id;

    Request.findByPk(requestId, { include: "comments" })
        .then((data) => {
            if (data) {
                res.send(data.comments);
            } else {
                res.status(404).send({
                    message: `Cannot find Request with id=${requestId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    "Error retrieving Comments for Request with id=" +
                    requestId,
            });
        });
};

// Retrieve all Files from Request.
exports.fetchFiles = (req, res) => {
    const requestId = req.params.id;
  
    Request.findByPk(requestId, { include: "files" })
      .then((data) => {
        if (data) {
          res.send(data.files);
        } else {
          res.status(404).send({
            message: `Cannot find Request with id=${requestId}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Files for Request with id=" + requestId,
        });
      });
  };
