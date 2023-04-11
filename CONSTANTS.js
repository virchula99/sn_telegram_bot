module.exports = {
    getConstants : {
        BOT_DESCRIPTION : 'Hello %s! I am a ServiceNow API bot. I can create an Incident record in the ServiceNow instance. \r\n  \r\nUse these commands to control me: \r\n /start - get a bot description \r\n /create_incident - create an Incident record in ServiceNow. \r\n \r\n \r\nIf you have any suggestions to improve bot functionality, please let me know - @sessas',
        INCIDENT_CREATED_TEXT :'Your incident %s is created.\r\nYou can see this record, please follow the link %s',
        ONLY_ENGLISH_ALLOWED_TEXT : 'Description should be in English!',
        WRITE_SHORT_DESC_TEXT: 'Please write a short description',
        REGEXP_CHECK_FOR_ENGLISH : new RegExp(/^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/),
        CREATE_INCIDENT_HTTP_DETAILS: {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'https://nixunitedllcdemo2.service-now.com/api/nixu/create_incident',
            headers: { 
                'Message': '%s', 
                'Content-Type': 'application/json', 
            },
        }
    }
}