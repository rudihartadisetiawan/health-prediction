# 🚀 HealthPredict - Quick Start Guide

## 📋 Prerequisites

Pastikan sudah terinstall:
- **Node.js** (v18 atau lebih baru)
- **Python** (v3.9 atau lebih baru)
- **pip** (Python package manager)

## 🔧 Setup Awal (Sekali Saja)

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies (di folder healthpredict-api)
cd healthpredict-api && npm install && cd ..

# Install ML dependencies (di folder healthpredict-ml)
cd healthpredict-ml && pip install -r requirements.txt && cd ..
```

### 2. Setup Environment Variables

Copy file `.env.example` menjadi `.env.local`:

```bash
copy .env.example .env.local
```

## ▶️ Cara Menjalankan

### 🎯 **RECOMMENDED**: Jalankan Semua Service dengan 1 Command

```bash
npm run dev:all
```

Ini akan menjalankan:
- ✅ **ML Service** (FastAPI) - Port 8000
- ✅ **Backend API** (Express.js) - Port 5000  
- ✅ **Frontend** (Next.js) - Port 3000

**Output akan berwarna berbeda untuk setiap service, jadi mudah dibedakan!**

### 🔹 Atau Jalankan Satu Per Satu (Jika Perlu)

**Frontend Only:**
```bash
npm run dev:web
```

**Backend Only:**
```bash
npm run dev:api
```

**ML Service Only:**
```bash
npm run dev:ml
```

## 🌐 Akses Aplikasi

Setelah semua service running, buka browser:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **ML Service**: http://localhost:8000/docs

## 🛑 Cara Menghentikan

Tekan **`Ctrl + C`** di terminal untuk menghentikan semua service sekaligus.

## 📁 Struktur Project

```
health/
├── app/                      # Next.js frontend
├── components/               # React components
├── healthpredict-api/        # Express.js backend
│   └── src/
├── healthpredict-ml/         # FastAPI ML service
│   ├── main.py
│   └── models/
├── package.json              # Root package.json (dengan concurrently)
└── .env.local                # Environment variables
```

## 🐛 Troubleshooting

### Port Sudah Digunakan

Jika ada error "Port already in use":

**Windows:**
```bash
# Cari process yang menggunakan port
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :8000

# Kill process (ganti PID dengan ID yang muncul)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### ML Service Error

Pastikan Python packages terinstall:

```bash
cd healthpredict-ml
pip install -r requirements.txt
```

### Backend API Error

Pastikan dependencies terinstall:

```bash
cd healthpredict-api
npm install
```

## 📝 Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:all` | Jalankan semua service (development) |
| `npm run dev:web` | Frontend only (port 3000) |
| `npm run dev:api` | Backend only (port 5000) |
| `npm run dev:ml` | ML service only (port 8000) |
| `npm run build` | Build frontend untuk production |
| `npm run start:all` | Jalankan semua service (production) |

## 🎉 Ready to Go!

Sekarang Anda bisa fokus development tanpa perlu buka 3 terminal berbeda! 🚀
