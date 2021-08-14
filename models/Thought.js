const { Schema, model, Types } = require('mongoose');

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
    reactions: [ReactionSchema]
});

//ReactionSchema
const ReactionSchema = new Schema({
    reactionId: {
        types: Types.ObjectId,
        default: new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    // Create function for dateFormatter???
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormatter(createdAtVal)
    }
});

//Virtual for reaction count
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought