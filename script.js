function $(_) = document.body.getElementById(_);
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 300);
    });
