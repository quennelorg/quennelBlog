---
slug: record
title: 读懂Record
authors: quennel
tags: [typeScript, record, generics]
date: 2024-04-11T11:11
---

## 初始
最近在做todo类型重构的时候，发现一个类型之前只是见过，但从来没有主动用过，也不清楚有什么用，今天对它做一个简单的研究  
### 遇到的问题：
- 在设计alert的时候，刚开始定义了一个类型 `alert type` 只有三个属性 success，warning，error, 分别代表alert的成功，警告，错误
- 然后实际操作发现，这三个属性并不能包括所有情况，我有增删查改等操作，如果只有三个属性，并不能把这三个属性跟四个操作的结果一一对应
- 比如，我想增加成功的时候，提醒 增加成功，在修改成功的时候，提醒修改成功，对我来说，每一个操作所带来的结果都会有个不同的提示语，而这个提示语我希望跟alertType绑定，这样， alert的type虽然只有三个，但是提示语会有很多
- 然后在编写的时候，碰到了一个难题，现在有三个属性的`alert type`，有多个属性的提示语，但是我如何把这两个type合并起来，这样在消费的使用直接根据提示语直接拿到相关的alert type

## 发现
### GPT
遇事不决问网络，刚开始的搜索方向有些广，大部分给到的答案只有将他们map来使用，但是我想将他们定义成一个类型，于是向GPT寻求帮助后，发现它提供了个新思路 record  
虽然GPT很多解答都是有问题，但是我们得有从中分辨好坏，并且获取灵感的能力
### record
按照GPT给的思路，先实现了下用record解决问题，以下是最终的一个案例：

```
export enum AlertType {
	createSuccess = '任务已记录，要做完哦！',
	updateSuccess = '任务已修改，要快点做完哦！',
	updateFailed = '你改了个啥，有这功夫赶紧完成去！',
	finishSuccess = '任务已完成🎉',
	deleteSuccess = '任务已删除',
	clearSuccess = '恭喜你！你已经完成了所有的任务',
	emptyNameError = '你在做白日梦吗？',
	sameNameError = '你已经做这个任务的计划了，赶紧去完成吧',
}

export type AlertCategory = 'success' | 'error' | 'warning';

export const AlertCategoryMapping: Record<AlertType, AlertCategory> = {
	[AlertType.createSuccess]: 'success',
	[AlertType.updateSuccess]: 'success',
	[AlertType.updateFailed]: 'error',
	[AlertType.finishSuccess]: 'success',
	[AlertType.deleteSuccess]: 'success',
	[AlertType.clearSuccess]: 'success',
	[AlertType.emptyNameError]: 'error',
	[AlertType.sameNameError]: 'warning',
};
```
通过`AlertCategoryMapping`， 我们能够通过alertType去获取这个alert是哪个类型，然后在ui上就能够通过类型去获取不同的渲染，例如:
```
<Alert onClose={removeAlert} severity={AlertCategoryMapping[type]} variant="filled" sx={{ width: '100%' }}>
{type.valueOf()}
</Alert>
```
除此之外，提示语的值也能够通过`type.vauleOf()`直接拿到, 通过record，我能够做到一个类型到另一个类型的映射，并且输出成一个新的类型。  

还有一点可以提的是，通过Record映射，TypeScript会把Key的内容都跟Type做匹配，换句话说，在上述例子 AlertType的所有值都需要跟AlertCategory做匹配，如果少一个，TypeScript会识别出来并提醒缺失该有的属性

