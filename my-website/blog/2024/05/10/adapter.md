---
slug: adapter
title: 适配器模式
authors: quennel
tags: [DesignModel, adapter]
date: 2024-05-10T18:54
---

## 适配器模式
结构型

> 将一个接口转换为客户端所期待的接口，从而使两个接口不兼容的类可以在一起工作


顾名思义，就是关于适配器的模式，在现实生活中，mac电脑只提供type-c的接口，如果要查type-a接口的电子设备，这时候就需要一个转换器，这个转换器就是适配器模式

没有什么问题是加一层不能解决的

如果现在来了一个新需求，上游接口还没有定义好，或者上游接口提供的方案跟系统旧接口的常规方案有很大的改变，我们不可能因为他们的改动而去改变系统本身的规则，这时候我们就可以加一层适配器，让双方都能够运作起来






参考：
https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/adapter