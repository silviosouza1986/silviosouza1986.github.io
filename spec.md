# Especificação técnica — Modernização do portfólio pessoal

> **Documento:** `spec.md`  
> **Projeto:** `silviosouza1986.github.io`  
> **Repositório:** <https://github.com/silviosouza1986/silviosouza1986.github.io>  
> **Site publicado:** <https://silviosouza1986.github.io/>  
> **Branch observada:** `main`  
> **Data da inspeção:** 17/11/2026  
> **Status:** especificação proposta; nenhuma etapa de implementação foi iniciada ou aprovada.

---

## 0. Regras de execução e governança

Este documento é a fonte de verdade para a modernização. A implementação deve ser incremental, preservar o caráter estático do projeto e não introduzir funcionalidades ou informações pessoais sem confirmação.

### 0.1. Regras obrigatórias

1. Antes de cada etapa, ler integralmente esta especificação e inspecionar novamente os arquivos envolvidos na branch de trabalho.
2. Trabalhar em branch própria; não reescrever histórico, não executar `force push` e não alterar configurações de publicação sem justificativa e autorização.
3. Implementar somente o escopo da etapa corrente. Mudanças adicionais devem ser registradas como desvio e aprovadas antes de serem incorporadas.
4. Não inventar período acadêmico, datas, experiências, certificações, métricas, competências ou resultados dos projetos.
5. Não remover projetos, links ou funcionalidades sem registrar motivo, impacto e alternativa.
6. Não considerar testes executados sem saída, relatório ou evidência verificável.
7. Marcar uma etapa como concluída somente após todos os critérios de aceitação e a Definition of Done terem sido aprovados.
8. Se uma validação falhar, registrar a falha, corrigir e repetir a validação. Não avançar silenciosamente.
9. Não adicionar framework, biblioteca, gerenciador de pacotes ou serviço externo sem necessidade demonstrada.
10. Manter GitHub Pages como hospedagem-alvo, salvo decisão técnica documentada e aprovada.

### 0.2. Estados de acompanhamento

Usar exclusivamente estes estados no histórico deste documento:

- `PENDENTE`: ainda não iniciada.
- `EM ANDAMENTO`: execução iniciada.
- `BLOQUEADA`: depende de informação, acesso ou decisão externa.
- `REPROVADA`: critérios ou validações falharam.
- `CONCLUÍDA`: todos os critérios e a Definition of Done foram verificados.

**Estado inicial de todas as etapas:** `PENDENTE`. Não alterar estados durante a preparação deste plano.

### 0.3. Evidências mínimas por etapa

Registrar no próprio documento, no bloco da etapa:

- data da execução;
- commit/hash ou pull request;
- comandos executados;
- resultado de cada validação;
- navegadores e resoluções testados;
- falhas encontradas e correções;
- desvios de escopo e decisões;
- pendências conhecidas.

---

## 1. Diagnóstico atual

### 1.1. Escopo e método da inspeção

Foram consultados o site publicado, a página pública do repositório e os arquivos-fonte que puderam ser lidos diretamente: `index.html`, `css/style.css`, `js/main.js` e `js/i18n.js`.

A página do repositório apresentou a estrutura de primeiro nível com `assets/`, `css/`, `fluxograma-si/`, `js/` e `index.html`. O repositório mostrava oito commits na consulta. O site publicado respondeu e apresentou as seções de apresentação, sobre, projetos e contato.

**Limitação importante:** a navegação automatizada não conseguiu abrir o conteúdo das pastas `assets/`, `fluxograma-si/` e demais listagens internas do GitHub. Também não foi possível clonar o repositório neste ambiente. Portanto, a inspeção de imagens, do projeto independente do fluxograma, de arquivos auxiliares, do histórico detalhado e de eventuais configurações ocultas (`.github/workflows`, por exemplo) permanece pendente. Não afirmar que esses itens inexistem; confirmar na primeira etapa de implementação com checkout local.

A inspeção do site foi visual e baseada no conteúdo HTML servido. Não foram executados Lighthouse, axe, testes em dispositivos reais, análise de rede, scanner de dependências ou testes automatizados. Métricas de Core Web Vitals e conformidade WCAG ainda não foram medidas.

### 1.2. Arquitetura e tecnologias observadas

| Área | Evidência observada | Diagnóstico |
|---|---|---|
| Hospedagem | Site publicado em `*.github.io` | Compatível com GitHub Pages e conteúdo estático |
| Estrutura | `index.html`, `css/`, `js/`, `assets/`, `fluxograma-si/` | Organização simples, adequada ao porte atual |
| Marcação | HTML5, idioma inicial `pt-BR` | Sem framework de interface identificado no HTML examinado |
| Estilos | CSS próprio em `css/style.css` | CSS com variáveis, componentes por classe e media queries |
| Scripts | JavaScript nativo em `js/main.js` e `js/i18n.js` | Sem dependências externas de runtime identificadas nesses arquivos |
| Idiomas | Dicionário `pt`/`en`, atributos `data-i18n` | Internacionalização manual no cliente |
| Tema | `data-theme`, `localStorage` e `prefers-color-scheme` | Alternância claro/escuro já implementada |
| Menu | Menu móvel com overlay e classes CSS | Funcionalidade existente; acessibilidade precisa ser reforçada |
| Animações | `IntersectionObserver` para elementos `.reveal` | Implementação leve, mas falta tratamento explícito para movimento reduzido |
| Tipografia | `@import` do Google Fonts para Inter | Recurso externo que pode atrasar renderização e criar dependência de terceiros |
| Deploy | Site estático servido pelo GitHub Pages | Workflow e regras de publicação ainda não verificados |

Não há evidência suficiente para afirmar a existência de um processo de build, testes, lint, minificação ou CI. O HTML referencia diretamente os arquivos CSS e JavaScript.

### 1.3. Conteúdo e funcionalidades observados

O site apresenta:

- hero com foto, nome, subtítulo e chamada para projetos;
- seção “Sobre mim” com texto e cartões de informações acadêmicas/interesses;
- alternância de idioma português/inglês;
- alternância de tema claro/escuro;
- navegação móvel com botão e overlay;
- seção de projetos com Gym Template, OdontoNexus, Fluxograma de Sistemas de Informação e Oferte;
- links para repositórios e para a página do fluxograma;
- seção de contato com GitHub e LinkedIn;
- rodapé com ano 2026.

Os projetos e as funcionalidades acima devem ser preservados durante a modernização, salvo decisão documentada.

### 1.4. Problemas e riscos identificados

#### P0 — Integridade e funcionamento

- **HTML com fechamento estrutural suspeito na seção de contato:** o trecho consultado contém fechamentos `</a>` e `</div>` excedentes após o fechamento do grid de contato (próximo às linhas 288–290 da versão consultada). Validar com parser/validador HTML e corrigir a árvore DOM sem alterar o conteúdo visual pretendido.
- **Falha potencial de inicialização por armazenamento local:** `main.js` acessa `localStorage` diretamente. Em contextos nos quais o armazenamento esteja indisponível ou lance exceção, o script pode interromper a inicialização das interações. Implementar leitura/escrita resiliente com fallback em memória.
- **Menu móvel sem contrato de acessibilidade:** o botão não atualiza `aria-expanded`, não referencia o menu por `aria-controls` e não há gestão de foco/fechamento por Escape observável. Isso afeta operação por teclado e tecnologias assistivas.

