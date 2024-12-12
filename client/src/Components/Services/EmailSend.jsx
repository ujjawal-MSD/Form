import axios from 'axios';

const generateTelegramMessage = (formData) => {
    return `
*🌟 Project Form New Client Details 🌟*

━━━━━━━━━━━━━━━━━━━━━
*Request ID:* ${formData.requestId}
*Date:* ${new Date(formData.submissionDateTime).toLocaleDateString()}

━━━━━━━━━━━━━━━━━━━━━
*🔹 General Information*
- *Company Name:- * ${formData.companyName}
- *Client Email:- * ${formData.clientEmail}
- *Client Contact No:- * ${formData.clientContactNo}
- *Category:- * ${formData.category}
- *Target Country:- * ${formData.targetCountry}
- *Target State:- * ${formData.targetState}
- *Target City:- * ${formData.targetCity}
- *Description:- * ${formData.description}
`;
};

const EmailSend = async (formData) => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const message = generateTelegramMessage(formData);

    try {
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        });
        console.log('Form Submitted Successfully!');
        return response;
    } catch (error) {
        console.error('Error Form Submission', error);
        throw error;
    }
};

export default EmailSend;