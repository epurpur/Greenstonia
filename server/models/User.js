const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
});

// runs when new user is created. This is what hashes the password by adding saltRounds
// In cryptography, salt is random data that is used as an additional input to a one-way function
// that hashes data. Salts are used to safeguard passwords in storage
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
      console.log(this.password);
    }
  
    next();
  });

// this runs when user is logging in. 
// Compares the password stored in the database to the password passed into the function
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
  

const User = model('User', userSchema);
module.exports = User;