#### P1 — Alta

- **Metadados de SEO ausentes no `<head>` consultado:** há charset, viewport, título e stylesheet, mas não foram encontrados description, canonical, Open Graph, Twitter Card ou favicon na marcação examinada.
- **Hierarquia semântica incompleta:** a página utiliza `nav` e `section`, mas não foi observado link para pular ao conteúdo nem um `main` envolvendo o conteúdo principal.
- **Estados de foco não definidos de forma explícita no CSS consultado:** adicionar `:focus-visible` perceptível e consistente para links e controles.
- **Movimento reduzido:** as transições e animações `.reveal` não apresentam regra `prefers-reduced-motion` no CSS consultado.
- **Links externos em nova aba sem `rel` explícito:** há âncoras com `target="_blank"` sem `rel="noopener noreferrer"` no HTML examinado. Corrigir e conferir todos os links externos.
- **Conteúdo provisório divergente:** o HTML inicial contém “Coloque seu período aqui”, enquanto o dicionário português de `i18n.js` contém “Segundo semestre”. A informação precisa ser confirmada pelo proprietário antes de se escolher um valor definitivo; não presumir que o texto do dicionário esteja atualizado.
- **Apresentação profissional genérica:** o texto atual comunica interesse em tecnologia, dados e soluções, mas não organiza claramente o papel de cada projeto, problema resolvido, contribuição pessoal, situação (acadêmico, experimental ou publicado) e links de demonstração. Melhorar a narrativa sem acrescentar fatos não confirmados.

#### P2 — Média

- **Imagens sem dimensões intrínsecas declaradas no HTML examinado:** adicionar `width` e `height` reais após verificar os arquivos, reduzindo risco de CLS. Usar `loading="lazy"` e `decoding="async"` em imagens fora da primeira dobra; avaliar LCP da imagem principal separadamente.
- **Fonte carregada por `@import`:** avaliar substituição por `<link rel="preconnect">`/stylesheet no HTML ou fonte de sistema/local. Escolher com base em medição; não adicionar peso ou arquivos de fonte sem necessidade.
- **Internacionalização frágil:** validar o valor salvo de idioma antes de utilizá-lo; o código assume que qualquer valor salvo corresponde a uma chave existente. A atualização do rodapé usa `innerHTML`, embora o conteúdo seja texto de tradução estático; preferir `textContent` e entidade HTML tratada na marcação ou estratégia equivalente segura.
- **Atributos de acessibilidade e nomes dos controles:** os rótulos atuais “Alternar idioma”, “Alternar tema” e “Menu” são genéricos. Tornar o estado/ação explícitos e sincronizar idioma do documento, estado do menu e nome acessível.
- **Carregamento das imagens de projetos:** avaliar compressão, formato moderno (WebP/AVIF quando compatível), tamanho responsivo e peso real dos arquivos.
- **Layout de cards:** há regras especiais para o último card e para o card em destaque que podem produzir distribuição inesperada conforme a quantidade de projetos. Simplificar após validar os cenários de 1, 2, 3, 4 e 5 cards.

#### P3 — Baixa

- Microinterações adicionais, desde que discretas, úteis e compatíveis com `prefers-reduced-motion`.
- Refinamento de estados hover/active e pequenos detalhes de consistência visual.
- Dados estruturados `Person`/`WebSite`, apenas se os dados forem verdadeiros, públicos e apropriados.
- Melhorias editoriais incrementais conforme novos projetos forem confirmados.

### 1.5. Pontos positivos a preservar

- Arquitetura estática e sem dependência de framework identificada.
- Separação básica entre HTML, CSS e JavaScript.
- Uso de variáveis CSS para cores e temas.
- Layout com media queries para telas menores.
- Idioma inicial `pt-BR` e conteúdo em português e inglês.
- Alternância de tema com respeito inicial à preferência do sistema.
- Uso de `IntersectionObserver` com fallback quando a API não existe.
- Imagens locais para os projetos, conforme descrições disponíveis.
- Portfólio já reúne projetos de naturezas distintas e links para código/demonstração.

### 1.6. Itens ainda não verificados

Os itens abaixo devem ser verificados na etapa `E00`, sem tratá-los como defeitos confirmados:

- conteúdo e dimensões reais de cada imagem em `assets/`;
- conteúdo integral de `fluxograma-si/`, dependências, scripts e acessibilidade dessa aplicação;
- arquivos adicionais em `css/` e `js/`;
- presença de `.nojekyll`, `CNAME`, favicon, `robots.txt`, `sitemap.xml` e workflows;
- configuração de branch/pasta de publicação do GitHub Pages;
- status de segurança e alertas de dependências (não há manifesto de dependências identificado na raiz consultada);
- headers HTTP, cache, compressão e MIME types;
- links quebrados, disponibilidade dos repositórios e consistência entre descrição e implementação dos projetos;
- métricas reais de Lighthouse, PageSpeed Insights e Core Web Vitals;
- contraste medido em todos os pares de cores dos dois temas;
- comportamento em navegadores e leitores de tela reais.

---

## 2. Visão do resultado esperado

### 2.1. Objetivo de produto

Transformar o site em um portfólio pessoal claro, confiável e profissional, que apresente a pessoa, seu posicionamento, seus projetos e formas de contato sem exagerar competências ou criar credenciais. O visitante deve compreender rapidamente:

1. quem é o autor e qual é sua área de atuação/formação, conforme informação confirmada;
2. quais problemas e projetos o portfólio demonstra;
3. quais tecnologias foram efetivamente utilizadas em cada projeto;
4. onde consultar o código ou experimentar a demonstração;
5. como entrar em contato.

### 2.2. Direção visual

Adotar uma linguagem visual contemporânea, editorial e discreta, com foco em legibilidade e conteúdo:

- preservar a identidade cromática atual como ponto de partida, refinando tokens para contraste AA;
- paleta curta com fundo, superfície, texto principal, texto secundário, borda e uma cor de destaque;
- tema claro e escuro coerentes, ambos com contraste verificado;
- tipografia de sistema como fallback obrigatório; manter Inter somente se o carregamento e o benefício visual forem justificados;
- escala tipográfica fluida com `clamp()` onde útil;
- largura de leitura controlada e espaçamento consistente;
- cards de projeto com título, resumo, contexto, tecnologias e links claramente diferenciados;
- estados hover discretos e equivalentes de foco por teclado;
- animações curtas e não essenciais, removidas/reduzidas quando o usuário solicitar movimento reduzido.

Não escolher uma estética de “dashboard”, não adicionar gradientes/glows em excesso e não utilizar elementos meramente decorativos que prejudiquem leitura ou desempenho.

### 2.3. Arquitetura proposta

