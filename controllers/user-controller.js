const { User, Thought } =require('../models');

const userController = {
    //Get all users
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400).json(err)});
    },
    //Get user by id
    getUserById(req, res) {
        User.findOne({ _id: params.id })
        .populate({
          path: 'thought',
          select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    }
}