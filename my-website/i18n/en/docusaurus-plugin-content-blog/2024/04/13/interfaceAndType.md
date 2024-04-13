---
slug: interfaceAndType
title: Understanding Interface And Type
authors: quennel
tags: [typeScript, interface, type]
date: 2024-04-13T17:35
---

## Reflections
In general, when using TypeScript, interfaces are used more frequently. They are mainly used to define basic types, while types are used to define simpler types.
This is probably because interfaces are most commonly used for object types, and they can be directly extended to derive various object types. On the other hand, types represent fixed types and are rarely extended.

However, it has been observed that even though types represent fixed types, they can define complex types such as union types and intersection types. Once defined, they cannot be freely modified. Therefore, the choice between interfaces and types depends on the requirements. If there is a need for future modifications and extensions, interfaces are preferred, while types can be used in other cases.

Next, based on the explanations found online, let's record the differences between interfaces and types.
Here's an example:
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

## Basics
[Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
[Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

Types and interfaces are very similar, and in many cases, they can be used interchangeably. Almost all features of interfaces can be used in types as well, with the main difference being that types cannot be reopened to add new properties, while interfaces are always extendable.

## Extending
Interface:
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
The type defined by an interface is uncertain. When declaring variables using interfaces, their types are not final at that moment. Since interfaces can be merged, it is possible to add new members to the type defined by the same interface. In such cases, you can use types.
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
`Record<string, string>` is equivalent to `{ [key: string]: string }`. Subsets can only be assigned to the index signature type when all properties of that type are known and can be checked against the index signature. In your example, everything from exampleType to `Record<string, string>` is assignable. This check can only be done for object literal types, as once object literal types are declared, they cannot be changed. Hence, the index signature is known.

参考资料：
https://www.51cto.com/article/705857.html