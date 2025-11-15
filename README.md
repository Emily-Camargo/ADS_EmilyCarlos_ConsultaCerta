# 🩺 **ConsultaCerta**

### *Precisão e agilidade para cuidar de você*

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.4-purple?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## 📋 **Sumário**

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Perfis de Usuário](#-perfis-de-usuário)

---

## 🎯 **Sobre o Projeto**

O **ConsultaCerta** é uma aplicação web Progressive Web App (PWA) completa para gerenciamento de consultas médicas. A plataforma revoluciona a comunicação entre pacientes, secretárias e médicos, oferecendo uma experiência moderna, fluida e segura.

### ✨ **Destaques**

- 📱 **PWA** - Instalável como aplicativo nativo em dispositivos móveis e desktop
- 🎨 **UI/UX Moderna** - Interface responsiva com Material-UI e Tailwind CSS
- ⚡ **Performance** - Otimizado com Vite e lazy loading de componentes
- 🔐 **Autenticação Segura** - JWT com controle de perfis (Paciente, Secretária, Médico)
- 🔄 **Tempo Real** - Comunicação via WebSocket (Socket.io)
- 📊 **Visualizações Ricas** - Gráficos interativos com Nivo Charts
- 🤖 **Assistente Inteligente** - IA para suporte e auxiliar nos processos

---

## 🚀 **Funcionalidades**

### 🏥 **Módulos Principais**

| Módulo | Descrição |
|--------|-----------|
| 🔐 **Autenticação** | Login seguro, cadastro de usuários e recuperação de senha |
| 🏠 **Dashboard** | Visão geral personalizada por perfil com cards de ações rápidas |
| 👥 **Pacientes** | Gerenciamento completo de cadastro e informações dos pacientes |
| 📅 **Agenda** | Controle de horários disponíveis e agendamentos médicos |
| 🗓️ **Consultas** | Visualização, agendamento, reagendamento e cancelamento |
| 📋 **Atendimentos** | Registro de atendimentos e preenchimento de prontuários |
| 📄 **Prontuários** | Prontuário eletrônico completo com histórico médico |
| 💊 **Prescrições** | Prescrição médica digital e acompanhamento de medicamentos |
| 📊 **Relatórios** | Dashboards e relatórios gerenciais com gráficos interativos |
| 👤 **Perfil** | Gerenciamento de dados pessoais e configurações |

---

## 🛠️ **Tecnologias**

### **Core**
- ⚛️ **React 18.2.0** - Biblioteca JavaScript para interfaces
- 📘 **TypeScript 5.9.2** - Tipagem estática
- ⚡ **Vite 7.1.4** - Build tool ultra-rápido

### **UI/UX**
- 🎨 **Material-UI (MUI) 5.15** - Componentes React prontos
- 🎭 **Tailwind CSS 3.3** - Framework CSS utility-first
- 💅 **Styled Components 6.1** - CSS-in-JS
- 🎪 **Mantine 8.2** - Componentes adicionais
- 🌊 **Flowbite React** - Componentes Tailwind

### **Gerenciamento de Estado**
- 🔄 **TanStack Query (React Query) 5.50** - Gerenciamento de estado assíncrono
- 🎯 **Immer** - Estado imutável simplificado
- 🍪 **JS-Cookie** - Gerenciamento de cookies

### **Gráficos e Visualização**
- 📊 **Nivo Charts** - Gráficos interativos (bar, pie, bullet)
- 📈 **React Data Table Component** - Tabelas avançadas
- 🔲 **MUI X-Data-Grid** - Grid de dados profissional

### **Formulários e Validação**
- 📝 **TanStack Form** - Gerenciamento de formulários
- 🎭 **React-Imask** - Máscaras de input

### **Comunicação**
- 🌐 **Axios 1.11** - Cliente HTTP
- 🔌 **Socket.io Client 4.8** - WebSocket para tempo real
- 📡 **API RESTful** - Comunicação com backend

### **PWA e Performance**
- 📲 **Vite PWA Plugin** - Transformação em PWA
- 💤 **NoSleep.js** - Prevenir suspensão da tela
- 📦 **Workbox** - Service Worker e cache

### **Utilitários**
- 📅 **Date-fns 4.1** / **Day.js 1.11** - Manipulação de datas
- 🔒 **Crypto-JS 4.2** - Criptografia
- 🎬 **Lottie React** - Animações

### **Desenvolvimento**
- 🔍 **ESLint** - Linter para qualidade de código
- 🎨 **Prettier** - Formatador de código
- 📦 **Yarn** - Gerenciador de pacotes

---

## 🏗️ **Arquitetura**

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONSULTACERTA - FRONTEND                     │
│                          (React PWA)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Pages      │  │  Components  │  │   Services   │         │
│  │              │  │              │  │              │         │
│  │ • Login      │  │ • Navbar     │  │ • API        │         │
│  │ • Home       │  │ • Sidebar    │  │ • Usuario    │         │
│  │ • Pacientes  │  │ • Modals     │  │ • Consultas  │         │
│  │ • Agenda     │  │ • Cards      │  │ • Medico     │         │
│  │ • Consultas  │  │ • Inputs     │  │ • Dashboard  │         │
│  │ • Prontuário │  │ • Filtros    │  │ • Assistente │         │
│  │ • Relatórios │  │ • Loader     │  │ • Prescrições│         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Contexts   │  │    Hooks     │  │   Routes     │         │
│  │              │  │              │  │              │         │
│  │ • AuthContext│  │ • useAuth    │  │ • Protected  │         │
│  │ • SessionTO  │  │ • usePWA     │  │ • Public     │         │
│  └──────────────┘  │ • useQuery   │  └──────────────┘         │
│                    └──────────────┘                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ▲  ▼
                         HTTP / WebSocket
                              ▲  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND API                              │
│                    (Node.js + TypeScript)                        │
├─────────────────────────────────────────────────────────────────┤
│  • Autenticação JWT                                             │
│  • Gerenciamento de Consultas                                   │
│  • Prontuários Eletrônicos                                       │
│  • Assistente IA                                                │
│  • WebSocket Real-time                                          │
│  • PostgreSQL Database                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 **Instalação**

### **Pré-requisitos**

- Node.js 20.x LTS ou superior
- Yarn ou npm
- Backend API rodando (verifique a URL em `src/config/api.ts`)

### **Passo a Passo**

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/consultacerta.git
cd consultacerta
```

2. **Instale as dependências**

```bash
yarn
# ou
npm install
```

3. **Configure a API**

Edite o arquivo `src/config/api.ts` se necessário para apontar para o backend correto:

```typescript
// Por padrão, usa localhost:3000 em desenvolvimento
// e {hostname}:3000 em produção
```

4. **Inicie o servidor de desenvolvimento**

```bash
yarn start
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173` ou em `https://ads-consulta-certa.vercel.app`

---

## 📜 **Scripts Disponíveis**

| Comando | Descrição |
|---------|-----------|
| `yarn start` | Inicia o servidor de desenvolvimento (exposto na rede) |
| `yarn dev` | Inicia o servidor de desenvolvimento (local) |
| `yarn dev:network` | Inicia com exposição na rede local |
| `yarn dev:mobile` | Inicia na porta 5173 com exposição na rede |
| `yarn build` | Gera build de produção otimizado |
| `yarn build:dev` | Gera build de desenvolvimento |
| `yarn preview` | Visualiza o build de produção localmente |
| `yarn eslint` | Executa o linter |
| `yarn eslint:fix` | Corrige problemas do linter automaticamente |

---

## 📁 **Estrutura do Projeto**

```
consultacerta/
├── public/                      # Arquivos públicos estáticos
│   ├── assets/                  # Imagens e recursos
│   └── manifest.json           # Manifest PWA
├── src/
│   ├── components/             # Componentes reutilizáveis
│   │   ├── button/            # Botões customizados
│   │   ├── cards/             # Cards diversos
│   │   ├── dialog/            # Modais e diálogos
│   │   ├── filtro/            # Componentes de filtro
│   │   ├── input-mui/         # Inputs Material-UI
│   │   ├── Inputs/            # Inputs customizados
│   │   ├── Loader/            # Componentes de loading
│   │   ├── navbar/            # Barra de navegação
│   │   └── ProtectedRoute.tsx # Rotas protegidas
│   ├── config/                 # Configurações
│   │   └── api.ts             # Configuração Axios
│   ├── contexts/               # Context API
│   │   └── AuthContext.tsx    # Contexto de autenticação
│   ├── hooks/                  # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── usePWA.ts
│   │   └── useQuery.ts
│   ├── pages/                  # Páginas da aplicação
│   │   ├── login/             # Autenticação
│   │   ├── home/              # Dashboard
│   │   ├── pacientes/         # Gerenciamento de pacientes
│   │   ├── agenda/            # Agenda médica
│   │   ├── consultas/         # Gerenciamento de consultas
│   │   ├── minhas-consultas/  # Consultas do paciente
│   │   ├── atendimentos/      # Atendimentos
│   │   ├── prontuarios/       # Prontuários
│   │   ├── prescricoes/       # Prescrições
│   │   ├── relatorios/        # Relatórios e dashboards
│   │   └── perfil/            # Perfil do usuário
│   ├── services/               # Serviços e API calls
│   │   ├── assistente/
│   │   ├── consultas/
│   │   ├── dashboard/
│   │   ├── medico/
│   │   ├── prescricoes/
│   │   └── usuario/
│   ├── styles/                 # Estilos globais
│   ├── types/                  # Tipos TypeScript
│   ├── App.tsx                # Componente principal
│   ├── routes.tsx             # Configuração de rotas
│   └── main.tsx               # Ponto de entrada
├── eslint.config.js           # Configuração ESLint
├── tailwind.config.js         # Configuração Tailwind
├── tsconfig.json              # Configuração TypeScript
├── vite.config.ts             # Configuração Vite e PWA
└── package.json               # Dependências e scripts
```

---

## 👥 **Perfis de Usuário**

### 📋 **Paciente**

- ✅ Agendar consultas com médicos disponíveis
- 📅 Visualizar histórico de consultas e atendimentos
- 🔔 Acessar prescrições médicas
- 📱 Visualizar prontuário eletrônico pessoal
- 👨‍⚕️ Buscar médicos por especialidade
- ✏️ Reagendar ou cancelar consultas
- 📊 Acompanhar próximas consultas

### 💼 **Secretária**

- 📊 Gerenciar agenda de múltiplos médicos
- ⏰ Controlar horários disponíveis
- 📞 Cadastrar e gerenciar pacientes
- 📈 Acessar relatórios gerenciais
- 🗓️ Agendar, reagendar e cancelar consultas
- 👥 Visualizar lista de atendimentos do dia
- 📋 Gerenciar confirmações de consultas

### 👨‍⚕️ **Médico**

- 📋 Preencher prontuários eletrônicos durante atendimento
- 💊 Prescrever medicamentos digitalmente
- 🧪 Registrar diagnósticos e observações
- 📊 Visualizar dashboards de produtividade
- 🤖 Utilizar assistente IA para suporte
- 📅 Gerenciar agenda pessoal
- 👥 Acessar histórico completo dos pacientes
- 📈 Acompanhar estatísticas de atendimentos

---

## 🔐 **Segurança**

- 🔒 **Autenticação JWT** - Tokens seguros com expiração
- 🛡️ **Rotas Protegidas** - Controle de acesso por perfil
- 🔑 **Interceptors** - Renovação automática de tokens
- 🚫 **Timeout de Sessão** - Logout automático por inatividade
- 🔐 **LocalStorage** - Armazenamento seguro de credenciais

---

## 🎨 **UI/UX Features**

- 🎭 **Tema Customizado** - Design system consistente
- 📱 **Mobile First** - Totalmente responsivo
- ⚡ **Loading States** - Feedbacks visuais em todas as ações
- 🎯 **Toasts** - Notificações não-invasivas (react-toastify)
- 🖼️ **Modais** - Diálogos contextuais e informativos
- 📊 **Data Tables** - Tabelas com ordenação, filtros e paginação
- 📈 **Charts** - Gráficos interativos e responsivos
- 🎪 **Animations** - Micro-interações fluidas
- 🌙 **PWA** - Instalável e funciona offline

---


## 👨‍💻 **Desenvolvido por**

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) por Emily Marinho e Carlos Santos

---

<div align="center">

**ConsultaCerta** - *Cuidando da saúde com tecnologia* 💙

</div>