Manter HTML, CSS e JavaScript nativos. Não migrar para React, Vue, Angular, Svelte, Tailwind ou bundler nesta modernização: o site é pequeno, estático e não apresenta necessidade comprovada que compense custo de build e manutenção.

Estrutura-alvo sugerida, sujeita à conferência da etapa E00:

```text
/
├── index.html
├── spec.md
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── images/
│   └── ... (preservar caminhos existentes durante migração)
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── i18n.js
├── fluxograma-si/
│   └── ... (manter projeto autônomo)
└── .github/
    └── workflows/ (somente se houver justificativa para CI)
```

A estrutura não deve ser reorganizada apenas por estética. Não mover recursos sem atualizar e testar todas as referências, inclusive as utilizadas pelo projeto `fluxograma-si`.

### 2.4. Requisitos funcionais

- RF-01: a navegação por âncoras deve levar às seções corretas.
- RF-02: o menu móvel deve abrir, fechar, permitir navegação por teclado, fechar com Escape e restaurar o foco de forma previsível.
- RF-03: o estado do menu deve ser anunciado corretamente (`aria-expanded`, `aria-controls`).
- RF-04: a alternância PT/EN deve atualizar conteúdo traduzível, `document.documentElement.lang` e título; o idioma salvo deve ser validado.
- RF-05: a alternância claro/escuro deve funcionar com preferência do sistema como padrão inicial e preferência manual persistida.
- RF-06: falha ou bloqueio de `localStorage` não pode impedir o restante do site de funcionar.
- RF-07: animações não devem ocultar conteúdo se JavaScript falhar ou se movimento reduzido estiver ativo.
- RF-08: links de projetos devem continuar apontando para os destinos corretos.
- RF-09: nenhum dado profissional ou acadêmico não confirmado poderá ser publicado.
- RF-10: todas as páginas/seções devem permanecer utilizáveis em larguras móveis e desktop.

### 2.5. Requisitos não funcionais

- RNF-01: hospedagem compatível com GitHub Pages, sem backend.
- RNF-02: sem dependência obrigatória de framework ou pacote de runtime.
- RNF-03: HTML semântico e WCAG 2.2 AA como meta de conformidade.
- RNF-04: conteúdo essencial disponível sem animações e sem armazenamento local.
- RNF-05: imagens otimizadas e dimensões reservadas para reduzir CLS.
- RNF-06: SEO técnico básico e compartilhamento social adequados.
- RNF-07: alterações testáveis por comandos reproduzíveis e checklist manual.
- RNF-08: nenhuma credencial, segredo ou dado pessoal não destinado à publicação no repositório.

---

## 3. Backlog priorizado

> Os caminhos listados são estimativas baseadas nos arquivos observados. A etapa E00 deve confirmar a estrutura completa e ajustar os caminhos antes da execução.

### P0 — Crítica

#### PORT-001 — Corrigir estrutura HTML da seção de contato
- **Problema:** fechamentos excedentes aparentes após o grid de contato.
- **Solução:** validar `index.html` com Nu HTML Checker e corrigir a árvore de elementos mantendo conteúdo e apresentação.
- **Arquivos:** `index.html`.
- **Prioridade:** P0.
- **Critérios de aceitação:** sem erros de parsing/estrutura relevantes no validador; DOM mantém uma seção de contato com os dois links e footer como irmãos; sem perda de conteúdo.
- **Dependências:** E00.

#### PORT-002 — Tornar inicialização resiliente a falhas de armazenamento
- **Problema:** acesso direto a `localStorage` pode interromper a execução de `main.js`.
- **Solução:** encapsular leitura e escrita em funções seguras com fallback em memória; validar valores aceitos para idioma e tema.
- **Arquivos:** `js/main.js`.
- **Prioridade:** P0.
- **Critérios de aceitação:** com `localStorage` normal, preferências persistem; com acesso bloqueado/lançando exceção, menu, idioma e tema continuam operáveis durante a sessão; valores inválidos não quebram a página.
- **Dependências:** E00.

#### PORT-003 — Corrigir acessibilidade essencial do menu móvel
- **Problema:** estado e relação do botão com o menu não são comunicados, e falta comportamento de teclado completo.
- **Solução:** implementar `aria-controls`, `aria-expanded`, nome acessível dinâmico ou estável, fechamento por Escape, foco previsível e retorno de foco ao botão quando aplicável.
- **Arquivos:** `index.html`, `js/main.js`, `css/style.css`.
- **Prioridade:** P0.
- **Critérios de aceitação:** menu operável somente por teclado; estado anunciado corretamente; Escape fecha; foco não se perde atrás do overlay; navegação por link fecha o menu; sem armadilha de foco indevida.
- **Dependências:** E00.

### P1 — Alta

#### PORT-004 — Reforçar semântica e navegação assistiva
- **Problema:** falta skip link e região principal explícita no HTML consultado.
- **Solução:** inserir link “Pular para o conteúdo”, envolver conteúdo principal em `main`, identificar navegação com nome acessível e manter ordem de headings lógica.
- **Arquivos:** `index.html`, `css/style.css`.
- **Prioridade:** P1.
- **Critérios de aceitação:** skip link aparece ao receber foco e leva ao `main`; landmarks são reconhecidos por leitor de tela; headings seguem hierarquia sem saltos injustificados.
- **Dependências:** PORT-001.

#### PORT-005 — Definir estados de foco e contraste WCAG
- **Problema:** CSS consultado não apresenta tratamento explícito e global para foco visível; contraste não foi medido.
- **Solução:** definir `:focus-visible`, revisar paletas de ambos os temas e corrigir pares insuficientes.
- **Arquivos:** `css/style.css`.
- **Prioridade:** P1.
- **Critérios de aceitação:** foco visível em todos os controles; texto normal com contraste mínimo 4.5:1, texto grande 3:1 e componentes/indicadores visuais relevantes 3:1; testes automatizados sem violações críticas conhecidas.
- **Dependências:** E01.

#### PORT-006 — Implementar respeito a movimento reduzido e fallback de animação
- **Problema:** animações `.reveal` podem ocultar conteúdo caso o JS falhe e não há regra `prefers-reduced-motion` observada.
- **Solução:** garantir conteúdo visível por padrão ou degradação segura; reduzir/desativar transições e animações com `prefers-reduced-motion: reduce`.
- **Arquivos:** `css/style.css`, `js/main.js`.
- **Prioridade:** P1.
- **Critérios de aceitação:** conteúdo não fica invisível sem JS; com movimento reduzido, animações não essenciais são removidas/reduzidas; fluxo visual permanece compreensível.
- **Dependências:** E01.

#### PORT-007 — Corrigir links externos e validação de destinos
- **Problema:** links com `target="_blank"` não declaram `rel` explicitamente.
- **Solução:** acrescentar `rel="noopener noreferrer"` quando apropriado e verificar status/destino de todos os links externos e internos.
- **Arquivos:** `index.html`, possivelmente `fluxograma-si/`.
- **Prioridade:** P1.
- **Critérios de aceitação:** links abrem o destino esperado; novas abas têm proteção explícita; nenhum link interno quebrado; links externos indisponíveis são registrados para decisão, não removidos automaticamente.
- **Dependências:** E00.

