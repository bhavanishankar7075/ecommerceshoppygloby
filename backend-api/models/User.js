const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema definition (MongoDB Integration 50 Marks)
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * @function pre('save')
 * @description Hash the user's password before saving it to the database.
 */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * @method matchPassword
 * @description Compare the entered password with the hashed password in the database.
 */
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
