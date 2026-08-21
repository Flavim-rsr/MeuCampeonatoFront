# Meu Campeonato — Front

Interface em React para visualizar a API do [Meu Campeonato](https://github.com/Flavim-rsr/MeuCampeonatoTest) (teste técnico back-end): login, cadastro de times, criação de campeonatos, simulação fase a fase, chaveamento com critério de decisão de cada jogo, pódio e ranking histórico.

Este front **não faz parte do escopo do teste** — construí como ferramenta de apoio para exercitar a API de ponta a ponta por uma interface, além do Postman. O rigor (testes, arquitetura, CI) mora no back-end.

![tema](https://img.shields.io/badge/tema-retr%C3%B4%20anos%2090-f2b705)

## Como rodar

Pré-requisitos: Node 18+ e a API do back-end no ar em `http://localhost:8000` (via `docker compose up -d --build` no repositório do back).

```bash
npm install
npm run dev   # http://localhost:5173
```

Crie uma conta na tela de login e siga o fluxo: times → campeonato → inscrever 8 → iniciar → simular.

## Stack

Vite · React 18 (JavaScript) · react-router-dom · fetch nativo · CSS puro (tema retrô de álbum de figurinhas anos 90). Sem UI kit e sem testes, por decisão: é uma ferramenta pessoal de visualização.
