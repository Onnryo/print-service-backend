module.exports = (app) => {
    const comments = require("../controllers/comment.controller.js");

    var router = require("express").Router();

    // Retrieve all Comments
    router.get("/", comments.findAll);
    // Create a new Comment
    router.post("/", comments.create);
    // Retrieve a single Comment with id
    router.get("/:id", comments.findOne);
    // Update a Comment with id
    router.put("/:id", comments.update);
    // Delete a Comment with id
    router.delete("/:id", comments.delete);

    app.use("/api/comments", router);
};