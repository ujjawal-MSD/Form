import emailjs from 'emailjs-com';
import { toast } from 'react-hot-toast';
const generateEmailContent = async (formData) => {

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
                            <li><strong>Company Name:</strong> ${formData.companyName}</li>
                            <li><strong>Client Email:</strong> ${formData.clientEmail}</li>
                            <li><strong>Client Contact No:</strong> ${formData.clientContactNo}</li>
                            <li><strong>Category:</strong> ${formData.category}</li>
                            <li><strong>Description:</strong> ${formData.description}</li>
                            <li><strong>Target Counrty:</strong> ${formData.targetCountry}</li>
                            <li><strong>Target State:</strong> ${formData.targetState}</li>
                            <li><strong>Target City:</strong> ${formData.targetCity}</li>
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
                from_name: "Project Form New Client", // You can replace this with a dynamic value if needed
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