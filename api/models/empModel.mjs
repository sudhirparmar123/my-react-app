import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const empModel = new Schema({
    name:{type:String,required: true,mminlength:1},
    email:{type:String,required: true},
    age:{type:Number,required: true},
    title:{type:String,required: true},
    department:{type:String,required: true},
    gender:{type:Number,required: true},
    status:{type:Boolean}
});

export default mongoose.model('employee', empModel);
