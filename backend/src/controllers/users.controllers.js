const usersCtrl = {};
const User = require('../models/User')
usersCtrl.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};
usersCtrl.createUsers = async (req, res) => {
    try {
        const { userName, email } = req.body
        const newUser = new User({
            userName,
            email
        })
        const saveUser = await newUser.save();
        res.json({ data: saveUser, message: 'User Saved' });
    } catch (error) {
        console.log(error);
        res.send(error);
    }

};
usersCtrl.getUserID = async (req, res) => {
    try {
        const userID = await User.findById(req.params.id)
        res.json({ data: userID, message: 'User specific' })
    } catch (error) {
        res.json(error)
    }
};

usersCtrl.deleteUsers = async (req, res) => {
    try {
        const deleteUserID = await User.findByIdAndDelete(req.params.id)
        res.json({
            data: deleteUserID,
            message: 'Delete user'

        })
    } catch (error) {
        console.log(error)
    }
};
usersCtrl.updateUser = async (req, res) => {
    try {
        const { userName, email } = req.body;
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            userName,
            email
        })
        res.json({ afterData: updateUser, newData: { userName, email }, message: 'User update' })
    } catch (error) {

    }
}
module.exports = usersCtrl;