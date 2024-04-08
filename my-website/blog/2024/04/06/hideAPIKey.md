---
slug: hideAPIKey
title: 需要隐藏你的API KEY
authors: quennel
tags: [API KEY, security]
date: 2024-04-06T19:00
---

## 不要上传API key
现代网络通过API能够迅速调用各种应用，而API key就是调用API的密码  
不要上传个人的API KEY！  
不要上传个人的API KEY！  
不要上传个人的API KEY！  
## 不要在前端保存API key
一开始的想法是在前端调key，这时候发现，发布上去后，key是以明文的形式出现在调用接口中，
所以如果有人去检查network，请求会暴露出key，所以正确的方法应该把key放在后端做，后端处理隐私内容，部署在私人的服务器或者serverless云端，例如 AWS，GCP， 阿里云等  

参考内容：  
[How to hide your API keys SAFELY when using React](https://www.youtube.com/watch?v=FcwfjMebjTU)  
[Hiding api key](https://github.com/orgs/community/discussions/57070)