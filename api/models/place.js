const mongoose=require('mongoose');
const{Schema,model}=mongoose;

const PlaceSchema=new Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extrainfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
    price:Number,

});

const PlaceModel=model('Place',PlaceSchema);

module.exports=PlaceModel;