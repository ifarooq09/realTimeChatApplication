const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
}, {
    timestamps: true
})

// Pasword Hashin
userModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

userModel.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            userId: this._id,
            email: this.email,
        },
        process.env.JWT_KEY,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    );
    this.tokens = this.tokens.concat({ token })
    return token;
};

userModel.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

const User = mongoose.model('users', userModel)

module.exports = User;