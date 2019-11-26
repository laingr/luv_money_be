
async function build(cb) {
  
  const build = require("./models/build");
  await build.drop();
  await build.build();
  await build.populate();

  cb();
}

module.exports.default = build;