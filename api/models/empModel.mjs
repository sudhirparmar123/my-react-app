import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const empModel = new Schema({
    name:{type:String,required: true,mminlength:1},
    email:{type:String,required: true},
    status:{type:Boolean}
});

export default mongoose.model('employee', empModel);
