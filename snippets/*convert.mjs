{

 const base = ['a', 'b', 'c', 'd'];
 const given = ['a', 'x', 'd'];

given.find( b => {
 console.log({b});
  let exist = base.includes(b);
  if(exist) return b;
  console.log({exist});
})


}