#### PORT-008 — Completar metadados SEO e compartilhamento
- **Problema:** `<head>` consultado contém somente charset, viewport, title e stylesheet.
- **Solução:** adicionar meta description original, canonical, Open Graph, Twitter Card e favicon com recursos reais; título/descrição em idioma coerente com a estratégia de indexação.
- **Arquivos:** `index.html`, `assets/` e novos arquivos de ícone se necessários.
- **Prioridade:** P1.
- **Critérios de aceitação:** metadados únicos e válidos; URL canonical corresponde ao domínio publicado; imagem social existe, tem dimensões adequadas e não é inventada; validação em depurador de compartilhamento quando disponível.
- **Dependências:** PORT-009 e confirmação de conteúdo.

#### PORT-009 — Resolver conteúdo provisório e posicionamento editorial
- **Problema:** período acadêmico inconsistente entre HTML e tradução; apresentação profissional é genérica.
- **Solução:** solicitar/confirmar dados com o proprietário; reescrever textos com base apenas em fatos confirmados; explicar papel, objetivo, tecnologias e situação de cada projeto.
- **Arquivos:** `index.html`, `js/i18n.js`.
- **Prioridade:** P1.
- **Critérios de aceitação:** nenhum placeholder publicado; português e inglês equivalentes em significado; nenhum dado inventado; cada projeto tem descrição fiel ao que o código/demonstração realmente faz.
- **Dependências:** confirmação do proprietário; inspeção de `fluxograma-si/` e dos links.

#### PORT-010 — Ajustar imagens para desempenho e estabilidade visual
- **Problema:** imagens não declaram dimensões no HTML consultado e não há estratégia de carregamento explícita.
- **Solução:** inventariar arquivos, medir dimensões/peso, otimizar versões e adicionar `width`/`height`; lazy loading apenas para imagens abaixo da dobra.
- **Arquivos:** `index.html`, `assets/`.
- **Prioridade:** P1.
- **Critérios de aceitação:** imagens sem distorção; dimensões reservadas; imagens abaixo da dobra com carregamento tardio; imagem principal não lazy-loaded sem evidência; redução documentada do peso total sem perda visual inaceitável.
- **Dependências:** E00.

### P2 — Média

#### PORT-011 — Refatorar internacionalização e manipulação de conteúdo
- **Problema:** idioma salvo não é validado e `innerHTML` é utilizado para atualizar texto do rodapé.
- **Solução:** validar whitelist `pt`/`en`, centralizar aplicação de idioma, preferir `textContent` e evitar HTML dinâmico sem necessidade.
- **Arquivos:** `js/main.js`, `js/i18n.js`, `index.html`.
- **Prioridade:** P2.
- **Critérios de aceitação:** idioma inválido retorna ao padrão; todos os elementos traduzíveis são atualizados; idioma do documento e título acompanham a seleção; não há inserção de HTML arbitrário.
- **Dependências:** PORT-002, PORT-009.

#### PORT-012 — Consolidar sistema visual e responsividade
- **Problema:** tokens e regras de layout podem ser simplificados e os cards possuem exceções dependentes da posição/quantidade.
- **Solução:** revisar tokens, escala tipográfica, espaçamento, largura de conteúdo, grid de projetos e breakpoints; manter a identidade cromática como base.
- **Arquivos:** `css/style.css`, `index.html`.
- **Prioridade:** P2.
- **Critérios de aceitação:** sem overflow horizontal em 320, 375, 768, 1024, 1440 e 1920 px; cards consistentes para 1–5 itens; claro/escuro coerentes; sem mudança de conteúdo ou destino de links.
- **Dependências:** PORT-005, PORT-009.

#### PORT-013 — Otimizar carregamento de fontes e recursos externos
- **Problema:** `@import` de Google Fonts pode atrasar CSS e introduzir requisição externa.
- **Solução:** comparar fonte de sistema com Inter; se mantida, carregar de forma eficiente, com fallback e política de conexão adequada.
- **Arquivos:** `index.html`, `css/style.css`.
- **Prioridade:** P2.
- **Critérios de aceitação:** escolha justificada por medição visual/performance; sem FOIT prolongado; fallback legível; nenhuma dependência externa redundante.
- **Dependências:** E01, E04.

#### PORT-014 — Criar sitemap e robots
- **Problema:** arquivos não foram confirmados na listagem acessível.
- **Solução:** verificar primeiro; criar `sitemap.xml` e `robots.txt` apenas se ausentes e apropriados ao site público.
- **Arquivos:** `sitemap.xml`, `robots.txt`.
- **Prioridade:** P2.
- **Critérios de aceitação:** sitemap lista URLs canônicas públicas existentes; robots não bloqueia conteúdo que se deseja indexar; URLs respondem corretamente.
- **Dependências:** PORT-008.

#### PORT-015 — Testar projeto independente do fluxograma
- **Problema:** conteúdo interno do diretório não pôde ser inspecionado nesta análise.
- **Solução:** inventariar scripts, estilos, bibliotecas, acessibilidade, responsividade e caminhos; corrigir apenas defeitos comprovados, preservando autonomia.
- **Arquivos:** `fluxograma-si/**`.
- **Prioridade:** P2.
- **Critérios de aceitação:** projeto abre pelo link do portfólio; interação principal funciona com mouse e teclado quando aplicável; console sem erros; layout utilizável em telas móveis; dependências identificadas.
- **Dependências:** E00.

#### PORT-016 — Adicionar validações automatizadas leves
- **Problema:** não foi identificado processo de testes/lint na inspeção limitada.
- **Solução:** adicionar validações sem runtime de produção (por exemplo, HTML validator, link checker e axe em ambiente de teste), somente após confirmar o ambiente e a necessidade.
- **Arquivos:** `.github/workflows/**` ou scripts de desenvolvimento, se adotados.
- **Prioridade:** P2.
- **Critérios de aceitação:** comandos documentados e reproduzíveis; pipeline não publica artefato incorreto; falhas bloqueiam aprovação; sem dependência em produção.
- **Dependências:** E00, E05.

### P3 — Baixa

#### PORT-017 — Dados estruturados
- **Problema:** dados estruturados não foram encontrados no `<head>` consultado.
- **Solução:** avaliar `Person` e `WebSite` em JSON-LD usando apenas informações públicas confirmadas.
- **Arquivos:** `index.html`.
- **Prioridade:** P3.
- **Critérios de aceitação:** JSON-LD válido; sem atributos inventados; dados consistentes com conteúdo visível.
- **Dependências:** PORT-009, PORT-008.

#### PORT-018 — Microinterações e refinamento visual
- **Problema:** oportunidade de melhorar feedback de interação sem alterar fluxo.
- **Solução:** ajustar hover, active, transições e feedback visual com parcimônia.
- **Arquivos:** `css/style.css`, eventualmente `js/main.js`.
- **Prioridade:** P3.
- **Critérios de aceitação:** cada estado tem função clara; foco não depende de hover; movimento reduzido respeitado; sem impacto mensurável relevante em performance.
- **Dependências:** PORT-005, PORT-006, PORT-012.

