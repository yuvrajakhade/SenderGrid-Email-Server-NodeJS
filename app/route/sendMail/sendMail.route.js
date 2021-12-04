var express = require('express');
var router = express.Router();
var multer = require('multer')
var sendMail = require('../../controller/sendMail/sendMail.controller')

router.post('/sendMail', sendMail.sendMail);

/**
 * This function are used for student photo upload
 * @author Yuvraj
 */
 const DIR = './docs';

 let storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, DIR);
   },
   filename: (req, file, cb) => {
     cb(null, file.originalname);
   }
 });
 
 let upload = multer({ storage: storage });
 
 router.post('/docs', upload.single('attachment'), 
   function (req, res) {
     if (!req.file) {
       console.log("No file received");
       return res.send({
         success: false
       });
     } else {
       console.log('file received');
       return res.send({
         success: true
       })
     }
   });

module.exports = router