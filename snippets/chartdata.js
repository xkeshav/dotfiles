 (function () {
 const remakeData = (arr) => {
     console.log(arr);
        const output = {};
        arr.map((item) => {
            for (let key in item) {
                if (!(key in output)) {
                    output[key] = [];
                }
                output[key].push(item[key]);
            }
        });
        const entries = Object.entries(output);
        return entries.map((e) => {
            return { label: e[0], data: e[1] };
        });
    }

const input = [
  {
    "alpha": 10,
    "beta": 11
  },
  {
    "alpha": 0,
    "beta": 4
  },
  {
    "alpha": 21,
    "beta": 9
  },
  {
    "alpha": 3,
    "beta": 1
  },
  {
    "alpha": 7,
    "beta": 0
  },
  {
    "alpha": 0,
    "beta": 0
  }
];



const output = remakeData(input);
console.log(output);

let z = output.reduce( (acc, curr) => acc.concat(curr.data), []);
 
 })();