---

## 4. Plano de implementação por etapas

### E00 — Inventário reproduzível e linha de base
- **Estado:** `PENDENTE`
- **Objetivo:** fechar lacunas da inspeção antes de modificar o projeto.
- **Contexto:** a inspeção remota não conseguiu listar/ler todas as pastas nem executar ferramentas de qualidade.
- **Tarefas:**
  1. Clonar o repositório em ambiente local e registrar branch, commit e `git status`.
  2. Listar todos os arquivos versionados, inclusive ocultos, e identificar arquivos de configuração, workflows, documentação e dependências.
  3. Inspecionar todos os HTML, CSS e JS, incluindo `fluxograma-si/`.
  4. Inventariar imagens com formato, dimensões e tamanho em bytes.
  5. Conferir links, caminhos relativos e destinos de cada projeto.
  6. Verificar configurações do GitHub Pages e workflow de publicação.
  7. Capturar screenshots/estado visual de referência em 320, 375, 768, 1024 e 1440 px.
  8. Executar baseline de Lighthouse (mobile e desktop), validação HTML e auditoria de acessibilidade; salvar resultados sem tratar números como metas finais.
  9. Atualizar “Itens ainda não verificados” com evidências.
- **Arquivos envolvidos:** leitura de todo o repositório; atualizar `spec.md`.
- **Critérios de aceitação:** inventário completo; nenhuma suposição pendente apresentada como fato; baseline e limitações registrados.
- **Validação:** `git status`, listagem versionada, screenshots, relatório de ferramentas e conferência manual.
- **Dependências:** nenhuma.
- **Definition of Done:**
  - [ ] árvore completa documentada;
  - [ ] assets e projeto do fluxograma inventariados;
  - [ ] deploy entendido;
  - [ ] baseline salvo;
  - [ ] lacunas atualizadas no `spec.md`.

### E01 — Integridade do HTML e acessibilidade estrutural
- **Estado:** `PENDENTE`
- **Objetivo:** corrigir marcação e estabelecer navegação semântica.
- **Contexto:** estrutura de contato suspeita e falta de skip link/main observados.
- **Tarefas:**
  1. Corrigir fechamentos excedentes da seção de contato.
  2. Adicionar `main` e skip link.
  3. Identificar landmarks e navegação com nomes acessíveis.
  4. Revisar ordem de headings e hierarquia.
  5. Adicionar `rel="noopener noreferrer"` aos links externos que abrem nova aba.
  6. Preservar todos os projetos e destinos válidos.
- **Arquivos envolvidos:** `index.html`; se necessário, `css/style.css`.
- **Critérios de aceitação:** HTML válido sem erros estruturais; landmarks e skip link funcionais; nenhum link removido sem decisão documentada.
- **Validação:** Nu HTML Checker; navegação por teclado; conferência DOM; verificação de todos os links.
- **Dependências:** E00.
- **Definition of Done:**
  - [ ] PORT-001 aprovada;
  - [ ] PORT-004 aprovada;
  - [ ] PORT-007 aprovada;
  - [ ] nenhuma regressão visual/funcional;
  - [ ] evidências registradas.

### E02 — Robustez do JavaScript e acessibilidade do menu
- **Estado:** `PENDENTE`
- **Objetivo:** impedir que falhas de persistência quebrem o site e completar interação do menu.
- **Contexto:** acesso direto a `localStorage` e estado de menu incompleto.
- **Tarefas:**
  1. Criar helpers seguros para obter/gravar preferências com fallback em memória.
  2. Validar valores persistidos para idioma e tema.
  3. Implementar `aria-controls` e `aria-expanded`.
  4. Implementar Escape e retorno de foco ao botão de menu.
  5. Definir comportamento de foco ao abrir/fechar e ao seguir link.
  6. Garantir restauração do scroll e do estado do overlay em todos os caminhos.
  7. Tratar ausência de elementos/erros de inicialização sem interromper recursos independentes.
- **Arquivos envolvidos:** `index.html`, `js/main.js`, `css/style.css`.
- **Critérios de aceitação:** PORT-002 e PORT-003 aprovadas; console sem exceções; menu operável por teclado; fallback de storage comprovado.
- **Validação:** testes manuais com storage permitido/bloqueado, teclado, mouse, viewport móvel e desktop.
- **Dependências:** E01.
- **Definition of Done:**
  - [ ] PORT-002 aprovada;
  - [ ] PORT-003 aprovada;
  - [ ] nenhum listener quebrado;
  - [ ] evidências registradas.

### E03 — Movimento, foco e contraste
- **Estado:** `PENDENTE`
- **Objetivo:** tornar estados de interação e animações acessíveis.
- **Contexto:** falta de regras explícitas de foco e movimento reduzido.
- **Tarefas:**
  1. Implementar `:focus-visible` em links, botões e controles.
  2. Medir contraste de texto, bordas e componentes nos dois temas.
  3. Ajustar tokens insuficientes sem perder identidade visual.
  4. Fazer conteúdo `.reveal` permanecer visível sem JavaScript.
  5. Respeitar `prefers-reduced-motion`.
  6. Verificar zoom de 200% e reflow em largura equivalente a 320 CSS px.
- **Arquivos envolvidos:** `css/style.css`, `js/main.js`.
- **Critérios de aceitação:** PORT-005 e PORT-006 aprovadas; sem conteúdo essencial oculto; contraste AA nos elementos aplicáveis.
- **Validação:** axe/Lighthouse ou ferramenta equivalente, analisador de contraste, teclado, zoom e configuração de movimento reduzido do sistema.
- **Dependências:** E02.
- **Definition of Done:**
  - [ ] foco visível em todos os controles;
  - [ ] contrastes registrados;
  - [ ] movimento reduzido testado;
  - [ ] fallback sem JS testado;
  - [ ] evidências registradas.

### E04 — Conteúdo, posicionamento e internacionalização
- **Estado:** `PENDENTE`
- **Objetivo:** melhorar a clareza profissional e eliminar divergências de conteúdo.
- **Contexto:** placeholder de período e descrições que podem ser mais informativas.
- **Tarefas:**
  1. Solicitar confirmação do período acadêmico e demais dados que possam estar desatualizados.
  2. Comparar cada descrição com o projeto/repositório/demonstração correspondente.
  3. Redigir versão PT e EN com equivalência de significado.
  4. Explicitar objetivo, público/problema, contribuição e tecnologias apenas quando confirmados.
  5. Identificar projeto acadêmico, experimental ou template quando essa distinção for verdadeira.
  6. Validar todos os links de projeto e contato.
  7. Refatorar atualização de idioma para whitelist e `textContent` quando aplicável.
- **Arquivos envolvidos:** `index.html`, `js/i18n.js`, `js/main.js`.
- **Critérios de aceitação:** nenhum placeholder; conteúdo factual; traduções completas; PORT-009 e PORT-011 aprovadas.
- **Validação:** checklist editorial PT/EN, comparação com os repositórios, alternância repetida de idioma e testes com valor local inválido.
- **Dependências:** E00, E02; confirmação do proprietário.
- **Definition of Done:**
  - [ ] dados pessoais confirmados;
  - [ ] projetos verificados;
  - [ ] PT e EN revisados;
  - [ ] sem HTML dinâmico desnecessário;
  - [ ] evidências registradas.

