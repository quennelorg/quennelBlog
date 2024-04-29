---
slug: record
title: Study for Record
authors: quennel
tags: [typeScript, record, generics]
date: 2024-04-11T11:11
---

## First
During the recent refactoring of the todo application, I encountered a type-related issue. I came across a type that I had seen before but never actively used, and I wasn't sure of its purpose. Today, I decided to do some research and gain a better understanding of it.
### Issue：
- When designing the alert functionality, I initially defined a type called `AlertType` with only three properties: success, warning, and error, representing different types of alerts. 
- However, I soon realized that these three properties were not sufficient to cover all possible scenarios. I needed to handle additional operations such as create, update, delete, etc. 
- Each operation would result in a different message, and I wanted to associate these messages with the `AlertType`. Although there were only three types of alerts, there would be multiple messages associated with them.

### Challenge:
While working on the implementation, I encountered a problem. I had the AlertType with three properties and multiple messages associated with each property. I needed to find a way to merge these two aspects, so that I could directly retrieve the relevant AlertType based on a given message.
## Discovery
### GPT
When faced with uncertainty, I turned to the internet for assistance. Initially, my search direction was quite broad, and most of the answers suggested using mapping. However, I wanted to define them as a single type. So, I sought help from GPT and discovered a new approach: using the record type.
GPT - Generative Pre-trained Transformer proved to be a helpful resource in my search for a solution. Although not all of its answers were accurate, I learned to distinguish between good and bad suggestions and draw inspiration from them
### record
Following the suggestion from GPT, I explored the use of the record type to solve the problem. Here's an example of how I ultimately implemented it:

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
By using the `AlertCategoryMapping`， We can use the alertType to identify the type of the alert, and then in the UI, we can render different components based on the type. For example:
```
<Alert onClose={removeAlert} severity={AlertCategoryMapping[type]} variant="filled" sx={{ width: '100%' }}>
{type.valueOf()}
</Alert>
```
In addition, the values of the alert messages can also be accessed directly using `type.valueOf()`. With the help of record, I can achieve a mapping from one type to another and output it as a new type.  

Another important point to mention is that when using the Record mapping, TypeScript ensures that all keys of the Record are matched with the corresponding type. In other words, in the example above, all values of AlertType must match the keys of AlertCategory. If a value is missing or mismatched, TypeScript will detect it and provide a warning about the missing property.

## Study
### Official
According to `Record<Keys, Type>` : Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.
Example：
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
### Personal
- From this, we can observe that this type is an object where the keys are represented by Keys and the values are represented by Type.
- The following two expressions have the same meaning:
```
type stringRecord = Record<'key1' | 'key2', string>
type stringRecord = {key1: string, key2: string>}
```
- In record, both K and T can be types, objects, enums, and so on.
- Example，From： [Typescript高级类型Record](https://zhuanlan.zhihu.com/p/356662885)
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
- In practical projects, record has wide applications as well：
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

### According to material[Level up your TypeScript with Record types](https://blog.logrocket.com/level-up-typescript-record-types/)
#### It can handle a wide range of cases as much as possible.
In many situations, we need to handle different cases based on different logics，According to before [工厂模式](/blog/simpleFactory) study
The simple factory pattern is indeed about generating different object instances based on various cases. The ability to handle all cases is crucial in this pattern.  
The simplest way is use `switch` to handle every output
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
However, in such a scenario, if we add a new type 4 to the Discriminator, the factory method won't recognize what the output for 4 should be, and it will fall into the default branch.
  
On the other hand, if we use a Record to implement this, TypeScript will remind us to add the output for 4, ensuring that all cases are properly handled:
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
This new factory method defines a Record where the Discriminator matches a function that takes no parameters and returns a string.
  
If we add a new type to the Discriminator, TypeScript will check the Record type and prompt us to add the corresponding case.
#### Enforcing type checking in applications that use generics
[generics](https://blog.logrocket.com/using-typescript-generics-create-reusable-components/)可以从实际类型抽象出来的类型，比如`Record<K, V>`就是一个范型，当我们想使用它时，我们可以任意挑选两个实际的类型，一个作为key，一个作为values  
Generics allow us to write code that is abstract over actual types. For example, `Record<K, V>` is a generic type. When we use it, we have to pick two actual types: one for the keys K and one for the values V.
  
Generics are extremely useful in modern programming, as they enable us to write highly reusable code. The code to make HTTP calls or query a database is normally generic over the type of the returned value. This is very nice, but it comes at a cost because it makes it difficult for us to know the actual properties of the returned value.
  
We can solve this by leveraging the Record type:
```
class Result<Properties = Record<string, any>> {
        constructor(
                public readonly properties: Record<
                        keyof Properties,
                        Properties[keyof Properties]>
        ) {}
}
```
Result is a bit complex. In this example, we declare it as a generic type where the type parameter, Properties, defaults to `Record<string, any>`.
Using any here might look ugly, but it actually makes sense. As we’ll see in a moment, the Record will map property names to property values, so we can’t really know the type of the properties in advance. Furthermore, to make it as reusable as possible, we’ll have to use the most abstract type TypeScript has — any, indeed!

The constructor leverages some TypeScript syntactic sugar to define a read-only property, which we’ve aptly named properties. Notice the definition of the Record type:
- The type of the key is keyof Properties, meaning that the keys in each object have to be the same as those defined by the Properties generic type
- The value of each of the keys will be the value of the corresponding property of the Properties record
  Now that we’ve defined our main wrapper type, we can experiment with it. The following example is very simple, but it demonstrates how we can use Result to have TypeScript check the properties of a generic type:  
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
In the above code, we define a CourseInfo interface that looks similar to what we saw earlier. It simply models the basic information we’d like to store and query: the name of the class, the name of the professor, and the number of credits.  

Next, we simulate the creation of a course. This is just a literal value, but you can imagine it to be the result of a database query or an HTTP call.  

Notice that we can access the course properties in a type-safe manner. When we reference an existing property, such as title, it compiles and works as expected. When we attempt to access a nonexistent property, such as students, TypeScript detects that the property is missing in the CourseInfo declaration, and the call does not compile.  

This is a powerful feature we can leverage in our code to ensure the values we fetch from external sources comply with our expected set of properties. Note that if course had more properties than those defined by CourseInfo, we could still access them. In other words, the following snippet would work:  

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