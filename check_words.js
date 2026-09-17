const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

// Buscamos párrafos con clase academic-text y citas con academic-quote que no tengan hijos academic-text
const matches = html.match(/<p[^>]*class="[^"]*academic-text[^"]*"[^>]*>([\s\S]*?)<\/p>/gi) || [];

let total = 0;
matches.forEach((m, i) => {
  const clean = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const count = clean.split(' ').filter(Boolean).length;
  total += count;
});

// Sumamos los 3 bloques aristotélicos de .academic-quote
const quoteMatches = html.match(/<div[^>]*class="[^"]*academic-quote[^"]*"[^>]*>([\s\S]*?)<\/div>/gi) || [];
quoteMatches.forEach((m, i) => {
  // Solo si no contiene un p.academic-text dentro
  if (!m.includes('academic-text')) {
    const clean = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const count = clean.split(' ').filter(Boolean).length;
    total += count;
  }
});

console.log('TOTAL REAL DE PALABRAS ACADÉMICAS:', total);

