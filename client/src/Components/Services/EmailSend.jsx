import axios from 'axios';

const generateTelegramMessage = (formData) => {
    return `
*🌟 Hyatt New Client Details 🌟*

━━━━━━━━━━━━━━━━━━━━━
*Request ID:* ${formData.requestId}
*Date:* ${new Date(formData.submissionDateTime).toLocaleDateString()}
━━━━━━━━━━━━━━━━━━━━━

*🔹 General Information*
- *Required Domain:* ${formData.requiredDomain}
- *WhatsApp Deposit No.:* ${formData.whatsappDepositNo}
- *WhatsApp Withdrawal No.:* ${formData.whatsappWithdrawalNo}
- *Telegram Group ID:* ${formData.telegramGroupId}
- *Instagram ID:* ${formData.instaLink}
- *Twitter ID:* ${formData.xLink}
- *Customer No.:* ${formData.customerNo}

━━━━━━━━━━━━━━━━━━━━━

* 💠 Sports Casino Providers:*
${formData.sportsCasinoProviders.length > 0 ? formData.sportsCasinoProviders.map(provider => `----- >  ${provider}`).join('\n') : '  - None'}
━━━━━━━━━━━━━━━━━━━━━

* 💠 Live Casino Providers:*
${formData.liveCasinoProviders.length > 0 ? formData.liveCasinoProviders.map(provider => `----- >  ${provider}`).join('\n') : '  - None'}
━━━━━━━━━━━━━━━━━━━━━

* 💠 Slot Game Providers:*
${formData.slotGameProviders.length > 0 ? formData.slotGameProviders.map(provider => `----- >  ${provider}`).join('\n') : '  - None'}
━━━━━━━━━━━━━━━━━━━━━

* 💠 Fantasy Game Providers:*
${formData.fantasyGameProviders.length > 0 ? formData.fantasyGameProviders.map(provider => `----- >  ${provider}`).join('\n') : '  - None'}
`;
};

const sendTelegramMessage = async (botToken, chatId, message) => {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        });
        return response;
    } catch (error) {
        console.error('Error sending message to Telegram', error);
        throw error;
    }
};

const sendTelegramPhoto = async (botToken, chatId, photo, caption) => {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', photo);
    formData.append('caption', caption);

    try {
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendPhoto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error('Error sending photo to Telegram', error);
        throw error;
    }
};

const EmailSend = async (formData) => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const message = generateTelegramMessage(formData);

    try {
        // Send the text message
        await sendTelegramMessage(botToken, chatId, message);

        // Send the images
        if (formData.banner1) {
            await sendTelegramPhoto(botToken, chatId, formData.banner1, 'Banner 1');
        }
        if (formData.banner2) {
            await sendTelegramPhoto(botToken, chatId, formData.banner2, 'Banner 2');
        }
        if (formData.banner3) {
            await sendTelegramPhoto(botToken, chatId, formData.banner3, 'Banner 3');
        }
        if (formData.logo) {
            await sendTelegramPhoto(botToken, chatId, formData.logo, 'Logo');
        }

        console.log('Form Submitted Successfully!');
    } catch (error) {
        console.error('Error Form Submission', error);
        throw error;
    }
};

export default EmailSend;
