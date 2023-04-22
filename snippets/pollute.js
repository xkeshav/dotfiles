(function () {
  const workingInstance = [
    { id: 1, selected: true },
    { id: 2, selected: false },
    { id: 10, selected: false },
  ];
  const serviceInstance = [{ id: 2 }];
  const instances___ = workingInstance.map((item) => {
    let n = Object.assign({}, item);
    return (
      serviceInstance.find((selectedItem) => {
        if (item.id === selectedItem.id) {
          Object.assign(n, { selected: true });
        }
      }) || n
    );
  });

  console.log(instances___);
  console.log(workingInstance);
})();
