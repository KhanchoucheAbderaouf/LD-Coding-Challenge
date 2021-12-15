const mongoose = require("mongoose");

const textSchema = mongoose.Schema({
    arabic: String,
    french: String,
    english: String,
    state: {
        type: String,
        enum: ['Draft', 'Submitted', 'Rejected', 'Approved'],
        required: true,
        default: "Draft"
    },
}, {
    timestamps: true
});

const Text = mongoose.model("text", textSchema);

module.exports = Text;