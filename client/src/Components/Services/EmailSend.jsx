import emailjs from 'emailjs-com';
import { toast } from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

const compressImage = async (file) => {
    const options = {
        maxSizeMB: 0.03, // Maximum size in MB (30 KB = 0.03 MB)
        maxWidthOrHeight: 800, // Adjust based on required dimensions
        useWebWorker: true,
        maxIteration: 10, // Increase iterations for finer compression
        initialQuality: 0.7, // Start with lower quality to meet the size constraint
    };
    try {
        let compressedFile = await imageCompression(file, options);

        // Validate the size after compression
        while (compressedFile.size > 30 * 1024) { // Size in bytes
            // Reduce quality further if the size is still too large
            options.initialQuality -= 0.1;
            if (options.initialQuality < 0.1) break; // Prevent going below minimum quality
            compressedFile = await imageCompression(file, options);
        }

        const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
        return base64;
    } catch (error) {
        console.error('Error compressing image:', error);
        throw error;
    }
};


const generateEmailContent = async (formData) => {
    const sportsCasinoProvidersList = Array.isArray(formData.sportsCasinoProviders) ? formData.sportsCasinoProviders.map(provider => `<li>${provider}</li>`).join('') : '';
    const liveCasinoProvidersList = Array.isArray(formData.liveCasinoProviders) ? formData.liveCasinoProviders.map(provider => `<li>${provider}</li>`).join('') : '';
    const slotGameProvidersList = Array.isArray(formData.slotGameProviders) ? formData.slotGameProviders.map(provider => `<li>${provider}</li>`).join('') : '';
    const fantasyGameProvidersList = Array.isArray(formData.fantasyGameProviders) ? formData.fantasyGameProviders.map(provider => `<li>${provider}</li>`).join('') : '';

    const banner1Base64 = await compressImage(formData.banner1);
    const banner2Base64 = await compressImage(formData.banner2);
    const banner3Base64 = await compressImage(formData.banner3);
    const logoBase64 = await compressImage(formData.logo);

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
                .header-left {
                    display: flex;
                    align-items: center;
                }
                .header-text {
                    text-align: right;
                    margin-left: auto;
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
                    <div class="header-left">
                        <img src="#" alt="Logo" />
                    </div>
                    <div class="header-text">
                        <h1>Hyatt New Client Details</h1>
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
                    <div class="section-heading">Sports Game Providers</div>
                    <div class="section-content">
                        <ul>
                            ${sportsCasinoProvidersList}
                        </ul>
                    </div>
                </div>

                <!-- Providers Section -->
                <div class="section">
                    <div class="section-heading">Live Casino Providers</div>
                    <div class="section-content">
                        <ul>
                            ${liveCasinoProvidersList}
                        </ul>
                    </div>
                </div>

                <!-- Providers Section -->
                <div class="section">
                    <div class="section-heading">Slot Game Providers</div>
                    <div class="section-content">
                        <ul>
                            ${slotGameProvidersList}
                        </ul>
                    </div>
                </div>

                <!-- Providers Section -->
                <div class="section">
                    <div class="section-heading">Fantasy Game Providers</div>
                    <div class="section-content">
                        <ul>
                            ${fantasyGameProvidersList}
                        </ul>
                    </div>
                </div>

              <div class="section">
                    <div class="section-heading">Banners</div>
                    <div class="section-content">
                        <ul>
                            <li><strong>Banner 1:</strong> ${banner1Base64}</li>
                            <li><strong>Banner 2:</strong> ${banner2Base64}</li>
                            <li><strong>Banner 3:</strong> ${banner3Base64}</li>
                            <li><strong>logo: </strong> ${logoBase64}</li>
                        </ul>
                    </div>
                </div>
                                
                <!-- Footer -->
                <div class="footer">
                    <p>Thank you for choosing our services. For any queries, feel free to reach out to us.</p>
                    <p><a href="#">Visit Our Website</a> | <a href="mailto:">Contact Support</a></p>
                </div>
            </div>
        </body>
        </html>
    `;
};


// Ensure the email must not exceed the limit of 50kb 
const EmailSend = async (formData) => {
    try {
        const emailContent = await generateEmailContent(formData);
        const response = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                from_name: "Hyatt New Client", // You can replace this with a dynamic value if needed
                html_content: emailContent,
            },
            import.meta.env.VITE_EMAILJS_USER_ID
        );
        toast.success('Form Submitted Successfully!');
        return response;
    } catch (error) {
        toast.error('Error Form Submission');
        console.log("Error sending email", error.message)
        throw error;
    }
};

export default EmailSend;