### E05 — Sistema visual e responsividade
- **Estado:** `PENDENTE`
- **Objetivo:** elevar consistência visual e experiência em todas as resoluções.
- **Contexto:** layout atual é funcional, mas pode ganhar consistência e reduzir exceções de grid.
- **Tarefas:**
  1. Definir tokens de cor, tipografia, espaçamento, raio, largura e elevação.
  2. Refinar hero e hierarquia das seções.
  3. Reorganizar cards de projeto para leitura e comparação consistentes.
  4. Remover regras de grid dependentes de `:last-child` se não forem necessárias.
  5. Ajustar breakpoints com base nos conteúdos reais.
  6. Garantir consistência entre temas.
  7. Manter microinterações limitadas aos estados funcionais.
- **Arquivos envolvidos:** `css/style.css`, `index.html`.
- **Critérios de aceitação:** PORT-012 aprovada; sem overflow horizontal; layout legível em todos os tamanhos definidos; nenhuma funcionalidade removida.
- **Validação:** screenshots comparativos em 320, 375, 768, 1024, 1440 e 1920 px; navegação em ambos os temas; teste de zoom.
- **Dependências:** E03, E04.
- **Definition of Done:**
  - [ ] tokens documentados no CSS;
  - [ ] cards validados para 1–5 projetos;
  - [ ] breakpoints validados;
  - [ ] temas validados;
  - [ ] evidências registradas.

### E06 — Imagens, fontes e performance
- **Estado:** `PENDENTE`
- **Objetivo:** reduzir transferência e instabilidade de layout sem degradar a qualidade visual.
- **Contexto:** dimensões e pesos de imagens ainda não foram medidos; fonte externa usa `@import`.
- **Tarefas:**
  1. Usar inventário E00 para priorizar imagens pesadas.
  2. Gerar formatos/tamanhos alternativos somente quando houver benefício e compatibilidade.
  3. Adicionar dimensões intrínsecas reais.
  4. Aplicar lazy loading apenas em imagens fora da primeira dobra.
  5. Definir `decoding="async"` quando apropriado.
  6. Avaliar fonte de sistema versus Inter por comparação visual e medição.
  7. Reexecutar Lighthouse e comparar com baseline.
- **Arquivos envolvidos:** `index.html`, `assets/**`, `css/style.css`.
- **Critérios de aceitação:** PORT-010 e PORT-013 aprovadas; CLS não piora e tende a zero; LCP e peso total não pioram; redução de bytes documentada se houver otimização.
- **Validação:** Lighthouse mobile/desktop em condições comparáveis; DevTools Network; verificação visual de imagens.
- **Dependências:** E00, E05.
- **Definition of Done:**
  - [ ] imagens inventariadas e otimizadas;
  - [ ] dimensões declaradas;
  - [ ] carregamento adequado;
  - [ ] estratégia de fonte registrada;
  - [ ] comparação de performance arquivada.

### E07 — SEO, indexação e compartilhamento
- **Estado:** `PENDENTE`
- **Objetivo:** completar a apresentação nos mecanismos de busca e plataformas sociais.
- **Contexto:** metadados básicos insuficientes no `<head>` observado.
- **Tarefas:**
  1. Definir título e descrição com base no conteúdo aprovado.
  2. Definir URL canonical.
  3. Criar Open Graph e Twitter Card com imagem real.
  4. Confirmar/criar favicon.
  5. Verificar/criar `robots.txt` e `sitemap.xml`.
  6. Avaliar JSON-LD somente após validar informações.
  7. Conferir indexabilidade e URLs finais no domínio publicado.
- **Arquivos envolvidos:** `index.html`, `assets/**`, `robots.txt`, `sitemap.xml`.
- **Critérios de aceitação:** PORT-008 e PORT-014 aprovadas; metadados consistentes; sitemap válido; robots sem bloqueios acidentais; JSON-LD válido se adotado.
- **Validação:** Rich Results Test quando aplicável, validador XML, inspeção de HTML publicado e ferramenta de compartilhamento social.
- **Dependências:** E04, E06.
- **Definition of Done:**
  - [ ] metadados completos;
  - [ ] canonical correto;
  - [ ] imagem social acessível;
  - [ ] sitemap/robots conferidos;
  - [ ] evidências registradas.

### E08 — Auditoria do projeto Fluxograma SI
- **Estado:** `PENDENTE`
- **Objetivo:** verificar que o projeto incorporado como link continua funcional e acessível.
- **Contexto:** o diretório não foi acessível na inspeção remota inicial.
- **Tarefas:**
  1. Inspecionar estrutura e tecnologias.
  2. Mapear interações, dados e dependências.
  3. Verificar semântica, teclado, contraste e responsividade.
  4. Verificar erros de console, assets e links.
  5. Corrigir apenas problemas comprovados e registrar escopo separado se a mudança for ampla.
- **Arquivos envolvidos:** `fluxograma-si/**`.
- **Critérios de aceitação:** PORT-015 aprovada; fluxo central funcional em desktop e mobile; sem erro de console; acessibilidade documentada.
- **Validação:** testes manuais de interações, teclado, resoluções e console.
- **Dependências:** E00.
- **Definition of Done:**
  - [ ] inventário concluído;
  - [ ] fluxo principal validado;
  - [ ] responsividade validada;
  - [ ] pendências documentadas;
  - [ ] evidências registradas.

### E09 — Testes finais, automação e publicação controlada
- **Estado:** `PENDENTE`
- **Objetivo:** consolidar validações e publicar sem interromper o site.
- **Contexto:** ainda não foi confirmada a existência de CI/testes.
- **Tarefas:**
  1. Definir comandos de validação adequados ao projeto real.
  2. Adicionar automação leve somente se reduzir risco de regressão.
  3. Validar HTML, links, acessibilidade, responsividade e performance.
  4. Revisar alterações e arquivos não intencionais.
  5. Fazer deploy pela configuração já existente do GitHub Pages.
  6. Testar o domínio publicado após o deploy.
  7. Atualizar status das etapas e registrar limitações restantes.
- **Arquivos envolvidos:** arquivos alterados nas etapas anteriores; workflows somente se aprovados.
- **Critérios de aceitação:** PORT-016 aprovada se automação for adotada; todas as etapas anteriores aprovadas; publicação responde corretamente; sem regressões bloqueadoras.
- **Validação:** build (se existir), testes automatizados, Lighthouse, acessibilidade, navegação, links e smoke test do site publicado.
- **Dependências:** E01–E08 conforme aplicável.
- **Definition of Done:**
  - [ ] checklist completo;
  - [ ] CI não introduz dependência de runtime;
  - [ ] GitHub Pages publica corretamente;
  - [ ] smoke test do domínio publicado aprovado;
  - [ ] relatório final e pendências registrados.

---

