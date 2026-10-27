const kurangGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = id => document.getElementById(id);


// ==============================
// HATI MELAYANG (latar)
// ==============================
function buatHatiMelayang() {
    const box = document.querySelector(".float-hearts");
    if (!box || kurangGerak) return;

    const jumlah = window.innerWidth < 600 ? 8 : 14;
    for (let i = 0; i < jumlah; i++) {
        const s = document.createElement("span");
        s.textContent = Math.random() < 0.6 ? "♥" : "♡";
        s.style.left = Math.random() * 100 + "%";
        s.style.fontSize = 10 + Math.random() * 18 + "px";
        s.style.animationDuration = 11 + Math.random() * 10 + "s";
        s.style.animationDelay = -Math.random() * 16 + "s";
        s.style.setProperty("--o", (0.18 + Math.random() * 0.3).toFixed(2));
        s.style.setProperty("--sx", Math.random() * 80 - 40 + "px");
        box.appendChild(s);
    }
}


// ==============================
// LEDAKAN HATI KECIL SAAT DIKLIK
// ==============================
function ledakan(x, y) {
    if (kurangGerak) return;

    const n = 8;
    for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        s.className = "pop";
        s.textContent = "♥";

        const sudut = (Math.PI * 2 / n) * i + Math.random() * 0.5;
        const jarak = 40 + Math.random() * 40;

        s.style.left = x + "px";
        s.style.top = y + "px";
        s.style.fontSize = 12 + Math.random() * 10 + "px";
        s.style.setProperty("--dx", Math.cos(sudut) * jarak + "px");
        s.style.setProperty("--dy", Math.sin(sudut) * jarak - 20 + "px");

        document.body.appendChild(s);
        setTimeout(() => s.remove(), 950);
    }
}


// ==============================
// HALAMAN WELCOME: buka amplop lalu pindah halaman
// ==============================
const openBtn = $("openBtn");

if (openBtn) {
    openBtn.addEventListener("click", () => {
        if (openBtn.disabled) return;
        openBtn.disabled = true;

        const r = openBtn.getBoundingClientRect();
        ledakan(r.left + r.width / 2, r.top + r.height / 2);
        document.body.classList.add("opening");

        setTimeout(() => document.body.classList.add("leaving"), kurangGerak ? 0 : 1100);
        setTimeout(() => { window.location.href = "home.html"; }, kurangGerak ? 0 : 1700);
    });
}


// ==============================
// HALAMAN UTAMA: klik foto = hati kecil muncul
// ==============================
document.querySelectorAll(".polaroid").forEach(p => {
    p.addEventListener("click", e => ledakan(e.clientX, e.clientY));
});

buatHatiMelayang();