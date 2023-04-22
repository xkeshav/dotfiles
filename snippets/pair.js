{
  const countPairLines = (point) => {
    const input = Array.from({ length: point }, (_, i) => i);
    const output = input.reduce((prev, curr, idx, arr) => {
      const pair = new Map();
      arr.slice(idx + 1).map((m) => pair.set(m, curr));
      return prev.concat(pair);
    }, []);
    console.log({ output });
    const line = output.reduce((p, c) => (p += c.size), 0);
    return line;
  };

  countPairLines(7);
}
