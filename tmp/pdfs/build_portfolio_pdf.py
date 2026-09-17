from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output" / "pdf" / "portfolio-odhi-ahmad-hidayat.pdf"
ASSETS = ROOT / "public" / "assets"
W, H = A4

INK = colors.HexColor("#161C33")
MUTED = colors.HexColor("#59627D")
INDIGO = colors.HexColor("#4338CA")
TEAL = colors.HexColor("#0F766E")
VIOLET = colors.HexColor("#86198F")
PALE = colors.HexColor("#F4F6FD")
BORDER = colors.HexColor("#E2E7F4")
WHITE = colors.white

FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
pdfmetrics.registerFont(TTFont("Arial", FONT))
pdfmetrics.registerFont(TTFont("Arial-Bold", FONT_BOLD))


def clean(text):
    return (text.replace("—", "-").replace("–", "-").replace("·", "|")
            .replace("±", "+/-").replace("&", "&amp;"))


def para(c, text, x, y_top, width, size=9, leading=None, color=MUTED,
         font="Arial", align=TA_LEFT, max_h=999):
    leading = leading or size * 1.4
    style = ParagraphStyle("p", fontName=font, fontSize=size, leading=leading,
                           textColor=color, alignment=align, spaceAfter=0)
    p = Paragraph(clean(text), style)
    _, h = p.wrap(width, max_h)
    p.drawOn(c, x, y_top - h)
    return h


def rounded(c, x, y, w, h, fill=WHITE, stroke=BORDER, radius=10, sw=0.8):
    c.setLineWidth(sw)
    c.setStrokeColor(stroke)
    c.setFillColor(fill)
    c.roundRect(x, y, w, h, radius, fill=1, stroke=1)


def pill(c, text, x, y, fill=colors.HexColor("#ECEBFF"), color=INDIGO,
         size=7.2, pad_x=7, h=17):
    c.setFont("Arial-Bold", size)
    w = c.stringWidth(text, "Arial-Bold", size) + 2 * pad_x
    c.setFillColor(fill)
    c.roundRect(x, y, w, h, h / 2, fill=1, stroke=0)
    c.setFillColor(color)
    c.drawString(x + pad_x, y + (h - size) / 2 - 0.4, text)
    return w


def fit_image(c, path, x, y, w, h, bg=PALE):
    c.setFillColor(bg)
    c.roundRect(x, y, w, h, 7, fill=1, stroke=0)
    img = ImageReader(str(path))
    iw, ih = img.getSize()
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh,
                preserveAspectRatio=True, mask="auto")


def header(c, section, page_no):
    c.setFillColor(INDIGO)
    c.circle(38, H - 36, 7, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 6.7)
    c.drawCentredString(38, H - 38.4, "OA")
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 8.2)
    c.drawString(50, H - 39, "ODHI AHMAD HIDAYAT")
    c.setFillColor(MUTED)
    c.setFont("Arial", 7.6)
    c.drawRightString(W - 38, H - 39, section.upper())
    c.setStrokeColor(BORDER)
    c.line(38, H - 50, W - 38, H - 50)
    c.setFillColor(MUTED)
    c.setFont("Arial", 7)
    c.drawString(38, 23, "odhiahmad.github.io")
    c.drawRightString(W - 38, 23, f"{page_no:02d}")


def page_title(c, kicker, title, sub=None):
    y = H - 82
    pill(c, kicker.upper(), 38, y - 1, fill=colors.HexColor("#E8F5F2"), color=TEAL)
    y -= 32
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 25)
    c.drawString(38, y, title)
    if sub:
        para(c, sub, 38, y - 10, W - 76, 9.2, 13, MUTED)


