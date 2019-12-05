

export const normalizeTime = (t) => {
  // Regex splits into integer and unit parts (e.g., "1000ms" -> [1000, "ms"]).
  const tmp = t.split(/(s|ms)/).filter(Boolean);
  return tmp[1] === "ms" ? tmp[0] : tmp[0] * 1000;
};
