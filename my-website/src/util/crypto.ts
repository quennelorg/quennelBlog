import CryptoJS from 'crypto-js';
import config from '@site/configProxy/config';

const key = CryptoJS.enc.Utf8.parse('12345678ABCDEFGH'); //16位
const iv = CryptoJS.enc.Utf8.parse('12345678abcdefgh'); //16位
export const encrypt = (data: any) => {
	if (!config.NEED_CRYPTO) {
		return data;
	}
	if (typeof data == 'string') {
		return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		}).ciphertext.toString();
	} else if (typeof data == 'object') {
		//对象格式的转成json字符串
		return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(data)), key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		}).ciphertext.toString();
	}
};

export const decrypt = (data: any) => {
	if (!config.NEED_CRYPTO) {
		return data;
	}
	return CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(data)), key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	}).toString(CryptoJS.enc.Utf8);
};
