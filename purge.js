const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

// Read the command-line arguments
const args = process.argv.slice(2);
const parsedArgs = parseArgs(args);
const filePath = parsedArgs.distPath ?? 'dist/gpt4-clone/browser';

// find the styles css file
const files = getFilesFromPath(filePath, '.css');
let data = [];
let cmd = [];

if (!files && files.length <= 0) {
  return;
}

for (let f of files) {
  // get original file size
  const originalSize = getFilesizeInKiloBytes(`${filePath}/` + f) + 'kb';
  var o = { file: f, originalSize: originalSize, newSize: '' };
  data.push(o);

  cmd.push(`purgecss -css ${filePath}/${f} --content ${filePath}/index.html ${filePath}/**/*.js -o ${filePath}/${f} --font-face --keyframes`);
}

cmd = cmd.join(' & ');
console.log(cmd);

exec(cmd, function (error, stdout, stderr) {
  for (let d of data) {
    // get new file size
    const newSize = getFilesizeInKiloBytes(`${filePath}/` + d.file) + "kb";
    d.newSize = newSize;
  }
});

function getFilesizeInKiloBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size / 1024;
  return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
  let files = fs.readdirSync(dir);
  return files.filter((e) => path.extname(e).toLowerCase() === extension);
}

// Function to parse named arguments
function parseArgs(args) {
  const argObj = {};
  args.forEach((arg) => {
    const [key, value] = arg.split('=');
    argObj[key.replace('--', '')] = value;
  });
  return argObj;
}