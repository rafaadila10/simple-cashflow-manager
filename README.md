# Simple Cashflow Manager

Simple Cashflow Manager adalah aplikasi web sederhana untuk mencatat transaksi keuangan masuk (income) dan keluar (expense).  

## Tech Stack

- Frontend: Vue 3 (Composition API)
- Backend: AdonisJS v5
- Database: PostgreSQL
- Container: Docker & Docker Compose

## Features

- Create transaksi (income / expense)
- Update transaksi
- Delete transaksi
- List semua transaksi
- Summary otomatis:
  - Total income
  - Total expense
  - Balance
- Format tanggal yang user-friendly

---

## System Architecture

Vue 3 (Frontend)  
REST API  
AdonisJS v5 (Backend)  
PostgreSQL (Database)

---

## Database Schema

Table: `transactions`

| Field        | Type      | Description         |
|-------------|-----------|---------------------|
| id          | integer   | Primary key         |
| date        | timestamp | Waktu transaksi     |
| description | string    | Deskripsi           |
| amount      | integer   | Nominal             |
| type        | enum      | IN / OUT            |
| created_at  | timestamp | Auto                |
| updated_at  | timestamp | Auto                |

---

## API Endpoints

| Method | Endpoint              | Description          |
|--------|----------------------|----------------------|
| GET    | /transactions        | Get all              |
| POST   | /transactions        | Create               |
| PUT    | /transactions/:id    | Update               |
| DELETE | /transactions/:id    | Delete               |
| GET    | /summary             | Get summary          |

---

## How To Run (Docker)

```bash
git clone <repo_url>
cd simple-cashflow-manager
docker-compose up -d
```

Frontend: http://localhost:5173  
Backend: http://localhost:3333

---

## How To Run (Without Docker)

### Backend
```bash
cd backend
npm install
node ace migration:run
node ace serve --watch
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Notes

Project ini dibuat fokus pada business logic inti.

---

## Author

Mohammad Rafa Adila  
Fullstack Developer
