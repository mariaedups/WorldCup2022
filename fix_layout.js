const fs = require('fs');
const file = '2026Predictions/webapp/src/components/Layout.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  `? 'text-primary font-bold border-b border-primary pb-0.5 text-white'`,
  `? 'text-primary font-bold border-b border-primary pb-0.5'`
);

fs.writeFileSync(file, content);