PROJECTS = [
    ("Klinika", "2026 - Sekarang", "Sistem Manajemen Klinik", "Go | React | TypeScript | PostgreSQL",
     "Pendaftaran dan antrean real-time, rekam medis elektronik, apotek, kasir bershift, laporan laba-rugi, serta dukungan multi-cabang dan multi-peran.", "klinika-1.jpg"),
    ("Inventra", "2026 - Sekarang", "Manajemen Gudang & Stok", "Go | React | TypeScript | Telegram Bot",
     "Stok real-time lintas gudang, transaksi masuk/keluar, transfer, penyesuaian, hak akses per gudang, dan peringatan stok tipis otomatis.", "inventra-1.jpg"),
    ("NexaCloud", "2026 - Sekarang", "Landing Page Platform Cloud", "Figma | HTML | CSS | JavaScript",
     "Implementasi Figma ke HTML yang pixel-precise: hero berlapis, statistik, marketplace aplikasi sekali klik, serta section insight dan blog.", "nexa-cloud-1.jpg"),
    ("SIM RS", "2020", "Pendaftaran Rumah Sakit", "React Native | Laravel | Axios",
     "Aplikasi pendaftaran berobat online RSUD Padang Panjang. Dibangun seorang diri dari nol dalam sekitar enam bulan dan dirilis di Play Store.", "sim-rs-1.jpg"),
    ("ABON", "2020", "Absensi Online Berbasis GPS", "React Native | Geolocation | Axios",
     "Absensi ASN Pemprov Sumatera Barat dengan validasi radius GPS, laporan kerja harian, pengajuan izin, dan riwayat kehadiran.", "abon-1.jpg"),
    ("Sumbar Madani", "2021", "Super-App Layanan Publik", "React Native | Firebase",
     "Belasan layanan pemerintah dalam satu aplikasi: berita, statistik kesehatan, JDIH, pariwisata, lowongan, survei warga, dan pelaporan insiden.", "sumbar-madani-1.jpg"),
    ("Warung Tepat", "2021 - Sekarang", "Marketplace & PPOB", "React Native | Redux | Firebase",
     "Katalog stok dagangan, isi saldo, setor-tarik tunai, pembayaran pulsa/PLN/BPJS, dan pemantauan komisi untuk pemilik warung.", "warung-tepat-1.jpg"),
    ("Sitepat", "2021 - Sekarang", "Pembiayaan Syariah", "React Native | Redux | Firebase",
     "Nasabah dapat mengecek saldo, mengajukan pembiayaan, mengelola angsuran aktif, dan mengklaim hadiah langsung dari aplikasi.", "sitepat-1.jpg"),
    ("Tepati", "2021 - Sekarang", "Akuisisi Nasabah Internal", "React Native | Redux | SQLite",
     "Aplikasi offline-first untuk agen lapangan: verifikasi dokumen, jadwal kunjungan, pencarian nasabah, survei, wawancara, dan sinkronisasi data.", "tepati-1.jpg"),
    ("Web Sitepat", "2021", "Dashboard Manajemen", "React | Redux | JWT",
     "Analitik pencairan pembiayaan per wilayah dan periode, tabel eligibilitas nasabah, serta grafik tren enam bulan untuk manajemen.", "web-sitepat-1.jpg"),
    ("BRI RECE", "2021", "Dompet Digital Mobile Web", "React | TypeScript",
     "Alur registrasi dan login dompet digital Bank BRI, dibangun sebagai mobile web view dengan pengalaman yang menyerupai aplikasi native.", "bri-rece-1.jpg"),
    ("SIMPEN", "2020 - 2021", "Sistem Pengadaan PLN", "Laravel | MySQL",
     "Pencatatan kontrak, realisasi anggaran, status pengadaan, dan dashboard ringkasan untuk PLN UPDK Pekanbaru.", "simpen-1.jpg"),
    ("Engine Vue & Express", "2020 - 2021", "App Engine / Admin Generator", "Vue | Express | Node.js",
     "Fondasi aplikasi admin berisi menu dinamis, manajemen peran dan pengguna, serta kerangka CRUD agar tim fokus pada logika bisnis.", "engine-1.jpg"),
]


EXPERIENCE = [
    ("2024 - SEKARANG", "Founder & Full Stack Developer", "Loka Kasir - Platform Point of Sale",
     ["Membangun seluruh ekosistem POS untuk UMKM Indonesia secara mandiri.",
      "Backend Go, Gin, PostgreSQL, Redis dengan arsitektur berlapis dan multi-outlet.",
      "Aplikasi Flutter, dashboard React, landing page Next.js, QRIS, offline-first, dan scan-to-order."]),
    ("JAN 2022 - SEKARANG", "Full Stack Developer", "BTPN Syariah",
     ["Mengembangkan Warung Tepat, Web Warung Tepat, Sitepat, dan Tepati.",
      "React Native, React JS, dan Golang; delivery melalui GitLab CI/CD.",
      "Mengawal tiket dari analisis sprint hingga rilis ke pengguna."]),
    ("AGU 2021 - FEB 2023", "Frontend Developer", "Sagara Technology",
     ["BRI RECE: dompet digital mobile web berbasis React dan TypeScript.",
      "Back office BAF: aplikasi operasional perusahaan pembiayaan berbasis Next.js."]),
    ("JAN - MAR 2022", "Full Stack Facilitator", "Binar Academy",
     ["Mengajar sekitar 20 peserta bootcamp: Node.js, React, Next.js, dan deployment CI/CD."]),
    ("NOV 2020 - DES 2021", "Mobile Programmer", "KOMINFO Sumatera Barat",
     ["ABON: absensi online berbasis lokasi GPS untuk ASN Sumatera Barat.",
      "Sumbar Madani: super-app informasi dan layanan publik, dibangun dari nol."]),
    ("MAR - OKT 2020", "Mobile Programmer", "RSUD Padang Panjang",
     ["Membangun sendiri aplikasi pendaftaran pasien SIM RS dengan React Native hingga rilis di Play Store."]),
    ("JAN 2019 - JAN 2020", "Web Programmer", "PTIPD UIN SUSKA Riau",
     ["Membangun aplikasi pencatatan poin kinerja pegawai menggunakan Yii2 dan Vue.js."]),
]


