// ref: https://goo.gl/HdmHz7
{
    function* sample() {
        yield "simple";
        yield "generator";
    }

    const it = sample();
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());

 function* favBeer() {
     const reply = yield "What is your fav beer?";
     console.log(reply);
     if(reply !== "ipa") return "No soup for you!";
     return "OK, soup.";
 }
 {
  const it = favBeer();
  const q = it.next().value;
  console.log(q);
  const a = it.next("ipa").value;
  console.log(a);
 }

}