---
slug: nodeJS-promise
title: Asynchronous JavaScript - Promise and Async and await
authors: quennel
tags: [nodeJs, promise]
date: 2024-05-27T15:05
---


## 回调函数

因为nodejs是单线程，所以许多费时费力的操作都会用异步的形式来进行，这样的话，主线程的运转就不会被block住，

打个比方，一个首页的渲染，如果因为图片资源下载慢，就一直不渲染整个首页是不合理的，好的解决方案是先将能渲染的都渲染了，如果耗时的操作就慢慢渲染，这个也简称异步操作

在异步操作操作中，回调函数是一个解决方案：

```js
function fetchData(callback) {
    setTimeout(() => {
        callback(null, "data");
    }, 1000);
}

fetchData((error, data) => {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
});

```

如果fetchData的回调里面嵌套回调，里面再嵌套回调等，这样的话，就会形成回调地狱，再代码易读性，规范性上都是地狱难度


## Promise
Promise 是一种改进的异步处理方式，提供了一种链式调用的方法，避免了回调地狱。Promise 对象代表一个异步操作的最终完成或失败及其结果值。

举个例子：
```js
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("data");
        }, 1000);
    });
}

fetchData()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });

```

## Async/await
async/await 是对 Promise 的语法糖，使异步代码看起来像同步代码。async 函数返回一个 Promise，而 await 使得 JavaScript 引擎等待 Promise 的解决（resolve）或拒绝（reject）

当代码运行的时候，async方法会放到事件循环里面，所以主线程的代码会首先执行，如果我们在主线程打印async方法的return，这时候只会得到`Promise { <pending> }`

如果我们想得到async方法的return值，async会返回一个promise，所以我们可以用then的方式将值解出来
```js
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("data");
        }, 1000);
    });
}

async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

getData();
```

## 综合例子：

Callback:
```js
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
```

Promise:
```js
const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I Could not find that file');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject('Could not write file');
            resolve('success');
        });
    });
};

readFilePro(`${__dirname}/dog.txt`)
    .then((data) => {
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then((res) => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log('Random dog image saved to file!');
    })
    .catch((err) => {
        console.log(err.message);
    });
```

Async/Await:
```js
const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I Could not find that file');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject('Could not write file');
            resolve('success');
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`,
        );
        console.log(res.body.message);
        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Random dog image saved to file!');
    } catch (err) {
        console.log(err);
    }
};

getDogPic();
```