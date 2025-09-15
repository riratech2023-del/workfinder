const types = {
  R: { title: "واقع‌گرا", icon: "fa-screwdriver-wrench", desc: "اهل عمل، فنی و علاقه‌مند به کارهای فیزیکی یا فنی هستید." },
  I: { title: "پژوهشگر", icon: "fa-flask", desc: "کنجکاو، تحلیلی و دوست‌دار حل مسئله هستید." },
  A: { title: "هنری", icon: "fa-palette", desc: "خلاق، نوآور و علاقه‌مند به هنر، طراحی یا نوشتن هستید." },
  S: { title: "اجتماعی", icon: "fa-handshake-angle", desc: "مهربان، کمک‌رسان و علاقه‌مند به همکاری با دیگران هستید." },
  E: { title: "متهور", icon: "fa-bullhorn", desc: "رهبر، بلندپرواز و علاقه‌مند به مدیریت و فروش هستید." },
  C: { title: "سنت‌گرا", icon: "fa-file-lines", desc: "منظم، دقیق و علاقه‌مند به کارهای ساختاریافته و دفتری هستید." }
};

// مشاغل پیشنهادی
const jobData = {
  R: [
    { title: "تکنسین مکانیک", desc: "کار با دستگاه‌ها و تجهیزات فنی.", salary: "درآمد متوسط", market: "خوب" },
    { title: "برق‌کار صنعتی", desc: "نصب و تعمیر سیستم‌های الکتریکی.", salary: "بالا", market: "خیلی خوب" },
    { title: "نجار", desc: "ساخت و تعمیر سازه‌های چوبی.", salary: "متوسط", market: "متوسط" }
  ],
  I: [
    { title: "پژوهشگر داده", desc: "تحلیل و تفسیر داده‌ها برای تصمیم‌گیری.", salary: "بالا", market: "رو به رشد" },
    { title: "مهندس شیمی", desc: "تحقیقات علمی و صنعتی.", salary: "بالا", market: "خوب" },
    { title: "زیست‌شناس", desc: "مطالعه موجودات زنده.", salary: "متوسط", market: "متوسط" }
  ],
  A: [
    { title: "طراح گرافیک", desc: "طراحی بصری برای برندها.", salary: "متوسط", market: "خوب" },
    { title: "نویسنده محتوا", desc: "تولید متن و محتوای خلاقانه.", salary: "متوسط", market: "خوب" },
    { title: "موسیقیدان", desc: "نواختن، آموزش یا تولید موسیقی.", salary: "متغیر", market: "رقابتی" }
  ],
  S: [
    { title: "مشاور روانشناسی", desc: "کمک به بهبود شرایط روانی دیگران.", salary: "متوسط", market: "در حال رشد" },
    { title: "پرستار", desc: "مراقبت از بیماران.", salary: "خوب", market: "خیلی خوب" },
    { title: "معلم", desc: "آموزش و پرورش.", salary: "متوسط", market: "پایدار" }
  ],
  E: [
    { title: "مدیر فروش", desc: "رهبری تیم‌های فروش.", salary: "بالا", market: "خیلی خوب" },
    { title: "کارآفرین", desc: "راه‌اندازی و مدیریت کسب‌وکار.", salary: "متغیر", market: "پرریسک" },
    { title: "مشاور املاک", desc: "فروش ملک و سرمایه‌گذاری.", salary: "خوب", market: "خوب" }
  ],
  C: [
    { title: "حسابدار", desc: "مدیریت امور مالی و حسابداری.", salary: "خوب", market: "پایدار" },
    { title: "منشی اداری", desc: "هماهنگی امور دفتری.", salary: "متوسط", market: "خوب" },
    { title: "تحلیلگر داده", desc: "تجزیه داده‌های تجاری.", salary: "بالا", market: "رو به رشد" }
  ]
};

const resultCode = localStorage.getItem("result");
if (!resultCode) {
  document.getElementById("result-box").innerHTML = "<p>شما هنوز تست شخصیت را انجام نداده‌اید.</p>";
} else {
  const container = document.getElementById("result-box");
  const jobContainer = document.getElementById("job-list");

  const code = resultCode[0]; // فقط شخصیت اصلی

  const t = types[code];
  if (t) {
    container.innerHTML = `
      <div class="type-section">
        <i class="fas ${t.icon} icon"></i>
        <h2>${t.title}</h2>
        <p>${t.desc}</p>
      </div>
    `;

    const jobs = jobData[code] || [];
    jobs.slice(0, 3).forEach(job => {
      jobContainer.innerHTML += `
        <div class="job-card">
          <h3><i class="fas fa-circle-check icon"></i> ${job.title}</h3>
          <p>${job.desc}</p>
          <p><strong>درآمد:</strong> ${job.salary}</p>
          <p><strong>بازار کار:</strong> ${job.market}</p>
        </div>
      `;
    });
  }
}