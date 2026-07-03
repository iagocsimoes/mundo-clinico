# Imersão Virada Clínica — Landing Page

Landing page de conversão para a **Imersão Virada Clínica** (O Mundo Clínico).
01 de agosto de 2026 · Sede Enjoy Business · Vila Velha/ES.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (design system em `app/globals.css`)
- **Framer Motion** (animações de scroll)
- Tipografia: Libre Baskerville (serif) + Montserrat (sans) via `next/font`

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm start          # servir o build
```

## Onde editar

| O quê | Arquivo |
|---|---|
| **Toda a copy** (preços, palestrantes, FAQ, programação, datas) | `lib/data.ts` |
| Cores e tipografia (design system) | `app/globals.css` (`@theme`) |
| Seções da página | `components/*.tsx` |
| Ordem das seções | `app/page.tsx` |
| SEO / Open Graph | `app/layout.tsx` |

## Pendências de conteúdo (marcadas no código)

Em `lib/data.ts`, objeto `EVENT`:

- `checkoutUrl` — link real do checkout de ingressos (hoje aponta para `#ingressos`)
- `sponsorUrl` — link/WhatsApp para proposta de patrocínio
- `whatsapp` — contato

Fotos dos palestrantes: adicione os arquivos em `public/img/` e preencha o campo
`img` de cada palestrante em `SPEAKERS` (`lib/data.ts`). Quem estiver sem foto
recebe automaticamente um monograma dourado.

## Deploy

O projeto é 100% estático (prerender). Opções:

- **VPS (nginx):** `npm run build && npm start` atrás de um proxy, ou gere um
  export estático adicionando `output: "export"` em `next.config.ts` e sirva a
  pasta `out/`.
- **Vercel:** conecte o repositório — deploy automático.

## Design System — O Mundo Clínico

- Fundo: `#0e2020` · `#122828` · `#1a3535` (verde profundo)
- Dourado: `#c9b291` → `#a68d60` (camel) → `#6b4d27`
- Texto: `#f3f1e5` (off-white) · `#9a8a7a` (secundário)
- Esmeralda oficial: `#025033`
