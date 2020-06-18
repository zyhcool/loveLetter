function asyncFunc() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("async func");
            console.log("end");
        }, 1000);
    });
}

async function test() {
    const ha = await asyncFunc();
    return ha;
}

console.log(test());