## 研究
### 官方
根据官方的描述 `Record<Keys, Type>` : Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.
官方样例：
```
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
 
cats.boris;
```
### 个人
- 从其中可以发现，这个类型，是一个object，其中key是Keys，value是Type  
- 以下两个写法是一样的含义
```
type stringRecord = Record<'key1' | 'key2', string>
type stringRecord = {key1: string, key2: string>}
```
- 在record中，K和T都可以是类型，对象，枚举等
- 最经常使用的是封装各种类型方法，以下是例子，来自： [Typescript高级类型Record](https://zhuanlan.zhihu.com/p/356662885)
```
enum IHttpMethods {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put',
}

const methods = ["get", "post", "delete", "put"];

interface IHttpFn {
    <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
}

type IHttp = Record<IHttpMethods, IHttpFn>;

const httpMethods: IHttp = methods.reduce((map: any, method: string) => {
    map[method] = (url: string, options: AxiosRequestConfig = {}) => {
        const { data, ...config } = options;
        return (axios as any)[method](url, data, config)
            .then((res: AxiosResponse) => {
                if (res.data.errCode) {
                    //todo somethins
                } else {
                    //todo somethins
                }
            });
    }
    return map
}, {})

export default httpMethods;
```
- 在实际项目中也有大部分的应用：
```
export type ContextType<RequestT = Record<string, any>> = {
    header: Record<string, ReqParam>;
    headers: Record<string, ReqParam>;
    query: Record<string, ReqParam>;
    request: {
        body?: RequestT;
        query: Record<string, ReqParam>;
    };
};

config?: Record<string, any>;

export interface config1 {
    data: dataType;
    id?: string;
    dataMap: Record<string, interface1<Type1>>;
}

export interface interface1<T extends {} = {}> {
    id: string;
    datas: T[];
    dataMap?: Record<string, interface1<T>>;
    datas: Type<T>[];
}


```

### 结合资料[Level up your TypeScript with Record types](https://blog.logrocket.com/level-up-typescript-record-types/)
#### 能够尽可能处理所有的case
在很多情况，我们需要根据不同的逻辑去处理不同的case，根据之前的blog[工厂模式](/blog/simpleFactory)的研究
简单的工厂模式就是根据各种case去产生不同的对象实例，能够处理所有的case是最重要的  
最简单的实现方法是用`switch`去构建每个case的输出
```
type Discriminator = 1 | 2 | 3

function factory(d: Discriminator): string {
    switch(d) {
            case 1:
            return "1"
            case 2:
                return "2"
            case 3:
                return "3"
            default:
                return "0"
    }
}
```
但是这个时候，如果我们给Discriminator增加一个新的类型4，这个工厂方法并不会认识到4的输出是什么，而是走到了default分支  
如果我们用Record来写， TypeScript就会提醒我们需要增加4的输出：
```
type Discriminator = 1 | 2 | 3

function factory(d: Discriminator): string {
const factories: Record<Discriminator, () => string> = {
1: () => "1",
2: () => "2",
3: () => "3"
}
return factories[d]()
}

console.log(factory(1))
```
这个新工厂方法定义了一个Record，使Discriminator去匹配一个方法，这个方法没有参数并返回一个字符串  
如果我们给Discriminator增加新的类型，TypeScript会检测Record类型，并且让我们增加对应的case
#### 使用范型来做类型检查
[范型](https://blog.logrocket.com/using-typescript-generics-create-reusable-components/)可以从实际类型抽象出来的类型，比如`Record<K, V>`就是一个范型，当我们想使用它时，我们可以任意挑选两个实际的类型，一个作为key，一个作为values  
API回来的数据或者直接查询数据的返回值的类型一般是范型，这有好处也有不好点，我们很难通过它知道返回值的实际属性是什么，也就是如何去取它  
这有个例子：
```
class Result<Properties = Record<string, any>> {
        constructor(
                public readonly properties: Record<
                        keyof Properties,
                        Properties[keyof Properties]>
        ) {}
}
```
result类会有些复杂，它具有一个泛型参数 `Properties`，默认值为 `Record<string, any>`（表示一个键值对对象，键为字符串类型，值为任意类型，因为无法事先知道所有属性的类型，所以这里是any）。  
该类的构造函数接受一个类型为 `Record<keyof Properties, Properties[keyof Properties]>` 的参数 `properties`，并使用 `public readonly` 修饰符将其作为类的属性。这里使用了 TypeScript 中的映射类型，它将 `Properties` 对象的键和值分别映射到 `properties` 属性的键和值上。具体来说，`keyof Properties` 表示 `Properties` 对象的所有键的联合类型，`Properties[keyof Properties]` 表示 `Properties` 对象中对应键的值的类型。

通过这种方式，Result 类的实例将具有一个名为 `properties` 的只读属性，其类型与构造函数中传入的 `properties` 参数相同。这样，我们可以创建一个 `Result` 类的实例，并在构造函数中传入一个键值对对象，该对象的键和值类型必须与 `Properties` 泛型参数的约束相匹配。
  
这里有使用的样例：
```
interface CourseInfo {
title: string
professor: string
cfu: number
}

const course = new Result<Record<string, any>>({
title: "Literature",
professor: "Mary Jane",
cfu: 12
})

console.log(course.properties.title)
//console.log(course.properties.students)     <- this does not compile!

```
在上面的代码中，我们定义了一个名为 CourseInfo 的接口，它与之前所见的类似。它简单地模拟了我们希望存储和查询的基本信息：课程名称、教授姓名和学分数。

接下来，我们模拟创建了一个课程。这只是一个字面量值，但你可以将其想象为数据库查询或HTTP调用的结果。

请注意，我们可以以类型安全的方式访问课程属性。当我们引用一个已存在的属性，比如 title，它能够编译并按预期工作。当我们尝试访问一个不存在的属性，比如 students，TypeScript 检测到该属性在 CourseInfo 声明中缺失，因此调用无法编译通过。

这是一个强大的功能，我们可以在代码中利用它，确保从外部来源获取的值符合我们预期的一组属性。请注意，如果 course 具有比 CourseInfo 中定义的属性更多的属性，我们仍然可以访问它们。换句话说，以下代码片段也可以正常工作：

```
// CourseInfo and Result as above

const course = new Result<Record<string, any>>({
title: "Literature",
professor: "Mary Jane",
cfu: 12,
webpage: "https://..."
})

console.log(course.properties.webpage)
```