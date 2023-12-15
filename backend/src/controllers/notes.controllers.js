const notesCtrl = {};
const Note = require('../models/Note')
notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes)
};
notesCtrl.createNotes = (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new Note({
        title: title,
        content: content,
        date: date,
        author: author
    })
    // es necesario tener el note.save, debido a que se necesita para guardarlo en la base remota
    newNote.save()
        .then((data) => res.json({ data, message: 'Note Saved' }))
        .catch((error) => res.json(error))

}
notesCtrl.getNote = (req, res) => res.json({ title: 'Note specific' });
notesCtrl.updateNote = (req, res) => res.json({ message: 'Note update' });
notesCtrl.deleteNote = (req, res) => res.json({ message: 'Note delete ' });
module.exports = notesCtrl;