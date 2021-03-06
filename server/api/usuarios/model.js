var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Mascota = require('../mascotas/model');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'vet'],
        default: 'user'
    },
    nombre: {
        type: String,
        required: true
    },
    telefono: Number,
    domicilio: String
}, {
    timestamps: true
});
 
UserSchema.virtual('mascotas', {
    ref: 'Mascota',
    localField: '_id',
    foreignField: 'dueno'
});

UserSchema.pre('save', function(next){
    var user = this;
    var SALT_FACTOR = 5;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.pre('remove', function(next) {
    Mascota.remove({dueno: this._id}).exec();
    next();
});
UserSchema.pre('findOneAndRemove', function(next) {
    Mascota.deleteMany({dueno: this._id}).exec();
    next();
});
UserSchema.methods.comparePassword = function(passwordAttempt, cb){
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
 
}
 
module.exports = mongoose.model('User', UserSchema);