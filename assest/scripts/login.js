document.getElementById('login-signup-btn').onclick = async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('message');

  if (!username || !password) {
    message.textContent = 'لطفاً نام کاربری و رمز عبور را وارد کنید.';
    message.style.color = '#ff5252';
    return;
  }

  const response = await fetch('/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  message.textContent = data.message;
  message.style.color = data.success ? '#00e676' : '#ff5252';
  if (data.success && data.count !== undefined) {
    document.getElementById('count').textContent = `تعداد کاربران ثبت‌نام‌شده: ${data.count}`;
  }
};

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

window.onload = function() {
  // Optionally, fetch user count from backend
};