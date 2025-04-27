document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');

  // Add show/hide password toggle
  const passwordGroup = passwordInput.closest(".input-group");
  const toggleBtn = document.createElement("span");
  toggleBtn.innerHTML = `<i class="bi bi-eye-slash text-white-50"></i>`;
  toggleBtn.classList.add(
    "input-group-text",
    "bg-transparent",
    "border-0",
    "toggle-password"
  );
  toggleBtn.style.cursor = "pointer";
  passwordGroup.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleBtn.innerHTML = `<i class="bi bi-eye text-white-50"></i>`;
    } else {
      passwordInput.type = "password";
      toggleBtn.innerHTML = `<i class="bi bi-eye-slash text-white-50"></i>`;
    }
  });

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
