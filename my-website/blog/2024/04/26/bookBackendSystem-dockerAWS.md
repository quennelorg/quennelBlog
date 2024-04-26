---
slug: bookBackendSystemockerAWS
title: 如何将mongodb和Springboot应用放到docker里并部署到AWS的ECS
authors: quennel
tags: [Mongodb,Docker,AWS,ECS]
date: 2024-04-26T08:56
---
## [Docker](https://www.docker.com/)
[Colima](https://github.com/abiosoft/colima)

Colima 是一款工具，可以轻松在 macOS 和 Linux 上运行 Docker 容器。
[Colima：Docker Desktop for Mac 的免费替代品，轻松管理容器和 K8s（支持 M1 芯片）](https://zhuanlan.zhihu.com/p/466229156)

常见的使用命令[Frequently Command](/backendDocs/Docker/FrequentlyCommand)



拉取镜像，保存自己的镜像[Docker HUB](https://hub.docker.com/)


### MongoDB镜像
拉取镜像
`docker pull mongo:latest `

查看镜像
`docker images`

启动镜像`docker run -d -p 27017:27017 --name YourName mongo:latest`
- -d: 后台运行容器，并返回容器ID；
- -p: 指定端口映射，格式为：主机(宿主)端口:容器端口

可以在MongoDB compass查看 
![img.png](img.png)

也可以去docker镜像里面去看`docker exec -it mongo mongosh`

如果没问题，则给这个docker打tag，并push到dockerhub [PushToHub](backendDocs/Docker/PushToHub)

### JAVA 镜像
#### dockerfile
在项目下：
```dockerfile title="Dockerfile"
FROM openjdk:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```
FROM 指定基础镜像

VOLUME 挂载在哪个目录

ARG 启动参数

COPY 复制本地文件去docker容器

EXPOSE 暴露端口

ENTRYPOINT 启动时的默认命令

[Dockerfile命令详解](https://blog.csdn.net/tc979907461/article/details/107614667)

#### build and push
`docker build --platform linux/amd64 -t bookmanagement . `

--tag, -t: 镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。

` docker exec -it quennelcoder/mydocker:bookmanagementv1 /bin/bash `
`java -jar build/libs/bookAPI-0.0.1-SNAPSHOT.jar  `

如果没问题，则给这个docker打tag，并push到dockerhub [PushToHub](/backendDocs/Docker/PushToHub)

#### QA
`exec /opt/openjdk-17/bin/java: exec format error`

主机arm，docker java17包 amd64，build之后是amd64，ecs得选择x86_64

[Docker: exec /usr/local/openjdk-11/bin/java: exec format error](https://stackoverflow.com/questions/75089403/docker-exec-usr-local-openjdk-11-bin-java-exec-format-error)

[exec /usr/local/openjdk-11/bin/java: exec format](https://waytohksharma.medium.com/exec-usr-local-openjdk-11-bin-java-exec-format-1b68effb2446)

[Docker on Mac M1 gives: "The requested image's platform (linux/amd64) does not match the detected host platform"](https://stackoverflow.com/questions/69054921/docker-on-mac-m1-gives-the-requested-images-platform-linux-amd64-does-not-m)

[“exec format error” or How Macs, M1s, Docker images, and AWS ECS/EKS conspired to waste a weekend.](https://medium.com/block-imperium-games/exec-format-error-or-how-macs-m1s-docker-images-and-aws-ecs-eks-conspired-to-waste-a-weekend-6fcd2ea063d1)

[When using COPY with more than one source file, the destination must be a directory and end with a /](https://stackoverflow.com/questions/53650492/when-using-copy-with-more-than-one-source-file-the-destination-must-be-a-direct)


## [AWS](https://aws.amazon.com/)
EC2 云上虚拟机
ECS Docker容器管理服务
VPC
虚拟私有云 (VPC) 是专用于您的 AWS 账户的虚拟网络。它在逻辑上与 AWS 云中的其他虚拟网络隔离。您可以为VPC指定IP地址范围、添加子网、添加网关、关联安全组等。子网是 VPC 中的一系列 IP 地址。
[ Virtual Private Cloud](https://aws.amazon.com/cn/vpc/)
[什么是 Amazon Elastic Container Service？](https://docs.aws.amazon.com/zh_cn/AmazonECS/latest/developerguide/Welcome.html)
[https://www.huaweicloud.com/zhishi/1584598122547.html](https://www.huaweicloud.com/zhishi/1584598122547.html)
[AWS ECS、EC2、EKS 和 Fargate 之间的关系](https://blog.csdn.net/winfield821/article/details/135387756)
[白皮书：Amazon EC2 Container Service（ECS）上的微服务架构（下篇）](https://aws.amazon.com/cn/blogs/china/microservices-on-amazon-ecs-2/)

### 创建Clusters
[Amazon ECS Clusters](https://docs.aws.amazon.com/zh_cn/AmazonECS/latest/developerguide/clusters.html)
### 创建Task definitions
### 跑Task 创建 Service
在跑Task之前，要去创建VPC
成功之后就可以跑起来了


### EC2
[how-deploy-spring-boot-application-aws-ec2](https://www.linkedin.com/pulse/how-deploy-spring-boot-application-aws-ec2-3-rakesh-reddy-kjiwc/)

QA

WARNING: The requested image's platform linux/amd64 does not match the detected host platform linux/arm64/v8 and no specific platform was requested

docker 拉的镜像是 linux amd64， m1芯片是arm64

[WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8)](https://dev.to/docker/run-x86-containers-on-apple-mac-m1-with-rosetta-2-417a)