SKILLS = ["Go (Gin)", "Flutter & Dart", "React / React Native", "TypeScript", "Next.js", "Vue.js",
          "Laravel / PHP", "Node.js / Express", "PostgreSQL", "MySQL", "Redis",
          "Riverpod / Redux / Zustand", "Firebase", "REST API Design", "JWT Auth", "Git & CI/CD"]


def cover(c):
    # Bold editorial cover: plenty of white space and a single indigo anchor.
    c.setFillColor(INDIGO)
    c.rect(0, 0, 17, H, fill=1, stroke=0)
    c.setFillColor(PALE)
    c.circle(W - 28, H - 38, 145, fill=1, stroke=0)
    c.setFillColor(colors.HexColor("#E8F5F2"))
    c.circle(W - 35, 65, 105, fill=1, stroke=0)
    c.setFillColor(INDIGO)
    c.circle(W - 75, H - 107, 42, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 25)
    c.drawCentredString(W - 75, H - 116, "OA")

    pill(c, "PORTFOLIO 2026", 50, H - 92, fill=colors.HexColor("#ECEBFF"), color=INDIGO, size=8.5, h=21)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 34)
    c.drawString(50, H - 166, "Odhi Ahmad")
    c.drawString(50, H - 207, "Hidayat")
    c.setFillColor(INDIGO)
    c.setFont("Arial-Bold", 18)
    c.drawString(50, H - 241, "Full Stack Developer")
    para(c, "Membangun produk digital dari hulu ke hilir - backend Go, dashboard React, hingga aplikasi Flutter dan React Native yang telah dirilis di Play Store dan App Store.",
         50, H - 276, 390, 11.2, 17, MUTED)

    stats = [("12+", "Aplikasi & sistem"), ("7+", "Tahun pengalaman"), ("4+", "Industri"), ("8+", "Tech stack")]
    sx, sy, sw = 50, H - 420, 112
    for i, (num, lab) in enumerate(stats):
        x = sx + i * sw
        c.setFillColor(INDIGO if i % 2 == 0 else TEAL)
        c.setFont("Arial-Bold", 18)
        c.drawString(x, sy, num)
        para(c, lab, x, sy - 7, 95, 7.7, 10, MUTED)

    rounded(c, 50, 82, W - 100, 126, fill=WHITE, stroke=BORDER, radius=14)
    c.setFillColor(TEAL)
    c.setFont("Arial-Bold", 8)
    c.drawString(70, 179, "KONTAK")
    info = [
        ("Email", "odhiahmad15@gmail.com"),
        ("WhatsApp", "0852-7299-3360"),
        ("GitHub", "github.com/odhiahmad"),
        ("Portfolio", "odhiahmad.github.io"),
    ]
    for i, (k, v) in enumerate(info):
        x = 70 + (i % 2) * 245
        y = 147 - (i // 2) * 43
        c.setFillColor(MUTED)
        c.setFont("Arial", 7.5)
        c.drawString(x, y + 12, k.upper())
        c.setFillColor(INK)
        c.setFont("Arial-Bold", 9.2)
        c.drawString(x, y, v)
    c.setFillColor(MUTED)
    c.setFont("Arial", 7.5)
    c.drawRightString(W - 38, 27, "Android | iOS | Web")
    c.showPage()


def flagship(c, page_no):
    header(c, "Proyek Unggulan", page_no)
    page_title(c, "Flagship", "Loka Kasir", "Platform Point of Sale lengkap untuk UMKM Indonesia - dirancang dan dibangun secara mandiri sejak 2024.")
    y = H - 185
    rounded(c, 38, y - 185, W - 76, 185, fill=colors.HexColor("#F8F8FF"), stroke=colors.HexColor("#CBC7FF"), radius=15)
    pill(c, "FOUNDER & FULL STACK DEVELOPER", 56, y - 28, size=7.4)
    para(c, "Loka Kasir menangani seluruh alur operasional toko: transaksi kasir, manajemen stok, perhitungan HPP/BOM dengan smart pricing, pembayaran QRIS, web POS offline-first, hingga QR scan-to-order untuk meja restoran - semuanya terpusat di satu dashboard admin.",
         56, y - 49, W - 112, 10, 15, INK)
    chips = ["Go", "Gin", "PostgreSQL", "Redis", "Flutter", "Riverpod", "React", "TypeScript", "Next.js", "QRIS"]
    x, yy = 56, y - 157
    for tag in chips:
        tw = pill(c, tag, x, yy, size=6.8, h=16)
        x += tw + 5
        if x > W - 85:
            x, yy = 56, yy - 21

    cards = [
        ("Backend API", "Go, Gin, PostgreSQL, Redis - autentikasi JWT, rate limiting, akses berbasis peran, dan arsitektur berlapis."),
        ("Aplikasi Mobile", "Flutter + Riverpod untuk Android/iOS, mendukung mode offline dan layout responsif HP maupun tablet."),
        ("Dashboard Admin", "React, TypeScript, Vite, Zustand - produk, outlet, karyawan, dan laporan penjualan dalam satu tempat."),
        ("Landing Page", "Next.js App Router dengan konten data-driven untuk menyampaikan nilai produk secara cepat dan jelas."),
    ]
    card_w, card_h = (W - 86) / 2, 105
    base_y = y - 318
    for i, (title, desc) in enumerate(cards):
        col, row = i % 2, i // 2
        x = 38 + col * (card_w + 10)
        yy = base_y - row * (card_h + 10)
        rounded(c, x, yy, card_w, card_h, fill=WHITE, stroke=BORDER, radius=11)
        c.setFillColor(INDIGO if i % 2 == 0 else TEAL)
        c.setFont("Arial-Bold", 10)
        c.drawString(x + 15, yy + card_h - 25, title)
        para(c, desc, x + 15, yy + card_h - 36, card_w - 30, 8.3, 12, MUTED)

    c.setFillColor(INK)
    c.setFont("Arial-Bold", 12)
    c.drawString(38, 114, "Keahlian inti")
    x, y2 = 38, 82
    for skill in SKILLS:
        tw = pill(c, skill, x, y2, fill=PALE, color=INK, size=7, h=18)
        x += tw + 5
        if x > W - 105:
            x, y2 = 38, y2 - 24
    c.linkURL("https://www.lokakasir.id/", (38, H - 120, 200, H - 80), relative=0)
    c.showPage()


def project_card(c, p, x, y, w, h, img_h=93):
    title, year, tag, tech, desc, image = p
    rounded(c, x, y, w, h, fill=WHITE, stroke=BORDER, radius=12)
    fit_image(c, ASSETS / image, x + 10, y + h - img_h - 10, w - 20, img_h)
    text_top = y + h - img_h - 20
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 12)
    c.drawString(x + 13, text_top - 12, title)
    c.setFillColor(MUTED)
    c.setFont("Arial", 7.2)
    c.drawRightString(x + w - 13, text_top - 11, year)
    c.setFillColor(TEAL)
    c.setFont("Arial-Bold", 7.8)
    c.drawString(x + 13, text_top - 28, tag)
    para(c, desc, x + 13, text_top - 37, w - 26, 7.6, 10.5, MUTED)
    c.setFillColor(INDIGO)
    c.setFont("Arial-Bold", 6.8)
    c.drawString(x + 13, y + 13, tech)


