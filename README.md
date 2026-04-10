# PrintCare - Printer Maintenance Management System

## 📋 Overview

PrintCare adalah sistem manajemen pemeliharaan printer berbasis web yang dirancang untuk melacak, mengelola, dan mendokumentasikan semua kegiatan maintenance printer di organisasi/perusahaan.

## 🎯 Fitur Utama

### 1. **Login Page** (`index.html`)
- Form login dengan username & password
- Validasi sederhana (multi-user)
- Tampilan full-screen with branding PrintCare
- Demo accounts:
  - Admin: `admin` / `password123`
  - Teknisi: `teknisi` / `password123`  
  - Manager: `manager` / `password123`

### 2. **Dashboard** (`dashboard.html`)
- 4 Stat Cards:
  - Total printer
  - Sudah dimaintenance
  - Belum dimaintenance
  - Dalam perbaikan
- Donut Chart - Persentase status maintenance
- Bar Chart - Aktivitas maintenance per bulan
- Tabel ringkas dengan daftar printer terkini

### 3. **Input Maintenance** (`maintenance.html`)
Fitur utama untuk teknisi di lapangan:
- **Scan QR Code** lewat kamera HP → otomatis mengisi:
  - ID / nama perangkat printer
  - Lokasi perangkat
  - Jam & tanggal maintenance (real-time)
- **Input Manual** sebagai fallback jika kamera tidak tersedia
- **Upload Foto** kegiatan maintenance (preview langsung)
- **Form Penilaian Kondisi**:
  - Status kondisi perangkat
  - Jenis maintenance (Preventive/Corrective/Check)
  - Catatan & deskripsi kegiatan
  - Nama teknisi
- **Tracking Suku Cadang** yang digunakan
- Tombol Simpan Laporan

### 4. **Daftar Perangkat** (`devices.html`)
- Tabel semua printer dengan status lengkap
- Filter berdasarkan:
  - Status (Aktif/Pending/Perbaikan)
  - Lokasi
  - Pencarian (ID, model, lokasi)
- Fitur untuk setiap printer:
  - 👁️ Lihat detail
  - 📊 Generate & download QR code (untuk dicetak & ditempel)
  - ✏️ Edit data
- Info detail: lokasi, tanggal maintenance terakhir, teknisi

### 5. **Troubleshoot Log** (`troubleshoot.html`)
- Timeline log semua kegiatan troubleshoot
- Setiap entri berisi:
  - ID printer
  - Judul masalah
  - Deskripsi masalah
  - Solusi yang diaplikasikan
  - Nama teknisi
  - Waktu resolusi
  - Status (Resolved/Pending/Escalated)
- Form tambah laporan troubleshoot baru (Modal)
- Filter berdasarkan:
  - Pencarian teks
  - Printer ID
  - Status
  - Tanggal

---

## 📁 Struktur File

```
Html/
├── index.html              # Login page
├── dashboard.html          # Dashboard dengan stats & charts
├── maintenance.html        # Form input maintenance (untuk teknisi)
├── devices.html            # Daftar perangkat & management
├── troubleshoot.html       # Log aktivitas troubleshoot
├── styles.css              # CSS styling utama (responsive)
├── script.js               # JavaScript global & utilities
└── README.md              # Dokumentasi (file ini)
```

---

## 🚀 Cara Menggunakan

### 1. **Membuka Aplikasi**
- Buka `index.html` di browser
- Gunakan salah satu demo account untuk login

### 2. **Di Dashboard**
- Lihat statistik maintenance printer
- Monitor status keseluruhan printer
- Akses fitur lainnya via sidebar navigation

### 3. **Input Maintenance (Teknisi)**
- Klik "Input Maintenance" di sidebar
- Opsi 1: Scan QR code dari printer
- Opsi 2: Manual input ID printer
- Upload foto aktivitas
- Isi penilaian kondisi & catatan
- Klik "Simpan Laporan"

### 4. **Kelola Daftar Perangkat (Manager)**
- Klik "Daftar Perangkat" di sidebar
- Gunakan filter untuk mencari printer
- Klik tombol aksi:
  - 👁️ untuk lihat detail
  - 📊 untuk generate QR code (bisa di-print)
  - ✏️ untuk edit

### 5. **Lihat Troubleshoot Log**
- Klik "Troubleshoot Log" di sidebar
- Filter berdasarkan printer, status, atau tanggal
- Klik "➕ Laporan Baru" untuk tambah entry baru
- Klik "Lihat Detail" untuk expand entry

---

