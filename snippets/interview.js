var f1n =  () => {
    let a = [];
    a[10] = "ok";
    console.log(a.length);
    a["n"]= "new";
    console.log(a.length);
    a.forEach(console.log, console);
}

var isEvenOdd = (num) => {
    return console.log(num & 1);
    let int = parseInt(num,10);
    let str =  (int/2).toString();
    let isEven = str.indexOf('.') < 0 ? true : false;
    return isEven;
}

isEvenOdd(21.5);
isEvenOdd(21.0);
//f1n();