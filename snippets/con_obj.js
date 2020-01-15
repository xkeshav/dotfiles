{
    let input = {
      "currentState": 1538399817658,
      "previousState": 1538399817643
    };



Object.keys(input).forEach(function (key) {
   return new Date(input[key]);
});
console.log({input});

}