def projects_page(c, page_no, items, index):
    header(c, "Proyek Pilihan", page_no)
    page_title(c, f"Koleksi {index}", "Produk yang sudah dikirim", "Aplikasi mobile, dashboard web, dan sistem backend untuk kesehatan, pemerintahan, fintech, retail, dan cloud.")
    card_w = (W - 86) / 2
    if len(items) <= 4:
        card_h = 267
        for i, p in enumerate(items):
            col, row = i % 2, i // 2
            x = 38 + col * (card_w + 10)
            y = H - 455 - row * (card_h + 12)
            project_card(c, p, x, y, card_w, card_h)
    else:
        # A denser final collection avoids dedicating a mostly empty page to
        # the thirteenth project while keeping all project text legible.
        card_h = 215
        for i, p in enumerate(items[:4]):
            col, row = i % 2, i // 2
            x = 38 + col * (card_w + 10)
            y = H - 400 - row * (card_h + 12)
            project_card(c, p, x, y, card_w, card_h, img_h=68)
        project_card(c, items[4], 38, 54, W - 76, 145, img_h=54)
    c.showPage()


def exp_card(c, item, x, y, w, h):
    date, title, place, bullets = item
    rounded(c, x, y, w, h, fill=WHITE, stroke=BORDER, radius=11)
    pill(c, date, x + 14, y + h - 29, size=6.8, h=17)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 11)
    c.drawString(x + 14, y + h - 51, title)
    c.setFillColor(TEAL)
    c.setFont("Arial-Bold", 8.1)
    c.drawString(x + 14, y + h - 67, place)
    top = y + h - 80
    for b in bullets:
        c.setFillColor(INDIGO)
        c.circle(x + 18, top - 4, 1.6, fill=1, stroke=0)
        used = para(c, b, x + 25, top, w - 39, 8, 11.2, MUTED)
        top -= used + 6


