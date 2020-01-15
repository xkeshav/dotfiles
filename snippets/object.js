{
function dis() {
const base_array = [{id:1, name: 'one'}, {id:2, name:'two'}, {id:3, name:'three'}];
const formdata = {fname:'alpha', lastname: 'beta', role:2};
const { role, ...postdata } = formdata;
roleObject = base_array.filter((r) => r.id === role);
console.log('roleObject: ', roleObject);
Object.assign(postdata, { roles: roleObject });
console.log('postdata', postdata);
}

//dis()

checkObject = (obj) => {
    const arr = [
  {
    "name": "1 Hour",
    "value": "H1"
  },
  {
    "name": "12 Hours",
    "value": "H12"
  },
  {
    "name": "24 Hours",
    "value": "D1"
  },
  {
    "name": "7 Days",
    "value": "D7"
  },
  {
    "name": "1 Month",
    "value": "M1"
  },
  {
    "name": "3 Months",
    "value": "M3"
  }
];
 let inc = arr.findIndex( (i) => { console.log(i, obj); return i === obj; } );

 console.log("inc", inc);


}
let obj = {
  "name": "12 Hours",
  "value": "H12"
}

checkObject(obj);
}