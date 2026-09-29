async function muatDaftarBuku() {
    const tbody = document.querySelector("table tbody");
    const loading = document.getElementById("loading");
    if (!tbody || !loading) return;

    // 1. Tampilkan loading, kosongkan tabel
    loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        // Delay simulasi 600 ms (supaya loading terlihat)
        await new Promise(function (resolve) { setTimeout(resolve, 600); });

        // 2. Ambil data
        const res = await fetch("../data/buku.json");
        if (!res.ok) throw new Error("Gagal mengambil data (status " + res.status + ")");

        // 3. Ubah jadi array objek
        const daftarBuku = await res.json();

        // 4. Bangun tiap baris
        daftarBuku.forEach(function (buku) {
            const tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + buku.title + "</td>" +
                "<td>" + buku.author + "</td>" +
                "<td>" + buku.year + "</td>" +
                "<td>" + buku.stock + "</td>" +
                "<td>" +
                    '<button type="button">Edit</button>' +
                    '<button type="button" class="btn-hapus">Delete</button>' +
                "</td>";
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan='5'>Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        // 5. Sembunyikan loading, berhasil maupun gagal
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", muatDaftarBuku);