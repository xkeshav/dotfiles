(function () {
  const pick = (o, fields) => {
    return fields.reduce((a, x, ca) => {
      if (o.hasOwnProperty(x)) a[x] = o[x];
      return a;
    }, {});
  };

  let o = { id: 0, selected: false, other: "set" };

  let a = { id: "10", name: "Name", selected: true };

  let n = pick(a, Object.keys(o));

  console.log(n);

  const reports = [
    { id: 3, name: "three", description: "three d", other: "other 3" },
    { id: 2, name: "two", description: "two d", other: "other 2" },
  ];

  const reportList = reports.map(({ id, name }) => ({ id, name }));
  console.log(reportList);
})();
