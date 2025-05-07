# ChefFit AI

Transforme ingredientes em receitas fitness personalizadas com inteligência artificial!

## Descrição

Este projeto é uma aplicação Angular 18 que se comunica com o N8N via Webhook. O frontend permite ao usuário informar ingredientes disponíveis, que são enviados para um fluxo automatizado no N8N. O N8N, por sua vez, dispara um trigger que coleta a mensagem enviada pelo frontend e a encaminha para um modelo LLM da OpenAI. O LLM recebe o ingrediente e gera uma receita personalizada, retornando a resposta ao N8N, que então responde ao frontend Angular com a receita criada.

## Como funciona o fluxo

1. **Usuário informa ingredientes** no campo de input do frontend Angular.
2. **Angular envia os ingredientes** para um Webhook do N8N via HTTP POST.
3. **N8N aciona um trigger** que recebe os ingredientes e faz uma requisição ao LLM da OpenAI.
4. **OpenAI LLM gera uma receita** baseada nos ingredientes fornecidos.
5. **N8N recebe a resposta** do LLM e retorna a receita para o frontend Angular.
6. **Frontend exibe a receita** personalizada para o usuário.

## Tecnologias Utilizadas

- **Angular 18+** (com Angular Material)
- **N8N** (Automação e integração)
- **Comunicação via Webhook** (Integração entre Angular 18 e N8N)
- **OpenAI LLM** (Geração de receitas)
- **RxJS** (Reatividade)

## Instalação e Uso

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd angular-n8n
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Desenvolvimento local:**
   - O projeto utiliza um proxy (`proxy.conf.json`) para redirecionar chamadas `/api` para o N8N em ambiente de desenvolvimento.
   - Para rodar localmente:
     ```bash
     npm start
     ```
   - O app estará disponível em `http://localhost:4200`.

4. **Configuração do Webhook:**
   - O endpoint do webhook do N8N está configurado em `src/services/recipe.service.ts`.
   - Certifique-se de que o fluxo no N8N está ativo e configurado para receber os ingredientes e interagir com o LLM da OpenAI.

## Estrutura do Projeto

```
src/
  app.component.html      # Interface principal
  app.component.ts        # Lógica do componente principal
  services/
    recipe.service.ts     # Serviço responsável pela comunicação com o N8N
  pipes/                  # Pipes customizados
  utils/                  # Utilitários
  global_styles.css       # Estilos globais
```

## Exemplo de Uso

1. O usuário acessa a aplicação e insere ingredientes como:  
   `peito de frango, quinoa, espinafre`
2. Clica em "Criar Receita Personalizada".
3. O sistema retorna uma receita fitness criada pela IA, baseada nos ingredientes informados.

## Dependências Principais

- `@angular/core`
- `@angular/material`
- `rxjs`
- `zone.js`

Veja todas as dependências em [package.json](./package.json).

## Observações

- O fluxo do N8N deve estar ativo e configurado para receber o payload `{ ingredients: "..." }` e retornar a resposta do LLM.
- O projeto pode ser facilmente adaptado para outros tipos de automação e integrações via N8N. 