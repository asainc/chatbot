const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('a navegação principal abre o AI Ready e preserva o BJN', () => {
  const routes = read('src/app/app.routes.ts');
  assert.equal(routes.includes("path: 'ai-ready'"), true);
  assert.equal(routes.includes("path: 'bjn'"), true);
  assert.equal(routes.includes("redirectTo: 'ai-ready'"), true);
});

test('AI Ready possui upload, linha do tempo e chat flutuante', () => {
  const component = read('src/app/ai-ready/ai-ready-page.component.ts');
  assert.equal(component.includes('Adicionar PDFs'), true);
  assert.equal(component.includes('Linha do tempo dos fatos'), true);
  assert.equal(component.includes('chat-launcher'), true);
  assert.equal(component.includes('gpt_bradesco.text_generator'), true);
});

test('o frontend executável contém somente os módulos atuais', () => {
  const appEntries = fs.readdirSync(path.join(root, 'src/app'), {withFileTypes: true}).map(item => item.name).sort();
  assert.deepEqual(appEntries, ['ai-ready', 'app.component.ts', 'app.routes.ts', 'core', 'shared', 'templates'].sort());
});


test('contratos de evidência usam documento em português em todo o template', () => {
  const component = read('src/app/ai-ready/ai-ready-page.component.ts');
  assert.equal(component.includes('event.document +'), false);
  assert.equal(component.includes('source.document +'), false);
  assert.equal(component.includes('{{ source.document }}'), false);
  assert.equal(component.includes('event.documento +'), true);
  assert.equal(component.includes('source.documento +'), true);
  assert.equal(component.includes('{{ source.documento }}'), true);
});

test('orquestrador local aguarda a versão atual da API', () => {
  const startDev = read('../scripts/start-dev.mjs');
  assert.equal(startDev.includes('/api/v2/saude'), false);
  assert.equal(startDev.includes('/api/v3/saude'), true);
  assert.equal(startDev.includes("join(root, 'src')"), false);
});


test('chatbot permanece visível, acima do PDF e fora da barra lateral', () => {
  const component = read('src/app/ai-ready/ai-ready-page.component.ts');
  const workspaceStyles = read('src/workspace-layout.scss');
  const globalStyles = read('src/styles.scss');

  assert.equal(component.includes('[disabled]="!workspace()"\n        (click)="toggleChat()"'), false);
  assert.equal(component.includes('if (!this.workspace()) return;'), false);
  assert.equal(component.includes('Analise os PDFs para habilitar as perguntas'), true);
  assert.equal(workspaceStyles.includes('left:calc(var(--app-sidebar-width, 0px) + 22px)'), true);
  assert.equal(workspaceStyles.includes('z-index:1310'), true);
  assert.equal(workspaceStyles.includes('z-index:1300'), true);
  assert.equal(globalStyles.includes('--app-sidebar-width:244px'), true);
  assert.equal(globalStyles.includes('--app-sidebar-width:72px'), true);
});
