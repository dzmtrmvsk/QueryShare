import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

const User = models.User || model('User', UserSchema);

export default User;
