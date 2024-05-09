---
slug: templateMethod
title: 模板方法模式
authors: quennel
tags: [DesignModel, templateMethod]
date: 2024-05-09T14:14
---

## 模板方法模式

> Defines the skeleton of an algorithm in a method, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithms structure.

> 在一个方法中定义一个算法的骨架，而将一些步骤的实现延迟到子类中，使得子类可以在不改变一个算法的结构前提下即可重定义该算法的某些特定步骤

这个模式主要是在重构的时候会用到，比如有很多类有大部分重复的代码，然后我们就可以把这些重复的代码抽出来，弄一个父类，然后这些子类就可以去除大量重复代码，这些重复的代码也可以看为是一个模版


参考：
https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/templateMethod