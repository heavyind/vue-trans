const i = require("./import");


module.exports = {
  output: { 
    path: i.distPath,
    filename: "dist/vue-trans.cjs.js",
    libraryTarget: "commonjs2"
  }
};
