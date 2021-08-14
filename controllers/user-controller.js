const { User, Thought } = require('../models');

const userController = {
  //Get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json(err)
      });
  },
  //Get user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(500).json(err))
  }
}

module.exports = userController;