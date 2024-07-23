---
slug: sshKeysForGithub
title: How to setup many ssh key for various Github account or gitlab on one machine
authors: quennel
tags: [SSH, Github]
date: 2024-07-05T12:57
---

## [SSH](https://www.ssh.com/academy/ssh)

### 什么是SSH
SSH is a software package that enables secure system administration and file transfers over insecure networks. It is used in nearly every data center and in every large enterprise.

- 一个协议或者包
- 非对称加密
- 公钥加密技术来验证远程主机

### ssh的使用

![img.png](img.png)

- Tectia SSH client & server for Windows, Unix, Linux - with 24x7 support

- Tectia SSH for IBM z/OS client & server for IBM z/OS mainframes - with 24x7 support

- PuTTY client for Windows and Linux

- WinSCP client for Windows

- CyberDuck client for Mac

- OpenSSH server for Unix, Linux


## [SSH Keys](https://www.ssh.com/academy/ssh-keys)
SSH 密钥对 最直观的作用：让你方便的登录到 SSH 服务器，而无需输入密码。由于你无需发送你的密码到网络中，SSH 密钥对被认为是更加安全的方式。

- Authorized keys define who can access each system
- Identity keys identify users and provide access
- Certificate-based user authentication


使用SSH key的步骤：

- 在客户端生成SSH key（密钥对：公钥和私钥）
- 在服务端的配置文件中加入你的公钥。（比如我们需要再GitHub中粘贴你的公钥）

### [ssh-keygen](https://www.ssh.com/academy/ssh/keygen)
Ssh-keygen is a tool for creating new authentication key pairs for SSH. Such key pairs are used for automating logins, single sign-on, and for authenticating hosts.


生成密钥对时，有一个选项要求你设置密码（passphrase），该密码是用来保护你的私钥的密码。如果设置了则在使用私钥时会要求你输入这个密码；**一般不设置**，记不住【之后还可更改此密码，使用ssh-keygen -p】

#### 选中一个算法和key size

- rsa - an old algorithm based on the difficulty of factoring large numbers. A key size of at least 2048 bits is recommended for RSA; 4096 bits is better. RSA is getting old and significant advances are being made in factoring. Choosing a different algorithm may be advisable. It is quite possible the RSA algorithm will become practically breakable in the foreseeable future. All SSH clients support this algorithm.

- dsa - an old US government Digital Signature Algorithm. It is based on the difficulty of computing discrete logarithms. A key size of 1024 would normally be used with it. DSA in its original form is no longer recommended.

- ecdsa - a new Digital Signature Algorithm standarized by the US government, using elliptic curves. This is probably a good algorithm for current applications. Only three key sizes are supported: 256, 384, and 521 (sic!) bits. We would recommend always using it with 521 bits, since the keys are still small and probably more secure than the smaller keys (even though they should be safe as well). Most SSH clients now support this algorithm.

- ed25519 - this is a new algorithm added in OpenSSH. Support for it in clients is not yet universal. Thus its use in general purpose applications may not yet be advisable.

The algorithm is selected using the -t option and key size using the -b option.

例子：
- ssh-keygen -t rsa -b 4096
- ssh-keygen -t dsa
- ssh-keygen -t ecdsa -b 521
- ssh-keygen -t ed25519

#### 备注一个邮件名 `-C "xxx@xxx.com"`
#### 指定用来保存密钥的文件名 `-f test_rsa`

#### 生成示例：`ssh-keygen -t rsa -C "xxx@xxxx.com" -f test_rsa -b 2048`

生成完之后，所生成的公钥和私钥默认保存在 `~/.ssh` 路径下

公钥文件名一般是 `test_rsa.pub`,  私钥文件名为 `test_rsa`

公钥内容相比私钥很短，可以用 `cat` 来查看文件内容，然后放到需要用到ssh连接的机器，比如GitHub客户端，或者虚拟机

## 配置不同的GitHub账号不同的ssh keys

### 打开 `~/.ssh` 目录下的config文件，如果没有则创建

```yaml
# 配置文件参数
# Host : Host可以看作是一个你要识别的模式，对识别的模式，进行配置对应的的主机名和ssh文件
# HostName : 要登录主机的主机名
# User : 登录名
# IdentityFile : 指明上面User对应的identityFile路径
```


config-example:
```
# gitlab
Host 192.168.144.130
HostName 192.168.144.130
User quennel

Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_ed25519

# Fig ssh integration. Keep at the bottom of this file.
Match all
Include ~/.fig/ssh


# xxxCompany
Host github.com-company
HostName github.com
User git
IdentityFile ~/.ssh/company_rsa

# xxx
Host github.com-my
HostName github.com
User git
IdentityFile ~/.ssh/xxx_rsa

# xxx
Host github.com
HostName github.com
User git
IdentityFile ~/.ssh/xxx_rsa

# company2
Host git.company.com
HostName git.company.com
User git
IdentityFile ~/.ssh/xxx_rsa
```

### 为什么要这么配置

同一个ssh key 在相同的host下，只能使用一个，不能重复在两个host下使用同一个ssh key

换句话说，两个GitHub账号，hostName都是 github.com，那么这个ssh key不能同时保存在这两个GitHub账户中，因为对github.com来说，ssh key是唯一标识，不能同时存在两个不同的GitHub绑定同一个ssh key

因此需要增加不同的ssh key，

使用：
`git clone git@github.com:XXXX/xxx.git`

`git clone git@github-company.com:XXXXX/xxx.git`