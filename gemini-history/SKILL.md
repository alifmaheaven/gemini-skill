---
name: gemini-history
description: Mengelola folder riwayat aktivitas Gemini CLI. Gunakan skill ini untuk secara otomatis mencatat setiap tindakan teknis, pembaruan sistem, atau perubahan codebase ke dalam file 'summary.md' harian dan mengindeksnya di 'README.md'.
---

# Gemini History Skill

Skill ini menstandardisasi pencatatan aktivitas harian agar Gemini CLI dapat mengingat konteks sesi sebelumnya secara mandiri.

## Alur Kerja

Setiap kali Anda menyelesaikan tugas atau mencapai tonggak penting:

1.  **Gunakan Skrip Update**: Jalankan skrip pembantu untuk mencatat log tindakan.
    ```bash
    node scripts/update_history.cjs "Tindakan" "Detail aktivitas yang dilakukan"
    ```

2.  **Struktur Folder**:
    - `gemini history/`: Folder utama.
    - `gemini history/README.md`: Indeks pusat yang mencantumkan tautan ke rangkuman harian.
    - `gemini history/YYYY-MM-DD/`: Folder per hari.
    - `gemini history/YYYY-MM-DD/summary.md`: Log detail tindakan dan ringkasan pencapaian.

## Kapan Menggunakan

- **Awal Sesi**: Periksa folder ini untuk memulihkan konteks.
- **Akhir Tugas**: Catat ringkasan pekerjaan.
- **Pembaruan Sistem**: Catat perubahan versi atau instalasi tools baru.

## Referensi File
- `scripts/update_history.cjs`: Skrip pembantu untuk mengotomatiskan penulisan log harian.
