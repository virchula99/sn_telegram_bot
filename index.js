const modules = require('./modules');
const CONSTANTS = modules.CONSTANTS;
const axios = modules.axios;
const util = modules.util;
const TelegramAPI = modules.telegam_api;
const dotenv = modules.dotenv;
const sn_telegram_bot = new TelegramAPI(process.env.BOT_TOKEN, {polling:true});
sn_telegram_bot.on('message', user_message=>{
    if(user_message.text === '/create_incident'){
        create_incident(user_message);
    }
    else if(user_message.text === '/start'){
        start(user_message);
    }
})

const start = (user_message)=>{
    const message = util.format(CONSTANTS.BOT_DESCRIPTION, user_message.from.first_name);
    sn_telegram_bot.sendMessage(user_message.chat.id, message);
}
const create_incident = async (user_message)=>{
    sn_telegram_bot.sendMessage(user_message.chat.id, CONSTANTS.WRITE_SHORT_DESC_TEXT);
    sn_telegram_bot.on('message', async repliedMessage=>{
        if(CONSTANTS.REGEXP_CHECK_FOR_ENGLISH.test(repliedMessage.text)){
            CONSTANTS.CREATE_INCIDENT_HTTP_DETAILS.headers.Message = util.format(CONSTANTS.CREATE_INCIDENT_HTTP_DETAILS.headers.Message, repliedMessage.text);
            axios.request(CONSTANTS.CREATE_INCIDENT_HTTP_DETAILS)
            .then((response) => {
                const incident_url = JSON.stringify(response.data.result.current_url);
                const incident_number = JSON.stringify(response.data.result.incident_number);
                const responseMessage = util.format(CONSTANTS.INCIDENT_CREATED_TEXT, incident_number, incident_url);
                if(response.status === 200){
                    sn_telegram_bot.sendMessage(repliedMessage.chat.id, responseMessage);
                }
                else{
                    sn_telegram_bot.sendMessage(repliedMessage.chat.id, response.body);
                }
            })
            .catch((error) => {
                sn_telegram_bot.sendMessage(repliedMessage.chat.id, error);
            });
        }
        else{
            sn_telegram_bot.sendMessage(repliedMessage.chat.id, CONSTANTS.ONLY_ENGLISH_ALLOWED_TEXT);
        }
    });
}