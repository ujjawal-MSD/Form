import axios from 'axios';

const generateTelegramMessage = formData => {
    // Create a formatted string for the target countries and currencies
    const targetCountriesTable = formData.provider.map(provider =>
        `| ${provider.name.padEnd(20)} | ${provider.currency.padEnd(10)} |`
    ).join('\n');

    // Format contact details with headings
    const clientEmails = formData.clientEmail.length > 0
        ? `*Emails:-*\n${formData.clientEmail.map(email => `             - ${email}`).join('\n')}`
        : '*Emails:-* None';

    const managerSkypes = formData.managerSkypeId.length > 0
        ? `*Manager Skype User IDs:-*\n${formData.managerSkypeId.map(id => `             - ${id}`).join('\n')}`
        : '*Manager Skype User IDs:-* None';

    const financeSkypes = formData.financeSkypeId.length > 0
        ? `*Finance Skype User IDs:-*\n${formData.financeSkypeId.map(id => `             - ${id}`).join('\n')}`
        : '*Finance Skype User IDs:-* None';

    const whatsappNumbers = formData.whatsappNo.length > 0
        ? `*WhatsApp Numbers:-*\n${formData.whatsappNo.map(no => `             - ${no}`).join('\n')}`
        : '*WhatsApp Numbers:-* None';

    const telegramIds = formData.telegramId.length > 0
        ? `*Telegram IDs:-*\n${formData.telegramId.map(id => `             - ${id}`).join('\n')}`
        : '*Telegram IDs:-* None';

    return `
*🌟 White Label New Client Details 🌟*

━━━━━━━━━━━━━━━━━━━━━
*Request ID:* ${formData.requestId}
*Date:* ${new Date(formData.submissionDateTime).toLocaleDateString()}
━━━━━━━━━━━━━━━━━━━━━

*🔹 General Information:*
- *Company Name:* ${formData.companyName}
- *Company URL:* ${formData.companyUrl}
- *Hosting Location:* ${formData.hostingLocation}
- *Wallet Type:* ${formData.walletType}

*Target Countries & Currencies:*
\`\`\`
| Country              | Currency   |
|----------------------|------------|
${targetCountriesTable}
\`\`\`
━━━━━━━━━━━━━━━━━━━━━

*🔹 Contact Details:*
${clientEmails}

${managerSkypes}

${financeSkypes}

${whatsappNumbers}

${telegramIds}
━━━━━━━━━━━━━━━━━━━━━

*🔹 Staging Information:*
- *Back Office IP Address:* ${formData.backOfficeIpAddress}
- *API IP Address:* ${formData.APIIpAddress}
- *Endpoint URL:* ${formData.stagingEndpointURL}
━━━━━━━━━━━━━━━━━━━━━

*🔹 Production Information:*
- *Back Office IP Address:* ${formData.prodBackOfficeIpAddress}
- *API IP Address:* ${formData.prodApiIpAddress}
- *Endpoint URL:* ${formData.prodEndpointURL}

━━━━━━━━━━━━━━━━━━━━━
*Thank you for choosing our services! If you have any questions, feel free to reach out to us.*
`;
};

const EmailSend = async formData => {
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
