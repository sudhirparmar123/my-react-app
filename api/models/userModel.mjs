import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userModel = new Schema({
    fullName:{type:String,required: true},
    email:{type:String,required: true},
    password:{type:String,required: true},
    username:{type:String,required: true}
});

export default mongoose.model('users', userModel);
