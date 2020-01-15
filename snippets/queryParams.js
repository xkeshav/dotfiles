// I have array of params and need to create query params to append with URL. below is the format of my object
{
    const params = {
        "name": ["alpha &", "beta"],
        "id": ["one", "&two=2"],
        "from": 1533735971000,
        "to": 1533822371147,
        "status": true,
        "category": null,
        "other": undefined
    };

    /*  pre: apply encodeURIComponent to individual items and then join
    let pre_encode = val.map(encodeURIComponent).join(',');
    console.log({pre_encode}); // alpha%20%26,beta
    const pre_qs = `${encodeURIComponent(key)}=${pre_encode}`;
    //name=alpha%20%26,beta
    */

    /* post: first join all item then apply encodeURIComponent
    let post_encode = encodeURIComponent(val.join(','));
    const post_qs = `${encodeURIComponent(key)}=${post_encode}`;
    // name=alpha%20%26%2Cbeta
    */

    let o = Object.entries(params).filter( ([link, val]) => {
        console.log(val);
        if(!!val) {
            console.log('inside if', val);
            return [link,val]
        }
      });
    console.log(o);
//     .map((pair)=>{
//         const [key,val] = pair;
//         if (val) {
//             if (val instanceof Array) {
//                 /*  pre: apply encodeURIComponent to individual items and then join */
//                 //                 let pre_encode = val.map(encodeURIComponent).join(',');
//                 //                 console.log({pre_encode});
//                 //                 const pre_qs = `${encodeURIComponent(key)}=${pre_encode}`;
//                 //                 return pre_qs;

//                 /* post: first join all items then apply encodeURIComponent */
//                 let post_encode = encodeURIComponent(val.join(','));
//                 console.log({
//                     post_encode
//                 });
//                 const post_qs = `${encodeURIComponent(key)}=${post_encode}`;
//                 return post_qs;
//             } else {
//                 return pair.map(encodeURIComponent).join('=');
//             }
//         }
//     })
    console.log({
        o
    });
}
