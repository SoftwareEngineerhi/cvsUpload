/** ------------------ IMPORTING MONGOOSE ------------------ **/
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String
  },
  filePath : {
    type:String
  },
  file: {
    type: String
  }
}, {
  timestamps: {
    options: { timeZone: 'Asia/Kolkata' }
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..', CSV_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

//static functions
csvSchema.statics.uploadedCSV = multer({storage: storage, limits:{fileSize: 1 * 1024 * 1024}}).single('csv');
csvSchema.statics.csvPath = CSV_PATH;


/** ------------------ MAKING MODEL ------------------ **/
const files = mongoose.model("files", fileSchema);

/** ------------------ EXPORTING MODEL ------------------ **/
module.exports = files;
