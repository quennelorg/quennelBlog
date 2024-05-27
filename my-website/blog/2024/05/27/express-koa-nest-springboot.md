---
slug: express-koa-nest-springboot
title: express Vs Koa Vs Nest Vs SpringBoot
authors: quennel
tags: [express, koa, nest, springboot]
date: 2024-05-27T17:50
---


Nest.js、Koa 和 Express.js 都是用于构建 Node.js Web 应用的框架

SpringBoot是用于构建 Java Web 应用的框架，基于Spring，简化Spring应用的开发


## 大概描述
这四个框架都属于大框架，这里列出的点只是部分点，后续有机会会继续研究
### [SpringBoot](https://spring.io/projects/spring-boot)
- 嵌入式服务器：内置 Tomcat、Jetty 或 Undertow 服务器，应用可以打包成 JAR 文件运行
- 丰富的生态系统：与 Spring 生态系统无缝集成，提供了各种功能，如数据访问、消息传递、安全性
- 自动配置：提供自动配置，减少了繁琐的 XML 配置，可以快速上手
- 支持微服务架构，也可以被用来设计大型复杂的企业级应用，Java No.1

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
class HelloController {
    @GetMapping("/")
    public String hello() {
        return "Hello World!";
    }
}
```

### [Express](https://expressjs.com/)
- 极简的、灵活的 Node.js Web 应用框架，提供了基本的路由和中间件功能
- 可以快速构建和部署应用，有着非常简单的API和大量的中间件
- 庞大的社区和丰富的插件

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
### [Koa](https://koajs.com/)
- 原 Express.js 团队创建的，旨在提供更小、更具表现力和更健壮的基础
- Koa 允许您放弃回调并大大提高错误处理能力
- Koa 的核心中没有捆绑任何中间件，使开发者可以根据需要选择和组合各种中间件

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```
### [Nest](https://nestjs.com/)
- 使用模块化架构，将应用分解为独立且可重用的模块，提高了代码的组织性和可维护性
- 完全用 TypeScript 编写，提供了类型安全和现代 JavaScript 特性
- 的设计灵感来源于 Angular，使用装饰器、依赖注入等设计模式，适合大型企业级应用开发
- 内置支持多种功能，如验证、管道、过滤器、拦截器和守卫，使开发者能够快速构建复杂的应用

```js
import { Module, Controller, Get } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Controller()
class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

## 感受
- koa, express 跟 nest比起来，nest有更多的规范，在框架的基础上定义了很多规范，偏应用层，在底层的基础上封装了很多功能，提供给开发者规范，而koa，express更偏向于底层的框架，比较纯粹，没有太多固定的规范模块功能，如果需要开箱即用的框架，nest更适合
- springboot跟以上三个不是一个纬度的，当然最后的提供的功能会有几分类似，但是实现上完全不同

