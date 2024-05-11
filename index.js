const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); // Import the path module
const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');
const port = process.env.PORT || 9999;

const getHTML = require('./getHTML.js')

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Construct absolute path to 'index.html'
const indexPath = path.join(__dirname, 'index.html');



const sendEmail = asyncHandler(async (req, res) => {
  try {
    const { email, name } = req.body;

    console.log(email, name);
    // if(email==="musunza@qualityasoftwares.com" || email==="vincent@qualityasoftwares.com")

    const transporter = nodemailer.createTransport({
      host: 'sbg106.truehost.cloud',
      port: 465,
      secure: true,
      auth: {
        user: 'info@qualityasoftwares.com',
        pass: 'W8*3Zlv]xBs2R3'
      },
      tls: {
        rejectUnauthorized: false
      }
    });



    const mailOptions = {
      from: 'Vincent <vincent@qualityasoftwares.com>', // Sender name and email
      to: email,
      subject: 'Elevate Your Beauty Parlour with a Stunning Website!',
      html: `${getHTML(name)}` // Enhance email content as needed
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent');
      res.status(200).json(mailOptions);
      return `Email sent Successfully to ${email}`;
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', (req, res) => res.sendFile(indexPath));

app.post('/', sendEmail)

app.listen(port, () => console.log(`Server started on port ${port}`));
