const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //Create this function?
        get: createdAtVal => dateFormatter(createdAtVal)
    },
    userName: {
        type: String,
        required: true
    },
    // Nested reactions in an array
    reactions: [ReactionSchema]
});


//Virtual for reaction count
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;