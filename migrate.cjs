const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  if (file.endsWith('.js') && !file.includes('App.js') && !file.includes('main.js')) {
    let content = fs.readFileSync(file, 'utf-8');
    let changed = false;

    if (!content.includes('"use client"') && !content.includes("'use client'")) {
       content = '"use client";\n' + content;
       changed = true;
    }

    if (content.includes('react-router-dom')) {
      changed = true;
      content = content.replace(/import\s*\{\s*([^}]*)\s*\}\s*from\s*['"]react-router-dom['"];?/g, (match, importsStr) => {
        let imports = importsStr.split(',').map(s => s.trim());
        let lines = [];
        
        if (imports.includes('Link') || imports.includes('NavLink')) {
            lines.push(`import Link from 'next/link';`);
        }
        
        let nav = [];
        if (imports.includes('useNavigate')) nav.push('useRouter');
        if (imports.includes('useLocation')) nav.push('usePathname');
        if (imports.includes('useParams')) nav.push('useParams');
        
        if (nav.length > 0) {
          lines.push(`import { ${nav.join(', ')} } from 'next/navigation';`);
        }
        return lines.join('\n');
      });

      // Replace Link to= and NavLink to=
      content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');
      content = content.replace(/<\/NavLink>/g, '</Link>');
      content = content.replace(/<NavLink([^>]+)to=/g, '<Link$1href=');
      
      // Replace useNavigate usages
      content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\)/g, 'const router = useRouter()');
      content = content.replace(/navigate\(/g, 'router.push(');
      
      // Replace useLocation usages
      content = content.replace(/const\s+location\s*=\s*useLocation\(\)/g, 'const pathname = usePathname()');
      content = content.replace(/location\.pathname/g, 'pathname');
      content = content.replace(/location\.hash/g, "(typeof window !== 'undefined' ? window.location.hash : '')");
      content = content.replace(/location\.search/g, "(typeof window !== 'undefined' ? window.location.search : '')");
    }

    if (changed) {
      fs.writeFileSync(file, content);
    }
  }
});
console.log('Migrated components');
