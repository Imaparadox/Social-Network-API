const { Thought, User } = require('../models');

const thoughtController = {
    //Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .sort({ createdAt: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).json(err)
            });
    },

    //Post thought
    addThought(req, res) {
        console.log(req.body);
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: dbThoughtData._id } }, { new: true })
            })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'thought created but no user' });
                }
                res.json({ message: 'It worked!' })
            })
            .catch(err => res.status(500).json(err))
    },
    //delete route - only delete thought, not user. Delete thought from user


};

module.exports = thoughtController;