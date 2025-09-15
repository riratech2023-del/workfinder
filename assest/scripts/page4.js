document.getElementById('quiz-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const interest = document.getElementById('interest').value.toLowerCase();
  const env = document.getElementById('env').value.toLowerCase();
  const goal = document.getElementById('goal').value.toLowerCase();

  const jobSuggestions = [];

  // پیشنهاد بر اساس علاقه
  if (interest.includes('برنامه') || interest.includes('کد') || interest.includes('نرم')) {
    jobSuggestions.push({
      title: "برنامه‌نویس",
      salary: "درآمد: بالا",
      market: "بازار کار: بسیار خوب"
    });
  } else if (interest.includes('هنر') || interest.includes('طراحی')) {
    jobSuggestions.push({
      title: "طراح گرافیک",
      salary: "درآمد: متوسط",
      market: "بازار کار: خوب"
    });
  } else if (interest.includes('روان') || interest.includes('مشاوره')) {
    jobSuggestions.push({
      title: "مشاور روانشناسی",
      salary: "درآمد: متوسط",
      market: "بازار کار: پایدار"
    });
  } else {
    jobSuggestions.push({
      title: "مدیر پروژه",
      salary: "درآمد: بالا",
      market: "بازار کار: متوسط"
    });
  }

  let resultHtml = `<h3>پیشنهاد شغل برای شما</h3>`;
  jobSuggestions.forEach(job => {
    resultHtml += `
      <div>
        <h4>${job.title}</h4>
        <p>${job.salary}</p>
        <p>${job.market}</p>
      </div>
      <hr/>
    `;
  });

  document.getElementById('result').innerHTML = resultHtml;
});