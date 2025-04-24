# ERP de Reservas de Restaurante

Sistema completo de gerenciamento de reservas para restaurantes, desenvolvido com:

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** com Mongoose
- **JWT Auth + Controle de Acesso por Cargo**
- **Envio de E-mail com Nodemailer**

## Funcionalidades

### Autenticação
- Registro e login com JWT
- Controle de acesso por tipo de usuário (`cliente`, `restaurante`, `admin`)

### Usuários
- Cliente: pode reservar mesas
- Restaurante: gerencia suas mesas
- Admin: cria restaurantes, vê todas as reservas

### Restaurantes
- Criar restaurante (admin)
- Listar restaurantes existentes

### Mesas
- CRUD completo (somente restaurante)

### Reservas
- Criar reserva (cliente)
- Listar reservas por cliente ou restaurante
- Cancelar reserva
- Listar todas as reservas do sistema (admin)

### E-mail (a implementar)
- Envio automático de confirmação de reserva com Gmail ou Mailtrap

## Como rodar o projeto localmente

```bash
npm install
npm run dev

```
## Exemplo de .env

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/erp
JWT_SECRET=sua_chave_segura

EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_senha_ou_appkey
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```
## Estrutura de pastas

```
src/
├── controllers/      
├── models/            
├── routes/            
├── middlewares/       
├── services/          
└── index.ts           

Feito com 💻 e café ☕