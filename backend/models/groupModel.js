const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true
    }],
    admin: [{
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true
    }],
    messages: [{
        type: mongoose.Schema.ObjectId,
        ref: "messages",
        required: false
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

groupSchema.pre("save", function(next){
    this.updatedAt = date.now();
    next()
})

groupSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: Date.now() })
    next()
})

const Group = mongoose.model("groups", groupSchema)

module.exports = Group