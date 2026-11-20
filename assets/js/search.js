// Data destinasi wisata yang tersedia
const dataDestinasi = [
  { nama: "Bali", url: "bali.html", deskripsi: "Wisata Pantai Kelingking & Keindahan Nusa Penida" },
  { nama: "Malang", url: "malang.html", deskripsi: "Wisata Gunung Bromo & Udara Sejuk Pegunungan" },
  { nama: "Papua", url: "papua.html", deskripsi: "Wisata Raja Ampat & Surga Bawah Laut Dunia" },
  { nama: "Nusa Tenggara Timur", url: "ntt.html", deskripsi: "Wisata Pulau Padar & Labuan Bajo" },
  { nama: "Yogyakarta", url: "yogyakarta.html", deskripsi: "Wisata Candi Prambanan & Suasana Malioboro" },
  { nama: "Paket Travel", url: "routes.html", deskripsi: "Paket perjalanan antar kota (Hiace & Innova)" }
];

// Fungsi Utama: Input -> Proses -> Output
function cariDestinasi() {
  // 1. INPUT: Ambil teks dari input search bar
  const inputEl = document.getElementById("searchInput");
  const outputEl = document.getElementById("searchOutput");
  const keyword = inputEl.value.trim().toLowerCase();

  // Validasi jika input kosong
  if (keyword === "") {
    outputEl.innerHTML = "<p class='uk-text-warning'>Silakan masukkan nama destinasi yang ingin dicari!</p>";
    return;
  }

  // 2. PROSES: Filter destinasi yang cocok dengan kata kunci
  const hasil = dataDestinasi.filter(item =>
    item.nama.toLowerCase().includes(keyword) ||
    item.deskripsi.toLowerCase().includes(keyword)
  );

  // 3. OUTPUT: Tampilkan hasil pencarian ke elemen output
  if (hasil.length > 0) {
    let outputHTML = "<div class='uk-grid-small uk-child-width-1-1' uk-grid>";

    hasil.forEach(item => {
      outputHTML += `
        <div>
          <div class='uk-card uk-card-default uk-card-body uk-card-small uk-border-rounded uk-box-shadow-small' style='max-width: 520px; margin: 0 auto; text-align: left;'>
            <h4 class='uk-margin-remove-bottom uk-text-bold'>${item.nama}</h4>
            <p class='uk-margin-xsmall-top uk-margin-small-bottom uk-text-muted'>${item.deskripsi}</p>
            <a href='${item.url}' class='uk-button uk-button-primary uk-button-small' style='border-radius: 4px;'>Lihat Selengkapnya &rarr;</a>
          </div>
        </div>
      `;
    });

    outputHTML += "</div>";
    outputEl.innerHTML = outputHTML;
  } else {
    // Tampilan jika data tidak ditemukan
    outputEl.innerHTML = `
      <div class='uk-alert-danger uk-border-rounded' uk-alert style='max-width: 520px; margin: 0 auto;'>
        <p>Destinasi <strong>"${escapeHtml(inputEl.value.trim())}"</strong> tidak ditemukan.<br>
        <span class='uk-text-small'>Coba kata kunci: Bali, Malang, Papua, NTT, atau Yogyakarta.</span></p>
      </div>
    `;
  }
}

// Fungsi pencegah XSS sederhana
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

// Event Listener saat halaman siap
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  // Klik tombol Cari
  if (searchBtn) {
    searchBtn.addEventListener("click", cariDestinasi);
  }

  // Tekan Enter di kolom input
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        cariDestinasi();
      }
    });
  }
});

