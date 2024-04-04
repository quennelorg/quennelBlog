---
slug: aesCrypto
title: AES 加密
authors: quennel
tags: [AES, Crypto]
date: 2024-04-04T16:00
---

## AES加密
参考文章：  
[AES加密算法原理的详细介绍与实现](https://blog.csdn.net/qq_28205153/article/details/55798628)  
[理解AES加密解密的使用方法](https://blog.csdn.net/vieri_32/article/details/48345023)  
[前端加密控件CryptoJS的使用](https://www.cnblogs.com/June2005/p/11429442.html)
### 大致流程
详细的就不描述了，毕竟不是专门研究这玩意的，知道大概的原理和如何用就行  
这里有样例代码：
```
const CryptoJS = require('crypto-js');  //引用AES源码js
    
    const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
    
    //解密方法
    function Decrypt(word) {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    
    //加密方法
    function Encrypt(word) {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    }
    
    export default {
        Decrypt ,
        Encrypt
    }
```

`key` 是密钥 ，`iv` 是密钥偏移量, 一般是后端生成，然后在接口返回  
值得注意的是密钥的长度，由于对称解密使用的算法是 AES-128-CBC算法，数据采用 PKCS#7 填充 ， 因此这里的 key 需要为16位！

接着我们定义了 解密方法Decrypt 和 加密方法 Encrypt ，最后通过 export default 将其暴露出去，方便在需要的时候进行引入~