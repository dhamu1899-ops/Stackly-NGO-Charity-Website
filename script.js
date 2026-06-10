const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");

if (toggle && menu) {
  toggle.textContent = "";
  toggle.setAttribute("aria-label", "Open menu");

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

document.querySelectorAll(".subscribe, .contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
      localStorage.setItem("stacklyPreviousPage", window.location.pathname.split("/").pop() || "index.html");
      window.location.href = "404.html";
    }
  });
});

document.querySelectorAll("a.logo").forEach((logo) => {
  logo.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "index.html";
  });
});

document.querySelectorAll('a[href="404.html"]').forEach((link) => {
  link.addEventListener("click", () => {
    localStorage.setItem("stacklyPreviousPage", window.location.pathname.split("/").pop() || "index.html");
  });
});

function rememberAuthReturn(panel) {
  sessionStorage.setItem("stacklyReturnAuthPanel", panel);
  sessionStorage.setItem("stacklyReturnScrollY", String(window.scrollY || 0));
}

function googleButton() {
  return `
    <div class="auth-divider"><span>or continue with</span></div>
    <a class="google-btn" href="404.html" aria-label="Continue with Google">
      <span class="google-g">G</span><span>Continue with Google</span>
    </a>`;
}

function buildAuthOverlay() {
  if (document.querySelector(".auth-overlay")) return;

  document.body.insertAdjacentHTML("beforeend", `
  <div class="auth-overlay" id="authOverlay">
    <div class="auth-card clean-auth-card premium-split-auth">
      <button class="auth-close" type="button" aria-label="Close">x</button>
      <div class="auth-left-panel">
        <div class="auth-brand auth-brand-center">
          <img src="assets/stackly-logo.svg" alt="Stackly logo">
          <div><b>STACKLY NGO</b><span>Hope - Help - Humanity</span></div>
        </div>
        <div class="auth-left-copy">
          <p class="eyebrow">Community Care Portal</p>
          <h2>Connect donors, volunteers, and support in one trusted place.</h2>
          <p>Track charity programs, support causes, and continue your impact journey with a secure Stackly dashboard.</p>
        </div>
        <div class="auth-feature-list">
          <div><span>01</span><b>Transparent programs</b><small>Follow causes, events, and community impact updates in one place.</small></div>
          <div><span>02</span><b>Role based access</b><small>Admin, donor, and user dashboards stay focused for each workflow.</small></div>
          <div><span>03</span><b>Secure account flow</b><small>Validated email and protected password controls keep access reliable.</small></div>
          <div><span>04</span><b>Donation visibility</b><small>Track supported causes, raised funds, targets, and upcoming events.</small></div>
          <div><span>05</span><b>Volunteer coordination</b><small>Organize service hours, certificates, requests, and support tasks.</small></div>
        </div>
        <div class="auth-impact-strip">
          <div><b>50K+</b><span>Members</span></div>
          <div><b>$15M</b><span>Funds Raised</span></div>
          <div><b>120+</b><span>Programs</span></div>
        </div>
        <div class="auth-note-card">
          <p>"Every login connects one more person to practical help, trusted giving, and community action."</p>
          <span>Stackly NGO Impact Team</span>
        </div>
      </div>
      <div class="auth-right-panel">
        <div class="auth-mobile-brand auth-brand">
          <img src="assets/stackly-logo.svg" alt="Stackly logo">
          <div><b>STACKLY NGO</b><span>Hope - Help - Humanity</span></div>
        </div>
        <div class="auth-toggle-tabs" role="tablist" aria-label="Authentication mode">
          <button type="button" class="auth-tab active" id="tabLogin">Sign In</button>
          <button type="button" class="auth-tab" id="tabSignup">Create Account</button>
        </div>
        <div id="loginPanel">
          <h2>Welcome Back</h2>
          <p>Login to continue your charity dashboard.</p>
          <form class="auth-form premium-auth-form" id="loginForm" novalidate>
            <label class="auth-field"><span>Sign in as</span><div class="field-shell select-shell"><i>Role</i><select id="loginRole" required>
              <option value="" selected>Select Role</option>
              <option value="admin">Admin</option>
              <option value="donator">Donator</option>
              <option value="user">User</option>
            </select></div></label>
            <label class="auth-field"><span>Email Address</span><div class="field-shell"><i>@</i><input type="email" placeholder="name@example.com" required></div></label>
            <label class="auth-field"><span>Password</span><div class="field-shell password-wrap"><i>Lock</i><input type="password" placeholder="Enter password" required><button type="button" class="eye-toggle" aria-label="Show password"><span class="sr-only">Show password</span></button></div></label>
            <label class="terms"><input type="checkbox" required><span>I agree to the <a href="404.html">Terms & Conditions</a></span></label>
            <button class="btn full auth-submit" type="submit"><span>Login</span></button>
          </form>
          ${googleButton()}
          <div class="auth-actions"><a href="404.html">Forgot password?</a><a href="#" id="showSignup">Create account</a></div>
          <p class="center auth-home-row"><a class="btn auth-home-btn" href="index.html">Back to Home</a></p>
          <div class="auth-message" id="loginMsg" role="alert"></div>
        </div>
        <div id="signupPanel" style="display:none">
          <h2>Create Account</h2>
          <p>Signup and continue to login.</p>
          <form class="auth-form premium-auth-form" id="signupForm" novalidate>
            <label class="auth-field"><span>Full Name</span><div class="field-shell"><i>Name</i><input type="text" placeholder="Enter your name" required></div></label>
            <label class="auth-field"><span>Account Role</span><div class="field-shell select-shell"><i>Role</i><select required>
              <option value="" selected>Select Role</option>
              <option>Admin</option>
              <option>Donator</option>
              <option>User</option>
            </select></div></label>
            <label class="auth-field"><span>Email Address</span><div class="field-shell"><i>@</i><input type="email" placeholder="name@example.com" required></div></label>
            <label class="auth-field"><span>Password</span><div class="field-shell password-wrap"><i>Lock</i><input type="password" id="signupPassword" placeholder="Create password" required><button type="button" class="eye-toggle" aria-label="Show password"><span class="sr-only">Show password</span></button></div></label>
            <label class="auth-field"><span>Confirm Password</span><div class="field-shell password-wrap"><i>Key</i><input type="password" id="confirmPassword" placeholder="Confirm password" required><button type="button" class="eye-toggle" aria-label="Show password"><span class="sr-only">Show password</span></button></div></label>
            <label class="terms"><input type="checkbox" required><span>I agree to the <a href="404.html">Terms & Conditions</a></span></label>
            <button class="btn full auth-submit" type="submit"><span>Sign Up</span></button>
          </form>
          ${googleButton()}
          <div class="signup-socials" aria-label="Signup social links">
            <a href="404.html" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.1 8.1H13.2c-.7 0-1 .3-1 1v1.6h2.8l-.4 3h-2.4V21H9v-7.3H6.8v-3H9V8.8C9 6.2 10.6 4.8 12.9 4.8c1.1 0 2 .1 2.3.1v3.2z"/></svg></a>
            <a href="404.html" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 3.8h8.4c2.2 0 4 1.8 4 4v8.4c0 2.2-1.8 4-4 4H7.8c-2.2 0-4-1.8-4-4V7.8c0-2.2 1.8-4 4-4zm8.3 2.1H7.9c-1.1 0-2 .9-2 2v8.2c0 1.1.9 2 2 2h8.2c1.1 0 2-.9 2-2V7.9c0-1.1-.9-2-2-2zM12 8.1a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8zm0 2.1a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zm4.2-2.5a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"/></svg></a>
            <a href="404.html" aria-label="X" title="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 10.6 21 3.5h-2.2l-5.1 5.8-4-5.8H3l7.3 10.5L3.4 20.5h2.2l5.7-6.4 4.4 6.4H22l-7.3-9.9zm-2.5 1.8-.9-1.2-4.2-5.9h1.6l3.4 4.8.9 1.2 4.6 6.5H16l-3.8-5.4z"/></svg></a>
            <a href="404.html" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 8.8H3.8v11h2.8v-11zM5.2 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zm6.6 4.8H9.1v11h2.7v-5.8c0-1.5.7-2.5 2-2.5 1.2 0 1.7.8 1.7 2.4v5.9h2.8v-6.4c0-3-1.6-4.8-4-4.8-1.6 0-2.5.8-2.9 1.5h-.1l-.1-1.3z"/></svg></a>
          </div>
          <div class="auth-actions"><a href="#" id="showLogin">Already have account? Login</a></div>
          <div class="auth-message" id="signupMsg" role="alert"></div>
        </div>
      </div>
    </div>
  </div>`);
}

