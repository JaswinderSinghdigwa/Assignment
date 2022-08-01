module.exports = (app) => {
    const form = require('../controller/form.controller.js');

    // Create a new Note
    app.post('/form',form.create);

    // Retrieve all Notes
    app.get('/getform', form.findAll);

    // Update a Note with noteId
    app.put('/update/:formId', form.update);

    // Delete a Note with noteId
    app.delete('/delete/:formId', form.delete);
}