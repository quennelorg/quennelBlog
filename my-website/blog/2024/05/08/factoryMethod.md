---
slug: factoryMethod
title: 工厂方法
authors: quennel
tags: [DesignModel, factoryMethod]
date: 2024-05-08T13:14
---

## 工厂方法

这个属于简单工厂方法的进阶版，在简单工厂方法的语境下，如果新加一个产品的话，那么就需要直接在工厂方法里添加产品，这样会违背开闭原则（对新增开放，对修改关闭）

这时候我们再抽一层出来，将工厂类抽出来，让产品决定使用哪一个工厂，这样的话，如果添加不一样的产品，我们就新增一个对应的工厂就行，不需要在固定的工厂新增产品

简单工厂的工厂类是一个静态工厂，而工厂方法的工厂类是可以为不同的产品生成不同的工厂类

参考：
https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/factoryMethod