function openAuth(panel = "login") {
  buildAuthOverlay();
  document.getElementById("authOverlay").classList.add("show");
  document.getElementById("loginPanel").style.display = panel === "login" ? "block" : "none";
  document.getElementById("signupPanel").style.display = panel === "signup" ? "block" : "none";
  document.getElementById("tabLogin")?.classList.toggle("active", panel === "login");
  document.getElementById("tabSignup")?.classList.toggle("active", panel === "signup");
  document.getElementById("loginMsg").textContent = "";
  document.getElementById("signupMsg").textContent = "";
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value.trim());
}

function showAuthMessage(form, message, type = "error") {
  const panel = form.closest("#loginPanel, #signupPanel");
  const messageBox = panel.querySelector(".auth-message");
  messageBox.classList.toggle("success", type === "success");
  messageBox.classList.toggle("error", type !== "success");
  messageBox.textContent = message;
}

buildAuthOverlay();

document.querySelector(".auth-brand")?.addEventListener("click", () => {
  window.location.href = "index.html";
});

const returnAuthPanel = sessionStorage.getItem("stacklyReturnAuthPanel");
if (returnAuthPanel) {
  const returnScrollY = Number(sessionStorage.getItem("stacklyReturnScrollY") || "0");
  sessionStorage.removeItem("stacklyReturnAuthPanel");
  sessionStorage.removeItem("stacklyReturnScrollY");
  window.requestAnimationFrame(() => {
    window.scrollTo(0, returnScrollY);
    openAuth(returnAuthPanel);
  });
}

