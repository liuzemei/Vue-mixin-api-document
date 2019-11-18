
import moment from 'moment';
import forge from 'node-forge';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';
import axios from 'axios';
import testImg from '../logo.png';

export default {
    readFile(file) {
        return new Promise(resolve => {
            let reader = new FileReader();
            if (file.type !== 'application/json') resolve(false)
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsText(file);
        });
    },
    requiredMssage() {
        if (arguments.length < 2) {
            console.log('调用参数个数必须大于 2')
            return;
        }
        let isExist = true;
        for (let i = 0; i < arguments.length - 2; i++) {
            if (!arguments[0][arguments[i + 1]]) {
                isExist = false;
            }
        }
        return isExist;
    },
    getJwtToken({ client_id: uid, session_id: sid, private_key: privateKey }, method, url, body) {
        return signAuthenticationToken(uid, sid, privateKey, method, url, body)
    },
    uploadFile(upload_url, file) {
        const instatce = axios.create({
            timeout: 10000
        })
        const headers = {};
        headers['x-amz-acl'] = 'public-read';
        headers['Content-Type'] = 'application/octet-stream';
        instatce({
            url: upload_url,
            method: 'PUT',
            headers,
            data: file
        })
    }
};


function signAuthenticationToken(uid, sid, privateKey, method, uri, body) {
    uri = uri.replace('https://api.mixin.one', '')
    method = method.toLocaleUpperCase();
    if (typeof (body) === "object") {
        body = JSON.stringify(body);
    }

    let expire = moment.utc().add(30, 'minutes').unix();
    let md = forge.md.sha256.create();
    md.update(method + uri + body);
    let payload = {
        uid: uid,
        sid: sid,
        iat: moment.utc().unix(),
        exp: expire,
        jti: uuid(),
        sig: md.digest().toHex()
    };
    return jwt.sign(payload, privateKey, { algorithm: 'RS512' });
}

