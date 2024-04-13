---
slug: interfaceAndType
title: 读懂Interface And Type
authors: quennel
tags: [typeScript, interface, type]
date: 2024-04-13T17:35
---

## 思考
一般在使用的时候，interface用过的最多，基本上定义基本的类型的时候都是使用interface，至于type只是定义一些简单的类型。  
大概是因为 interface最常用object类型，然后可以直接extend，可以很好的衍生出各种不同的对象类型，而type是固定的类型，很少去extend。
但实际发现，type虽然是固定的，但是它能够定义联合类型，交叉类型等复杂的类型，而且一旦定义好，就不能在上面做随意的改动， 所以用哪个好就看需求，如果后期有改动继承就用interface，其余都可以用type
接下来根据网上的讲解，对这个记录下。   
举个例子：
```
interface CatInfo {
  age: number;
  breed: string;
}

interface Miao extend CatInfo {
    color: 'mixed'
}
type CatName = "miffy" | "boris" | "mordred";
```

## 基础
[Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
[Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

type和Interfaces非常相似，在许多情况下它们之间自由选择。Interfaces的几乎所有功能都可以在type中使用，主要区别在于type不能重新打开以添加新属性，而Interfaces始终是可扩展的。  
### 继承 Extending
Interface
```
Extending an interface

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```
Type
```
Extending a type via intersections

type Animal = {
  name: string;
}

type Bear = Animal & { 
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

### Adding new fields
Interface
```
Adding new fields to an existing interface
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```
Type
```
A type cannot be changed after being created

type Window = {
  title: string;
}

type Window = {
  ts: TypeScriptAPI;
}

 // Error: Duplicate identifier 'Window'.
```

## QA
### Index signature is missing
tl;dr
interface定义的类型是不确定的, 使用interface去声明变量时，它们在那一刻类型并不是最终的类型。由于interface可以进行声明合并，所以总有可能将新成员添加到同一个interface定义的类型上, 这时候可以用type

```
interface ObjInterface {
    a: string
}
type ObjType {
    a: string
}
const exampleInterface: ObjInterface = {a: '1'}
const exampleType: ObjType = {a: '1'}

let record: Record<string, string> = {};
record = exampleInterface // good
record = exampleType // Index signature is missing
```
Record<string,string>与{[key:string]：string}相同。只有当该类型的所有属性都已知并且可以对照该索引签名进行检查时，才允许将子集分配给该索引签名类型。在您的例子中，从exampleType到Record<string,string>的所有内容都是可分配的。这只能针对对象字面量类型进行检查，因为一旦声明了对象字面量类型，就无法更改它们。因此，索引签名是已知的


参考资料：
https://www.51cto.com/article/705857.html