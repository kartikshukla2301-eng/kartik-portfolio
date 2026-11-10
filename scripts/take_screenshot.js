const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = process.argv[2] || 'https://theinfinitysocks.com/';
const targetName = process.argv[3] || 'ref_infinity.png';
const tempOut = path.join(os.tmpdir(), targetName);

console.log('Capturing:', targetUrl, '->', tempOut);

try {
  execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --window-size=1920,1080 --screenshot="${tempOut}" --virtual-time-budget=6000 "${targetUrl}"`);
  if (fs.existsSync(tempOut)) {
    console.log('Successfully captured in temp:', tempOut, 'Size:', fs.statSync(tempOut).size);
    // Copy into workspace
    const dest = path.join(process.cwd(), targetName);
    fs.copyFileSync(tempOut, dest);
    console.log('Copied to workspace:', dest, 'Size:', fs.statSync(dest).size);
  } else {
    console.log('File does not exist in temp after command');
  }
} catch (e) {
  console.error('Error:', e.message);
}
