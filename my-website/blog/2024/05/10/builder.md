---
slug: builder
title: 建造者模式
authors: quennel
tags: [DesignModel, facade]
date: 2024-05-10T10:26
---

## 建造者模式
创建型

> 将一个复杂对象的构建与其表示分离，使得同样的构建过程可以创建不同的表示

举个例子：有些时候模型类里面的属性是非常复杂的，有些属性是可选，这时候我们去生成这样的实例的时候，代码就会很麻烦

这时候就可以用建造者模式来优化实现，然后在需要消费的时候，直接用builder来生成这个模型类

换个说法，建造者模式是在当创建复杂对象的算法应该独立于该对象的组成部分以及它们的装配方式时适用的模式。





参考：
https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/builder