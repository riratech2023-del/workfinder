document.getElementById("resumeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(this);

  const doc = new window.docx.Document({
    sections: [{
      children: [
        new docx.Paragraph({
          text: "رزومه شخصی",
          heading: docx.HeadingLevel.HEADING_1,
          alignment: docx.AlignmentType.CENTER,
        }),
        new docx.Paragraph(""),
        new docx.Paragraph("نام کامل: " + formData.get("fullname")),
        new docx.Paragraph("شماره تماس: " + formData.get("phone")),
        new docx.Paragraph("ایمیل: " + formData.get("email")),
        new docx.Paragraph(""),
        new docx.Paragraph("تحصیلات:"),
        new docx.Paragraph(formData.get("education")),
        new docx.Paragraph("سابقه کاری:"),
        new docx.Paragraph(formData.get("experience")),
        new docx.Paragraph("مهارت‌ها:"),
        new docx.Paragraph(formData.get("skills")),
        new docx.Paragraph("نمونه‌کارها:"),
        new docx.Paragraph(formData.get("portfolio")),
        new docx.Paragraph("دوره‌ها و مدارک:"),
        new docx.Paragraph(formData.get("certificates")),
      ]
    }]
  });

  docx.Packer.toBlob(doc).then(blob => {
    saveAs(blob, "رزومه.docx");
  });
});