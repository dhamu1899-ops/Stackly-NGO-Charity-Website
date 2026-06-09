const email=localStorage.getItem('stacklyEmail')||'dhamu@stackly.in';
const name=email.split('@')[0]||'Guest';
const clean=name.charAt(0).toUpperCase()+name.slice(1);
document.getElementById('dashName').textContent=clean;
document.getElementById('dashEmail').textContent=email;

const panelData={
  programs:{title:'Programs',text:'Manage and view active Stackly NGO programs for food relief, child education, health awareness, and community support.',cards:[['Food Donation Drive','Weekly meal distribution for families and senior citizens around Salem communities.'],['Child Education','Book support, school kit distribution, and mentoring sessions for students.'],['Health Camp','Basic health checkup, medicine support, and awareness programs with volunteers.']]},
  hours:{title:'Volunteer Hours',text:'Track volunteer participation, completed service hours, pending duties, and monthly contribution records.',cards:[['This Month','18 volunteer hours completed in education support and food relief programs.'],['Pending Tasks','2 upcoming activities are available for volunteer confirmation.'],['Top Activity','Community food packing and distribution is the most active volunteer task.']]},
  events:{title:'Events',text:'View charity events, donation camps, awareness programs, and local community support meetings.',cards:[['Food Relief Camp','Saturday 10:00 AM at Salem community support center.'],['Education Kit Drive','School kit distribution for students next week.'],['Health Awareness','Volunteer orientation and public awareness session.']]},
  stories:{title:'Stories',text:'Read impact stories from beneficiaries, volunteers, donors, and community partners.',cards:[['Student Support','Education kit support helped students continue classes with confidence.'],['Family Relief','Monthly grocery support reached local families in need.'],['Volunteer Voice','Young volunteers shared their experience serving the community.']]},
  certificates:{title:'Certificates',text:'View static volunteer and participation certificates connected to charity programs.',cards:[['Volunteer Certificate','Certificate ready for completed community service hours.'],['Event Certificate','Participation certificate available after event completion.'],['Donation Appreciation','Recognition certificate for supporting Stackly NGO causes.']]},
  support:{title:'Support',text:'Get help related to programs, volunteer tasks, certificates, donation receipts, and event participation.',cards:[['Contact Support','Email support@stackly.org or call +91 98765 43210.'],['Help Timing','Monday to Saturday, 9:00 AM to 6:00 PM.'],['Office Location','Stackly NGO, Salem, Tamil Nadu.']]}
};
function renderPanel(key){
  const data=panelData[key]||panelData.programs;
  const root=document.getElementById('dashDynamic');
  if(!root) return;
  root.innerHTML=`<div class="dash-section-head"><p class="eyebrow">Charity Activity</p><h2>${data.title}</h2><p>${data.text}</p></div><div class="dash-content-grid">${data.cards.map(c=>`<article class="dash-info"><h3>${c[0]}</h3><p>${c[1]}</p></article>`).join('')}</div>`;
}
document.querySelectorAll('.dash-menu a[data-panel]').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    document.querySelectorAll('.dash-menu a').forEach(a=>a.classList.remove('active'));
    link.classList.add('active');
    renderPanel(link.dataset.panel);
  });
});


const dashToggle=document.querySelector('.dash-mobile-toggle');
const dashMenu=document.querySelector('.dash-menu');
const dashContact=document.querySelector('.dash-contact-mini');
const dashLogout=document.querySelector('.dash-logout');
if(dashToggle && dashMenu){
  dashToggle.addEventListener('click',()=>{
    const open=document.body.classList.toggle('dash-menu-open');
    dashToggle.textContent=open?'×':'☰';
    dashToggle.setAttribute('aria-expanded', String(open));
  });
  dashMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    document.body.classList.remove('dash-menu-open');
    dashToggle.textContent='☰';
    dashToggle.setAttribute('aria-expanded','false');
  }));
}
