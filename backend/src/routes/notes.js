const { Router } = require('express')
const { getNotes, createNotes, deleteNote, updateNote, getNote } = require('../controllers/notes.controllers')
const router = Router();
router.route('/')
    .get(getNotes)
    .post(createNotes)
router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote)
module.exports = router;