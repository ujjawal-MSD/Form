import emailjs from 'emailjs-com';
import { toast } from 'react-hot-toast';

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
                    padding: 1px 10px;
                    border-radius: 4px;
                    font-weight: bold;
                    float: right;
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
                        <img src="https://form-8xk.pages.dev/images/logo.png" alt="Logo" />
                    </div>
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
              <li><strong>Hosting Location:</strong> ${
		formData.hostingLocation
     }</li>
            <li><strong>Wallet Type:</strong> ${formData.walletType}</li>
            <li><strong>Target Country:</strong></li>
            <ul>
                ${formData.provider
		.map(p => `<li>${p.name} <span class="highlight">Currency: ${p.currency}</span></li>`)
		.join('')}
                 </ul>

    </div>
</div>
    
                <!-- Contact Details Section -->
                <div class="section">
                    <div class="section-heading">Contact Details</div>
                    <div class="section-content">
                        <ul>    

     ${formData.clientEmail
		.map(email => `<li><strong>Email Id:</strong>${email}</li>`)
		.join('')}
                                ${formData.managerSkypeId
		.map(id => `<li><strong >Manager Skype User Id:</strong>${id}</li>`)
		.join('')}
                                ${formData.financeSkypeId
		.map(id => `<li><strong >Finance Skype User ID:</strong>${id}</li>`)
		.join('')}
                                ${formData.whatsappNo
		.map(no => `<li><strong >WhatsApp No.:</strong>${no}</li>`)
		.join('')}
                                ${formData.telegramId
		.map(id => `<li><strong >Telegram Id:</strong>${id}</li>`)
		.join('')}
                        </ul>
                    </div>
                </div>
    
                <!-- Staging Information Section -->
                <div class="section">
                    <div class="section-heading">Staging Information</div>
                    <div class="section-content">
                        <ul>
                            <li><strong>Staging, Back Office IP Address:</strong> <span class="highlight">${
		formData.backOfficeIpAddress
 }</span></li>
                            <li><strong>Staging, API IP Address:</strong> <span class="highlight">${
		formData.APIIpAddress
 }</span></li>
                            <li><strong>Staging Endpoint URL:</strong> <span class="highlight">${
		formData.stagingEndpointURL
 }</span></li>
                        </ul>
                    </div>
                </div>
    
                <!-- Production Information Section -->
                <div class="section">
                    <div class="section-heading">Production Information</div>
                    <div class="section-content">
                        <ul>
                            <li><strong>Production, Back Office IP Address:</strong> <span class="highlight">${
		formData.prodBackOfficeIpAddress
 }</span></li>
                            <li><strong>Production, API IP Address:</strong> <span class="highlight">${
		formData.prodApiIpAddress
 }</span></li>
                            <li><strong>Production Endpoint URL:</strong> <span class="highlight">${
		formData.prodEndpointURL
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

const EmailSend = async formData => {
	try {
		const emailContent = generateEmailContent(formData);
		const response = await emailjs.send(
			import.meta.env.VITE_EMAILJS_SERVICE_ID,
			import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
			{
				from_name: 'White Label Stack', // You can replace this with a dynamic value if needed
				html_content: emailContent,
			},
			import.meta.env.VITE_EMAILJS_USER_ID
		);
		toast.success('Form Submitted Successfully!');
		return response;
	} catch (error) {
		toast.error('Error Form Submission');
		throw error;
	}
};

export default EmailSend;
