---
slug: refactorPractice2
title: 重构实践2
authors: quennel
tags: [refactor]
date: 2024-05-07T17:54
---

## 搬移特性
在不同的上下文之间搬移元素
### 搬移函数(Move Function)
随着对代码的理解加深，就会知道那些软件要素如何组织最为恰当。

要将这种理解反映到代码上，就得不断地搬移这些元素

将一个函数内有很少依赖的函数搬移出去

如果这个函数在其他地方也被用到，也可以搬移出去
### 搬移字段(Move Field)
如果发现数据结构已经不适应于需求，就应该马上修缮它。如果容许瑕疵存在并进一步累积，它们就会经常使我困惑，并且使代码愈来愈复杂。


### 搬移语句到函数(Move Statements into Function)

要维护代码库的健康发展，需要遵守几条黄金守则，其中最重要的一条当属“消除 重复”。

如果我发现调用某个函数时，总有一些相同的代码也需要每次执行，那么 就需要考虑将此段代码合并到函数里头。

这样，日后对这段代码的修改只需改一处地方，还能对所有调用者同时生效。如果将来代码对不同的调用者需有不同的行为， 那时再通过搬移语句到调用者将它(或其一部分)搬移出来也十分简单。

### 搬移语句到调用者(Move Statements to Callers)
函数边界发生偏移的一个征兆是，以往在多个地方共用的行为，如今需要在某些调用点面前表现出不同的行为。

于是，我们得把表现不同的行为从函数里挪出，并搬移到其调用处。
### 以函数调用取代内联代码(Replace Inline Code with Function Call)
将内联代码替代为对一个既有函数的调用。
```js
// 修改前
let appliesToMass = false; 
for (const s of states) {
    if (s === "MA") appliesToMass = true; 
}
// 修改后
appliesToMass = states.includes("MA");
```
### 移动语句(Slide Statements)
合并重复的代码片段(Consolidate Duplicate Conditional Fragments)

让存在关联的东西一起出现，可以使代码更容易理解。

如果有几行代码取用了同一 个数据结构，那么最好是让它们在一起出现，而不是夹杂在取用其他数据结构的代码中间。

最简单的情况下，我只需使用移动语句就可以让它们聚集起来。此外还有 一种常见的“关联”，就是关于变量的声明和使用。

有人喜欢在函数顶部一口气声明函数用到的所有变量，我个人则喜欢在第一次需要使用变量的地方再声明它。
```js
// 修改前
const pricingPlan = retrievePricingPlan(); 
const order = retreiveOrder();
let charge;
const chargePerUnit = pricingPlan.unit;
// 修改后
const pricingPlan = retrievePricingPlan(); 
const chargePerUnit = pricingPlan.unit; 
const order = retreiveOrder();
let charge;
```

### 拆分循环(Split Loop)

有一些身兼多职的循环，它们一次做了两三件事情，不为别的，就因为这样可以只循环一次。

但如果你在一次循环中做了两件不同的事，那么每当需要修改循环时，你都得同时理解这两件事情。

如果能够将循环拆分，让一个循环只做一件事情，那就能确保每次修改时你只需要理解要修改的那块代码的行为就可以了。

拆分循环还能让每个循环更容易使用。如果一个循环只计算一个值，那么它直接返回该值即可;但如果循环做了太多件事，那就只得返回结构型数据或者通过局部变量传值了。

因此，一般拆分循环后，我还会紧接着对拆分得到的循环应用提炼函数

如果会造成性能问题，也要重构完成之后再考虑性能优化
```js
// 修改前
let averageAge = 0;
let totalSalary = 0;
for (const p of people) {
    averageAge += p.age;
    totalSalary += p.salary; 
}
averageAge = averageAge / people.length;
// 修改后
let totalSalary = 0;
for (const p of people) {
    totalSalary += p.salary; 
}
let averageAge = 0;
for (const p of people) {
    averageAge += p.age; 
}
averageAge = averageAge / people.length;
```

### 以管道取代循环(Replace Loop with Pipeline)

```js
// 修改前
const names = [];
for (const i of input) {
    if (i.job === "programmer") names.push(i.name);
}
// 修改后
const names = input
    .filter(i => i.job === "programmer") 
    .map(i => i.name);
```

### 移除死代码(Remove Dead Code)
一旦代码不再被使用，我们就该立马删除它。有可能以后又会需要这段代码，

但我从不担心这种情况;就算真的发生，我也可以从版本控制系统里再次将它翻找出来。

如果我真的觉得日后它极有可能再度启用，那还是要删掉它，只不过可以在代码里留一段注释，提一下这段代码的存在，以及它被移除的那个提交版本号
```js
// 修改前
if (false) { 
    doSomethingThatUsedToMatter();
}
// 修改后
```


## 简化条件逻辑

### 分解条件表达式(Decompose Conditional)
```js
// 修改前
if (!aDate.isBefore(plan.summerStart) &amp;&amp; !aDate.isAfter(plan.summerEnd charge = quantity * plan.summerRate;
else
    charge = quantity * plan.regularRate + plan.regularServiceCharge;
// 修改后
if (summer())
    charge = summerCharge();
else
    charge = regularCharge();
```

### 合并条件表达式(Consolidate Conditional Expression)
```js
// 修改前
if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0; 
if (anEmployee.isPartTime) return 0;
// 修改后
if (isNotEligibleForDisability()) return 0;
function isNotEligibleForDisability() { 
    return ((anEmployee.seniority < 2)
    || (anEmployee.monthsDisabled > 12)
    || (anEmployee.isPartTime)); 
}
```

### 以保卫语句取代嵌套条件表达式(Replace Nested Conditional with Guard Clauses)
```js
// 修改前
function getPayAmount() {
    let result;
    if (isDead) result = deadAmount(); else {
        if (isSeparated) result = separatedAmount(); else {
            if (isRetired) result = retiredAmount();
            else result = normalPayAmount(); }
    }
    return result; 
}
// 修改后
function getPayAmount() {
    if (isDead) return deadAmount();
    if (isSeparated) return separatedAmount(); 
    if (isRetired) return retiredAmount(); 
    return normalPayAmount();
}
```

### 以多态取代条件表达式(Replace Conditional with Polymorphism)
```js
// 修改前
switch (bird.type) { 
    case 'EuropeanSwallow': return "average"; 
    case 'AfricanSwallow': return (bird.numberOfCoconuts > 2) ? "tired" : "average"; 
    case 'NorwegianBlueParrot': return (bird.voltage > 100) ? "scorched" : "beautiful"; 
    default: return "unknown";
}
// 修改后
    class EuropeanSwallow { 
        get plumage() {
            return "average";
        } 
    }
    class AfricanSwallow { 
        get plumage() {
            return (this.numberOfCoconuts > 2) ? "tired" : "average";
        } 
    }
    class NorwegianBlueParrot { 
        get plumage() {
            return (this.voltage > 100) ? "scorched" : "beautiful";
        } 
    }
```


### 引入特例(Introduce Special Case)
引入 Null 对象(Introduce Null Object)
```js
// 修改前
if (aCustomer === "unknown") customerName = "occupant";
// 修改后
class UnknownCustomer {
    get name() {return "occupant";}
}
```