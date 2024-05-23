---
slug: page-Architecture-URL-DNS
title: What Happens When We Access A Webpage-Architecture-URL-DNS
authors: quennel
tags: [WebPage, Architecture, DNS, URL]
date: 2024-05-23T09:51
---

老生常谈的问题，今天在这里做个记录

## 架构

### client-server 
- **客户端（Client）**：发送请求，等待并接收服务器的响应。通常是用户的计算机或移动设备。
- **服务器（Server）**：接收请求，处理并发送响应。通常是存储数据、执行应用逻辑的远程机器。
- 服务器集中管理资源和服务，中心化控制
- 由于中心化，安全措施可以集中部署和管理，安全性高
- 如果请求很多，可以通过增加服务器数量来处理
例子：
- Web浏览器与Web服务器
- 服务器与移动端
- 邮件客户端与邮件服务器

### Peer-to-Peer （P2P）
对等节点（Peers）：每个节点既可以作为客户端又可以作为服务器，直接与其他节点通信和共享资源

- 去中心化，没有一个单独的中心服务器
- 每个节点都可以提供和请求资源
- 某些节点失效不会影响整体系统
例子：
- 文件共享网络 BitTorrent
- 区块链

### 微服务架构
将应用程序拆分为一组小的、独立的服务。每个服务运行在自己的进程中，通过轻量级机制（通常是HTTP API）进行通信。
- 现在最常用的架构模式
- 基于http，算是client-server的进阶版
- 不同的服务可以使用不同的技术栈，因此跟数据库打交道的服务可以用Java，然后跟前端打交道的后端可以用NodeJs，也称为bff
- 某个服务故障不会导致整个系统崩溃，比如一个商城如果订单管理故障， 商品浏览，用户管理还是可以正常服务
### Service-Oriented Architecture (SOA)
- 这个接触的少，基于SOAP通信，将应用功能封装为独立的服务，基于服务的架构风格，跟微服务类似，但是实现方式完全不一样
- 例如 企业内部管理的系统，ERP中各个模块就是走位独立的服务存在，这个比较适合层级分明的企业组织系统，传统的管理系统
### 无服务器架构（Serverless）
- 开发者无需管理服务器，代码运行在云提供商管理的容器中，按需执行，特点：自动扩展、按需计费、简化运维。
- 这个现在随着云技术的发展，迅速的流行起来，毕竟省钱，按需提供服务器


## URL

> 今天主要是讨论 Client-server，如何通过一个url就可以访问资源

以这个为例子分析下url的知识：`https://www.google.com/maps`

### 结构
#### 协议（Protocol）
- `https://`
- - `https` 代表超文本传输安全协议`（HyperText Transfer Protocol Secure）`，用于在网络上安全地传输数据。与 `HTTP` 相比，`HTTPS`使用 `SSL/TLS` 加密，确保数据在传输过程中不被窃取或篡改
#### 域名（Domain Name）
- `www.google.com`
- `www`：通常表示万维网`（World Wide Web）`的子域。
  - 最初 `www` 用于指示一个网站的万维网服务，与其他子域名（如 `mail.google.com` 用于邮件服务）区分开来。然而，现在它已经变得不再是严格的规范，许多网站都可以在有无 `www` 前缀的情况下正常访问
  - 网站通常会配置DNS和重定向规则，使用户无论使用 `www` 还是不使用 `www` 都能访问相同的内容
  - `www.google.com` 和 `google.com`：访问谷歌的主页
  - `www.example.com` 和 `example.com`：访问示例网站
- `google`：是主域名，表示谷歌公司的域名
- `.com`：是顶级域名（Top-Level Domain, TLD），表示商业机构。常见的TLD还有`.org`（组织）、`.net`（网络）、`.edu`（教育）等
- 用来标识特定的服务器或服务。域名由多个部分组成，从右到左依次为顶级域名、主域名和可选的子域名
#### 路径（Path）
- 路径部分指定了服务器上的特定资源。在这个例子中，`/maps`表示谷歌地图服务
- 用于指定服务器上的具体资源或服务，类似于文件系统路径，指引服务器提供相应的内容或功能

### `https://www.google.com/maps` 含义

- `https://`: 使用`HTTPS`协议，确保数据传输的安全性
- `www.google.com`: 谷歌公司的域名，指向谷歌的服务器
- `/maps`: 指定了访问谷歌地图服务

因此这个地址是想要告诉浏览器：
- 使用`HTTPS`协议与服务器通信
- 连接到位于`www.google.com`的谷歌服务器
- 请求服务器上的`/maps`路径，即访问谷歌地图服务

### 其余存在的URL部分

#### 端口（Port）
- 例如：`https://www.google.com:443/maps`
- 含义：指定服务器上的特定端口号，默认情况下 HTTPS使用443端口, http是80，java应用是8080，前端应用是3000
#### 查询参数（Query Parameters）
- 例如：`https://www.google.com/maps?query=restaurants`
- 含义：在路径后附加的参数，用于传递附加信息或进行搜索等操作
#### 片段标识符（Fragment Identifier）
- 例如：`https://www.google.com/maps#section1`
- 含义：指向资源中的特定部分或位置，通常用于网页中的锚点

> 通过这些部分的组合，URL可以精确地指示和访问互联网上的各种资源和服务


## DNS （Domain Name System）

