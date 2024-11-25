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

const generateEmailTemplate = (formData) => {
    const providersList = Array.isArray(formData.providers) ? formData.providers.map(provider => `<li>${provider}</li>`).join('') : '';

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
                        <p>Date: ${new Date(formData.submissionDateTime).toLocaleDateString()}</p>
                    </div>
                </div>
                
                <!-- General Information Section -->
                <div class="section">
                    <div class="section-heading">General Information</div>
                    <div class="section-content">
                        <ul>
                            <li><strong>Required Domain:</strong> ${formData.requiredDomain}</li>
                            <li><strong>WhatsApp Deposit No.:</strong> ${formData.whatsappDepositNo}</li>
                            <li><strong>WhatsApp Withdrawal No.:</strong> ${formData.whatsappWithdrawalNo}</li>
                            <li><strong>Telegram Group Id:</strong> ${formData.telegramGroupId}</li>
                            <li><strong>Instagram Id:</strong> ${formData.instaLink}</li>
                            <li><strong>Twitter Id:</strong> ${formData.xLink}</li>
                            <li><strong>Customer No.:</strong> ${formData.customerNo}</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Providers Section -->
                <div class="section">
                    <div class="section-heading">Providers</div>
                    <div class="section-content">
                        <ul>
                            ${providersList}
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
        html: generateEmailTemplate(formData),
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