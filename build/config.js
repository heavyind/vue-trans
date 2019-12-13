const path = require("path");
const babel = require("rollup-plugin-babel");
const resolve = require("@rollup/plugin-node-resolve");
const commonJs = require("rollup-plugin-commonjs");
const minify = require("rollup-plugin-babel-minify");


const makePath = (f) => {
  return path.join("./dist/", `vue-trans.${f}.js`);
};

const basePlugins = [
  babel({
    exclude: "node_modules/**"
  }),
  resolve(),
  commonJs()
];

const base = {
  input: "./index.js",
  plugins: basePlugins
};

const cjs = {
  output: {
    file: makePath("cjs"),
    format: "cjs"
  }
};

const umd = {
  output: {
    file: makePath("umd"),
    format: "umd",
    name: "VueTrans"
  },
  plugins: [
    ...basePlugins,
    minify()
  ]
};

const esm = {
  output: {
    file: makePath("esm"),
    format: "esm"
  }
};

module.exports = [
  { ...base, ...cjs },
  { ...base, ...umd },
  { ...base, ...esm }
];
