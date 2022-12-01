const fallback_config = {
    "headers":{
        "accept": "*/*",
        "discourse-present": "true",
        "discourse-track-view": "true",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\"",
        "user-agent": "Discourse-Client-JS/1.0.0 NodeJS/" + process.version,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Linux\"",
        "x-requested-with": "XMLHttpRequest"
    }
};
class DiscourseClient{
    constructor(config){
        if(!config || !config.hasOwnProperty('username') || !config.hasOwnProperty('password') || !config.hasOwnProperty('url')){
            throw new Error('Missing required config.');
        }
    }
    login(){

    }
}

export { DiscourseClient };