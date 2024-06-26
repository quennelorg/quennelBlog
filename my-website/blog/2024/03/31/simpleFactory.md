---
slug: simpleFactory
title: 研究简单工厂模式
authors: quennel
tags: [DesignModel, simpleFactory]
---

## 活字印刷术
在实际开发中，很多时候需求会做很多变化，同样也会出现，开发完成了，需求又有改动，
这个时候，就需要所编写的功能像活字印刷术一样灵活
- 易于修改
- 易于复用
- 易于维护
- 易于拓展  

## 封装
封装是个概念性的东西，我的理解是把有公共重复的代码合并到一起，起到活字印刷术的作用。  
- 在之前的开发中，有两个业务都需要实现一个功能，因此我在实践中会把这个功能封装成一个，然后两个业务分别去实现  
- 在一个功能内，把需要重复作用的逻辑封装成一个逻辑
- 视图代码，业务代码，逻辑代码的分拆，逻辑代码可以复用到不同的业务，不同的业务代码可以复用到不同的视图，这个关系就像 view -> viewController -> viewModel
- 代码的耦合度降低，会有利于维护和拓展，大白话就是分拆代码，修改其中一个功能或者增加一个功能，不要影响到其他的功能正常运行

## 继承 多态
在js中，继承用的不多，java和swift都会有很多应用。  
在java中，继承是非常常见的一种手法，可以说，在我第一次认识面向对象，封装，继承，多态就是java三座大山  
在swift当中，不只是view，viewController， viewModel，每一种类型的代码都能够用到，子类和父类的复用继承更是随处可见

## 工厂
一个工厂类的作用就是根据不同的类型去创建不同的实例对象。  
换句大白话说，也就是我们通过封装和继承已经能够将功能拆分的很细  
现在我们如果将这些细的功能合并成一个业务，那么可以通过一个工厂类，提供一个参数作为获取小功能的实例对象  
这样，无论是增加新功能还是修改原有功能，都会很方便，而且不会对老功能有影响

### 拓展
看到有个例子很有趣，在这做个记录：

https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/simpleFactory/car

### good resource
https://shusheng007.top/2021/09/07/design-pattern/