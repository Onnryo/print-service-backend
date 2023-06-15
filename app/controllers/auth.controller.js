const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
require("dotenv").config();

// Create and Save a new Request
exports.register = (req, res) => {
    // Validate user
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "username, email, or password can not be empty!",
        });
        return;
    }

    // Check for duplicate usernames
    const username = req.body.username;
    const email = req.body.email;
    var uniqueUsername = username
        ? { username: { [Op.like]: `%${username}%` } }
        : null;
    var uniqueEmail = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    var condition = { ...uniqueEmail, ...uniqueUsername };
    User.findAll({ where: condition })
        .then(async (data) => {
            //delete data.password
            if (!data.length) {
                // Hash Password
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                // Create a User
                const user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    role: "USER",
                    balance: 0.0,
                    refresh_token: null,
                };

                // Save User in the database
                User.create(user)
                    .then((data) => {
                        delete data.password;
                        res.send(data);
                        return;
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while creating the User.",
                        });
                        return;
                    });
            } else {
                res.status(400).send({
                    message: "username and email must be unique.",
                });
                return;
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
            });
            return;
        });
};

// Retrieve all Requests from the database.
exports.login = (req, res) => {
    // Validate user
    if ((!req.body.username && !req.body.email) || !req.body.password) {
        res.status(400).send({
            message: "username/email and password can not be empty!",
        });
        return;
    }

    // Check for duplicate usernames
    const username = req.body.username;
    const email = req.body.email;
    var uniqueUsername = username
        ? { username: { [Op.like]: `%${username}%` } }
        : null;
    var uniqueEmail = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    var condition = { ...uniqueEmail, ...uniqueUsername };
    User.findAll({ where: condition })
        .then(async (data) => {
            if (!data.length || data.length != 1) {
                res.status(401).send({
                    message: "invalid login",
                });
                return;
            }
            // Evaluate Password
            const match = await bcrypt.compare(
                req.body.password,
                data[0].password
            );
            if (!match) {
                res.status(401).send({
                    message: "invalid login",
                });
                return;
            }

            // Create JWTs
            const accessToken = jwt.sign(
                {
                    id: data[0].id,
                    username: data[0].username,
                    role: data[0].role,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "5m" }
            );
            const refreshToken = jwt.sign(
                {
                    id: data[0].id,
                    username: data[0].username,
                    role: data[0].role,
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            // Store Users Refresh Token
            const id = data[0].id;
            User.update(
                { refresh_token: refreshToken },
                {
                    where: { id: id },
                }
            )
                .then((num) => {
                    if (num == 1) {
                        res.cookie("jwt", refreshToken, {
                            httpOnly: true,
                            sameSite: "None",
                            secure: true,
                            //secure: true,
                            maxAge: 24 * 60 * 60 * 1000,
                        });
                        const payload = {
                            accessToken,
                        };
                        res.status(200).send(payload);
                        return;
                    } else {
                        res.send({
                            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                        });
                        return;
                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Error updating User with id=" + id,
                    });
                    return;
                });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
                stacktrace: err.stack || null,
            });
            return;
        });
};

exports.refreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    var condition = { refresh_token: { [Op.iLike]: `%${refreshToken}%` } };
    User.findAll({ where: condition })
        .then((data) => {
            if (!data.length || data.length != 1) {
                return res.sendStatus(403);
            }
            delete data[0].password;
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err || data[0].username !== decoded.username)
                        return res.sendStatus(403);
                    const accessToken = jwt.sign(
                        {
                            id: data[0].id,
                            username: data[0].username,
                            role: data[0].role,
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "5m" }
                    );
                    const payload = { accessToken };
                    res.status(200).send(payload);
                }
            );
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
            });
        });
};

exports.logout = (req, res) => {
    // On frontend, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No Content
    const refreshToken = cookies.jwt;

    var condition = { refresh_token: { [Op.iLike]: `%${refreshToken}%` } };
    User.findAll({ where: condition })
        .then((data) => {
            if (!data.length || data.length != 1) {
                res.clearCookie("jwt", {
                    httpOnly: true,
                    sameSite: "None",
                    //secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                return res.sendStatus(204); //No Content
            }
            delete data[0].password;

            // Delete refreshToken in db
            User.update(
                { refresh_token: null },
                {
                    where: { id: data[0].id },
                }
            )
                .then((num) => {
                    if (num == 1) {
                        res.clearCookie("jwt", {
                            httpOnly: true,
                            sameSite: "None",
                            //secure: true,
                            maxAge: 24 * 60 * 60 * 1000,
                        });
                        res.sendStatus(204); // No Content
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
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
            });
        });
};

// Find a single Request with an id
exports.resetPassword = (req, res) => {
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
