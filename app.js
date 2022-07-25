const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const zmanRoutes = require('./routes/zmanim');
const adminRoutes = require('./routes/admin');
const { error } = require("console");

const fs = require('fs');




app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/views', express.static(`${process.cwd()}/views`));

app.use('/public', express.static(`${process.cwd()}/public`));

app.use('/files', express.static(`${process.cwd()}/files`));

app.use('/images', express.static(`${process.cwd()}/images`));

app.use('/db', express.static(`${process.cwd()}/db`));

app.use('/admin', adminRoutes);

app.use("/api/zmanim", zmanRoutes);

app.get('/', (req, res, next) => {
    res.redirect('/admin')
})

let IMG;

app.post('/admin/displayImg', (req, res, next) => {
    console.log(req.body);
    IMG = req.body;
    res.json(req.body)
})

app.get('/admin/getdisplayImg', (req, res, next) => {
    // console.log(req.body);
    res.json(IMG)
})

// ESSAI MULTER

const multer = require("multer");

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/pdf': 'pdf'
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'files1');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    }
  });


//   app.post("/admin/pdf1", multer({storage: storage}).array('files'), uploadFiles);

    function uploadFiles(req, res) {
        console.log(req.body);
        console.log(req.files);
        res.json({ message: "Successfully uploaded files" });
    }
















module.exports = app;