def experience_page(c, page_no):
    header(c, "Pengalaman", page_no)
    page_title(c, "Karier", "Perjalanan profesional", "Dari web programmer dan mobile developer hingga memimpin pengembangan produk full-stack sendiri.")
    y = H - 330
    h = 155
    for i, item in enumerate(EXPERIENCE[:4]):
        x = 38 if i % 2 == 0 else W / 2 + 5
        yy = y - (i // 2) * (h + 12)
        exp_card(c, item, x, yy, (W - 86) / 2, h)
    c.showPage()


def closing_page(c, page_no):
    header(c, "Pengalaman & Kontak", page_no)
    page_title(c, "Lanjutan", "Fondasi yang membentuk cara kerja", "Pengalaman lintas sektor, ditopang dasar akademik dan kebiasaan mengirim produk sampai selesai.")
    y = H - 315
    for i, item in enumerate(EXPERIENCE[4:]):
        exp_card(c, item, 38, y - i * 120, W - 76, 112)
    edu_y = 167
    rounded(c, 38, edu_y, W - 76, 104, fill=colors.HexColor("#F8F8FF"), stroke=colors.HexColor("#CBC7FF"), radius=12)
    pill(c, "2014 - 2019", 54, edu_y + 70, size=6.8, h=17)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 11)
    c.drawString(54, edu_y + 50, "S1 Teknik Informatika - UIN Sultan Syarif Kasim Riau")
    para(c, "IPK 3,51/4,00 (145 SKS). Tiga kali dipercaya menjadi asisten dosen: Struktur Data, Teknologi Informasi Web, dan Algoritma Pemrograman.",
         54, edu_y + 41, W - 108, 8.2, 11.5, MUTED)

    box_y = 43
    rounded(c, 38, box_y, W - 76, 108, fill=INDIGO, stroke=INDIGO, radius=14)
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 18)
    c.drawString(58, box_y + 74, "Mari bangun sesuatu.")
    para(c, "Terbuka untuk proyek full-stack: aplikasi mobile, dashboard web, dan backend API.",
         58, box_y + 60, W - 116, 9, 13, colors.HexColor("#EDEBFF"))
    c.setFont("Arial-Bold", 8.4)
    c.setFillColor(WHITE)
    c.drawString(58, box_y + 20, "odhiahmad15@gmail.com   |   0852-7299-3360   |   github.com/odhiahmad")
    c.linkURL("mailto:odhiahmad15@gmail.com", (58, box_y + 12, 205, box_y + 34), relative=0)
    c.linkURL("https://github.com/odhiahmad", (355, box_y + 12, 500, box_y + 34), relative=0)
    c.showPage()


def build():
    c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
    c.setTitle("Portfolio - Odhi Ahmad Hidayat")
    c.setAuthor("Odhi Ahmad Hidayat")
    c.setSubject("Full Stack Developer Portfolio")
    cover(c)
    flagship(c, 2)
    page_no = 3
    groups = [PROJECTS[:4], PROJECTS[4:8], PROJECTS[8:]]
    for idx, group in enumerate(groups, start=1):
        projects_page(c, page_no, group, idx)
        page_no += 1
    experience_page(c, page_no)
    closing_page(c, page_no + 1)
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
