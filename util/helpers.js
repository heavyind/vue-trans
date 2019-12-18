

export const normalizeTime = (t) => {
  // Regex splits into integer and unit parts (e.g., "1000ms" -> [1000, "ms"]).
  const tmp = t.split(/(s|ms)/).filter(Boolean);
  return tmp[1] === "ms" ? tmp[0] : tmp[0] * 1000;
};

export const find = (f, a) => {
  if (a.length === 0) { return undefined; }
  if (f(a[0])) { return a[0]; }
  return find(f, a.slice(1));
};
