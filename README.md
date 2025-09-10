# ***ConsultaCerta*** 🩺
### ***Precisão e agilidade para cuidar de você***

---

## ***🎯 Sobre o Projeto***

O **ConsultaCerta** é uma solução completa para gerenciamento de consultas médicas que revoluciona a comunicação entre pacientes, secretárias e médicos. Desenvolvido com tecnologias modernas, oferece uma experiência fluida e segura para todos os usuários.

### ***✨ Características Principais***

- 📱 **Interface Responsiva** - Funciona perfeitamente em dispositivos móveis e desktop
- 🔐 **Segurança Avançada** - Autenticação JWT com controle de perfis
- 💬 **Notificações WhatsApp** - Lembretes automáticos para reduzir faltas
- 📊 **Dashboards Inteligentes** - Relatórios visuais para tomada de decisões
- 🤖 **IA Médica** - Sugestões inteligentes para auxiliar diagnósticos
- 📋 **Prontuário Eletrônico** - Histórico médico digital completo

---

## ***🚀 Tecnologias Utilizadas***

### ***Frontend***
- **React 18.2.0** + **TypeScript 5.0+**
- Interface moderna e responsiva

### ***Backend***
- **NestJS 10.x** - Framework robusto com arquitetura modular
- **Node.js 20.x LTS** - Runtime escalável e performático
- **TypeORM 0.3.x** - ORM avançado para PostgreSQL

### ***Banco de Dados***
- **PostgreSQL 15.x** - Banco de dados robusto e confiável

### ***Segurança & Autenticação***
- **JWT + Passport.js** - Autenticação segura
- **bcrypt 5.x** - Criptografia de senhas

### ***Integrações***
- **Twilio SDK 4.x** - Notificações WhatsApp
- **Swagger 6.x** - Documentação automática da API

### ***DevOps***
- **Docker 24.0+** + **Docker Compose 2.20+**
- **ESLint** - Qualidade de código

---

## ***👥 Perfis de Usuário***

### ***📋 Paciente***
- ✅ Agendar consultas
- 📅 Visualizar histórico médico
- 🔔 Receber notificações via WhatsApp
- 📱 Acompanhar exames e resultados
- 👨‍⚕️ Buscar médicos por especialidade

### ***💼 Secretária***
- 📊 Controlar agenda médica
- ⏰ Gerenciar horários e confirmações
- 📞 Enviar lembretes aos pacientes
- 📈 Acessar relatórios gerenciais
- 🗓️ Reagendar consultas em massa

### ***👨‍⚕️ Médico***
- 📋 Gerenciar prontuários eletrônicos
- 💊 Prescrever medicamentos digitalmente
- 🧪 Solicitar e acompanhar exames
- 📊 Visualizar dashboards de produtividade
- 🤖 Receber sugestões de IA médica

---

## ***🛠️ Instalação e Configuração***

### ***Pré-requisitos***
- Node.js 20.x LTS
- Docker & Docker Compose
- PostgreSQL 15.x

### ***Clone o Repositório***
```bash
git clone https://github.com/seu-usuario/consultacerta.git
cd consultacerta
```

### ***Configuração com Docker***
```bash

# Instalar dependências
yarn

# Executar migrações
yarn start
```

### ***Variáveis de Ambiente***
Crie um arquivo `.env` baseado no `.env.example`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/consultacerta
JWT_SECRET=seu-jwt-secret-super-seguro
TWILIO_ACCOUNT_SID=seu-twilio-sid
TWILIO_AUTH_TOKEN=seu-twilio-token
```

---

## ***🏗️ Arquitetura do Sistema***

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   React Web     │◄──►│   NestJS API    │◄──►│  PostgreSQL     │
│   Frontend      │    │   Backend       │    │   Database      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │                 │
                    │ Twilio WhatsApp │
                    │   Integration   │
                    │                 │
                    └─────────────────┘
```