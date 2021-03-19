const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

// User Schema	
const userSchema = new Schema(
	{
		email: { 
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true
		},
		password: {
			type: String,
			trim: true
		},
		name: { type: String, required: true},
		type: { type: String, required: true }
	},
	{ timestamps: true },
);

// Hook which runs before saving any document
userSchema.pre('save', async function (next) {
	const user = this
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
})

// Static method for finding user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    
    if(!user) {
		throw new Error('User not found')
	}

	// comparing user password against plain text password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Oops! Either Email or Password is incorrect.')
    }

    return user
}

const User = mongoose.model('users', userSchema)

module.exports = User