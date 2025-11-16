#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

// Legge i parametri da linea di comando
const [,, srcArg, destArg] = process.argv;

if (!srcArg || !destArg) {
  console.error('Usage: tsx copy.ts <src> <dest>');
  process.exit(1);
}

const srcDir = path.resolve(process.cwd(), srcArg);
const destDir = path.resolve(process.cwd(), destArg);

// Funzione ricorsiva per copiare e modificare i file
async function copyAndModify(dir: string, target: string) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const destPath = path.join(target, entry.name);
      await copyAndModify(srcPath, destPath);
    } else {
      let destFileName = entry.name;

      // Rinomina immagini aggiungendo "_"
      if (/\.(jpg|png)$/i.test(entry.name)) {
        destFileName = `_${entry.name}`;
      }

      const destPath = path.join(target, destFileName);

      let content: string | Buffer = fs.readFileSync(srcPath);

      if (entry.name === 'index.mdx') {
        content = modifyIndexMdx(content.toString());
      }

      fs.writeFileSync(destPath, content);
    }
  }
}

// Modifica index.mdx: seconda riga layout, filtra righe, trasforma <img>, sostituisce tag speciali
function modifyIndexMdx(content: string): string {
  let lines = content.split(/\r?\n/);

  // Filtra righe che non devono essere copiate
  lines = lines.filter(line => {
    const trimmed = line.trim();
    return !(
      trimmed.startsWith('featureImage') ||
      trimmed.startsWith('<Spotify') ||
      trimmed.startsWith('<Instagram')
    );
  });

  // Inserisce layout come seconda riga
  lines.splice(1, 0, 'layout: /src/layouts/SinglePost.astro');

  let result = lines.join('\n');

  // Trasforma <img> in Markdown con underscore robustamente
  const imgRegex = /<img\s+([^>]*?)>/gi;
  result = result.replace(imgRegex, (match, attrs) => {
    const srcMatch = attrs.match(/src\s*=\s*(['"])(.*?)\1/i);
    const altMatch = attrs.match(/alt\s*=\s*(['"])(.*?)\1/i);

    if (!srcMatch) return match;

    const src = srcMatch[2];
    const alt = altMatch ? altMatch[2] : '';

    const fileName = path.basename(src).split('?')[0];
    const newFileName = `_${fileName}`;

    return `![${alt}](./${newFileName})`;
  });

  // Sostituzioni tag speciali: Setting, Feedback, Rules
  const tags = ['Setting', 'Feedback', 'Rules', 'Panoramic'];
  tags.forEach(tag => {
    const openTagRegex = new RegExp(`<${tag}>`, 'gi');
    const closeTagRegex = new RegExp(`</${tag}>`, 'gi');

    result = result.replace(openTagRegex, `<${tag}><p>`);
    result = result.replace(closeTagRegex, `</p></${tag}>`);
  });

  return result;
}

// Avvia il processo
copyAndModify(srcDir, destDir)
  .then(() => console.log('Copia completata!'))
  .catch(err => console.error(err));