## 5. Estratégia de testes e validação

### 5.1. Testes estáticos e estruturais

| Verificação | Ferramenta sugerida | Critério |
|---|---|---|
| HTML | Nu HTML Checker | Sem erros estruturais; warnings avaliados |
| Links | Link checker ou script equivalente | Nenhum link interno quebrado; externos indisponíveis documentados |
| CSS | Stylelint somente se houver ganho real | Sem erros introduzidos; configuração simples |
| JavaScript | ESLint opcional, sem framework | Sem erros; regras compatíveis com JS nativo |
| Dependências | Inventário de imports/requests | Nenhuma dependência desconhecida ou não justificada |
| Segurança | Busca por tokens/segredos e revisão de links/scripts | Nenhum segredo versionado; nenhum script de terceiros inesperado |

Os comandos exatos devem ser definidos em E00 após identificar o ambiente. Não adicionar ferramentas ao projeto apenas para cumprir uma lista.

### 5.2. Testes funcionais

- navegação por todas as âncoras;
- abrir/fechar menu por mouse e teclado;
- Escape fecha menu e foco retorna ao botão;
- navegação por item fecha menu;
- alternância PT/EN em todas as seções;
- alternância de tema claro/escuro;
- persistência de idioma/tema quando armazenamento disponível;
- funcionamento com armazenamento bloqueado e valores inválidos;
- conteúdo essencial visível sem JavaScript;
- links de projetos, GitHub, LinkedIn e Fluxograma;
- carregamento das imagens e ausência de caminhos quebrados.

### 5.3. Matriz de responsividade

Validar no mínimo as larguras CSS abaixo:

| Classe | Largura |
|---|---:|
| Mobile compacto | 320 px |
| Mobile comum | 375 px |
| Mobile amplo | 430 px |
| Tablet | 768 px |
| Notebook | 1024 px |
| Desktop | 1440 px |
| Desktop amplo | 1920 px |

Critérios comuns: sem scroll horizontal inesperado, sem texto cortado, controles utilizáveis, menu adequado e imagens sem distorção. Testar orientação retrato e paisagem em pelo menos um viewport móvel.

### 5.4. Acessibilidade WCAG 2.2 AA

Verificar, no mínimo:

- contraste 4.5:1 para texto normal e 3:1 para texto grande;
- contraste de componentes e indicadores visuais relevantes de 3:1;
- operação integral por teclado;
- foco visível e não encoberto;
- skip link e landmarks;
- nomes acessíveis para botões/links;
- `aria-expanded` coerente com o estado real;
- ordem de foco lógica;
- texto alternativo contextual para imagens informativas e `alt=""` para imagens decorativas;
- zoom de 200% e reflow em 320 CSS px;
- movimento reduzido;
- idioma da página e alteração de idioma;
- ausência de conteúdo essencial dependente de hover.

Ferramentas automáticas (axe, Lighthouse) são auxiliares e não substituem avaliação manual com teclado e leitor de tela.

### 5.5. Performance e Core Web Vitals

Executar Lighthouse em mobile e desktop, pelo menos três vezes em condições comparáveis, registrando mediana. Quando houver dados de campo suficientes, consultar CrUX/PageSpeed Insights para dados reais.

Metas orientadoras após baseline:

- Lighthouse Performance: alvo ≥ 90 em mobile e desktop, sem tratar pontuação isolada como prova de qualidade;
- LCP: ≤ 2,5 s;
- INP: ≤ 200 ms, quando houver dados de campo;
- CLS: ≤ 0,1;
- imagens dimensionadas e comprimidas;
- sem JavaScript ou bibliotecas desnecessárias;
- recursos críticos sem bloqueios evitáveis.

Se o ambiente de teste não permitir aferir INP de campo, registrar “não mensurável” em vez de declarar aprovação.

### 5.6. SEO

- um título principal (`h1`) claro;
- title e description específicos;
- canonical correto;
- Open Graph/Twitter Card com imagem real;
- sitemap e robots coerentes;
- links rastreáveis e texto de âncora descritivo;
- idioma correto;
- dados estruturados somente quando comprovados;
- conferir indexabilidade após deploy.

### 5.7. Regressão e publicação

Antes de cada publicação:

1. conferir `git diff` e `git status`;
2. verificar ausência de segredos e arquivos temporários;
3. executar todas as validações da etapa e regressões funcionais;
4. revisar o site em tema claro e escuro;
5. publicar pelo mecanismo já configurado;
6. realizar smoke test do domínio publicado;
7. registrar commit, data e evidências.

---

## 6. Decisões técnicas registradas

| ID | Decisão | Justificativa | Condição para revisão |
|---|---|---|---|
| ADR-001 | Manter site estático com HTML/CSS/JS nativos | Porte e requisitos atuais não justificam framework/build | Crescimento comprovado de complexidade ou necessidade de conteúdo dinâmico |
| ADR-002 | Manter GitHub Pages | Hospedagem atual já atende a entrega estática | Limitação operacional ou requisito novo documentado |
| ADR-003 | Não adicionar dependências de runtime | Reduz superfície de falha, peso e manutenção | Benefício mensurável e custo total justificado |
| ADR-004 | Preservar PT/EN e temas claro/escuro | São funcionalidades existentes | Mudança aprovada pelo proprietário |
| ADR-005 | Preservar projeto Fluxograma SI | É conteúdo já publicado e referenciado | Somente após avaliação de uso e aprovação explícita |
| ADR-006 | Não inventar dados profissionais | Confiabilidade do portfólio é requisito central | Não aplicável |

---

## 7. Questões que exigem confirmação do proprietário

Estas questões não devem ser resolvidas por suposição do agente:

1. Qual é o período/semestre acadêmico atual que deve ser publicado? O HTML e o dicionário de tradução divergem.
2. A descrição profissional deve permanecer centrada em “Estudante de Sistemas de Informação” ou incluir também experiência/atuação em gestão pública e tecnologia? Só incluir fatos que o proprietário autorizar e validar.
3. Quais projetos devem receber maior destaque? A marcação atual destaca Gym Template, mas isso não prova que seja o projeto mais representativo.
4. O proprietário deseja manter o inglês como idioma alternativo?
5. Há imagem social/foto de perfil autorizada e em resolução adequada para Open Graph?

Se as respostas não estiverem disponíveis, preservar o texto factual existente, retirar placeholders com solução neutra aprovada ou deixar o item bloqueado. Não publicar dados presumidos.

---

## 8. Registro de execução

### 8.1. Estado inicial

