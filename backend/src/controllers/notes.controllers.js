const notesCtrl = {};
const Note = require('../models/Note')
// consultar todas las notas
notesCtrl.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
};
// creacion de nota
notesCtrl.createNotes = async (req, res) => {
    try {
        const { title, content, date, author } = req.body;
        const newNote = new Note({
            title,
            content,
            date,
            author
        });
        const savedNote = await newNote.save();
        res.json({ data: savedNote, message: 'Note Saved' });
    } catch (error) {
        res.json(error);
    }
}
// consultamos la base de datos con un id
notesCtrl.getNote = async (req, res) => {
    try {
        const noteID = await Note.findById(req.params.id);
        res.json({ data: noteID, message: 'Note specific' })
    } catch (error) {
        console.log(error)
        res.json(error)
    }

};
// Eliminar una nota por su Id
notesCtrl.deleteNote = async (req, res) => {
    try {
        const deleteNoteID = await Note.findByIdAndDelete(req.params.id)
        res.json({ data: deleteNoteID, message: 'Note delete ' });
    } catch (error) {
        res.json(error)
    }
}
notesCtrl.updateNote = async (req, res) => {
    try {
        const { title, content, author } = req.body
        const updateNote = await Note.findByIdAndUpdate(req.params.id, {
            title,
            content,
            author
        })
        res.json({ afterData: updateNote, newData: { title, content, author }, message: 'Note update' })
    } catch (error) {
        res.json(error)
    }

};
module.exports = notesCtrl;