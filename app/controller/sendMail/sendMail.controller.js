const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
const fs = require("fs");
var path = require('path');
/**
 * function to Send mail with docs
 * @param {object} req 
 * @param {string} res 
 * @author Yuvraj
 */
function sendMail(req, res) {
    var file = req.body.filename;
    const msg = {
        to: [req.body.email, 'swarajfacilities4@gmail.com'],
        from: 'swarajfacilities4@gmail.com',
        subject: 'New Enquiry-' + req.body.contact,
        text: req.body.message,
    };
    if (file) {
        var fileLocation = path.join('./docs', file);
        if (fileLocation) {
            attachment = fs.readFileSync(fileLocation).toString("base64");
            msg['attachments'] = [{
                content: attachment,
                filename: file,
                type: "application/pdf",
                disposition: "attachment"
            }]
        }
    }
    sgMail.sendMultiple(msg).then((response) => {
            if (file) {
                var filePath = path.join('./docs', file);
                fs.unlinkSync(filePath);
            }
            if (response[0].statusCode == 403) {
                return res.json({
                    error: true
                })
            } else {
                return res.json({
                    error: false
                })
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports = {
    sendMail: sendMail
}