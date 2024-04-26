---
sidebar_position: 4
---

## Dockerfile for Java built with Gradle

### Dockerfile
- 创建一个file在根文件目录 名字为Dockerfile，不需要文件格式后缀
- `FROM openjdk:17-jdk-alpine` 基于openJDK
- `WORKDIR /my-project`
  - 在Docker 镜像中创建工作文件目录
  - 这个步骤是可选的
  - 在Docker镜像中易于管理项目文件
- `CMD ["./gradlew", "clean", "bootJar"]`
  - 在Docker镜像中运行 gradle build 打包
  - 这个springboot源代码可以被build成 最终可执行的JAR文件
- `COPY build/libs/*.jar app.jar`
  - 将jar包复制成app.jar
- `EXPOSE 8080`
  - 如果你的Java应用监听的是特制的端口，这个地方就需要改成你特制的端口，为了在Docker镜像中暴露出去，默认是8080
  - 这个端口是容器暴露给外部的端口
- `ENTRYPOINT ["java", "-Dspring.data.mongodb.uri=mongodb://your-mongodb:27017/db-name", "-jar","/app.jar"]`
  - ENTRYPOINT 指令设置容器的默认命令，并允许您指定 Java 应用程序所需的任何其他系统属性或参数
  - 在此示例中，它设置入口点以使用指定的 MongoDB 连接 URI 和其他属性运行 Java 应用程序 JAR 文件 (app.jar)



### Run Docker
- `docker build -t your-image-name .`
  - 通过打开终端并导航到包含 Dockerfile 的目录来构建 Docker 映像
- `docker images`
  - 构建完成后，您可以查看创建的镜像
- `docker run -d -p 8080:8080 your-image-name`
  - 从 Docker 镜像创建 Docker 容器, 也就是将 镜像 run起来
  - `-d` 标志以分离模式运行容器，允许其在后台运行
- `docker ps`
  - 可以验证 Docker 容器是否正在运行
- `docker network create your-network
  docker run --network your-network --name your-mongodb mongo
  docker run --network your-network -p 8080:8080 your-project`
  - 在同一Docker 网络中运行其他容器
  - 通过将多个容器连接到同一Docker 网络，您可以使它们能够使用容器名称作为主机名来相互通信。当您的 Java 项目依赖于其他容器时，这非常有用。


### dockerfile gradle springboot
[Creating Docker images with Spring Boot 2.3.0.M1](https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1)
[Spring boot + Gradle + Docker](https://github.com/lizhifuabc/spring-boot-gradle)
[Spring Boot 应用容器化之 Docker、Gradle](https://cloud.tencent.com/developer/article/1597841)