| Etapa | Estado | Evidência |
|---|---|---|
| E00 — Inventário | BLOQUEADA | Inventário, leitura integral e verificação de links concluídos (§8.2, 17/11/2026); bloqueada apenas para baseline Lighthouse/screenshots/axe — ferramentas indisponíveis no ambiente |
| E01 — HTML e semântica | EM ANDAMENTO | PORT-001/004/007 implementados e validados; auditoria de leitor de tela e validador oficial pendentes (limitação de ambiente) |
| E02 — JavaScript e menu | EM ANDAMENTO | PORT-002/003 implementados; testes manuais com storage bloqueado/teclado pendentes (limitação de ambiente) |
| E03 — Foco, contraste e movimento | PENDENTE | Nenhuma alteração realizada |
| E04 — Conteúdo e i18n | PENDENTE | Confirmações do proprietário pendentes |
| E05 — Visual e responsividade | PENDENTE | Nenhuma alteração realizada |
| E06 — Imagens e performance | PENDENTE | Métricas e inventário pendentes |
| E07 — SEO | PENDENTE | Metadados atuais parcialmente inspecionados |
| E08 — Fluxograma SI | PENDENTE | Conteúdo interno pendente de inspeção |
| E09 — Testes e publicação | PENDENTE | Nenhuma alteração realizada |

### 8.2. Histórico de decisões, desvios e validações

| Data | Etapa | Tipo | Registro | Evidência |
|---|---|---|---|---|
| 17/11/2026 | Diagnóstico | Inspeção | Site, repositório e arquivos principais consultados remotamente; inspeção incompleta das pastas internas | Links do repositório e site no cabeçalho deste documento |
| 17/11/2026 | Diagnóstico | Limitação | Clone local não foi possível neste ambiente por indisponibilidade de resolução de rede; não houve execução local de testes | Registrar novamente na E00 se ainda aplicável |
| 17/11/2026 | E00 | Inventário | Clone local efetuado em `~/Projetos/sitePortifolio`, branch `modernizacao-portifolio` a partir de `main` @ `3ee8808` (8 commits). `git ls-files`: 10 arquivos (`index.html`, `css/style.css`, `js/main.js`, `js/i18n.js`, `fluxograma-si/index.html`, `fluxograma-si/fluxograma-si.png`, 4 PNGs em `assets/`). Nenhum arquivo oculto: sem `.github/`, `.nojekyll`, `CNAME`, `README`, `LICENSE`, `.gitignore`, `robots.txt`, `sitemap.xml`, `404.html`, favicon, `package.json`. Confirmação: hipótese "GitHub Pages — Deploy from branch, main / (root)" não refutada; pendente confirmação em Settings (Q do §7). | Comandos: `git log --oneline`, `git ls-files`, `ls -la`, `find . -type f` |
| 17/11/2026 | E00 | Inventário | Imagens medidas: `foto-perfil.png` 2.035.293 B (1024×1024 RGBA), `gym-template.png` 672.296 B (1137×602), `odontonexus-landing.png` 291.923 B (1353×676), `oferte-login.png` 27.458 B (1154×659), `fluxograma-si/fluxograma-si.png` 157.283 B (1340×643). Total ≈ 3,14 MB. | `ls -la`, `file` |
| 17/11/2026 | E00 | Inspeção | Leitura integral de `index.html` (327 linhas), `css/style.css` (827), `js/main.js` (186), `js/i18n.js` (113), `fluxograma-si/index.html` (730; CSS/JS/dados inline, sem dependências externas). Fluxograma: cartões `div` com handlers `click`/`mouseenter` — sem foco por teclado, tooltip inacessível a teclado/toque, sem `prefers-reduced-motion`, sem link de volta ao portfólio. | Leitura integral dos arquivos |
| 17/11/2026 | E00 | Links | Verificação HTTP: `github.com/silviosouza1986/gym-template` 200; `…/OdontoNexus` 200; `…/oferte` 200; `github.com/silviosouza1986` 200; `linkedin.com/in/silviosouza1986/` 999 (bloqueio de robô — não indica link quebrado); `silviosouza1986.github.io/` 200; `/fluxograma-si/` 200. Nenhum link quebrado confirmado. | `curl -s -o /dev/null -w "%{http_code}"` em cada URL |
| 17/11/2026 | E00 | Limitação | Ambiente sem `npm`, sem `pip`, sem navegador instalável automatizável. Baseline de Lighthouse, screenshots por largura e auditoria axe: **NÃO EXECUTADA — motivo: ferramentas indisponíveis no ambiente de execução**. Pendente para execução local pelo proprietário ou CI futura. Também sem Nu HTML Checker oficial; validação estrutural será feita com verificador de balanceamento de tags em `node` (E01) e `xmllint` para XML. | `which node npm python3 pip convert magick xmllint` |
| 17/11/2026 | E01 | Correção | PORT-001: removidos `</a>` órfão e `</div>` excedente na seção contato (linhas ~300–302). PORT-004: adicionado skip link (`.skip-link` → `#conteudo`), `<main id="conteudo">` envolvendo hero/sobre/projetos/contato, `aria-label="Navegação principal"` no `<nav>`, `aria-hidden="true"` nos 16 SVGs decorativos e no overlay. PORT-007: `rel="noopener noreferrer"` nos 9 links `target="_blank"`. Validação: balanceador de tags em `node` = "OK: todas as tags balanceadas"; âncoras `#conteudo #sobre #projetos #contato` existem; 6 âncoras internas; 5 caminhos de imagem existem. | `node --input-type=module -e` (balanceador); `grep` |
| 17/11/2026 | E01 | Desvio | Nu HTML Checker oficial não executado (sem npm/navegador). Substituído por verificador de balanceamento de tags próprio + conferência de âncoras/caminhos. Limitação registrada; revalidar com validador oficial quando disponível. | §8.2 linha de 17/11/2026 (limitação de ambiente) |
| 17/11/2026 | E02 | Implementação | PORT-002: helpers `getStoredValue`/`setStoredValue` com sondagem de disponibilidade de `localStorage`, fallback em memória (`Map`) e whitelist de valores (`LANGS`/`THEMES`); idioma salvo inválido volta ao padrão; detecção de idioma aceita qualquer `pt*` (não apenas `pt…br`). PORT-003: `aria-controls="navLinks"`, `aria-expanded` sincronizado, `aria-hidden` no menu, fechamento por `Escape` com retorno de foco ao botão, fechar por overlay/link, body `overflow` restaurado em todos os caminhos, guarda de nulos nos elementos. CSS: menu fechado com `visibility: hidden` (não focável por Tab), `100dvh` além de `100vh`. PORT-011 parcial: whitelist de idioma aplicada; refatoração completa de i18n/`innerHTML` fica para E04. | `node --check js/main.js` = OK; revisão de código |

Adicionar novas linhas sem apagar registros anteriores.

---

## 9. Critério de encerramento do projeto

A modernização será considerada concluída somente quando:

- todas as etapas aplicáveis estiverem `CONCLUÍDAS`;
- todos os itens P0 e P1 estiverem aprovados;
- itens P2/P3 não executados estiverem justificados e aceitos como pendência;
- o site publicado tiver passado pelo smoke test;
- não houver regressões críticas ou links essenciais quebrados;
- os resultados de acessibilidade, performance e SEO estiverem documentados;
- o proprietário tiver validado conteúdo pessoal e posicionamento profissional;
- este documento refletir fielmente o que foi implementado, testado, adiado ou bloqueado.

**Estado geral inicial:** `PLANEJAMENTO — AGUARDANDO E00`. Nenhuma melhoria é declarada implementada ou concluída nesta versão.
