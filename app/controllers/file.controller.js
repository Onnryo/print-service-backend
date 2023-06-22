const db = require("../models");
const File = db.files;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require('path');

exports.uploadFile = (req, res) => {
    // Validate request
    if (!req.files || req.files.length === 0) {
      res.status(400).send({
        message: 'No file uploaded',
      });
      return;
    }
  
    // Process each file
    const promises = req.files.map((file) => {
      // Create a File
      const newFile = {
        name: file.originalname, // Use the original file name
        type: req.body.type,
        requestId: req.params.id,
        path: file.path, // Save the file path for later retrieval
      };
  
      // Save File in the database
      return File.create(newFile);
    });
  
    // Wait for all files to be saved in the database
    Promise.all(promises)
      .then((files) => {
        console.log('Files created:', files.map((file) => file.name));
        res.send('Files uploaded successfully');
      })
      .catch((err) => {
        console.error('Error creating files:', err);
        res.status(500).send({
          message: 'Failed to upload files',
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

// Download a single File with an id
exports.download = (req, res) => {
    const id = req.params.id;
  
    File.findByPk(id)
      .then((data) => {
        if (data) {
          const filePath = data.path; // Retrieve the file path from the file record
          const fileName = path.basename(filePath); // Extract the file name from the file path
  
          // Set the appropriate headers for file download
          res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
          res.setHeader('Content-Type', 'application/octet-stream');
          res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  
          // Create a read stream from the file path
          const fileStream = fs.createReadStream(filePath);
  
          // Pipe the file stream to the response stream
          fileStream.pipe(res);
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
