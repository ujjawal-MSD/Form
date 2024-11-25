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

const generateEmailContent = formData => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Client Details</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
                body {
                    font-family: 'Roboto', sans-serif;
                    background-color: #f3f4f6;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 800px;
                    margin: 20px auto;
                    background-color: #dce0e6;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #6A5F5A;
                    color: white;
                    padding: 20px;
                }
                .header img {
                    height: 40px;
                }
                .header-text {
                    text-align: right;
                }
                .header-text h1 {
                    margin: 0;
                    font-size: 18px;
                }
                .header-text p {
                    margin: 5px 0;
                    font-size: 14px;
                }
                .section {
                    margin: 20px;
                    padding: 10px;
                    background-color: #f9fafb;
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                }
                .section-heading {
                    background-color: #908D89;
                    color: white;
                    font-weight: bold;
                    padding: 10px;
                    margin-bottom: 10px;
                }
                .section-content ul {
                    list-style: none;
                    padding: 0;
                }
                .section-content li {
                    margin-bottom: 8px;
                    font-size: 14px;
                }
                .highlight {
                    background-color: #e4dfd8;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-weight: bold;
                }
                .footer {
                    text-align: center;
                    font-size: 14px;
                    padding: 20px;
                    border-top: 1px solid #e4dfd8;
                    color: #666;
                }
                .footer a {
                    color: #6A5F5A;
                    text-decoration: none;
                    font-weight: bold;
                }
                .footer a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                  
                    <div class="header-text">
                        <h1>New Client Details</h1>
                        <p>Request ID: ${formData.requestId}</p>
                        <p>Date: ${new Date(
        formData.submissionDateTime
    ).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                
       <!-- General Information Section -->
           <div class="section">
           <div class="section-heading">General Information</div>
           <div class="section-content">
             <ul>
              <li><strong>Company Name:</strong> ${formData.companyName}</li>
              <li><strong>Company URL:</strong> ${formData.companyUrl}</li>
              <li><strong>Hosting Location:</strong> ${formData.hostingLocation
        }</li>
            <li><strong>Wallet Type:</strong> ${formData.walletType}</li>
            <li><strong>Target Country:</strong></li>
            <ul>
                ${formData.provider
            .map(
                p =>
                    `<li>${p.name} <span style="float: right;">Currency: <span class="highlight">${p.currency}</span></span></li>`
            )
            .join('')}
                 </ul>

    </div>
</div>
    
                <!-- Contact Details Section -->
                <div class="section">
                    <div class="section-heading">Contact Details</div>
                    <div class="section-content">
                        <ul>
                            <li><strong>Email Id:</strong> ${formData.clientEmail.join(
                ', '
            )}</li>
                            <li><strong>Manager Skype User Id:</strong> ${formData.managerSkypeId.join(
                ', '
            )}</li>
                            <li><strong>Finance Skype User ID:</strong> ${formData.financeSkypeId.join(
                ', '
            )}</li>
                            <li><strong>Whatsapp No.:</strong> ${formData.whatsappNo.join(
                ', '
            )}</li>
                            <li><strong>Telegram Id:</strong> ${formData.telegramId.join(
                ', '
            )}</li>
                        </ul>
                    </div>
                </div>
    
                <!-- Staging Information Section -->
                <div class="section">
                    <div class="section-heading">Staging Information</div>
                    <div class="section-content">
                        <ul>
                            <li><strong>Staging, Back Office IP Address:</strong> <span class="highlight">${formData.backOfficeIpAddress
        }</span></li>
                            <li><strong>Staging, API IP Address:</strong> <span class="highlight">${formData.APIIpAddress
        }</span></li>
                            <li><strong>Staging Endpoint URL:</strong> <span class="highlight">${formData.stagingEndpointURL
        }</span></li>
                        </ul>
                    </div>
                </div>
    
                <!-- Production Information Section -->
                <div class="section">
                    <div class="section-heading">Production Information</div>
                    <div class="section-content">
                        <ul>
                            <li><strong>Production, Back Office IP Address:</strong> <span class="highlight">${formData.prodBackOfficeIpAddress
        }</span></li>
                            <li><strong>Production, API IP Address:</strong> <span class="highlight">${formData.prodApiIpAddress
        }</span></li>
                            <li><strong>Production Endpoint URL:</strong> <span class="highlight">${formData.prodEndpointURL
        }</span></li>
                        </ul>
                    </div>
                </div>
  
                <!-- Footer -->
                <div class="footer">
                    <p>Thank you for choosing our services. For any queries, feel free to reach out to us.</p>
                    <p><a href="https://www.example.com">Visit Our Website</a> | <a href="mailto:support@example.com">Contact Support</a></p>
                </div>
            </div>
        </body>
        </html>
      `;
};

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
