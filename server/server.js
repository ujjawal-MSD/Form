const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const formData = req.body;

    // Setup transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASS,
        },
    });

    // Setup email data
    let mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIEVER_EMAIL,
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
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Client Details</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
            body {
                font-family: 'Roboto', sans-serif;
            }
            .font-serif {
                font-family: 'Roboto', sans-serif;
            }
        </style>
    </head>
    <body class="bg-gray-100 text-gray-800">
        <div class="max-w-4xl mx-auto mt-10 bg-white shadow-lg">
            <!-- Header -->
            <div class="flex items-center justify-between bg-[#6A5F5A] text-white px-5 py-4 h-28">
                <img src="./whitelabelw.png" alt="Demo Logo" class="h-10" />
                <div>
                    <h1 class="text-xl font-semibold">New Client Details</h1>
                    <p class="text-sm font-thin">Request ID: ${formData.requestId}</p>
                    <p class="text-xs font-thin">Date: ${new Date(formData.submissionDateTime).toLocaleDateString()}</p>
                </div>
            </div>
            <!-- Email Body -->
            <div class="p-5 space-y-6">
                <!-- General Information -->
                <div class="bg-gray-50 p-0 shadow">
                    <div class="bg-[#908D89] text-white">
                        <h2 class="text-lg font-semibold border-b pb-2 mb-0 p-2">General Information</h2>
                    </div>
                    <ul class="space-y-2 p-2">
                        <li><span class="font-serif font-bold text-lg">Company Name:</span> ${formData.companyName}</li>
                        <li><span class="font-serif font-bold text-lg">Company URL:</span> ${formData.companyUrl}</li>
                        <li><span class="font-serif font-bold text-lg">Hosting Location:</span> ${formData.hostingLocation}</li>
                        <li><span class="font-serif font-bold text-lg">Wallet Type:</span> ${formData.walletType}</li>
                        <li class="flex justify-between items-center">
                            <span><strong>Target Country:</strong> ${formData.provider.map(p => p.name).join(', ')}</span>
                            <span class="bg-[#e4dfd8] px-2 py-1 rounded"><strong>Currency:</strong> ${formData.provider.map(p => p.currency).join(', ')}</span>
                        </li>
                    </ul>
                </div>
                <!-- Contact Details -->
                <div class="bg-gray-50 p-0 shadow">
                    <div class="bg-[#908D89] text-white">
                        <h2 class="text-lg font-semibold border-b pb-2 mb-0 p-2">Contact Details</h2>
                    </div>
                    <ul class="space-y-2 p-2">
                        <li><span class="font-serif font-bold text-lg">Email Id:</span> ${formData.clientEmail.join(', ')}</li>
                        <li><span class="font-serif font-bold text-lg">Manager Skype User Id:</span> ${formData.managerSkypeId.join(', ')}</li>
                        <li><span class="font-serif font-bold text-lg">Finance Skype User ID:</span> ${formData.financeSkypeId.join(', ')}</li>
                        <li><span class="font-serif font-bold text-lg">Whatsapp No.:</span> ${formData.whatsappNo.join(', ')}</li>
                        <li><span class="font-serif font-bold text-lg">Telegram Id:</span> ${formData.telegramId.join(', ')}</li>
                    </ul>
                </div>
                <!-- Staging Info -->
                <div class="bg-gray-50 p-0 shadow">
                    <div class="bg-[#908D89] text-white">
                        <h2 class="text-lg font-semibold border-b pb-2 mb-0 p-2">Staging Information</h2>
                    </div>
                    <ul class="space-y-2 p-2">
                        <li class="flex justify-between items-center">
                            <span class="font-serif font-bold text-lg">Staging, Back Office IP Address:</span>
                            <span class="bg-[#e4dfd8] px-2 py-1 rounded"><strong>IP:</strong> ${formData.backOfficeIpAddress}</span>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="font-serif font-bold text-lg">Staging, API IP Address:</span>
                            <span class="bg-[#e4dfd8] px-2 py-1 rounded"><strong>IP:</strong> ${formData.APIIpAddress}</span>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="font-serif font-bold text-lg">Staging Endpoint URL:</span>
                            <span class="bg-[#e4dfd8] px-2 py-1 rounded"><strong>URL:</strong> ${formData.stagingEndpointURL}</span>
                        </li>
                    </ul>
                </div>
                <!-- Production Info -->
                <div class="bg-gray-50 p-0 shadow">
                    <div class="bg-[#908D89] text-white">
                        <h2 class="text-lg font-semibold border-b pb-2 mb-0 p-2">Production Information</h2>
                    </div>
                    <ul class="space-y-2 p-2">
                        <li class="flex justify-between items-center">
                            <span class="font-serif font-bold text-lg">Production, Back Office IP Address:</span>
                            <span class="bg-[#e4dfd8] px-2 py-1 rounded"><strong>IP:</strong> ${formData.prodBackOfficeIpAddress}</span>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="font-serif font-bold text-lg">Production, API IP Address:</span>
                            <span class="bg-[#e4dfd8] px-2 py-1 rounded"><strong>IP:</strong> ${formData.prodApiIpAddress}</span>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="font-serif font-bold text-lg">Production Endpoint URL:</span>
                            <span class="bg-[#e4dfd8] px-2 py-1 rounded"><strong>URL:</strong> ${formData.prodEndpointURL}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;




};

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})