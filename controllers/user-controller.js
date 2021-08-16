const { User, Thought } = require('../models');
const { db } = require('../models/User');

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
  //Create new user
  createUser(req, res) {
    User.create(req.body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err))
  },
  //Update user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  //Delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  //Add friend
  addNewFriend(req, res) {
    //addToSet mongoose property
    User.create({ _id: req.params.id }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No friend with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  //Remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: req.params.friendId } })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
}

module.exports = userController;