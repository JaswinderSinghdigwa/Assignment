const Form = require('../models/form.model.js');

// Create and Save a new Form
// Create and Save a new Form
exports.create = (req, res) => {
    console.log("2222", req.body);
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "form content can not be empty"
        });
    }
    // Create a Form
    const form = new Form({
        heading: req.body.heading,
        description: req.body.description,
        completed: req.body.completed,
        comments: req.body.comment
    });

    // Save Form in the database
    form.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Form."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Form.find()
        .then(formdata => {
            res.send(formdata);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving form."
            });
        });
};

// Update a form identified by form in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Form.findByIdAndUpdate(req.params.formId, {
        heading: req.body.headong || "Untitled Note",
        description: req.body.description,
        completed: req.body.completed,
        comments: req.body.comments
    }, { new: true })
        .then(fromData => {
            if (!fromData) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.formId
                });
            }
            res.send(fromData);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.formId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.formId
            });
        });
};


// Delete a Form with the specified FormId in the request
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Form.findByIdAndRemove(req.params.formId)
        .then(form => {
            if (!form) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.formId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.formId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.formId
            });
        });
};
