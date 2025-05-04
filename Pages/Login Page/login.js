document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');


  // Validate form on submit
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default submission

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
      alert("❗ Please fill in both username and password.");
    } else {
      // Dummy success (normally you will check this on a server)
      alert("✅ Welcome back, " + username + "!");
      form.reset(); // Clear form
    }
  });

  // Smooth animation for login form
  const loginForm = document.querySelector(".login-form");
  loginForm.style.opacity = "0";
  loginForm.style.transform = "translateY(30px)";
  setTimeout(() => {
    loginForm.style.transition = "all 0.6s ease";
    loginForm.style.opacity = "1";
    loginForm.style.transform = "translateY(0)";
  }, 100);
});
        document.getElementById('togglePassword1').addEventListener('click', function () {
          const passwordField = document.getElementById('password1');
          const icon = this;
          if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
          } else {
            passwordField.type = 'password';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
          }
        });
      
        // Toggle password visibility for the second input
        document.getElementById('togglePassword2').addEventListener('click', function () {
          const passwordField = document.getElementById('password2');
          const icon = this;
          if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
          } else {
            passwordField.type = 'password';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
          }
        });