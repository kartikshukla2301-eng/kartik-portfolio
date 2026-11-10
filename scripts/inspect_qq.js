const fs = require('fs');
const html = fs.readFileSync('ref_site.html', 'utf8');

const qqMatch = html.match(/<section[^>]*id=["']tech["'][\s\S]*?<\/section>/i);
if (qqMatch) {
  console.log('=== QQ HTML (length: ' + qqMatch[0].length + ') ===');
  console.log(qqMatch[0].slice(0, 3000));
}