- 将人类可读的域名（例如 `www.example.com`）转换为计算机可读的IP地址（例如 `93.184.216.34`），使用户能够通过域名访问网站和其他网络资源
- DNS的工作原理类似于电话簿，它将人类友好的名字翻译成计算机用来标识和访问设备的数字地址
- 域名必须对应一个IP地址，而IP地址不一定有域名

### 功能
#### 域名解析
将域名转换为IP地址，以便用户可以通过易记的域名访问互联网资源，而不需要记住复杂的IP地址
#### 邮件路由
通过MX记录（`Mail Exchange`）确定邮件服务器的地址，从而实现电子邮件的发送和接收
#### 负载均衡
通过将一个域名解析到多个IP地址来分配流量，提高服务的可用性和性能

### 组成

#### 域名空间（Domain Namespace）
层级结构的命名系统，包括根域、顶级域（TLD，如 `.com、.org、.net`）、二级域（如 `example.com`）、子域（如 `www.example.com`）
#### DNS记录类型
- A记录（`Address Record`）：将域名映射到IPv4地址
- AAAA记录（`IPv6 Address Record`）：将域名映射到IPv6地址
- CNAME记录（`Canonical Name Record`）：将一个域名别名映射到另一个域名
- MX记录（`Mail Exchange Record`）：指定接收电子邮件的邮件服务器
- NS记录（`Name Server Record`）：指定域名的权威DNS服务器
- TXT记录：存储任意文本数据，常用于验证和配置

#### DNS服务器类型
- 根DNS服务器（Root DNS Servers）：管理顶级域名服务器信息，位于DNS层级的最顶层
- 顶级域（TLD）DNS服务器：管理各顶级域（如 .com、.org）的域名信息
- 权威DNS服务器（Authoritative DNS Servers）：存储特定域名的DNS记录，是该域名的最终信息源
- 递归解析器（Recursive Resolvers）：接收DNS查询请求并进行递归查询，直到获得最终的IP地址

#### 缓存机制
- 缓存层次:浏览器缓存、操作系统缓存、本地DNS服务器缓存都用于加速DNS查询
- `TTL（Time To Live）`每个DNS记录都有TTL值，指示该记录在缓存中保存的时间。TTL过期后，需要重新查询

### DNS解析
通过输入URL之后，我们需要获得一个具体的ip地址才能够访问到互联网上某个地址的资源，如何通过域名（Domain）获取到对应的IP地址也被称为DNS解析

#### 解析过程

- 输入域名
- 检查本地缓存
  - 浏览器首先检查本地缓存中是否已有该域名对应的IP地址。如果有，则直接使用该IP地址
  - 如果浏览器缓存中没有，操作系统会检查其缓存（包括hosts文件）
    - ps：国内的墙会对海外大部分域名进行dns污染，导致没有办法找到对应的ip，也就无法访问，这时候可以通过在hosts文件加固定的DNS解析
- 发送查询请求到本地DNS服务器
  - 如果操作系统缓存中也没有对应的IP地址，则操作系统将查询请求发送到配置的本地DNS服务器（通常是ISP提供的DNS服务器）
  - ISP也就是Internet service provider，我们俗称的电信，移动等liumang公司
- 本地DNS服务器查询
  - 本地DNS服务器首先检查自己的缓存。如果缓存中有对应的IP地址，则返回给用户
  - 如果本地DNS服务器缓存中没有该记录，它将进行递归查询或迭代查询

#### 递归查询过程：

- 查询根DNS服务器
  - 本地DNS服务器向根DNS服务器（`Root Server`）发送查询请求。根DNS服务器不会直接提供所需的IP地址，而是返回负责顶级域（如 .com）的`TLD（Top-Level Domain`） DNS服务器的地址
- 查询顶级域（TLD）DNS服务器
  - 本地DNS服务器向TLD DNS服务器发送查询请求。TLD DNS服务器返回负责具体域名（如 example.com）的权威DNS服务器的地址
- 查询权威DNS服务器
  - 本地DNS服务器向权威DNS服务器发送查询请求。权威DNS服务器包含域名的最终记录，并返回该域名对应的IP地址
- 返回结果
  - 本地DNS服务器将获得的IP地址缓存一段时间（`TTL，Time To Live`），然后将IP地址返回给用户的计算机
- 建立连接
  - 用户的计算机获得IP地址后，浏览器使用该IP地址与目标服务器建立连接，并发送HTTP/HTTPS请求，获取网页内容


## 用户最终步骤
输入`www.example.com`后，会发生的过程：
### 浏览器缓存
检查是否已有 www.example.com 的IP地址缓存
### 操作系统缓存
如果浏览器缓存中没有，检查操作系统的DNS缓存
### 本地DNS服务器
操作系统向本地DNS服务器（例如，ISP提供的DNS服务器）发送查询请求
### 根DNS服务器
- 如果本地DNS服务器缓存中没有，向根DNS服务器发送查询请求
- 根DNS服务器返回 .com 顶级域名服务器的地址
### TLD DNS服务器
- 本地DNS服务器向 .com 顶级域名服务器发送查询请求
- TLD DNS服务器返回 example.com 的权威DNS服务器的地址
### 权威DNS服务器
- 本地DNS服务器向 example.com 的权威DNS服务器发送查询请求
- 权威DNS服务器返回 `www.example.com` 的IP地址（例如，`93.184.216.34`）
### 返回IP地址
本地DNS服务器缓存该IP地址，并将其返回给用户的计算机
### 浏览器与服务器建立连接
用户的计算机使用该IP地址与服务器建立TCP连接，并发送HTTP/HTTPS请求
