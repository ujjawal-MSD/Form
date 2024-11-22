const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const formData = req.body;

    // Setup transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'trackerzpoint@gmail.com',
            pass: 'pjcekmmgzpjcisbh',
        },
    });

    // Setup email data
    let mailOptions = {
        from: 'trackerzpoint@gmail.com',
        to: 'msdujjawal@gmail.com',
        subject: 'New Client Details',
        text: JSON.stringify(formData, null, 2),
        html: generateEmailContent(formData),
    };

    // Send mail with defined transport object
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: %s', error);
        res.status(500).send('Error sending email');
    }
});

const generateEmailContent = (formData) => {
    // Generate HTML content based on formData
    return `<h1>New Client Details</h1><pre>${JSON.stringify(formData, null, 2)}</pre>`;
};

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})