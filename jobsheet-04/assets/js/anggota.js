async function muatDaftarAnggota() {
    const tbody = document.querySelector("table tbody");
    const loading = document.getElementById("loading");
    if (!tbody || !loading) return;

    loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise(function (resolve) { setTimeout(resolve, 600); });

        const res = await fetch("../data/anggota.json");
        if (!res.ok) throw new Error("Gagal mengambil data (status " + res.status + ")");

        const daftarAnggota = await res.json();

        daftarAnggota.forEach(function (anggota) {
            const tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + anggota.member_id + "</td>" +
                "<td>" + anggota.name + "</td>" +
                "<td>" + anggota.address + "</td>" +
                "<td>" + anggota.phone + "</td>" +
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
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", muatDaftarAnggota);