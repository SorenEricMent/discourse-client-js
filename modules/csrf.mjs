import { req_get, mergeJSON } from './utils.mjs';

export default function(_header, host){
    return new Promise((resolve, reject) => {
        let req_data = {
            "headers": {
                "X-CSRF-Token": "undefined"
            },
            "referrer": host + "/session/csrf",
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        };
        req_data = mergeJSON(req_data, _header);
        req_get(config.host + "/session/csrf", req_data).then((result) => {
            result.body = JSON.parse(data.body);
            if (result.body.hasOwnProperty("csrf")) {
                resolve([result.body.csrf, cookieParser(result.res.headers["set-cookie"])]);
            } else {
                reject("Failed to get CSRF token.");
            }
        });
    });
}