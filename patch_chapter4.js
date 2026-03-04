const fs = require('fs');
const file = '2026Predictions/webapp/src/components/Chapter4.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Math\.floor\(Math\.random\(\)\*3\)/g, "match.score1");
content = content.replace(/Math\.floor\(Math\.random\(\)\*3\)/g, "match.score2"); // Need to be careful here

fs.writeFileSync('temp.tsx', content);
