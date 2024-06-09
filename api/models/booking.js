const mongoose=require('mongoose');
const{Schema,model}=mongoose;

const BookingSchema=new Schema({
     place:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Place'},
     user:{type:mongoose.Schema.Types.ObjectId,required:true},
     checkIn:{type:Date,required:true},
     checkOut:{type:Date,required:true},
     name:{type:String,required:true},
     phone:{type:String,required:true},
     price:Number,
     NumberOfGuest:Number,


});

const BookingModel=model('Booking',BookingSchema);

module.exports=BookingModel;