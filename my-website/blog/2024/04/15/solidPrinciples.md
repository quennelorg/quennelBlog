---
slug: solidPrinciples
title: 面向对象编程的 SOLID 原则
authors: quennel
tags: [DesignModel, solidPrinciples]
date: 2024-04-15T10:50
---

## S 单一职责原则
单一职责原则的描述是 **一个 class 应该只做一件事，一个 class 应该只有一个变化的原因**。
重构代码的一大利器，不要将所有的代码都放在一个类里面写，这样，对于拓展，维护，复用是一个灾难。

如何判断违反了这一原则：
- 方法里if else 很多，这就说明很多职责都包裹在里面
- 一个类中依赖了很多类，这个很难去重构，如果业务特别多，很容易出现这样的问题，尽量避免
- 一个类里会有很多任务，根据参数决定执行不同的任务，这可以用多态来避免这样的问题

## O 开闭原则
- 开闭原则要求“class 应该对扩展开放对修改关闭”。修改意味着修改存在 class 的代码，扩展意味着添加新的功能。
- 这个原则想要表达的是：我们应该能在不动 class 已经存在代码的前提下添加新的功能。这是因为当我们修改存在的代码时，我们就面临着创建潜在 bug 的风险。因此，如果可能，应该避免碰通过测试的（大部分时候）可靠的生产环境的代码。
- 设计软件的时候尽量提前可拓展的渠道，而不是写死固定的类型，这样我们能够在多样的需求中快速安全交付
- 为了实现这一原则， 可以优先将之前固定的类型进行重构，抽象出来，以满足后续需求变动
## L 里氏代换原则
- 一个软件如果使用的是一个父类的话，那么一定适用于其子类，而且它察觉不出父类对象和子类对象的区别。也就是说，在软件里面，把父类都替换成它的子类，程序的行为没有变化，简单地说，子类型必须能够替换掉它们的父类型
- 只有当子类可以替换掉父类，软件单位的功能不受到影响时，父类才能真正被复用，而子类也能够在父类的基础上增加新的行为。这就是继承，也只有这个前提，开放-封闭才能够实现
## I 接口隔离原则
- 隔离意味着保持独立，接口隔离原则是关于接口的独立。
- 该原则描述了很多客户端特定的接口优于一个多用途接口。客户端不应该强制实现他们不需要的函数。
- 也就是一个接口最好只负责一个事情，比如图书相关的只负责增删查改接口，而不是还要包括支付的相关逻辑
## D 依赖倒置原则
依赖倒置原则描述的是我们的 class 应该依赖接口和抽象类而不是具体的类和函数。\
依赖倒转其实可以说是面向对象设计的标志，用哪种语言来编写程序不重要，如果编写时考虑的都是如何针对抽象编程而不是针对细节编程，即程序中所有的依赖关系都是终止于抽象类或者接口那就是面向对象的设计，反之那就是面向过程化的设计\
举个例子：在组装电脑方面，无论主板、CPU、内存、硬盘都是在针对接口设计的，如果针对实现来设计，内存就要对应到具体的某个品牌的主板，那么如果要更换内存则需要把所有的都需要换
- A. 高层模块不应该依赖低层模块。两个都应该依赖抽象。 
- B. 抽象不应该依赖细节。细节应该依赖抽象
- 举个例子：
```
public class Bank {

    public void GIVE_CUSTOMER_MONEY_OTC() {
        // some logic
    }
}

public class Customer {
    private Bank myBank = new Bank();
    
    public void withdraw() {
        myBank.GIVE_CUSTOMER_MONEY_OTC();
    }
}
```
上述代码中，Customer依赖Bank，违反了这个原则
如果我们定义一个接口，在两个类中：
```
public interface ATM {
    void ATM_OPERATION();
}

public class Bank implements ATM {
    @Override
    ATM_OPERATION(){
        // code to add money to ATM and increase the ATM balance
    }
}

public class Customer implements ATM {
    
    @Override
    ATM_OPERATION(){
        // code to withdraw money from ATM and decrease the ATM balance
    }
}
```
这样，无论银行或者顾客有什么问题，他们都够进行操作\
参考：
https://www.freecodecamp.org/news/solid-principles-single-responsibility-principle-explained/