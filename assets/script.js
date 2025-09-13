// contoh sederhana: menu highlight dan scroll-to-top

// Highlight menu aktif berdasarkan URL
document.addEventListener("DOMContentLoaded", () => {
  const current = location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.style.textDecoration = "underline";
    }
  });
});

// Tombol scroll-to-top (bisa dipakai di semua halaman)
const toTopBtn = document.createElement("button");
toTopBtn.textContent = "↑";
toTopBtn.style.position = "fixed";
toTopBtn.style.bottom = "20px";
toTopBtn.style.right = "20px";
toTopBtn.style.display = "none";
toTopBtn.style.padding = "10px 15px";
toTopBtn.style.background = "#ff7e00";
toTopBtn.style.color = "#fff";
toTopBtn.style.border = "none";
toTopBtn.style.borderRadius = "8px";
toTopBtn.style.cursor = "pointer";
document.body.appendChild(toTopBtn);

window.addEventListener("scroll", () => {
  toTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
toTopBtn.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('quizForm');
  const overlay   = document.getElementById('resultOverlay');
  const resultTxt = document.getElementById('resultText');
  const closeBtn  = document.getElementById('closeOverlay');

  if (!quizForm) return;

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let score = 0;

    // ===== Kunci Jawaban =====
    const kunci = {
      q1: 'b',
      q2: 'b',
      q3: 'a',
      q4: 'b',
      q5: 'b',
      q6: 'b', // hanya bersentuhan dengan mahram yang TIDAK batal
      q7: 'a',
      q8: 'a',
      q9: 'c',
      q10: 'b'

    };

    Object.keys(kunci).forEach(k => {
      if (quizForm[k] && quizForm[k].value === kunci[k]) score++;
    });

    const total = Object.keys(kunci).length;
    const persen = Math.round((score / total) * 100);

    // Tampilkan ke overlay
    resultTxt.textContent = `Nilai kamu: ${score} dari ${total} (${persen}%)`;
    overlay.classList.remove('hidden');
  });

  // Tombol tutup popup
  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
  });
});
