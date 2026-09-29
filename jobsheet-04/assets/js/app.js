// assets/js/app.js

/* ===== 1. Menu hamburger ===== */
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

/* ===== 2. Tombol Hapus (event delegation) ===== */
function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus " + nama + "?");

        if (yakin && row) row.remove();
    });
}

/* ===== 3. Pencarian tabel ===== */
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector("table");
    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();

        table.querySelectorAll("tbody tr").forEach(function (row) {
            const teks = row.textContent.toLowerCase();
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
    });
}

/* ===== 4. Validasi form ===== */
function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        // Field teks wajib diisi (form Buku: title, author | form Anggota: name, member_id)
        ["title", "author", "name", "member_id"].forEach(function (nama) {
            const input = form.querySelector("[name='" + nama + "']");
            if (!input) return;

            hapusError(input);
            if (input.value.trim() === "") {
                tampilkanError(input, "Field ini wajib diisi.");
                valid = false;
            }
        });

        // Tahun terbit (hanya ada di form Buku)
        const year = form.querySelector("[name='year']");
        if (year) {
            hapusError(year);
            const nilai = parseInt(year.value, 10);
            if (isNaN(nilai) || nilai < 1900 || nilai > 2026) {
                tampilkanError(year, "Tahun harus antara 1900 dan 2026.");
                valid = false;
            }
        }

        // Stok (hanya ada di form Buku)
        const stock = form.querySelector("[name='stock']");
        if (stock) {
            hapusError(stock);
            const nilai = parseInt(stock.value, 10);
            if (isNaN(nilai) || nilai < 0) {
                tampilkanError(stock, "Stok tidak boleh kurang dari 0.");
                valid = false;
            }
        }

        if (!valid) e.preventDefault();
    });
}

/* ===== Jalankan semua fitur ===== */
document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});