## 🎨 Desain & User Interface

### Palet Warna
- **Primary**: `#0066cc` (Biru)
- **Secondary**: `#00b8d4` (Cyan)
- **Success**: `#4CAF50` (Hijau)
- **Warning**: `#FF9800` (Orange)
- **Danger**: `#F44336` (Merah)

### Layout
- **Sidebar Navigation**: Fixed di kiri (280px)
- **Main Content**: Responsive grid layout
- **Responsive Design**: Mobile-friendly (tested di 480px, 768px, 1024px+)

### Komponen UI
- ✅ Stat Cards dengan icon & hover effect
- ✅ Charts (Donut & Bar dengan Chart.js)
- ✅ Data Tables dengan filtering
- ✅ Forms dengan validation
- ✅ Modals untuk detail & form tambah
- ✅ Timeline untuk log aktivitas
- ✅ Badges untuk status
- ✅ Toast notifications
- ✅ File upload dengan preview

---

## 🔧 Fitur Teknis (Frontend)

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dependencies
- **Chart.js** (CDN) - Untuk charts
- **QRCode.js** (CDN) - Untuk generate QR code

### Features
- Local Storage untuk session management
- Form validation (client-side)
- Responsive design dengan CSS Grid & Flexbox
- Dark mode ready (dapat ditambahkan)
- Debouncing untuk search/filter
- Print & download functionality

---

## 📝 Data Mock

Aplikasi ini menggunakan data mock/dummy untuk preview. Berikut adalah struktur data yang digunakan:

### Printer Data
```javascript
{
  id: "PR-001",
  model: "HP LaserJet Pro M404n",
  location: "Kantor - Lantai 1",
  status: "Aktif",
  lastMaintenance: "12 Apr 2026",
  technician: "Budi Santoso"
}
```

### Maintenance Report
```javascript
{
  printerId: "PR-001",
  location: "Kantor - Lantai 1",
  maintenanceDate: "2026-04-12T14:30",
  condition: "baik",
  maintenanceType: "preventive",
  technician: "Budi Santoso",
  notes: "...",
  photo: "base64_image_data",
  partUsed: []
}
```

### Troubleshoot Log
```javascript
{
  printerId: "PR-001",
  title: "Kertas Macet di Tray",
  problem: "...",
  solution: "...",
  technician: "Budi Santoso",
  status: "resolved",
  date: "2026-04-12",
  time: "14:30"
}
```

---

## 🎯 Next Steps untuk Backend

Untuk integrasi dengan backend, persiapkan API endpoints:

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout

### Devices
- `GET /api/devices` - Daftar semua printer
- `GET /api/devices/:id` - Detail printer
- `POST /api/devices` - Tambah printer baru
- `PUT /api/devices/:id` - Update printer
- `DELETE /api/devices/:id` - Hapus printer
- `GET /api/devices/:id/qr` - Generate QR code

### Maintenance
- `GET /api/maintenance` - Daftar laporan maintenance
- `POST /api/maintenance` - Tambah laporan maintenance
- `GET /api/maintenance/:id` - Detail laporan
- `GET /api/maintenance/stats` - Statistik maintenance

### Troubleshoot
- `GET /api/troubleshoot` - Daftar troubleshoot log
- `POST /api/troubleshoot` - Tambah entry troubleshoot
- `GET /api/troubleshoot/:id` - Detail troubleshoot

### Dashboard Stats
- `GET /api/stats/overview` - Statistik keseluruhan

---

## 💡 Catatan Penting

1. **Data Persistence**: Saat ini data disimpan pada mock objects. Backend diperlukan untuk data persistence.

2. **Authentication**: Login saat ini menggunakan localStorage sederhana. Implementasi JWT atau session-based auth di backend.

3. **File Upload**: Preview file sudah implemented. Backend perlu handle file storage dan serving.

4. **QR Codes**: Generate QR sudah working. Backend bisa store QR reference di database.

5. **Real-time Updates**: Untuk real-time updates (push notifications, live sync), perlu WebSocket atau polling dari backend.

---

## 📞 Support & Documentation

Untuk pertanyaan atau issue, dokumentasikan:
- Browser yang digunakan
- Steps to reproduce
- Screenshot/error message

---

## 📄 License

PrintCare © 2026 - Semua hak dilindungi

---

## ✨ Version

**PrintCare v1.0.0** - Frontend Design Only  
Released: April 2026

---

**Catatan**: Ini adalah versi desain frontend saja (HTML/CSS/JavaScript). Backend API dan database masih perlu diimplementasikan.
