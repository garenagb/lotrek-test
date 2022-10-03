const CryptoJS = require('crypto-js');

export default class StringCipher {
    public static hashPassword(text: string) {
        return CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(text)).toString();
    }
}
