---
sidebar_position: 2
---

# Frequently Command


## Basic
[Docker 常用命令与操作](https://www.jianshu.com/p/adaa34795e64)
### `docker version` or `docker -v`
### `docker pull` 拉取镜像
### `docker ps` 列出本机所有的容器
### `docker ps -a`  列出本机所有的容器（包括停止和运行）
### `docker run [镜像名/镜像ID]`  新建并启动
For example:
`docker run -d -p 27017:27017 --name YourName mongo:latest`
### `docker build` 镜像构建
### `docker start [容器ID]`  启动已终止容器
### `docker stop [容器ID]` 停止运行的容器
### `docker kill [容器ID]` 杀死容器进程
### `docker restart [容器ID]` 重启容器
### `docker rm [容器ID]` 删除容器


