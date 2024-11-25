const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'trackerzpoint@gmail.com',
        pass: 'pjcekmmgzpjcisbh',
    }
});

app.post('/send-email', upload.fields([{ name: 'banner1' }, { name: 'banner2' }, { name: 'banner3' }, { name: 'logo' }]), (req, res) => {
    const formData = req.body;
    const files = req.files;

    const attachments = Object.keys(files).map(key => ({
        filename: files[key][0].originalname,
        content: files[key][0].buffer
    }));

    const mailOptions = {
        from: 'trackerzpoint@gmail.com',
        to: 'msdujjawal@gmail.com',
        subject: 'New Client Details',
        text: JSON.stringify(formData, null, 2),
        html: `<h1>New Client Details</h1><pre>${JSON.stringify(formData, null, 2)}</pre>`,
        attachments
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send email' });
        }
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});