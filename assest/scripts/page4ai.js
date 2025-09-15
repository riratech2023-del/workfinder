document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("quiz-form");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", async function(e) {
    e.preventDefault(); // جلوگیری از ارسال فرم به سرور
    resultDiv.innerHTML = "<p>در حال پردازش...</p>";

    // جمع‌آوری داده‌ها
    const mbti = {};
    new FormData(form).forEach((value, key) => {
      if (key.startsWith("q")) mbti[key] = value;
    });

    const interest = document.getElementById("interest").value;
    const env = document.getElementById("env").value;
    const goal = document.getElementById("goal").value;

    // اگر کاربر تمام فیلدها را پر نکرده باشد
    if (!interest || !env || !goal) {
      resultDiv.innerHTML = "<p>لطفاً همه فیلدها را پر کنید.</p>";
      return;
    }

    try {
      // ======= مرحله 1: گرفتن شغل پیشنهادی =======
      const jobPrompt = `
شما یک دستیار پیشنهاد شغل هستید. فقط بر اساس MBTI، علاقه‌مندی‌ها، محیط کاری و هدف کار، یک شغل مناسب پیشنهاد بده.
اطلاعات کاربر:
MBTI: ${JSON.stringify(mbti)}
علاقه‌مندی‌ها: ${interest}
محیط کاری: ${env}
هدف: ${goal}
فقط یک پاسخ کوتاه شغل مناسب بده، هیچ متن اضافه‌ای ننویس.
`;

      const jobResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "شما فقط می‌توانید یک شغل مناسب پیشنهاد دهید." },
            { role: "user", content: jobPrompt }
          ],
          max_tokens: 100,
          temperature: 0.7
        })
      });

      const jobData = await jobResponse.json();
      const job = jobData.choices[0].message.content.trim();

      // ======= مرحله 2: تحلیل شغل =======
      const analysisPrompt = `
شغل زیر را برای یک کاربر تحلیل کن. تحلیل شامل توضیح مهارت‌های مورد نیاز، مزایا، معایب و توصیه برای موفقیت باشد:
شغل: ${job}
`;

      const analysisResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "شما یک مشاور شغلی هستید و تحلیل شغل ارائه می‌دهید." },
            { role: "user", content: analysisPrompt }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      const analysisData = await analysisResponse.json();
      const analysis = analysisData.choices[0].message.content.trim();

      // نمایش شغل و تحلیل
      resultDiv.innerHTML = `
        <h3>شغل پیشنهادی شما:</h3>
        <p>${job}</p>
        <h3>تحلیل شغل:</h3>
        <p>${analysis}</p>
      `;

    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = "<p>خطا در ارتباط با API. دوباره تلاش کنید.</p>";
    }
  });
});
