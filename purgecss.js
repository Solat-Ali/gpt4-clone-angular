const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const filePath = 'dist/gpt4-clone/browser';
console.log("Arguments: ", exec?.arguments[0] ?? 'something');

//const filePath = process;
//console.log("Incoming file path: ", filePath);

// find the styles css file
const files = getFilesFromPath(filePath, '.css');
let data = [];

if (!files && files.length <= 0) {
  console.log("cannot find style files to purge");
  return;
}

for (let f of files) {
  // get original file size
  const originalSize = getFilesizeInKiloBytes(`${filePath}/` + f) + "kb";
  var o = { "file": f, "originalSize": originalSize, "newSize": "" };
  data.push(o);
}

console.log("Run PurgeCSS...");

exec(`purgecss -css ${filePath}/*.css --content ${filePath}/index.html ${filePath}/*.js -o ${filePath}/`, function (error, stdout, stderr) {
  console.log("PurgeCSS done");

  for (let d of data) {
    // get new file size
    const newSize = getFilesizeInKiloBytes(`${filePath}/` + d.file) + "kb";
    d.newSize = newSize;
  }

  console.table(data);
});

function getFilesizeInKiloBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size / 1024;
  return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
  let files = fs.readdirSync(dir);
  return files.filter(e => path.extname(e).toLowerCase() === extension);
}