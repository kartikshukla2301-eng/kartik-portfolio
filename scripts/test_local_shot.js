const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error('Status ' + res.statusCode));
        });
        req.on('error', reject);
        req.end();
      });
      return true;
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error('Server timeout');
}

async function run() {
  console.log('Starting next start on port 3456...');
  const server = spawn('npx', ['next', 'start', '-p', '3456'], { shell: true, stdio: 'inherit' });

  try {
    await waitForServer('http://127.0.0.1:3456');
    console.log('Server is UP! Capturing screenshots...');

    // 1. Desktop after loader
    const tempDesktop = path.join(os.tmpdir(), 'portfolio_desktop.png');
    execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --window-size=1920,1080 --screenshot="${tempDesktop}" --virtual-time-budget=4000 "http://127.0.0.1:3456/?noloader=1"`);
    if (fs.existsSync(tempDesktop)) {
      fs.copyFileSync(tempDesktop, path.join(process.cwd(), 'portfolio_desktop.png'));
      console.log('Saved portfolio_desktop.png, size:', fs.statSync('portfolio_desktop.png').size);
    }

    // 2. Mobile after loader
    const tempMobile = path.join(os.tmpdir(), 'portfolio_mobile.png');
    execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --window-size=390,844 --screenshot="${tempMobile}" --virtual-time-budget=4000 "http://127.0.0.1:3456/?noloader=1"`);
    if (fs.existsSync(tempMobile)) {
      fs.copyFileSync(tempMobile, path.join(process.cwd(), 'portfolio_mobile.png'));
      console.log('Saved portfolio_mobile.png, size:', fs.statSync('portfolio_mobile.png').size);
    }
  } finally {
    console.log('Stopping server...');
    try {
      process.platform === 'win32' ? execSync('taskkill /pid ' + server.pid + ' /T /F') : server.kill();
    } catch {}
  }
}

run().catch(console.error);
