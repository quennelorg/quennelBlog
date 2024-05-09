---
slug: prototype
title: 原型模式
authors: quennel
tags: [DesignModel, prototype]
date: 2024-05-09T10:08
---

## 原型模式

顾名思义，围绕原型的模式，我们先定义一个原型出来，然后根据原型去生成我们需要的对象

这个适用于在提高性能上，比如有一个特别费资源的操作对象，每一次对数据库操作都需要new一个这样的对象，如果我们可以对这个对象进行原型copy，在之后需要的时候，直接复制这个原型，那么就不需要重复的去创建

参考：
https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/prototype