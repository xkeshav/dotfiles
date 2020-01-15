(()=> {
    let first = [
	{
		"id": 7,
		"code": "USL",
		"selected": true
	},
	{
		"id": 1,		
		"code": "SQLi",	
		"selected": true
	}
];

let second = [
	{
		"id": 7,
		"code": "USL",
		"selected": false
	},
	{
		"id": 12,
		"code": "CLL",
		"selected": false
	},
	{
		"id": 13,
		"code": "SWL",
		"selected": false
	},
	{
		"id": 1,
		"code": "SQLi",
		"selected": false
	},
	{
		"id": 9,
		"code": "CRLFi",
		"selected": false
	},
	{
		"id": 10,
		"code": "CMDi",
		"selected": false
	},
	
	{
		"id": 4,
		"code": "ReflectiveXSS",
		"selected": false
	},
	{
		"id": 3,
		"code": "MD5",
		"selected": false
	}
];


let nv = second.map( s => {
    console.log(s);
    first.map( f => {
     if(f.id === s.id) {
         console.log('matched', f, s);
         s.selected = true;
     }
   });
})

console.log(second);
console.log(first);
console.log(nv);

})();