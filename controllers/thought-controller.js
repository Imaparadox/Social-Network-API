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
        Thought.findOneAndDelete({ _id: req.params.body })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
        // Thought.findOneAndDelete({ _id: params.id })
        // .then(dbThoughtData => {
        //     if (!dbThoughtData) {
        //         res.status(404).json({ message: 'No thought found with this id!' });
        //         return;
        //     }
        //     //Deletes within User model 
        //     User.findOneAndUpdate({ username: dbThoughtData.username }, { $pull: { thoughts: params.id } })
        //     .then(() => {
        //         res.json({ message: 'Successfully deleted thought!' });
        //     })
        //     .catch(err => res.status(500).json(err));
        // })
        // .catch(err => res.status(500).json(err));
    }
//Create reaction
    // createReaction(req, res) {
    //     Thoughts.
    // }
    //Delete reaction


};

module.exports = thoughtController;