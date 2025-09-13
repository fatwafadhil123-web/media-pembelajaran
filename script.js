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
