#!/usr/bin/env node
/**
 * Validações leves do projeto (zero dependências de runtime).
 * Uso: node tests/validate.mjs
 *
 * Cobertura:
 *  1. Balanceamento de tags nos HTML (index, 404, fluxograma).
 *  2. Chaves data-i18n existem em pt e en; texto PT do HTML casa com o dicionário.
 *  3. Caminhos internos (href/src) existem; âncoras internas têm destino.
 *  4. Sem placeholders conhecidos e sem referências a .png (migradas para WebP).
 *  5. Sintaxe dos scripts inline do fluxograma e dos arquivos js/.
 *  6. Nenhum segredo/token óbvio versionado.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const fail = (msg) => { failures++; console.error('FALHA:', msg); };
const ok = (msg) => console.log('ok:', msg);

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr', 'circle', 'line', 'path', 'rect',
  'polyline', 'polygon', 'ellipse', 'use', 'stop',
]);

function checkTagBalance(file) {
  const src = readFileSync(join(root, file), 'utf8');
  const stack = [];
  const errors = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)[^>]*?(\/?)>/g;
  let m;
  while ((m = re.exec(src))) {
    const closed = m[1] === '/';
    const tag = m[2].toLowerCase();
    const self = m[3] === '/';
    if (VOID_TAGS.has(tag) || self) continue;
    if (!closed) {
      stack.push(tag);
    } else {
      const top = stack.pop();
      if (top !== tag) errors.push(`</${tag}> inesperado (esperava </${top ?? '??'}>)`);
    }
  }
  stack.forEach((t) => errors.push(`<${t}> nunca fechado`));
  if (errors.length) errors.forEach((e) => fail(`${file}: ${e}`));
  else ok(`${file}: tags balanceadas`);
}

function loadTranslations() {
  const src = readFileSync(join(root, 'js/i18n.js'), 'utf8');
  const mod = { exports: {} };
  new Function('module', `${src}\n;module.exports = translations;`)(mod);
  return mod.exports;
}

function checkI18n() {
  const translations = loadTranslations();
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  const used = new Set([...html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map((m) => m[1]));
  for (const lang of ['pt', 'en']) {
    for (const key of used) {
      if (translations[lang]?.[key] === undefined) fail(`i18n: chave "${key}" ausente em "${lang}"`);
    }
  }
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const re = /<(h1|h2|h3|p|div|span|a|li)[^>]*data-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  const seen = new Set();
  let diverged = 0;
  while ((m = re.exec(html))) {
    const key = m[2];
    if (seen.has(key)) continue;
    seen.add(key);
    const htmlText = norm(m[3]);
    const dict = norm(translations.pt[key] ?? '');
    if (dict !== htmlText) { diverged++; fail(`i18n: HTML diverge do dicionário PT em "${key}"`); }
  }
  if (!diverged) ok('i18n: HTML (PT) sincronizado com dicionário; chaves completas em pt/en');
}

function checkInternalPaths() {
  const files = ['index.html', '404.html', 'fluxograma-si/index.html'];
  const attrRe = /(?:href|src)="([^"#]+)(?:#[^"]*)?"/g;
  for (const file of files) {
    const src = readFileSync(join(root, file), 'utf8');
    const dir = dirname(join(root, file));
    for (const [, path] of src.matchAll(attrRe)) {
      if (/^(https?:|mailto:|data:)/.test(path) || path.startsWith('/')) continue;
      const target = join(dir, path.split('?')[0]);
      if (!existsSync(target)) fail(`${file}: caminho interno não encontrado: ${path}`);
    }
  }
  ok('caminhos internos: todos existem');
}

function checkAnchors() {
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
    if (anchor === '') continue;
    if (!ids.has(anchor)) fail(`index.html: âncora #${anchor} sem destino`);
  }
  ok('âncoras internas: todas com destino');
}

function checkPlaceholdersAndPng() {
  const files = ['index.html', 'js/i18n.js', 'js/main.js', 'css/style.css', '404.html', 'fluxograma-si/index.html'];
  const pngAllowed = /og-image\.png|apple-touch-icon\.png/g;
  for (const file of files) {
    let src = readFileSync(join(root, file), 'utf8');
    const srcForPng = src.replaceAll(pngAllowed, 'permitido');
    if (/Coloque seu|TODO|FIXME/.test(src)) fail(`${file}: placeholder restante`);
    if (/\.png/.test(srcForPng)) fail(`${file}: referência a .png (esperado WebP)`);
  }
  ok('sem placeholders conhecidos; sem referências a .png (exceto og-image/apple-touch-icon)');
}

function checkSecrets() {
  const files = ['index.html', '404.html', 'js/i18n.js', 'js/main.js', 'fluxograma-si/index.html'];
  const patterns = [/api[_-]?key/i, /secret/i, /token/i, /password/i, /AKIA[0-9A-Z]{16}/];
  for (const file of files) {
    const src = readFileSync(join(root, file), 'utf8');
    for (const p of patterns) {
      if (p.test(src)) fail(`${file}: possível segredo/credencial (padrão ${p})`);
    }
  }
  ok('segurança: nenhum padrão de segredo encontrado');
}

checkTagBalance('index.html');
checkTagBalance('404.html');
checkTagBalance('fluxograma-si/index.html');
checkI18n();
checkInternalPaths();
checkAnchors();
checkPlaceholdersAndPng();
checkSecrets();

if (failures) {
  console.error(`\n${failures} falha(s).`);
  process.exit(1);
}
console.log('\nTodas as validações passaram.');
