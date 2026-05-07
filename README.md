# 📦 PET Organiza

> **Transforme sua rotina em uma jornada de conquistas.**

O **PET Organiza** é um aplicativo mobile voltado para auxiliar na organização pessoal, unindo ferramentas de gerenciamento de tarefas, acompanhamento de hábitos e elementos de gamificação. O objetivo principal é tornar o planejamento simples, intuitivo e motivador, utilizando recompensas virtuais e um sistema de cubos colecionáveis para incentivar a disciplina.

---

## ✨ Funcionalidades

Abaixo estão os casos de uso definidos para a aplicação:

* **🟪 Cadastro e Login**: Criação de conta e autenticação obrigatória para acessar as funcionalidades.
* **🟦 Gerenciar Tarefas**: Organização de atividades com título, descrição, vencimento e prioridade.
* **🟩 Gerenciar Hábitos**: Acompanhamento de hábitos recorrentes com estatísticas de cumprimento.
* **🟨 Sistema de Gamificação (Cubos)**: Recebimento de "arestas" (pontos) para desbloquear cubos colecionáveis.
* **🟧 Missões**: Desafios específicos com recompensas exclusivas e bônus.
* **🟥 Personalização**: Criação de categorias personalizadas como "Graduação" ou "Trabalho".

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma stack híbrida e moderna:

* **Front-end**: Ionic Framework, Angular e TypeScript.
* **Back-end**: Firebase Authentication para login e Cloud Messaging para notificações.
* **Banco de Dados**: Cloud Firestore (NoSQL em tempo real).
* **Arquitetura**: Design modular com separação de interesses (SoC).

---

## 🏗️ Arquitetura do Projeto

A estrutura do código-fonte em `/src/app` é dividida em quatro pilares fundamentais:

1.  **`/core`**: Lógica de negócio central e serviços singleton (ex: `AuthService`, `StorageService`).
2.  **`/shared`**: Componentes de UI, diretivas e pipes reutilizáveis em toda a aplicação.
3.  **`/features`**: Módulos de funcionalidades carregados via *Lazy Loading* (ex: `tasks`, `habits`, `missions`).
4.  **`/public`**: Páginas independentes, como a tela de carregamento (`loader`).

---

## 🚀 Como Executar

1.  **Clone o repositório**:
    ```bash
    git clone [https://github.com/pet-comp/pet-organiza.git](https://github.com/pet-comp/pet-organiza.git)
    ```
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Inicie o servidor de desenvolvimento**:
    ```bash
    ionic serve
    ```

---

## 👥 Contribuição

Este projeto é desenvolvido por membros do **PET Computação - ICMC/USP**:

* **Kattryel Henrique Santos Rezende** (Idealizador do Projeto)
* **João Pedro Boiago Gomes Santana**
* **Guilherme Zanetti**

---
Desenvolvido com foco em produtividade e gamificação.
