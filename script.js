const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.textContent = menu.classList.contains("open") ? "×" : "☰";
    toggle.setAttribute("aria-expanded", String(menu.classList.contains("open")));
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.textContent = "☰";
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".subscribe, .contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
      window.location.href = "404.html";
    }
  });
});


// Auth modal and role based dashboard flow
function buildAuthOverlay(){
  if(document.querySelector('.auth-overlay')) return;
  document.body.insertAdjacentHTML('beforeend', `
  <div class="auth-overlay" id="authOverlay">
    <div class="auth-card">
      <button class="auth-close" type="button" aria-label="Close">×</button>
      <div id="loginPanel">
        <h2>Login</h2><p>Access your Stackly charity dashboard.</p>
        <form class="auth-form" id="loginForm">
          <select id="loginRole" required><option value="">Select Role</option><option value="admin">Admin</option><option value="donator">Donator</option><option value="user">User</option></select>
          <input type="email" placeholder="Email address" required>
          <input type="password" placeholder="Password" required>
          <label class="terms"><input type="checkbox" required> <span>I agree to the terms and conditions.</span></label>
          <button class="btn full" type="submit">Login <span>→</span></button>
        </form>
        <div class="auth-actions"><a href="404.html">Forgot password?</a><a href="#" id="showSignup">Create account</a></div>
        <div class="auth-socials"><a href="404.html">f</a><a href="404.html">in</a><a href="404.html">ig</a><a href="404.html">x</a></div>
        <p class="center"><a class="gold-link" href="index.html">Back to Home</a></p><div class="auth-message" id="loginMsg"></div>
      </div>
      <div id="signupPanel" style="display:none">
        <h2>Create Account</h2><p>Signup and continue to login.</p>
        <form class="auth-form" id="signupForm">
          <select required><option value="">Select Role</option><option>Admin</option><option>Donator</option><option>User</option></select>
          <input type="email" placeholder="Email address" required>
          <input type="password" id="signupPassword" placeholder="Password" required>
          <input type="password" id="confirmPassword" placeholder="Confirm password" required>
          <label class="terms"><input type="checkbox" required> <span>I agree to the terms and conditions.</span></label>
          <button class="btn full" type="submit">Sign Up <span>→</span></button>
        </form>
        <div class="auth-actions"><a href="#" id="showLogin">Already have account? Login</a><a href="404.html">Social signup help</a></div>
        <div class="auth-message" id="signupMsg"></div>
      </div>
    </div>
  </div>`);
}
function openAuth(panel='login'){
  buildAuthOverlay();
  document.getElementById('authOverlay').classList.add('show');
  document.getElementById('loginPanel').style.display=panel==='login'?'block':'none';
  document.getElementById('signupPanel').style.display=panel==='signup'?'block':'none';
}
buildAuthOverlay();
document.querySelectorAll('.js-login-open').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openAuth('login');}));
document.addEventListener('click',e=>{
  if(e.target.classList.contains('auth-close') || e.target.id==='authOverlay'){document.getElementById('authOverlay').classList.remove('show');}
  if(e.target.id==='showSignup'){e.preventDefault();openAuth('signup');}
  if(e.target.id==='showLogin'){e.preventDefault();openAuth('login');}
});
document.addEventListener('submit',e=>{
  if(e.target.id==='signupForm'){
    e.preventDefault();
    const p=document.getElementById('signupPassword').value, c=document.getElementById('confirmPassword').value;
    const msg=document.getElementById('signupMsg');
    if(p!==c){msg.textContent='Password and confirm password must match.';return;}
    msg.textContent='Signup successful. Redirecting to login...';
    setTimeout(()=>openAuth('login'),900);
  }
  if(e.target.id==='loginForm'){
    e.preventDefault();
    const role=document.getElementById('loginRole').value;
    const email=e.target.querySelector('input[type="email"]').value.trim();
    localStorage.setItem('stacklyRole', role);
    localStorage.setItem('stacklyEmail', email);
    if(role==='admin') location.href='dashboard-admin.html';
    else if(role==='donator') location.href='dashboard-donator.html';
    else location.href='dashboard-user.html';
  }
});
