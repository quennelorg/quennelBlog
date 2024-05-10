---
slug: facade
title: 外观模式
authors: quennel
tags: [DesignModel, facade]
date: 2024-05-09T16:14
---

## 外观模式

> 提供一个高层次的接口，使得子系统更易于使用


这个模式用的非常多，甚至他的思想是贯彻在项目结构分层。

简单的说，外观模式就是在各个子系统或者子模块对外暴露的一个接口，在应用中，我们通过这个接口就可以访问到这些子系统的功能，而不去关心这些子系统的内部实现

增加一个外观，能够让模块之间的依赖变少，如果有新需求开发，然后这个新需求会影响到复杂的旧逻辑代码，这时候我们也可以增加一个facade，新业务访问facade，然后facade里面整合新逻辑和旧逻辑


参考：
https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/facade