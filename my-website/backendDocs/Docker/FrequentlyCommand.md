---
sidebar_position: 2
---

# Frequently Command


## Basic
[Docker 命令大全](https://www.runoob.com/docker/docker-command-manual.html)
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

## 常用
### 命令批量删除状态为 Exited 的容器
docker 启动的容器当中，经常有一些退出的容器，既然没有用了，就需要批量清理一下。
```shell
docker rm $(docker ps -q -f status=exited)
```
利用 docker ps -f 选项可以找到 exited 的容器 -q 只显示容器 id 

### find dockers images
```shell
docker images
docker image ls
```

### remove all unused images
```shell
docker image prune
```

### remove specific image
```shell
// remove specific image by name or id
docker image rm <image_name> <image_id>

// 如果正在使用 则用 -f flag
docker image rm <image_name> -f

// 有一个简短的命令 rmi
docker rmi <image_name> <image_id>

// Remove a Specific Image by Name and Tag
docker rmi <image_name>:<tag>

// Remove Images From a Remote Repository
docker rmi my_repo/my_image_tag
docker rmi my_repo/image_tag_1 my_repo/image_tag_2 my_repo/image_tag_3
```


### 参考资源
https://yeasy.gitbook.io/docker_practice/image/rm
[Remove Docker Images, Volumes, and Containers in Seconds](https://kinsta.com/blog/docker-remove-images/)