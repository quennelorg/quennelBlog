---
sidebar_position: 2
---

# Frequently Command


## Basic
[Docker 命令大全](https://www.runoob.com/docker/docker-command-manual.html)
[Docker 常用命令与操作](https://www.jianshu.com/p/adaa34795e64)
#### `docker version` or `docker -v`
### 镜像image相关

#### 拉取镜像 `docker pull` 
#### 新建并启动 `docker run [镜像名/镜像ID]`  
For example:
`docker run -d -p 27017:27017 --name YourName mongo:latest`

#### 查找镜像 find dockers images
- `docker images`
- `docker image ls`

#### 去除没有使用过的镜像，也就是没有container关联的镜像 remove all unused images
- `docker image prune`

#### 删除某一个镜像 remove specific image
- `docker image rm <image_name> <image_id>`
- `-f` 如果正在使用某一个镜像，则需要加上
- `docker rmi <image_name> <image_id>` 简写命令
- `docker rmi <image_name>:<tag>`
- `docker rmi <image-id> <image-id>` 删除多个镜像
- `docker rmi $(docker images -q)` 删除所有镜像，$是shell语法，先执行括号内的，找到所有镜像id
- `docker rmi my_repo/my_image_tag` 删除镜像从remote repository




### 容器container相关
#### 列出容器 `docker ps`

- `docker ps` 列出本机所有在运行的容器
- `-a` 列出本机所有的容器（包括停止和运行）
- `-q` 只列出本机所有的容器id，而不是所有信息


#### `docker build` 镜像构建
#### `docker start [容器ID]`  启动已终止容器
#### `docker stop [容器ID]` 停止运行的容器
#### `docker kill [容器ID]` 杀死容器进程
#### `docker restart [容器ID]` 重启容器
#### `docker rm [容器ID]` 删除容器

### 命令批量删除状态为 Exited 的容器
docker 启动的容器当中，经常有一些退出的容器，既然没有用了，就需要批量清理一下。
```shell
docker rm $(docker ps -q -f status=exited)
```
利用 docker ps -f 选项可以找到 exited 的容器 -q 只显示容器 id 








### 参考资源
https://yeasy.gitbook.io/docker_practice/image/rm
[Remove Docker Images, Volumes, and Containers in Seconds](https://kinsta.com/blog/docker-remove-images/)