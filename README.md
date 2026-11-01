# Forma — um site de arquitetura construído com IA generativa

**Site:** https://forma-iota-pink.vercel.app · **Estudo de caso:** https://forma-iota-pink.vercel.app/how-it-was-built

Forma é um **projeto conceitual de portfólio**: o site de uma arquiteta que trabalha sozinha e projeta casas calmas, com poucos materiais. A arquiteta, os projetos e todas as imagens e vídeos são fictícios e foram gerados com IA. O formulário de contato é uma demonstração e não envia nada.

## O que o site faz

- **Passeio pela obra:** ao rolar a página, uma câmera atravessa cinco ilhas de argila, uma para cada fase do trabalho (casa pronta, terreno, esboços, obra, entrega das chaves). O vídeo avança e volta junto com a rolagem.
- **Uma carta da arquiteta:** textos que se escrevem conforme a leitura e fotos que surgem ao entrar na tela, com um único botão principal sempre à vista: *Start a project*.
- **Resumo do projeto com IA:** no formulário, o visitante descreve o projeto com as próprias palavras e o Claude devolve um resumo estruturado (tipo de projeto, terreno, desejos, restrições e as perguntas que a arquiteta faria), que ele confere antes de enviar.

## Como a IA foi usada

| Ferramenta | Para quê | Resultado |
|---|---|---|
| **Claude Code** | Escrever e revisar o código, com as skills [Hallmark](https://github.com/nutlope/hallmark) (design) e scroll-world (motor da rolagem) | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| **ChatGPT** | Gerar as imagens a partir de prompts versionados ([`prompts.md`](forma/photos-inbox/prompts.md), [`prompts-3d.md`](forma/photos-inbox/prompts-3d.md)) | 15 imagens: 10 fotorrealistas e 5 ilhas de argila |
| **Seedance 2.0 via Monid** | Animar as ilhas e criar os voos de câmera entre elas ([`render-world.sh`](forma/world/render-world.sh)) | 9 clipes de 4 s em 480p, **US$ 2,84** no total, sem refações |
| **Claude API (Opus 5.5)** | Organizar o pedido do visitante com saída estruturada ([`route.ts`](forma/src/app/api/brief/route.ts)) | Resumo validado por schema (Zod), no idioma do visitante |

O raciocínio completo, as decisões e os problemas resolvidos estão no [estudo de caso](https://forma-iota-pink.vercel.app/how-it-was-built).

## Destaques técnicos

- **Emendas invisíveis entre vídeos:** cada voo começa no último quadro real do clipe anterior e termina no primeiro do seguinte.
- **Celular:** versões mais leves dos vídeos ([`encode-mobile.sh`](forma/world/encode-mobile.sh)) reduzem o download de 16 MB para 7 MB, para cada cena carregar antes de o visitante chegar nela.
- **IA no produto com cuidado de custo e segurança:** limite de tamanho do texto e de pedidos por visitante, o texto do visitante tratado só como dado (nunca como instrução), fallback automático em caso de recusa e o site funcionando normalmente sem a chave da API.
- **Acessibilidade:** quem prefere menos movimento vê tudo sem animação, e sem JavaScript nenhum conteúdo fica escondido.
- **Conteúdo separado do código:** todos os textos ficam em [`content.ts`](forma/src/data/content.ts).

## Rodar localmente

```bash
cd forma
npm install
npm run dev        # http://localhost:3000
```

O resumo com IA precisa de uma chave da API do Claude em `forma/.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

Sem ela, o site funciona normalmente e o botão de IA avisa que está desligado.

## Créditos

- Skill de design [Hallmark](https://github.com/nutlope/hallmark) (MIT), em `.agents/skills/hallmark`.
- Motor de rolagem da skill scroll-world (MIT, © 2026 cyw), em `forma/public/world/scrub-engine.js`, sem alterações.
- Sistema visual baseado no template "Havn" ([`Design.md`](Design.md)).
