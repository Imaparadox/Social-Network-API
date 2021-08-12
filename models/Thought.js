const { Schema, model } = require('mongoose');

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
    username: {
        type: String,
        required: true
    },
    // Nested reactions in an array
    reactions: [reactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought