# Portfolio Website 2025

Portfolio website dengan desain modern menggunakan tema warna merah bercahaya dan hitam.

## Struktur Folder

```
portfolio/
├── index.html          # File HTML utama
├── style.css           # File CSS untuk styling
├── script.js           # File JavaScript untuk interaktivitas
├── images/             # Folder untuk gambar
│   ├── profile.jpg     # Foto profil untuk hero section
│   ├── profile-full.jpg # Foto profil lengkap untuk about section
│   ├── contact-photo.jpg # Foto untuk contact section
│   ├── thank-you.jpg   # Gambar thank you
│   ├── portfolio-preview.jpg # Preview portfolio
│   ├── icons/          # Folder untuk icon software
│   │   ├── figma.png
│   │   ├── photoshop.png
│   │   ├── lightroom.png
│   │   ├── capcut.png
│   │   ├── elementor.png
│   │   └── premiere.png
│   └── projects/       # Folder untuk gambar project
│       ├── project1.jpg
│       ├── project2.jpg
│       ├── project3.jpg
│       ├── project4.jpg
│       ├── project5.jpg
│       ├── project6.jpg
│       ├── project7.jpg
│       └── project8.jpg
└── music/              # Folder untuk musik background
    └── background.mp3  # File musik background
```

## Fitur

- ✨ Desain modern dengan efek glow merah bercahaya
- 🎨 Tema warna hitam dan merah yang elegan
- 📱 Responsive design untuk semua ukuran layar
- 🎵 Background music (autoplay setelah user interaction)
- ✨ Smooth scrolling dan animasi
- 🖱️ Efek cursor glow
- 📸 Gallery project dengan hover effect
- 🔗 Social media links

## Cara Menggunakan

1. Masukkan foto-foto Anda ke dalam folder `images/` sesuai dengan nama file yang tertera
2. Masukkan icon software ke dalam folder `images/icons/`
3. Masukkan foto project ke dalam folder `images/projects/`
4. Masukkan file musik background ke dalam folder `music/`
5. Edit informasi personal di file `index.html`
6. Buka file `index.html` di browser

## Customisasi

### Mengubah Warna
Edit file `style.css` dan ubah nilai warna:
- Merah utama: `#dc143c`
- Merah terang: `#ff1744`
- Hitam: `#000`

### Menambah/Mengurangi Project
Edit bagian `.project-grid` di `index.html` dan tambahkan/hapus `<div class="project-item">`.

### Mengubah Informasi Personal
Edit bagian About, Skills, dan Contact di file `index.html`.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Catatan

- Pastikan semua gambar sudah dimasukkan ke folder yang sesuai
- Untuk hasil terbaik, gunakan gambar dengan resolusi tinggi
- File musik akan otomatis play setelah user melakukan interaksi pertama (click)
