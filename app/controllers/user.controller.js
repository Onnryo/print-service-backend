const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate user
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "username, email, or password can not be empty!",
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role ? req.body.role : "USER",
        balance: 0.0,
    };

    // Save User in the database
    User.create(user)
        .then((data) => {
            delete data.password;
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the User.",
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    var uniqueUsername = username ? { username: { [Op.like]: `%${username}%` } } : null;
    var uniqueEmail = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    var condition = { ...uniqueEmail, ...uniqueUsername };
    User.findAll({ where: condition })
        .then((data) => {
            delete data.password
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then((data) => {
            if (data) {
                delete data.password;
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id,
            });
        });
};

// Update a User by the id in the user
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating User with id=" + id,
            });
        });
};

// Delete a User with the specified id in the user
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete User with id=" + id,
            });
        });
};

// Retrieve all Requests from User.
exports.fetchRequests = (req, res) => {
    return; /*
    User.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Users were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all users.",
            });
        });
    */
};
