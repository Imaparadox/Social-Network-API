const { Schema, Types } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    userName: {
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

module.exports = ReactionSchema;