# Site Institucional Plataforma Athena

Projeto para o site institucional da Plataforma Athena, assessoria para pós-graduação Stricto Sensu.

Acesse: [https://plataformaathena.com.br](https://plataformaathena.com.br)

O site foi desenvolvido com [Astro Build](https://astro.build/). Acesse o site para visualizar a documentação.

Como os demais frameworks modernos, é necessário ter a plataforma [NodeJS](https://nodejs.org/) instalada para poder executar o projeto.

## 🚀 Estrutura do Projeto

O projeto segue a seguinte estrutura:

```text
└── /
    ├── README.md
    ├── astro.config.mjs
    ├── package.json
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    ├── tsconfig.json
    ├── .env.dev
    ├── .env.homol
    ├── .env.prod
    ├── public/
    │   ├── assets/
    │   │   └── img/
    │   │       ├── banner-home.webp
    │   │       ├── janus-logo-horizontal.webp
    │   │       ├── plataforma-athena/
    │   │       └── servicos/
    │   ├── js/
    │   │   ├── application.js
    │   │   └── form-validation.js
    │   └── vendors/
    │       ├── gsap/
    │       ├── jquery-mask/
    │       └── jquery-validate/
    └── src/
        ├── config.ts
        ├── assets/
        ├── components/
        │   ├── AppFooter.astro
        │   ├── AppHeader.astro
        │   ├── AppHeaderConteudoLegal.astro
        │   ├── Card.astro
        │   ├── FormContato.astro
        │   └── Modal.astro
        ├── layouts/
        │   └── Layout.astro
        ├── pages/
        │   ├── index.astro
        │   ├── politica-de-privacidade.astro
        │   └── termos-de-uso.astro
        └── styles/
            └── global.css
```

## 🧞 Comandos

Todos os comando são executados a partir da raíz do projet, através de um terminal:

| Comando                   | Ação                                             |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala as dependências                          |
| `npm run dev`             | Inicia o servidor local em `localhost:4321`      |
| `npm run build`           | Builda o site para produção em `./dist/`         |
| `npm run preview`         | Preview local do site, antes da publicação       |

Para mais comando, consulta a documentação do Astro Build.


## Integrações

Os formulários de e-mail são conectados a um serviço chamado [EmailJS](https://www.emailjs.com/) para que seja possível o envio de e-mails sem a necessidade de uma linguagem backend. Há um limite mensal de 200 e-mails para o plano gratuito. 
