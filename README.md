# fe-chsrc-construct

Frontend em **React + Vite** com **React Router** e estilos em **SCSS**, estruturado como um MVP simples com duas rotas (Home e Sobre).

## Tecnologias

- React 18
- Vite 5
- TypeScript 5
- React Router DOM 6
- Sass (SCSS)

## Requisitos

- Node.js (recomendado: versão LTS atual)
- npm (o repositório inclui `package-lock.json`)

## Como rodar

Instalar dependências:

```bash
npm install
```

Ambiente de desenvolvimento:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Pré-visualizar o build localmente:

```bash
npm run preview
```

## Scripts

- `npm run dev`: inicia o servidor de desenvolvimento do Vite
- `npm run build`: gera o build de produção
- `npm run preview`: serve localmente o build gerado

## Estrutura do projeto

```text
.
├─ index.html
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ src
   ├─ main.tsx
   ├─ App.tsx
   ├─ pages
   │  ├─ HomePage.tsx
   │  └─ AboutPage.tsx
   └─ styles
      ├─ app.scss
      ├─ global.scss
      └─ reset.css
```

## Rotas

As rotas são definidas em `src/App.tsx` usando `react-router-dom`:

- `/`: página inicial (`HomePage`)
- `/sobre`: página “Sobre” (`AboutPage`)
- `*`: redireciona para `/`

O roteamento é inicializado em `src/main.tsx` com `BrowserRouter`.

## Estilos

Os estilos são carregados em `src/main.tsx`:

- `src/styles/reset.css`: reset CSS básico
- `src/styles/global.scss`: estilos globais (fontes/cores de fundo e texto)

Estilos específicos da aplicação:

- `src/styles/app.scss`: layout do container e header/nav

## Variáveis de ambiente

No momento não há variáveis de ambiente documentadas no código.

Se forem adicionadas variáveis via Vite, utilize o padrão `VITE_` (ex.: `VITE_API_URL`) e arquivos `.env` conforme a necessidade.

## Build e deploy

- O comando `npm run build` gera arquivos estáticos em `dist/`.
- Para hospedar, publique o conteúdo de `dist/` em um serviço de hosting estático.

