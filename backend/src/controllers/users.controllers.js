const usersCtrl = {};
const User = require('../models/User')
usersCtrl.getUsers = (req, res) => res.json({ message: [] });
usersCtrl.createUsers = (req, res) => res.json({ message: 'Users create ' });
usersCtrl.deleteUsers = (req, res) => res.json({ message: 'Users deleted' });
module.exports = usersCtrl;