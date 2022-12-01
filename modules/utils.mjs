import { default as https} from 'https';

function isArray(obj){
    return Object.prototype.toString.call(obj) === "[object Array]";
}

function cookie_parser(raw){
    var cookies = {
        "complex":{},
        "flag":[],
    };
    let parser = function(str){
        let keyArray = str.split(";");
        for(const element of keyArray){
        if(element.indexOf("=") === -1){
            cookies.flag.push(element);
        }else{
            let keyValue = element.split("=");
            cookies.complex[keyValue[0]] = keyValue[1];
        }
        }
    }
    if(isArray(raw)){
        for(const element of raw){
            parser(element);
        }
    }else{
        parser(raw);
    } 
    return cookies;
}

function cookier_restore(obj){
    let cookie = "";
    for(const key in obj.complex){
        cookie += key + "=" + obj.complex[key] + ";";
    }
    return cookie;
}

function mergeJSON(origin,override){
    for(const key in override){
        if(typeof override[key] === "object"){
            if(isArray(override[key])){
                origin[key] = override[key];
            }else{
                mergeJSON(origin[key],override[key]);
            }
        }else{
            origin[key] = override[key];
        }
    }
    return origin;
}

function req_get(host, data) {
    return new Promise((resolve, reject) => {
        let resp = Buffer.alloc(0);
        https.get(host, data, res => {
            res.on('data', function (chunk) {
                resp = Buffer.concat([resp, chunk]);
            });
            res.on('end', () => {
                resp = resp.toString();
                resolve({
                    "res": res,
                    "body": resp
                });
            });
        }).on('error', err => {
            reject(err);
        });
    });
}

function req(host, body, options) {
    return new Promise((resolve, reject) => {
        let newRequest = https.request(host, options, (res) => {
            let resp = Buffer.alloc(0);
            res.on('data', function (chunk) {
                resp = Buffer.concat([resp, chunk]);
            });
            res.on('end', () => {
                resp = resp.toString();
                resolve({
                    "res": res,
                    "body": resp
                });
            });
            res.on('err', () => {
                reject();
            });
        });
        newRequest.write(body);
        newRequest.end();
    });
}

function toTimestamp(date) {
    return new Date(date).getTime();
}

export { cookie_parser, cookier_restore, mergeJSON, req_get, req, toTimestamp };