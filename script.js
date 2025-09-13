/* ==== SLIDER ==== */
const slides = document.querySelector('.slides');
if (slides) {
  const images = document.querySelectorAll('.slides img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let counter = 0;
  function showSlide(index) {
    if (index < 0) counter = images.length - 1;
    else if (index >= images.length) counter = 0;
    else counter = index;
    slides.style.transform = `translateX(-${counter * 100}%)`;
  }
  prevBtn.onclick = () => showSlide(counter - 1);
  nextBtn.onclick = () => showSlide(counter + 1);
  setInterval(() => showSlide(counter + 1), 5000);
}

/* ==== VIDEO UPLOAD ==== */
const videoInput = document.getElementById('videoInput');
if (videoInput) {
  const videoPlayer = document.getElementById('videoPlayer');
  videoInput.onchange = e => {
    const file = e.target.files[0];
    if (file) videoPlayer.src = URL.createObjectURL(file);
  };
}

/* ==== QUIZ ==== */
const qEl = document.getElementById('question');
if (qEl) {
  const questions = [
    { q: "Planet terdekat dengan Matahari?", options: ["Venus","Merkurius","Mars"], answer: 1 },
    { q: "Air mendidih pada suhu?", options: ["100°C","80°C","120°C"], answer: 0 },
    { q: "Bumi mengelilingi matahari dalam waktu?", options: ["365 hari","24 jam","30 hari"], answer: 0 }
  ];
  let current = 0;
  const cEl = document.getElementById('choices');
  const rEl = document.getElementById('result');
  function showQuestion() {
    qEl.textContent = questions[current].q;
    cEl.innerHTML = '';
    questions[current].options.forEach((opt, i) => {
      cEl.innerHTML += `<label><input type="radio" name="opt" value="${i}"> ${opt}</label>`;
    });
  }
  showQuestion();
  document.getElementById('next').onclick = () => {
    const ans = document.querySelector('input[name="opt"]:checked');
    if (!ans) return alert('Pilih jawaban!');
    rEl.textContent = (+ans.value === questions[current].answer) ? "Jawaban Benar!" : "Jawaban Salah!";
    current++;
    if (current < questions.length) {
      setTimeout(() => { rEl.textContent = ""; showQuestion(); }, 800);
    } else {
      qEl.textContent = "Kuis selesai. Terima kasih!";
      cEl.innerHTML = '';
    }
  };
}
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
