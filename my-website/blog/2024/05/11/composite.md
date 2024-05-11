---
slug: composite
title: 组合模式
authors: quennel
tags: [DesignModel, composite]
date: 2024-05-10T18:54
---

## 组合模式
结构型

> 组合模式允许以相同的方式处理单个对象和对象的组合体


组合模式有着清晰的层级结构，像公司层级管理，或者树的节点

在使用的时候，一个接口就可以操作单个对象或者多个单个对象组成的组合对象


对于使用者来说有两种方式：

- 透明方式
所有的子节点都具备component的接口操作，但实际上子节点是不需要的

- 安全方式
component 具有子节点和组合对象的接口操作，子节点没有不属于它本身的操作

参考：
https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/composite