document.querySelectorAll(".js-login-open").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openAuth("login");
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".premium-split-auth .auth-brand")) {
    window.location.href = "index.html";
    return;
  }

  if (event.target.classList.contains("auth-close") || event.target.id === "authOverlay") {
    document.getElementById("authOverlay").classList.remove("show");
  }

  if (event.target.id === "showSignup") {
    event.preventDefault();
    openAuth("signup");
  }

  if (event.target.id === "tabSignup") {
    event.preventDefault();
    openAuth("signup");
  }

  if (event.target.id === "showLogin") {
    event.preventDefault();
    openAuth("login");
  }

  if (event.target.id === "tabLogin") {
    event.preventDefault();
    openAuth("login");
  }

  const auth404Link = event.target.closest(".auth-overlay a[href='404.html']");
  if (auth404Link) {
    const panel = auth404Link.closest("#signupPanel") ? "signup" : "login";
    rememberAuthReturn(panel);
  }

  const eyeButton = event.target.closest(".eye-toggle");
  if (eyeButton) {
    const input = eyeButton.parentElement.querySelector("input");
    input.type = input.type === "password" ? "text" : "password";
    eyeButton.classList.toggle("is-visible", input.type === "text");
    eyeButton.setAttribute("aria-label", input.type === "password" ? "Show password" : "Hide password");
    eyeButton.querySelector(".sr-only").textContent = input.type === "password" ? "Show password" : "Hide password";
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "signupForm") {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!form.checkValidity()) {
      showAuthMessage(form, "Please fill all required fields.");
      return;
    }

    if (!validEmail(email)) {
      showAuthMessage(form, "Please enter a valid email address with a domain, like name@example.com.");
      return;
    }

    if (password !== confirmPassword) {
      showAuthMessage(form, "Password and confirm password must match.");
      return;
    }

    showAuthMessage(form, "Signup successful. Redirecting to login...", "success");
    setTimeout(() => openAuth("login"), 900);
  }

  if (event.target.id === "loginForm") {
    event.preventDefault();
    const form = event.target;
    const role = document.getElementById("loginRole").value;
    const email = form.querySelector('input[type="email"]').value.trim();

    if (!form.checkValidity()) {
      showAuthMessage(form, "Please fill all required fields.");
      return;
    }

    if (!validEmail(email)) {
      showAuthMessage(form, "Please enter a valid email address with a domain, like name@example.com.");
      return;
    }

    localStorage.setItem("stacklyRole", role);
    localStorage.setItem("stacklyEmail", email);

    if (role === "admin") location.href = "dashboard-admin.html";
    else if (role === "donator") location.href = "dashboard-donator.html";
    else location.href = "dashboard-user.html";
  }
});
