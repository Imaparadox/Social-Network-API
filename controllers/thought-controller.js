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
    //Get thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).json(err);
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
    //Update Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    //delete route - only delete thought, not user. Delete thought from user
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
    //Create reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(500).json(err))
    },
    //Delete reaction
    deleteReaction(req, res) {
        // to pull and remove a reaction by the reaction's reactionId value
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;