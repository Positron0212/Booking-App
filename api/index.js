const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const user = require("./models/user");
const place = require("./models/place");
const booking = require("./models/booking");
const bcrypt = require("bcryptjs");
const imageDownloader = require("image-downloader");
const fs = require("fs");
const multer = require("multer");
const fileupload=require("express-fileupload");
const cloudinary=require("cloudinary").v2;

require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));


const salt = bcrypt.genSaltSync(10);
const secret =process.env.secret_key;

app.use(fileupload({
  useTempFiles:true
}))

cloudinary.config({ 
  cloud_name:process.env.cloud_name , 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

app.post("/register", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { name, email, password } = req.body;
  try {
    const userDocs = await user.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDocs);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { email, password } = req.body;
  const userDoc = await user.findOne({ email });
  const passok = bcrypt.compareSync(password, userDoc.password);

  if (passok) {
    jwt.sign(
      { email, id: userDoc._id, name: userDoc.name },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          email,
          name: userDoc.name,
        });
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token").json("ok");
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;

  const result = await cloudinary.uploader.upload(link);

  res.json(result.url);

  // const newname = "photo" + Date.now() + ".jpg";
  // await imageDownloader.image({
  //   url: link,
  //   dest: __dirname + "/uploads/" + newname,
  // });
  // res.json(newname);
});

//const photosMiddleware=multer({dest:'uploads/'});

app.post("/uploads", (req, res) => {
  const files = req.files.photos;

  const filesArray = Array.isArray(files) ? files : [files];

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.url);
        }
      });
    });
  };

  const uploadPromises = filesArray.map((file) => uploadFile(file));

  Promise.all(uploadPromises)
    .then((results) => {
      res.json(results); 
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to upload images", details: error });
    });
});

  
  // cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
  //   res.json(result.url);
  // })

  // let uploadedfiles = [];
  // for (const element of req.files) {
  //   const { originalname, path } = element;
  //   const parts = originalname.split(".");
  //   const ext = parts[parts.length - 1];
  //   const newpath = path + "." + ext;
  //   fs.renameSync(path, newpath);
  //   uploadedfiles.push(newpath.replace("uploads", ""));
  // }
  // res.json(uploadedfiles);


app.post("/places", (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, secret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await place.create({
      owner: user.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extrainfo: extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/places", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, user) => {
    if (err) throw err;
    const id = user.id;
    res.json(await place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { id } = req.params;
  const placeDocs = await place.findById(id);
  res.json(placeDocs);
});

app.put("/places", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, secret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await place.findById(id);
    if (user.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extrainfo: extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/allplaces", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  res.json(await place.find().populate("owner", ["name"]));
});

app.post("/booking", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, user) => {
    if (err) throw err;
    const id = user.id;
    const {
      place_id,
      checkIn,
      checkOut,
      NumberOfGuest,
      fullname,
      mobile,
      total_price,
    } = req.body;
    const doc = await booking.create({
      place: place_id,
      checkIn,
      checkOut,
      name: fullname,
      phone: mobile,
      price: total_price,
      user: id,
    });
    res.json(doc);
  });
});

app.get("/booking", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, user) => {
    if (err) throw err;
    const id = user.id;
    const bookingDoc = await booking
      .find({ user: id })
      .populate("place")
      .sort({ checkIn: -1 });
    res.json(bookingDoc);
  });
});

app.get("/deletebooking/:id", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { id } = req.params;

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, user) => {
    if (err) throw err;
    const user_id = user.id;
    await booking
      .findOneAndDelete({ user: user_id, _id: id })
      .populate("place");
    res.json("ok");
  });
});

app.post("/available", async (req, res) => {
  mongoose.connect(process.env.mongo_url);
  const { id, checkOut, checkIn } = req.body;
 

  const check = await booking.findOne({ place: id });
  if (!check) res.status(200).json(true);
  else {
    const bookingDocs = await booking.findOne({
      place: id,
      $or: [{ checkOut: { $lt: checkIn } }, { checkIn: { $gt: checkOut } }],
    });
    if (!bookingDocs) {
      res.status(200).json(false);
    } else {
      res.status(200).json(true);
    }
  }
});

app.get("/search/:query",async (req,res)=>{
  mongoose.connect(process.env.mongo_url);
const {query}=req.params;
const docs=await place.find({
  $or:[
    {address:{$regex:query,$options:"i"}},
    {title:{$regex:query,$options:"i"}}
  ]});

    res.json(docs); 
});


app.listen(4000, () => {
  console.log("server is running");
});


