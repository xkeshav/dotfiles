{
  const input = [0, 10, 20, 30, 8, 0, 0];
  const sumOutput = () => input.reduce((c, a) => (c += a), 0);
  const maxOutput = () => input.reduce((a, b) => Math.max(a, b));
  const maxOutput_ = () => input.reduce((s, e) => (s = s < e ? e : s));
  console.log(maxOutput_);

  console.time("sum");
  input.forEach(() => sumOutput());
  console.timeEnd("sum");

  console.log(" ======");

  console.time("max");
  input.forEach(() => maxOutput());
  console.timeEnd("max");
}
