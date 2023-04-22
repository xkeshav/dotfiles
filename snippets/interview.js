var f1n = () => {
  let a = [];
  a[10] = "ok";
  console.log(a.length);
  a["n"] = "new";
  console.log(a.length);
  a.forEach(console.log, console);
};

var isEvenOdd = (num) => {
  return console.log(num & 1);
};

isEvenOdd(21.5);
isEvenOdd(21.0);
//f1n();
