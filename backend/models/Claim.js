const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
    claimant: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    blockchainHash: {
        type: String,
        default: ""
    },

    policyId: {
        type: String,
        default: ""
    },

    claimType: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    iotDevice: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Claim", claimSchema);