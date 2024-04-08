---
slug: hideAPIKey
title: Need hide your API KEY
authors: quennel
tags: [API KEY, security]
date: 2024-04-06T19:00
---

## Do not upload your API key
Modern networks can quickly call various applications through APIs, and the API key is the password for calling the API.  
Do not upload personal API KEY!  
Do not upload personal API KEY!  
Do not upload personal API KEY! 
## Don't save API keys on the frontend
The initial idea was to adjust the key on the front end. At this time, I found that after publishing it, the key appeared in the calling interface in clear text.  
So if someone checks the network, the request will expose the key, so the correct method is to put the key on the backend. The backend handles private content and deploys it on a private server or serverless cloud, such as AWS, GCP, Alibaba Cloud, etc.  

Reference：
[How to hide your API keys SAFELY when using React](https://www.youtube.com/watch?v=FcwfjMebjTU)  
[Hiding api key](https://github.com/orgs/community/discussions/57070)