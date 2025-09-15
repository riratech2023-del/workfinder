// سوالات هالند
const questions = [
  { text: "از کارهای دستی لذت می‌برم.", type: "R" },
  { text: "به آزمایش‌های علمی علاقه‌مندم.", type: "I" },
  { text: "از طراحی و نقاشی خوشم میاد.", type: "A" },
  { text: "دوست دارم به مردم کمک کنم.", type: "S" },
  { text: "دوست دارم رهبری گروهی را برعهده بگیرم.", type: "E" },
  { text: "از کارهای دفتری دقیق خوشم میاد.", type: "C" },
  { text: "به تعمیر وسایل علاقه‌مندم.", type: "R" },
  { text: "به ریاضی علاقه‌مندم.", type: "I" },
  { text: "موسیقی گوش دادن و نواختن رو دوست دارم.", type: "A" },
  { text: "از مراقبت از دیگران لذت می‌برم.", type: "S" },
  { text: "از فروش و بازاریابی خوشم میاد.", type: "E" },
  { text: "دوست دارم با کامپیوتر کار کنم.", type: "C" },
  { text: "کارهای فنی برام جذابه.", type: "R" },
  { text: "تحقیقات علمی رو دوست دارم.", type: "I" },
  { text: "از نوشتن داستان لذت می‌برم.", type: "A" },
  { text: "از داوطلب شدن در کمک‌های مردمی لذت می‌برم.", type: "S" },
  { text: "دوست دارم پروژه‌ها رو مدیریت کنم.", type: "E" },
  { text: "از ثبت اطلاعات دقیق لذت می‌برم.", type: "C" },
  { text: "به نجاری یا خیاطی علاقه دارم.", type: "R" },
  { text: "دوست دارم چیزهای جدید کشف کنم.", type: "I" }
];

// نمره‌ها
const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

const questionsDiv = document.getElementById('questions');

// ایجاد سوالات در DOM
questions.forEach((q, qIndex) => {
  const qContainer = document.createElement('div');
  qContainer.className = 'question';

  const qTitle = document.createElement('h3');
  qTitle.textContent = q.text;
  qContainer.appendChild(qTitle);

  // هر سوال فقط دو گزینه "بلی" یا "خیر" برای نمره‌دهی
  const options = ["بلی", "خیر"];
  options.forEach((opt, oIndex) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.id = `q${qIndex}o${oIndex}`;
    input.name = `q${qIndex}`;
    input.value = opt; // مقدار "بلی" یا "خیر"
    input.className = 'radioInputHidden'

    const label = document.createElement('label');
    label.htmlFor = `q${qIndex}o${oIndex}`;
    label.textContent = opt;

    qContainer.appendChild(input);
    qContainer.appendChild(label);
  });

  questionsDiv.appendChild(qContainer);
});

// مدیریت ارسال فرم
const form = document.getElementById('quiz-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // پاک کردن نمرات قبلی
  for (let key in scores) scores[key] = 0;

  questions.forEach((q, qIndex) => {
    const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
    if (selected && selected.value === "بلی") {
      scores[q.type] += 1;
    }
  });

  console.log("نتایج تست هالند:", scores);
  alert(`نتایج شما:\nR: ${scores.R}\nI: ${scores.I}\nA: ${scores.A}\nS: ${scores.S}\nE: ${scores.E}\nC: ${scores.C}`);
});
