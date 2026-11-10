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

    // 1. Desktop Hero Viewport (1920x1080)
    const tempDesktop = path.join(os.tmpdir(), 'portfolio_desktop.png');
    execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --window-size=1920,1080 --screenshot="${tempDesktop}" --virtual-time-budget=4000 "http://127.0.0.1:3456/?noloader=1&reveal=1"`);
    if (fs.existsSync(tempDesktop)) {
      fs.copyFileSync(tempDesktop, path.join(process.cwd(), 'portfolio_desktop.png'));
      console.log('Saved portfolio_desktop.png, size:', fs.statSync('portfolio_desktop.png').size);
    }

    // 2. Experience 2x2 Grid View
    const tempExp = path.join(os.tmpdir(), 'portfolio_experience.png');
    execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --window-size=1920,1200 --screenshot="${tempExp}" --virtual-time-budget=4000 "http://127.0.0.1:3456/?noloader=1&reveal=1&section=experience"`);
    if (fs.existsSync(tempExp)) {
      fs.copyFileSync(tempExp, path.join(process.cwd(), 'portfolio_experience.png'));
      console.log('Saved portfolio_experience.png, size:', fs.statSync('portfolio_experience.png').size);
    }

    // 3. GitHub Activity Section View
    const tempGit = path.join(os.tmpdir(), 'portfolio_github.png');
    execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --window-size=1920,1300 --screenshot="${tempGit}" --virtual-time-budget=4000 "http://127.0.0.1:3456/?noloader=1&reveal=1&section=github"`);
    if (fs.existsSync(tempGit)) {
      fs.copyFileSync(tempGit, path.join(process.cwd(), 'portfolio_github.png'));
      console.log('Saved portfolio_github.png, size:', fs.statSync('portfolio_github.png').size);
    }

    // 4. Mobile (390x844)
    const tempMobile = path.join(os.tmpdir(), 'portfolio_mobile.png');
    execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --window-size=390,844 --screenshot="${tempMobile}" --virtual-time-budget=4000 "http://127.0.0.1:3456/?noloader=1&reveal=1"`);
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
