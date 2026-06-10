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
      localStorage.setItem("stacklyPreviousPage", window.location.pathname.split("/").pop() || "index.html");
      window.location.href = "404.html";
    }
  });
});


// Stackly logo refreshes the current page; 404 links remember current page for Go Back.
document.querySelectorAll('a.logo').forEach((logo)=>{
  logo.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.reload();
  });
});
document.querySelectorAll('a[href="404.html"]').forEach((link)=>{
  link.addEventListener('click',()=>{
    localStorage.setItem('stacklyPreviousPage', window.location.pathname.split('/').pop() || 'index.html');
  });
});

// Auth modal and role based dashboard flow
function buildAuthOverlay(){
  if(document.querySelector('.auth-overlay')) return;
  document.body.insertAdjacentHTML('beforeend', `
  <div class="auth-overlay" id="authOverlay">
    <div class="auth-card clean-auth-card">
      <button class="auth-close" type="button" aria-label="Close">×</button>
      <div class="auth-brand auth-brand-center">
        <img src="assets/stackly-logo.svg" alt="Stackly logo">
        <div><b>STACKLY NGO</b><span>Hope • Help • Humanity</span></div>
      </div>
      <div id="loginPanel">
        <h2>Welcome Back</h2><p>Login to continue your charity dashboard.</p>
        <form class="auth-form" id="loginForm">
          <select id="loginRole" required><option value="">Select Role</option><option value="admin">Admin</option><option value="donator">Donator</option><option value="user">User</option></select>
          <input type="email" placeholder="Email address" required>
          <div class="password-wrap"><input type="password" placeholder="Password" required><button type="button" class="eye-toggle" aria-label="Show password">👁</button></div>
          <label class="terms"><input type="checkbox" required><span>I agree to the <a href="404.html">Terms & Conditions</a></span></label>
          <button class="btn full" type="submit">Login <span>→</span></button>
        </form>
        <div class="auth-actions"><a href="404.html">Forgot password?</a><a href="#" id="showSignup">Create account</a></div>
        <p class="center"><a class="gold-link" href="index.html">Back to Home</a></p><div class="auth-message" id="loginMsg"></div>
      </div>
      <div id="signupPanel" style="display:none">
        <h2>Create Account</h2><p>Signup and continue to login.</p>
        <form class="auth-form" id="signupForm">
          <input type="text" placeholder="Name" required>
          <select required><option value="">Select Role</option><option>Admin</option><option>Donator</option><option>User</option></select>
          <input type="email" placeholder="Email address" required>
          <div class="password-wrap"><input type="password" id="signupPassword" placeholder="Password" required><button type="button" class="eye-toggle" aria-label="Show password">👁</button></div>
          <div class="password-wrap"><input type="password" id="confirmPassword" placeholder="Confirm password" required><button type="button" class="eye-toggle" aria-label="Show password">👁</button></div>
          <label class="terms"><input type="checkbox" required><span>I agree to the <a href="404.html">Terms & Conditions</a></span></label>
          <button class="btn full" type="submit">Sign Up <span>→</span></button>
        </form>
        <div class="signup-socials" aria-label="Signup social links">
          <a href="404.html" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.1 8.1H13.2c-.7 0-1 .3-1 1v1.6h2.8l-.4 3h-2.4V21H9v-7.3H6.8v-3H9V8.8C9 6.2 10.6 4.8 12.9 4.8c1.1 0 2 .1 2.3.1v3.2z"/></svg></a>
          <a href="404.html" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 3.8h8.4c2.2 0 4 1.8 4 4v8.4c0 2.2-1.8 4-4 4H7.8c-2.2 0-4-1.8-4-4V7.8c0-2.2 1.8-4 4-4zm8.3 2.1H7.9c-1.1 0-2 .9-2 2v8.2c0 1.1.9 2 2 2h8.2c1.1 0 2-.9 2-2V7.9c0-1.1-.9-2-2-2zM12 8.1a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8zm0 2.1a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zm4.2-2.5a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"/></svg></a>
          <a href="404.html" aria-label="X" title="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 10.6 21 3.5h-2.2l-5.1 5.8-4-5.8H3l7.3 10.5L3.4 20.5h2.2l5.7-6.4 4.4 6.4H22l-7.3-9.9zm-2.5 1.8-.9-1.2-4.2-5.9h1.6l3.4 4.8.9 1.2 4.6 6.5H16l-3.8-5.4z"/></svg></a>
          <a href="404.html" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 8.8H3.8v11h2.8v-11zM5.2 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zm6.6 4.8H9.1v11h2.7v-5.8c0-1.5.7-2.5 2-2.5 1.2 0 1.7.8 1.7 2.4v5.9h2.8v-6.4c0-3-1.6-4.8-4-4.8-1.6 0-2.5.8-2.9 1.5h-.1l-.1-1.3z"/></svg></a>
        </div>
        <div class="auth-actions"><a href="#" id="showLogin">Already have account? Login</a></div>
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
  if(e.target.classList.contains('eye-toggle')){
    const input=e.target.parentElement.querySelector('input');
    input.type=input.type==='password'?'text':'password';
    e.target.textContent=input.type==='password'?'👁':'🙈';
  }
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
