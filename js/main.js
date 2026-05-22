/* ============================================================
   main.js — Portfolio Core Logic
   Data loading, animations, particles, typewriter, lightbox
   ============================================================ */

'use strict';

// ── EARLY THEME APPLY (prevents flash-of-unstyled-theme) ─────
(function() {
  const saved = localStorage.getItem('portfolio_theme');
  const pref = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', pref);
})();

// ── CONFIG ────────────────────────────────────────────────────
const DATA_URL = './content/data.json';

// ── STATE ─────────────────────────────────────────────────────
let portfolioData = null;

// ── FALLBACK DATA (used when fetch fails, e.g. file:// protocol) ──────────
const FALLBACK_DATA = {"personal":{"name":"Joy Chattopadhyay","title":"Cloud Engineer","roles":["Cloud Engineer","DevOps Engineer","Cloud Architect","SRE Enthusiast"],"bio":"An aspiring Cloud Engineer with 4+ years of experience in DevOps, cloud infrastructure, and system administration. Skilled in designing cost-effective scalable solutions, implementing CI/CD pipelines, and managing Kubernetes-based microservices.","age":31,"email":"joyc.chatterjee13@gmail.com","phone":"","address":"Asansol, West Bengal, India","languages":["English","Hindi","Bengali"],"linkedin":"https://www.linkedin.com/in/joychatterjee132/","github":"https://github.com/j-chatterjee","twitter":"","cvUrl":"https://rxresu.me/chattopadhyayjoy7/joy-chattopadhyay","profileImage":"images/profile.jpg","availability":"Open to opportunities"},"stats":[{"label":"Years Experience","value":"4+","icon":"fas fa-briefcase"},{"label":"Projects Completed","value":"10+","icon":"fas fa-project-diagram"},{"label":"Technologies","value":"25+","icon":"fas fa-code"},{"label":"Certifications","value":"5+","icon":"fas fa-certificate"}],"skills":[{"category":"Cloud Services","icon":"fas fa-cloud","items":[{"name":"AWS","level":80},{"name":"GCP","level":50},{"name":"Azure","level":50}]},{"category":"OS & Database","icon":"fas fa-server","items":[{"name":"Linux","level":80},{"name":"Windows","level":80},{"name":"MySQL","level":60},{"name":"MariaDB","level":50}]},{"category":"DevOps & Tools","icon":"fas fa-tools","items":[{"name":"Kubernetes","level":60},{"name":"Jenkins","level":70},{"name":"Terraform","level":50},{"name":"Git","level":80},{"name":"Docker","level":60},{"name":"Azure DevOps","level":50},{"name":"SonarQube","level":60},{"name":"Jira","level":80},{"name":"Bitbucket","level":90},{"name":"Confluence","level":90},{"name":"Shell Script","level":50},{"name":"GitHub","level":90},{"name":"ArgoCD","level":50},{"name":"Spinnaker","level":50}]},{"category":"Security Tools","icon":"fas fa-shield-alt","items":[{"name":"Amazon Inspector","level":70},{"name":"Fortify WebInspect","level":70},{"name":"Checkov","level":60},{"name":"Trivy","level":50},{"name":"Prowler","level":50}]}],"experience":[{"id":1,"company":"INADEV India Pvt Ltd","role":"Cloud Engineer","type":"Full-time","startDate":"March 2024","endDate":"Present","current":true,"description":"Designs, implements, and manages cloud-based systems ensuring they are scalable, secure, and cost-effective.","responsibilities":["Cloud architecture design and deployment across AWS, Azure, and GCP","Security management and cost optimization","Automation of infrastructure provisioning with Terraform","Performance monitoring and disaster recovery planning","Containerization with Docker and orchestration with Kubernetes","CI/CD pipeline design and implementation","Technical documentation and developer collaboration"],"technologies":["AWS","Kubernetes","Terraform","Docker","Jenkins","ArgoCD","Azure"]},{"id":2,"company":"INADEV India Pvt Ltd","role":"Associate Cloud Engineer","type":"Full-time","startDate":"Apr 2023","endDate":"March 2024","current":false,"description":"Worked on dockerizing web applications and managing cloud infrastructure at scale.","responsibilities":["Dockerizing web applications for containerized deployment","AWS services: EC2, ECR, EKS, S3, IAM, VPC, Load Balancer, CloudWatch, EFS, EBS, Route 53, ECS","Infrastructure management with Terraform and custom Terraform modules","VPC setup with private/public subnets and VPC peering","Kubernetes services: ClusterIP, NodePort, LoadBalancer, Ingress","CI/CD pipeline configuration on Jenkins and Spinnaker","GCP services: Google Kubernetes Engine, App Engine","DevSecOps implementation with Checkov","Branching strategies for multiple environments"],"technologies":["AWS","GCP","Kubernetes","Terraform","Jenkins","Spinnaker","Docker"]},{"id":3,"company":"INADEV India Pvt Ltd","role":"System Support Engineer","type":"Full-time","startDate":"Apr 2022","endDate":"Mar 2023","current":false,"description":"Managed operating systems and DevOps tools across cloud services with monitoring responsibilities.","responsibilities":["Operating systems management: Windows and Linux","DevOps tools: Jira, Bitbucket, Confluence, Git, Docker, Kubernetes, Jenkins, SonarQube","Cloud services management on GCP and AWS","Scripting with Golang and Shell Script","Database administration with MySQL","Infrastructure monitoring with Grafana, Prometheus, AWS CloudWatch","Web server management with Apache"],"technologies":["GCP","AWS","Docker","Kubernetes","Grafana","Prometheus","MySQL"]},{"id":4,"company":"OPTIMIZE IT SYSTEMS PVT LTD","role":"Trainee System Support Engineer","type":"Trainee","startDate":"Sep 2021","endDate":"Mar 2022","current":false,"description":"Hands-on training in containerization, cloud infrastructure, and automation tools.","responsibilities":["Application packaging and updates using Helm Charts","Docker image vulnerability remediation","Terraform IaC for AWS and GCP resources","Docker and Kubernetes for microservice hosting","Shell scripting for task automation","Jira ticketing and Bitbucket repository management","IT asset management"],"technologies":["Docker","Kubernetes","Terraform","AWS","GCP","Helm","Shell Script"]}],"education":[{"id":1,"institution":"Regent Education & Research Foundation Group of Institutions","degree":"B.Tech","field":"Electronics & Communication Engineering","startYear":"2016","endYear":"2019","grade":"DGPA: 7.42"},{"id":2,"institution":"The New Horizons Institute of Technology","degree":"Diploma in Engineering","field":"Electronics & Telecommunication Engineering","startYear":"2013","endYear":"2016","grade":"CGPA: 7.7"}],"projects":[{"id":1,"title":"Bitbucket to GitHub Migration","category":"DevOps","description":"Led and executed a fully automated migration of source code repositories from Bitbucket to GitHub ensuring seamless transition with zero downtime.","details":"Implemented custom scripts to preserve commit history, branches, and access controls.","technologies":["Git","GitHub","Bitbucket","Shell Script","CI/CD","Jenkins"],"image":"","github":"","demo":"","featured":true,"highlights":["Zero downtime migration","Preserved complete commit history","Automated script-based migration","Full CI/CD pipeline integration"]},{"id":2,"title":"EoDB - Tripura (TIDC)","category":"Cloud","description":"Managed the cloud infrastructure for the Ease of Doing Business platform in Tripura, ensuring 24x7 uptime and smooth deployments.","details":"Responsible for continuous monitoring, deployment of new releases, and rapid incident resolution.","technologies":["AWS","Kubernetes","Jenkins","Docker","Monitoring"],"image":"","github":"","demo":"","featured":true,"highlights":["24x7 application monitoring","Zero-downtime deployment","Proactive issue resolution","Continuous release management"]},{"id":3,"title":"Multi-Cloud K8s Monitoring Stack","category":"Cloud","description":"Deployed a unified observability platform across AWS EKS and GCP GKE clusters using Prometheus, Grafana and Alertmanager.","details":"Configured cross-cluster metrics federation with Thanos, built custom dashboards for SLO tracking.","technologies":["Kubernetes","Prometheus","Grafana","Thanos","AWS","GCP"],"image":"","github":"","demo":"","featured":true,"highlights":["Unified multi-cloud observability","Thanos long-term metric storage","Custom Grafana SLO dashboards","PagerDuty alert routing"]}],"certificates":[{"title":"AWS Certified Solutions Architect \u2013 Associate","issuer":"Amazon Web Services","date":"2023","image":"","credentialUrl":""},{"title":"Certified Kubernetes Administrator (CKA)","issuer":"Cloud Native Computing Foundation","date":"2024","image":"","credentialUrl":""},{"title":"HashiCorp Certified: Terraform Associate","issuer":"HashiCorp","date":"2023","image":"","credentialUrl":""}],"contact":{"address":"Asansol, West Bengal, India","email":"joyc.chatterjee13@gmail.com","phone":"","availability":"Open to exciting cloud and DevOps opportunities"},"meta":{"siteTitle":"Joy Chattopadhyay — Cloud Engineer","siteDescription":"Portfolio of Joy Chattopadhyay, Cloud Engineer with 4+ years in DevOps, AWS, GCP, and Kubernetes.","keywords":"cloud engineer, devops, aws, kubernetes, terraform, ci/cd, gcp, azure","githubOwner":"j-chatterjee","githubRepo":"resume","siteUrl":"https://j-chatterjee.github.io/resume/"}};

// ── ENTRY POINT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Check for admin draft saved in localStorage — enables instant local preview
    // without needing a GitHub token or a server. Admin panel writes to this key
    // whenever "Save Draft" is clicked.
    const draft = localStorage.getItem('portfolio_cms_draft');
    if (draft) {
      portfolioData = JSON.parse(draft);
      showDraftBanner();
    } else {
      portfolioData = await fetchData();
    }
  } catch (e) {
    // fetch fails on file:// protocol — use embedded fallback so the page still renders
    console.warn('data.json fetch failed (likely file:// preview). Using embedded data.', e.message);
    portfolioData = FALLBACK_DATA;
  }

  // ── Maintenance mode check ───────────────────────────────
  if (portfolioData?.meta?.maintenance) {
    const isAdmin = sessionStorage.getItem('portfolio_admin_auth') === '1';
    if (!isAdmin) {
      showMaintenancePage();
      return;                     // stop — don't render the real page
    }
    showMaintenanceBanner();      // admin sees a warning banner instead
  }

  initPage();
  applyMeta(portfolioData);
});

// ── APPLY META TO DOCUMENT HEAD ───────────────────────────────
function applyMeta(data) {
  const m = data?.meta;
  if (!m) return;

  // Page title (with prefix for sub-pages)
  if (m.siteTitle) {
    const page = detectPage();
    const prefix = page === 'experience' ? 'Experience — ' : page === 'projects' ? 'Projects — ' : '';
    document.title = prefix + m.siteTitle;
  }

  // Description
  const desc = document.querySelector('meta[name="description"]');
  if (desc && m.siteDescription) desc.content = m.siteDescription;

  // Keywords (create tag if absent)
  if (m.keywords) {
    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) { kw = document.createElement('meta'); kw.name = 'keywords'; document.head.appendChild(kw); }
    kw.content = m.keywords;
  }

  // OG title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && m.siteTitle) ogTitle.content = m.siteTitle;

  // Canonical URL
  if (m.siteUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = m.siteUrl;
  }
}

// ── DRAFT PREVIEW BANNER ──────────────────────────────────────
function showDraftBanner() {
  const bar = document.createElement('div');
  bar.id = 'draft-banner';
  bar.innerHTML = `
    <span><i class="fas fa-pencil-alt"></i> Showing <strong>local draft</strong> from Admin Panel</span>
    <div style="display:flex;gap:8px;align-items:center;">
      <a href="./admin/" style="color:inherit;text-decoration:underline;font-size:0.8rem;">Edit</a>
      <button onclick="localStorage.removeItem('portfolio_cms_draft');location.reload();"
        style="background:rgba(255,255,255,0.12);border:none;color:inherit;padding:3px 10px;border-radius:4px;cursor:pointer;font-size:0.75rem;">
        Clear Draft
      </button>
    </div>`;
  bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(129,140,248,0.92);backdrop-filter:blur(8px);color:#fff;font-family:monospace;font-size:0.78rem;padding:8px 20px;display:flex;justify-content:space-between;align-items:center;gap:12px;';
  document.body.appendChild(bar);
}

// ── MAINTENANCE PAGE (shown to public when maintenance = true) ─
function showMaintenancePage() {
  document.title = 'Under Maintenance';
  document.body.innerHTML = `
    <div id="maintenance-overlay">
      <div class="maint-gears">
        <i class="fas fa-cog maint-gear-big"></i>
        <i class="fas fa-cog maint-gear-sm"></i>
      </div>
      <h1>Under <span class="grad-text">Maintenance</span></h1>
      <p>We're currently making some improvements.<br>We'll be back online shortly — please check back soon.</p>
      <div class="maint-badge-row">
        <span class="maint-tag"><i class="fas fa-tools"></i> Scheduled maintenance in progress</span>
      </div>
    </div>`;
}

// ── MAINTENANCE BANNER (shown to admin when maintenance = true) ─
function showMaintenanceBanner() {
  const bar = document.createElement('div');
  bar.id = 'maintenance-banner';
  bar.innerHTML = `<i class="fas fa-tools"></i> <strong>Maintenance Mode is ON</strong> &mdash; Public visitors see the maintenance page. <a href="./admin/">Turn off in Admin</a>`;
  document.body.prepend(bar);
  // Push navbar down so it's not hidden under the banner
  const offset = 42;
  const nav = document.getElementById('navbar');
  if (nav) nav.style.top = offset + 'px';
}

// ── DATA FETCHING ─────────────────────────────────────────────
async function fetchData() {
  const res = await fetch(DATA_URL + '?v=' + Date.now());
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

// ── ROUTING ───────────────────────────────────────────────────
function initPage() {
  const page = detectPage();
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initTechIconLayer();
  initScrollAnimations();
  initToast();

  if (page === 'index') {
    initPageLoader();
    initBgCanvas();
    renderHero(portfolioData);
    renderAbout(portfolioData);
    renderSkills(portfolioData);
    renderCertificates(portfolioData);
    renderExpPreview(portfolioData);
    renderProjectsPreview(portfolioData);
    renderContact(portfolioData);
    renderFooter(portfolioData);
    initTypewriter(portfolioData.personal.roles || []);
    initLightbox();
    initContactForm();
    initHireMeModal();
    initCursorGlow();
    initParallax();
  } else if (page === 'experience') {
    initBgCanvas();
    renderExperiencePage(portfolioData);
    renderFooter(portfolioData);
    initHireMeModal();
  } else if (page === 'projects') {
    initBgCanvas();
    renderProjectsPage(portfolioData);
    renderFooter(portfolioData);
    initHireMeModal();
  }
}

function detectPage() {
  const path = window.location.pathname;
  if (path.includes('experience')) return 'experience';
  if (path.includes('projects')) return 'projects';
  return 'index';
}

// ── NAVBAR ────────────────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active nav link
  const links = nav.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = nav.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
}

function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (!hamburger || !links) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.addEventListener('click', () => {
    hamburger.classList.remove('open');
    links.classList.remove('open');
  });
}

// ── TECH ICON LAYER (injected once, fixed overlay on all pages) ──────────
function initTechIconLayer() {
  if (document.getElementById('tech-icon-layer')) return;
  const layer = document.createElement('div');
  layer.id = 'tech-icon-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = `
    <span class="hti hti-1"><i class="fas fa-cloud"></i></span>
    <span class="hti hti-2"><i class="fas fa-shield-alt"></i></span>
    <span class="hti hti-3"><i class="fas fa-cogs"></i></span>
    <span class="hti hti-4"><i class="fas fa-code-branch"></i></span>
    <span class="hti hti-5"><i class="fas fa-brain"></i></span>
    <span class="hti hti-6"><i class="fas fa-server"></i></span>
    <span class="hti hti-7"><i class="fas fa-lock"></i></span>
    <span class="hti hti-8"><i class="fas fa-infinity"></i></span>
    <span class="hti hti-9"><i class="fas fa-network-wired"></i></span>
    <span class="hti hti-10"><i class="fas fa-terminal"></i></span>
    <span class="hti hti-11"><i class="fas fa-cube"></i></span>
    <span class="hti hti-12"><i class="fas fa-robot"></i></span>
    <span class="hti hti-13"><i class="fab fa-aws"></i></span>
    <span class="hti hti-14"><i class="fab fa-python"></i></span>
    <span class="hti hti-15"><i class="fab fa-docker"></i></span>
    <span class="hti hti-16"><i class="fab fa-github"></i></span>
    <span class="hti hti-17"><i class="fab fa-linux"></i></span>
    <span class="hti hti-18"><i class="fas fa-microchip"></i></span>
    <span class="hti hti-19"><i class="fas fa-project-diagram"></i></span>
    <span class="hti hti-20"><i class="fas fa-cloud-upload-alt"></i></span>
  `;
  document.body.appendChild(layer);
}

// ── THEME TOGGLE ──────────────────────────────────────────────
const THEME_KEY = 'portfolio_theme';

function getTheme() {
  return localStorage.getItem(THEME_KEY) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  // Notify canvas to update particle color
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

function initThemeToggle() {
  // Apply saved / OS preference before first paint
  applyTheme(getTheme());

  document.querySelectorAll('#theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });
}

// ── SCROLL ANIMATIONS ─────────────────────────────────────────
function initScrollAnimations() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Skill bar fill
        e.target.querySelectorAll('.skill-fill[data-level]').forEach(bar => {
          bar.style.width = bar.dataset.level + '%';
        });
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.anim, .stagger').forEach(el => io.observe(el));
}

// ── PARTICLE CANVAS ───────────────────────────────────────────
function initBgCanvas() {
  let canvas = document.getElementById('bg-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
  }
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const PARTICLE_COUNT = 90;
  const MAX_DIST = 140;

  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  window.addEventListener('resize', resize, { passive: true });
  resize();

  const rand = (a, b) => Math.random() * (b - a) + a;

  // Color reactive to theme
  let rgb = '79,70,229';
  const updateColor = () => {
    rgb = document.documentElement.getAttribute('data-theme') === 'dark' ? '129,140,248' : '79,70,229';
  };
  updateColor();
  window.addEventListener('themechange', updateColor);

  // ── Symbol draw functions ──────────────────────────────────
  function drawCloud(s) {
    const r = s * 0.4;
    ctx.beginPath();
    ctx.arc(-r * 0.9, r * 0.1, r * 0.65, Math.PI, 0);
    ctx.arc(0,        -r * 0.4, r * 0.85, Math.PI * 1.15, Math.PI * -0.15);
    ctx.arc( r * 0.9, r * 0.1, r * 0.65, Math.PI, 0);
    ctx.lineTo( r * 1.55, r * 0.75);
    ctx.lineTo(-r * 1.55, r * 0.75);
    ctx.closePath();
    ctx.stroke();
  }

  function drawHex(s) { // Kubernetes-style hexagon
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      i === 0 ? ctx.moveTo(Math.cos(a) * s * 0.5, Math.sin(a) * s * 0.5)
              : ctx.lineTo(Math.cos(a) * s * 0.5, Math.sin(a) * s * 0.5);
    }
    ctx.closePath(); ctx.stroke();
    // inner ring
    ctx.beginPath(); ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2); ctx.stroke();
  }

  function drawShield(s) { // DevSecOps shield
    const h = s * 1.1, w = s * 0.85;
    ctx.beginPath();
    ctx.moveTo(0, -h * 0.5);
    ctx.lineTo( w * 0.5, -h * 0.2);
    ctx.lineTo( w * 0.5,  h * 0.1);
    ctx.quadraticCurveTo( w * 0.5, h * 0.5,  0, h * 0.55);
    ctx.quadraticCurveTo(-w * 0.5, h * 0.5, -w * 0.5, h * 0.1);
    ctx.lineTo(-w * 0.5, -h * 0.2);
    ctx.closePath(); ctx.stroke();
    // checkmark inside
    ctx.beginPath();
    ctx.moveTo(-s * 0.18, h * 0.1);
    ctx.lineTo(-s * 0.02, h * 0.25);
    ctx.lineTo( s * 0.22, -h * 0.08);
    ctx.stroke();
  }

  function drawTerminal(s) { // CLI / DevOps terminal
    const w = s * 1.4, h = s * 0.95;
    ctx.strokeRect(-w * 0.5, -h * 0.5, w, h);
    // title bar dot
    ctx.beginPath(); ctx.arc(-w * 0.35, -h * 0.3, s * 0.06, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-w * 0.2,  -h * 0.3, s * 0.06, 0, Math.PI * 2); ctx.fill();
    // > prompt
    ctx.beginPath();
    ctx.moveTo(-w * 0.35,  0);
    ctx.lineTo(-w * 0.18,  h * 0.12);
    ctx.lineTo(-w * 0.35,  h * 0.24);
    ctx.stroke();
    // cursor bar
    ctx.fillRect(-w * 0.1, -h * 0.03, w * 0.3, h * 0.12);
  }

  function drawGear(s) { // DevOps/automation gear
    const teeth = 8, ro = s * 0.48, ri = s * 0.35, rc = s * 0.16;
    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
      const a  = (Math.PI * 2 / teeth) * i;
      const a1 = a - 0.22, a2 = a + 0.22;
      const a3 = a + Math.PI / teeth - 0.22;
      const a4 = a + Math.PI / teeth + 0.22;
      ctx.lineTo(Math.cos(a1) * ri, Math.sin(a1) * ri);
      ctx.lineTo(Math.cos(a1) * ro, Math.sin(a1) * ro);
      ctx.lineTo(Math.cos(a2) * ro, Math.sin(a2) * ro);
      ctx.lineTo(Math.cos(a2) * ri, Math.sin(a2) * ri);
      if (i < teeth - 1) {
        ctx.lineTo(Math.cos(a3) * ri, Math.sin(a3) * ri);
        ctx.lineTo(Math.cos(a4) * ri, Math.sin(a4) * ri);
      }
    }
    ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, rc, 0, Math.PI * 2); ctx.stroke();
  }

  function drawAINode(s) { // Neural network / AI node
    const spokes = 6;
    ctx.beginPath(); ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < spokes; i++) {
      const a = (Math.PI * 2 / spokes) * i;
      const ex = Math.cos(a) * s * 0.52, ey = Math.sin(a) * s * 0.52;
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * s * 0.22, Math.sin(a) * s * 0.22);
      ctx.lineTo(ex, ey); ctx.stroke();
      ctx.beginPath(); ctx.arc(ex, ey, s * 0.1, 0, Math.PI * 2); ctx.fill();
    }
  }

  function drawPipeline(s) { // CI/CD pipeline arrow-chain
    const w = s * 1.3, box = s * 0.28;
    // three boxes connected by arrows
    for (let i = 0; i < 3; i++) {
      const x = -w * 0.5 + i * (box * 2 + s * 0.15);
      ctx.strokeRect(x, -box * 0.5, box * 1.5, box);
      if (i < 2) {
        const ax = x + box * 1.5 + s * 0.04;
        ctx.beginPath();
        ctx.moveTo(ax, 0); ctx.lineTo(ax + s * 0.1, 0); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ax + s * 0.1, -s * 0.07);
        ctx.lineTo(ax + s * 0.18, 0);
        ctx.lineTo(ax + s * 0.1,  s * 0.07);
        ctx.stroke();
      }
    }
  }

  function drawLock(s) { // Security / DevSecOps lock
    ctx.beginPath();
    ctx.arc(0, -s * 0.08, s * 0.3, Math.PI, 0);
    ctx.stroke();
    ctx.strokeRect(-s * 0.35, -s * 0.05, s * 0.7, s * 0.5);
    ctx.beginPath(); ctx.arc(0, s * 0.18, s * 0.09, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, s * 0.27); ctx.lineTo(0, s * 0.37); ctx.stroke();
  }

  function drawDocker(s) { // Docker container stack
    const bw = s * 1.1, bh = s * 0.28;
    // Three stacked containers
    for (let i = 0; i < 3; i++) {
      ctx.strokeRect(-bw * 0.5, -s * 0.4 + i * (bh + s * 0.04), bw, bh);
    }
    // Water wave below
    ctx.beginPath();
    ctx.moveTo(-bw * 0.55, s * 0.5);
    ctx.bezierCurveTo(-bw * 0.28, s * 0.32, -bw * 0.08, s * 0.56, 0, s * 0.46);
    ctx.bezierCurveTo( bw * 0.08, s * 0.36,  bw * 0.28, s * 0.58,  bw * 0.55, s * 0.46);
    ctx.stroke();
  }

  function drawAWS(s) { // AWS cloud + label
    // Mini cloud
    const r = s * 0.18;
    ctx.beginPath();
    ctx.arc(-r * 0.8, -s * 0.2, r * 0.52, Math.PI, 0);
    ctx.arc(0,         -s * 0.3, r * 0.68, Math.PI * 1.1, -Math.PI * 0.1);
    ctx.arc( r * 0.8, -s * 0.2, r * 0.52, Math.PI, 0);
    ctx.lineTo( r * 1.32, -s * 0.06);
    ctx.lineTo(-r * 1.32, -s * 0.06);
    ctx.closePath(); ctx.stroke();
    // Label
    ctx.font = `700 ${Math.round(s * 0.34)}px monospace`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('AWS', 0, s * 0.28);
  }

  function drawGCP(s) { // GCP arc badge + label
    ctx.beginPath();
    ctx.arc(0, -s * 0.22, s * 0.22, 0.4, Math.PI * 2 - 0.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(s * 0.22, -s * 0.22);
    ctx.lineTo(s * 0.22, -s * 0.1);
    ctx.lineTo(s * 0.06, -s * 0.1);
    ctx.stroke();
    ctx.font = `700 ${Math.round(s * 0.34)}px monospace`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('GCP', 0, s * 0.3);
  }

  function drawAzure(s) { // Azure 'A' triangle + label
    ctx.beginPath();
    ctx.moveTo(-s * 0.24, -s * 0.08);
    ctx.lineTo( 0,         -s * 0.46);
    ctx.lineTo( s * 0.24, -s * 0.08);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-s * 0.12, -s * 0.26);
    ctx.lineTo( s * 0.12, -s * 0.26);
    ctx.stroke();
    ctx.font = `700 ${Math.round(s * 0.32)}px monospace`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('Az', 0, s * 0.3);
  }

  function drawPython(s) { // S-curve snake (Python logo)
    ctx.beginPath();
    ctx.moveTo(-s * 0.08, -s * 0.46);
    ctx.bezierCurveTo( s * 0.36, -s * 0.46,  s * 0.36, -s * 0.02,  0, -s * 0.02);
    ctx.bezierCurveTo(-s * 0.36, -s * 0.02, -s * 0.36,  s * 0.42,  s * 0.08,  s * 0.42);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(-s * 0.04, -s * 0.38, s * 0.09, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( s * 0.04,  s * 0.34, s * 0.09, 0, Math.PI * 2); ctx.fill();
  }

  const TYPES = ['cloud','hex','shield','terminal','gear','ai','pipeline','lock','aws','gcp','azure','python','docker','dot'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = rand(0, W);
      this.y  = rand(0, H);
      this.vx = rand(-0.16, 0.16);
      this.vy = rand(-0.16, 0.16);
      this.size  = rand(14, 28);
      this.alpha = rand(0.12, 0.38);
      this.type  = TYPES[Math.floor(Math.random() * TYPES.length)];
      this.rot   = rand(0, Math.PI * 2);
      this.rotV  = rand(-0.004, 0.004);
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.rot += this.rotV;
      if (this.x < -30) this.x = W + 30;
      else if (this.x > W + 30) this.x = -30;
      if (this.y < -30) this.y = H + 30;
      else if (this.y > H + 30) this.y = -30;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.strokeStyle = `rgba(${rgb},1)`;
      ctx.fillStyle   = `rgba(${rgb},0.6)`;
      ctx.lineWidth = 1.1;
      const s = this.size;
      switch (this.type) {
        case 'cloud':    drawCloud(s);    break;
        case 'hex':      drawHex(s);      break;
        case 'shield':   drawShield(s);   break;
        case 'terminal': drawTerminal(s); break;
        case 'gear':     drawGear(s);     break;
        case 'ai':       drawAINode(s);   break;
        case 'pipeline': drawPipeline(s); break;
        case 'lock':     drawLock(s);     break;
        case 'aws':      drawAWS(s);      break;
        case 'gcp':      drawGCP(s);      break;
        case 'azure':    drawAzure(s);    break;
        case 'python':   drawPython(s);   break;
        case 'docker':   drawDocker(s);   break;
        default:
          ctx.beginPath(); ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  let mouse = { x: W / 2, y: H / 2 };
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });

    // Network / pipeline connection lines between nearby nodes
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.22;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = `rgba(${rgb},1)`;
          ctx.lineWidth = 0.7;
          // Dashed lines look like network/data flow
          ctx.setLineDash([4, 6]);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ── TYPEWRITER ────────────────────────────────────────────────
function initTypewriter(roles) {
  const el = document.getElementById('typewriter-text');
  if (!el || !roles.length) return;
  let ri = 0, ci = 0, deleting = false;
  const cursor = '<span class="cursor">|</span>';
  const tick = () => {
    const word = roles[ri];
    if (deleting) {
      ci--;
      el.innerHTML = word.slice(0, ci) + cursor;
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 60);
    } else {
      ci++;
      el.innerHTML = word.slice(0, ci) + cursor;
      if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 95);
    }
  };
  tick();
}

// ── HERO RENDER ───────────────────────────────────────────────
function renderHero(data) {
  const p = data.personal;
  setInner('hero-name', p.name);
  setInner('hero-desc', p.bio);

  // Update initials placeholder with actual initials
  const initials = (p.name || 'JC').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  const heroInitials = document.getElementById('hero-profile-initials');
  if (heroInitials) heroInitials.textContent = initials;
  const cvBtn = document.getElementById('hero-cv-btn');
  if (cvBtn && p.cvUrl) cvBtn.href = p.cvUrl;
  const liBtn = document.getElementById('hero-linkedin');
  if (liBtn && p.linkedin) liBtn.href = p.linkedin;
  const ghBtn = document.getElementById('hero-github');
  if (ghBtn && p.github) ghBtn.href = p.github;
  const emailBtn = document.getElementById('hero-email');
  if (emailBtn && p.email) emailBtn.href = 'mailto:' + p.email;

  // ── Snapshot card (all replaceable via admin) ──
  const snapAvail = document.getElementById('hsnap-avail');
  if (snapAvail) snapAvail.textContent = p.availability || 'Open to opportunities';

  const snapStats = document.getElementById('hsnap-stats');
  if (snapStats && data.stats && data.stats.length) {
    snapStats.innerHTML = data.stats.map(s => `
      <div class="hsnap-stat">
        <span class="hsnap-stat-val">${s.value}</span>
        <span class="hsnap-stat-label">${s.label}</span>
      </div>`).join('');
  }

  const snapCompany = document.getElementById('hsnap-company');
  const snapTitle   = document.getElementById('hsnap-title');
  if (data.experience && data.experience.length) {
    const cur = data.experience.find(e => e.current) || data.experience[0];
    if (snapCompany) snapCompany.textContent = cur.company;
    if (snapTitle)   snapTitle.textContent   = cur.role;
  }
}

// ── ABOUT RENDER ──────────────────────────────────────────────
// ── AGE CALCULATOR ────────────────────────────────────────────
function calcAge(birthDate) {
  if (!birthDate) return '';
  const today = new Date();
  const dob   = new Date(birthDate);
  let age = today.getFullYear() - dob.getFullYear();
  const notYetHadBirthday =
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());
  if (notYetHadBirthday) age--;
  return age;
}

function renderAbout(data) {
  const p = data.personal;
  setInner('about-name', p.name);
  setInner('about-bio-1', p.bio);
  setAttr('about-age', 'textContent', calcAge(p.birthDate));
  setAttr('about-email', 'textContent', p.email);
  setAttr('about-email', 'href', 'mailto:' + p.email);
  setInner('about-address', p.address);
  setInner('about-languages', (p.languages || []).join(', '));

  // Profile image in about section
  const aboutImg = document.getElementById('about-profile-img');
  const aboutPh  = document.getElementById('about-img-placeholder');
  const profileSrc = p.profileImage || '';
  if (profileSrc && aboutImg) {
    aboutImg.src = profileSrc;
    aboutImg.onload  = () => { aboutImg.style.display = 'block'; if (aboutPh) aboutPh.style.display = 'none'; };
    aboutImg.onerror = () => { aboutImg.style.display = 'none'; };
  }

  // Profile image in hero circle
  const heroImg = document.getElementById('hero-profile-img');
  if (heroImg && profileSrc) {
    heroImg.src = profileSrc;
    heroImg.style.display = 'block';
    heroImg.onload = () => {
      const heroInitials = document.getElementById('hero-profile-initials');
      if (heroInitials) heroInitials.style.display = 'none';
    };
    heroImg.onerror = () => { heroImg.style.display = 'none'; };
  }

  // Stats
  const statsEl = document.getElementById('stats-grid');
  if (statsEl && data.stats) {
    statsEl.innerHTML = data.stats.map(s => `
      <div class="stat-card glass anim anim-scale">
        <div class="stat-icon"><i class="${s.icon}"></i></div>
        <div class="stat-value" data-target="${s.value}">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join('');
    observeNewAnims();
    initCounters();
  }
}

// ── SKILLS RENDER ─────────────────────────────────────────────
// ── SKILL CATEGORY ICON RESOLVER ─────────────────────────────
// Auto-picks a meaningful icon based on category name keywords
// when the stored icon is the generic default 'fas fa-code'.
const SKILL_CAT_ICON_MAP = [
  { keys: ['cloud'],                              icon: 'fas fa-cloud' },
  { keys: ['os', 'operating system', 'database', 'db'], icon: 'fas fa-server' },
  { keys: ['devops', 'dev ops'],                  icon: 'fas fa-infinity' },
  { keys: ['project management', 'project'],      icon: 'fas fa-tasks' },
  { keys: ['security', 'vulnerability', 'scanning', 'devsecops'], icon: 'fas fa-shield-alt' },
  { keys: ['language', 'programming', 'script', 'scripting'], icon: 'fas fa-terminal' },
  { keys: ['monitoring', 'observability'],        icon: 'fas fa-chart-line' },
  { keys: ['network', 'networking'],              icon: 'fas fa-network-wired' },
  { keys: ['container', 'kubernetes', 'k8s'],     icon: 'fas fa-cubes' },
  { keys: ['ci/cd', 'cicd', 'pipeline'],          icon: 'fas fa-code-branch' },
  { keys: ['tool'],                               icon: 'fas fa-tools' },
];

function resolveSkillIcon(category, storedIcon) {
  if (storedIcon && storedIcon !== 'fas fa-code') return storedIcon;
  const lower = (category || '').toLowerCase();
  for (const { keys, icon } of SKILL_CAT_ICON_MAP) {
    if (keys.some(k => lower.includes(k))) return icon;
  }
  return storedIcon || 'fas fa-code';
}

function renderSkills(data) {
  if (!data.skills || !data.skills.length) return;
  const el = document.getElementById('skills-grid');
  if (!el) return;

  const R    = 32;
  const CIRC = +(2 * Math.PI * R).toFixed(2); // ~201.06

  el.innerHTML = data.skills.map((cat, ci) => {
    const avg       = cat.items.reduce((s, x) => s + (x.level || 0), 0) / cat.items.length;
    const pct       = Math.round(avg);
    const fill      = +(avg / 100 * CIRC).toFixed(2);
    const gap       = +(CIRC - fill).toFixed(2);
    const tierColor = avg >= 75 ? '#34d399' : avg >= 55 ? '#818cf8' : '#f472b6';
    const tierWord  = avg >= 75 ? 'EXPERT'   : avg >= 55 ? 'PRO'    : 'BASIC';
    const catIcon   = resolveSkillIcon(cat.category, cat.icon);

    return `
      <div class="skill-card anim" style="transition-delay:${ci * 0.07}s">
        <div class="skill-card-accent" style="background:linear-gradient(90deg,${tierColor}cc,transparent)"></div>
        <div class="skill-card-body">
          <div class="skill-card-left">
            <div class="skill-cat-icon" style="color:${tierColor}"><i class="${catIcon}"></i></div>
            <div class="skill-cat-name">${cat.category}</div>
          </div>
          <svg class="skill-donut" viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            <circle class="donut-track" cx="40" cy="40" r="${R}" fill="none"
              stroke="${tierColor}" stroke-width="6"/>
            <circle class="donut-fill" cx="40" cy="40" r="${R}" fill="none"
              stroke="${tierColor}" stroke-width="6"
              stroke-dasharray="${fill} ${gap}"
              transform="rotate(-90 40 40)"
              style="filter:drop-shadow(0 0 5px ${tierColor}99)"/>
            <text x="40" y="37" text-anchor="middle" class="donut-pct"
              style="font-family:monospace;font-size:12px;font-weight:700;fill:#e2e8f0">${pct}%</text>
            <text x="40" y="51" text-anchor="middle" class="donut-label"
              style="font-family:monospace;font-size:7px;font-weight:600;letter-spacing:0.04em;fill:#94a3b8">${tierWord}</text>
          </svg>
        </div>
        <div class="skill-card-chips">
          ${cat.items.map(item => {
            const t = item.level >= 75 ? 'tier-1' : item.level >= 55 ? 'tier-2' : 'tier-3';
            return `<span class="skill-chip ${t}">${item.name}</span>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');

  // Infinite ticker
  const ticker = document.getElementById('skills-ticker-track');
  if (ticker) {
    const all    = data.skills.flatMap(c => c.items.map(i => i.name));
    const doubled = [...all, ...all];
    ticker.innerHTML = doubled.map(t => `<span class="ticker-item">${t}</span>`).join('');
  }

  observeNewAnims();
}

// ── EXPERIENCE PREVIEW RENDER ────────────────────────────────
function renderExpPreview(data) {
  const el = document.getElementById('exp-preview-list');
  if (!el || !data.experience || !data.experience.length) return;

  // Show current role prominently + last 2 total
  const list = data.experience.slice(0, 3);
  el.className = 'exp-preview-list';
  el.innerHTML = list.map((job, i) => {
    const abbr = job.company.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
    const tags = (job.technologies || []).slice(0, 5)
      .map(t => `<span class="exp-preview-tag">${t}</span>`).join('');
    return `
      <div class="exp-preview-card anim ${job.current ? 'current' : ''}" style="transition-delay:${i * 0.08}s">
        <div class="exp-company-logo">${abbr}</div>
        <div class="exp-preview-info">
          <div class="exp-preview-role">${job.role}</div>
          <div class="exp-preview-company">${job.company}</div>
          <div class="exp-preview-meta">
            <span class="exp-preview-date"><i class="fas fa-calendar-alt"></i>${job.startDate} — ${job.endDate}</span>
            ${job.current ? '<span class="exp-current-badge">● Current</span>' : ''}
          </div>
          <div class="exp-preview-tags">${tags}</div>
        </div>
      </div>`;
  }).join('');

  observeNewAnims();
}

// ── PROJECTS PREVIEW RENDER ───────────────────────────────────
function renderProjectsPreview(data) {
  const el = document.getElementById('proj-preview-grid');
  if (!el || !data.projects || !data.projects.length) return;

  const featured = data.projects.filter(p => p.featured).slice(0, 3)
    || data.projects.slice(0, 3);

  el.innerHTML = featured.map((proj, i) => {
    const tags = (proj.technologies || []).slice(0, 4)
      .map(t => `<span class="proj-tech-tag">${t}</span>`).join('');
    return `
      <div class="proj-preview-card anim" style="transition-delay:${i * 0.1}s">
        <span class="proj-cat-badge">${proj.category || 'Project'}</span>
        <div class="proj-preview-title">${proj.title}</div>
        <div class="proj-preview-desc">${proj.description}</div>
        <div class="proj-preview-footer">${tags}</div>
      </div>`;
  }).join('');

  observeNewAnims();
}

// ── CERTIFICATES RENDER — PAGED (4 per page) + DOT NAV ───────
function renderCertificates(data) {
  const el = document.getElementById('cert-grid');
  if (!el) return;
  const certs = data.certificates || [];

  if (!certs.length) {
    el.innerHTML = `
      <div class="cert-empty anim">
        <i class="fas fa-certificate"></i>
        <p>Certificates will appear here once added via the admin portal.</p>
      </div>`;
    observeNewAnims();
    return;
  }

  // Gradient palette for placeholder cards (cycles by index)
  const GRADIENTS = [
    'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
    'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
    'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)',
    'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
    'linear-gradient(135deg,#fd7743 0%,#f5af19 100%)',
    'linear-gradient(135deg,#0f3460 0%,#533483 100%)',
  ];

  const PAGE_SIZE = 6;  // 3 cols × 2 rows
  const pages = [];
  for (let i = 0; i < certs.length; i += PAGE_SIZE) pages.push(certs.slice(i, i + PAGE_SIZE));

  // ── Progress pill indicators ──
  const indHtml = pages.length > 1
    ? `<div class="cert-indicators">
        ${pages.map((_, pi) => `<button class="cert-ind${pi === 0 ? ' active' : ''}" data-page="${pi}" aria-label="Page ${pi + 1}"></button>`).join('')}
      </div>`
    : '';

  // ── Pages ──
  const pagesHtml = pages.map((page, pi) => {
    const tilesHtml = page.map((c, ti) => {
      const globalIdx = pi * PAGE_SIZE + ti;
      const imgSrc    = c.image || c._pendingImage?.dataUrl || '';
      const gradient  = GRADIENTS[globalIdx % GRADIENTS.length];

      const imgArea = imgSrc
        ? `<img src="${imgSrc}" alt="${c.title}" loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : `<div class="cert-img-ph" style="background:${gradient}">
             <i class="fas fa-award"></i>
             <span>${c.issuer || 'Certificate'}</span>
           </div>`;

      // When an uploaded image is present, add a hidden fallback placeholder behind it
      const imgWithFallback = imgSrc
        ? imgArea + `<div class="cert-img-ph" style="background:${gradient};display:none">
             <i class="fas fa-award"></i>
             <span>${c.issuer || 'Certificate'}</span>
           </div>`
        : imgArea;

      const verifyBtn = c.credentialUrl
        ? `<a href="${c.credentialUrl}" target="_blank" rel="noopener" class="cert-card-verify">
             <i class="fas fa-external-link-alt"></i> Verify
           </a>`
        : '';

      return `
        <div class="cert-card" data-idx="${globalIdx}">
          <div class="cert-card-img">
            ${imgWithFallback}
          </div>
          <div class="cert-card-overlay">
            <div class="cert-view-pill"><i class="fas fa-expand-alt"></i> View</div>
          </div>
          ${c.issuer ? `<div class="cert-issuer-chip">${c.issuer}</div>` : ''}
          <div class="cert-card-info">
            <div class="cert-card-title">${c.title}</div>
            <div class="cert-card-meta">${c.date || ''}</div>
            ${verifyBtn}
          </div>
        </div>`;
    }).join('');

    return `
      <div class="cert-page${pi === 0 ? ' active' : ''}" data-page="${pi}">
        <div class="cert-gallery">${tilesHtml}</div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="cert-viewer">
      ${indHtml}
      <div class="cert-pages">${pagesHtml}</div>
    </div>`;

  // ── Page switching ──
  const inds    = el.querySelectorAll('.cert-ind');
  const pageEls = el.querySelectorAll('.cert-page');
  let currentPage = 0;

  function goToPage(pi) {
    pageEls[currentPage].classList.remove('active');
    inds[currentPage]?.classList.remove('active');
    currentPage = pi;
    pageEls[currentPage].classList.add('active');
    inds[currentPage]?.classList.add('active');
  }

  inds.forEach(ind => ind.addEventListener('click', () => goToPage(+ind.dataset.page)));

  // ── Click tile → lightbox ──
  el.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      const c      = certs[+card.dataset.idx];
      const imgSrc = c.image || c._pendingImage?.dataUrl || '';
      if (imgSrc) openLightbox(imgSrc, c.title + (c.issuer ? ' — ' + c.issuer : ''), imgSrc);
    });
  });

  observeNewAnims();
}

// ── CONTACT RENDER ────────────────────────────────────────────
function renderContact(data) {
  const c = data.contact;
  const p = data.personal;

  // Email
  setInner('contact-email', c.email);
  const emailLink = document.getElementById('contact-email-link');
  if (emailLink) emailLink.href = 'mailto:' + c.email;

  // Address & availability
  setInner('contact-address', c.address);
  setInner('contact-availability', c.availability);

  // LinkedIn
  if (p.linkedin) {
    const liLink = document.getElementById('contact-linkedin');
    if (liLink) liLink.href = p.linkedin;
  }

  // GitHub
  if (p.github) {
    const ghLink = document.getElementById('contact-github');
    if (ghLink) ghLink.href = p.github;
    const ghVal = document.getElementById('contact-github-val');
    if (ghVal) ghVal.textContent = p.github.replace('https://', '');
  }
}

// ── FOOTER RENDER ─────────────────────────────────────────────
function renderFooter(data) {
  const year = document.getElementById('footer-year');
  if (year) year.textContent = new Date().getFullYear();
  const name = document.getElementById('footer-name');
  if (name) name.textContent = data.personal.name;
  const li = document.getElementById('footer-linkedin');
  if (li && data.personal.linkedin) li.href = data.personal.linkedin;
  const gh = document.getElementById('footer-github');
  if (gh && data.personal.github) gh.href = data.personal.github;
}

// ── EXPERIENCE PAGE ───────────────────────────────────────────
function renderExperiencePage(data) {
  const tl = document.getElementById('exp-timeline');
  if (tl) {
    tl.innerHTML = data.experience.map((exp, i) => `
      <div class="timeline-item anim ${i % 2 === 0 ? 'anim-left' : 'anim-right'}">
        ${i % 2 !== 0 ? '<div class="timeline-blank"></div>' : ''}
        <div class="timeline-dot ${exp.current ? 'current' : ''}">
          <i class="fas fa-briefcase"></i>
        </div>
        ${i % 2 === 0 ? '<div class="timeline-blank"></div>' : ''}
        <div class="timeline-card glass">
          <div class="timeline-date">${exp.startDate} — ${exp.endDate}</div>
          <div class="timeline-role">${exp.role}</div>
          <div class="timeline-company">${exp.company} · ${exp.type}</div>
          <div class="timeline-desc">${exp.description}</div>
          <ul class="timeline-list">
            ${exp.responsibilities.slice(0, 5).map(r => `<li>${r}</li>`).join('')}
          </ul>
          <div class="tech-tags">
            ${exp.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>`).join('');
    observeNewAnims();
  }

  const edu = document.getElementById('edu-grid');
  if (edu) {
    edu.innerHTML = data.education.map(e => `
      <div class="edu-card glass anim anim-scale">
        <div class="edu-icon"><i class="fas fa-graduation-cap"></i></div>
        <div>
          <div class="edu-degree">${e.degree}</div>
          <div class="edu-field">${e.field}</div>
          <div class="edu-institution">${e.institution}</div>
          <div class="edu-meta">
            <span class="edu-year">${e.startYear} – ${e.endYear}</span>
            <span class="edu-grade">${e.grade}</span>
          </div>
        </div>
      </div>`).join('');
    observeNewAnims();
  }

  // Nav brand
  setInner('nav-brand', data.personal.name);
}

// ── PROJECTS PAGE ─────────────────────────────────────────────
function renderProjectsPage(data) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const cats = ['All', ...new Set(data.projects.map(p => p.category))];
  const filterBar = document.getElementById('filter-bar');
  if (filterBar) {
    filterBar.innerHTML = cats.map((c, i) => `
      <button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      grid.querySelectorAll('.project-card').forEach(card => {
        const match = cat === 'All' || card.dataset.cat === cat;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  grid.innerHTML = data.projects.map((p, i) => `
    <div class="project-card glass anim" data-cat="${p.category}" style="transition-delay:${i * 0.1}s">
      <div class="project-img">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title}" loading="lazy">`
          : `<div class="project-img-placeholder"><i class="fas fa-layer-group"></i><span>${p.category}</span></div>`}
        <span class="project-cat-badge">${p.category}</span>
      </div>
      <div class="project-body">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.description}</div>
        <ul class="project-highlights">
          ${(p.highlights || []).map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="tech-tags" style="margin-bottom:16px;">
          ${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-footer">
          <div class="project-links">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-link"><i class="fab fa-github"></i></a>` : ''}
            ${p.demo   ? `<a href="${p.demo}"   target="_blank" rel="noopener" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
          </div>
        </div>
      </div>
    </div>`).join('');
  observeNewAnims();

  setInner('nav-brand', data.personal.name);
}

// ── LIGHTBOX ──────────────────────────────────────────────────
function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const close = lb.querySelector('.lb-close');
  close.addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function openLightbox(src, caption, downloadUrl) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-caption');
  const dlBtn = document.getElementById('lb-download');
  if (img) img.src = src;
  if (cap) cap.textContent = caption || '';
  if (dlBtn) {
    if (downloadUrl) {
      dlBtn.href = downloadUrl;
      dlBtn.classList.remove('hidden');
    } else {
      dlBtn.href = '#';
      dlBtn.classList.add('hidden');
    }
  }
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

// ── CONTACT FORM ──────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]')?.value || '';
    const email   = form.querySelector('[name="email"]')?.value || '';
    const subject = form.querySelector('[name="subject"]')?.value || 'Portfolio Contact';
    const message = form.querySelector('[name="message"]')?.value || '';
    const to = portfolioData?.contact?.email || '';
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
    window.location.href = mailto;
    showToast('Opening your email client…', 'success');
  });
}

// ── HIRE ME MODAL ─────────────────────────────────────────────
function initHireMeModal() {
  const overlay   = document.getElementById('hire-modal');
  const closeBtn  = document.getElementById('hire-modal-close');
  const hireMeBtn = document.getElementById('hire-me-btn');
  const form      = document.getElementById('hire-modal-form');
  if (!overlay) return;

  const open = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('input, textarea')?.focus();
  };
  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (hireMeBtn) hireMeBtn.addEventListener('click', open);
  // also wire any other "Hire Me" trigger buttons across the page
  document.querySelectorAll('.hire-me-trigger').forEach(el => el.addEventListener('click', open));
  if (closeBtn)  closeBtn.addEventListener('click', close);

  // Close on backdrop click
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  // Close on Escape key
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn     = form.querySelector('.hire-modal-submit');
      const name    = form.querySelector('[name="name"]')?.value.trim() || '';
      const email   = form.querySelector('[name="email"]')?.value.trim() || '';
      const subject = form.querySelector('[name="subject"]')?.value.trim() || 'Hire Me';
      const message = form.querySelector('[name="message"]')?.value.trim() || '';
      if (!name || !email || !message) { showToast('Please fill in all required fields.', 'error'); return; }
      const to     = portfolioData?.contact?.email || portfolioData?.personal?.email || '';
      const mailto = `mailto:${to}?subject=${encodeURIComponent(subject + ' — ' + name)}&body=${encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message)}`;
      if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-check"></i> Sent!'; }
      window.location.href = mailto;
      showToast('Opening your email client…', 'success');
      setTimeout(() => {
        close();
        form.reset();
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; }
      }, 1500);
    });
  }
}

// ── TOAST ─────────────────────────────────────────────────────
function initToast() { /* container already in HTML */ }

function showToast(msg, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icons = { success: 'fas fa-check-circle', error: 'fas fa-exclamation-circle', info: 'fas fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="${icons[type] || icons.info}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(24px)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, duration);
}

// ── HELPERS ───────────────────────────────────────────────────
function setInner(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.innerHTML = value;
}

function setAttr(id, attr, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined) el[attr] = value;
}

function observeNewAnims() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.skill-fill[data-level]').forEach(bar => {
          bar.style.width = bar.dataset.level + '%';
        });
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.anim:not(.visible), .stagger:not(.visible)').forEach(el => io.observe(el));
}

// ── EXPORT helpers for admin page ─────────────────────────────
window.PortfolioUtils = { fetchData, showToast };

// ── PAGE LOADER ────────────────────────────────────────────────
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  const hide = () => loader.classList.add('hidden');
  if (document.readyState === 'complete') { setTimeout(hide, 200); return; }
  window.addEventListener('load', () => setTimeout(hide, 300));
  setTimeout(hide, 2800);
}

// ── CURSOR GLOW ────────────────────────────────────────────────
function initCursorGlow() {
  const el = document.getElementById('cursor-glow');
  if (!el || window.matchMedia('(pointer: coarse)').matches) { if (el) el.remove(); return; }
  document.addEventListener('mousemove', e => {
    el.style.left = e.clientX + 'px';
    el.style.top  = e.clientY + 'px';
  }, { passive: true });
}

// ── COUNTER ANIMATION ──────────────────────────────────────────
function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const raw = (el.dataset.target || '').trim();
      const match = raw.match(/^([\d.]+)(.*)$/);
      if (!match) return;
      const num = parseFloat(match[1]);
      const suffix = match[2] || '';
      const dur = 1800, start = performance.now();
      const tick = now => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (Number.isInteger(num)
          ? Math.floor(eased * num)
          : (eased * num).toFixed(1)) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.8 });
  document.querySelectorAll('.stat-value[data-target]').forEach(el => io.observe(el));
}

// ── PARALLAX MOUSE EFFECT ──────────────────────────────────────
function initParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    const pf = hero.querySelector('.profile-float');
    if (pf) pf.style.transform = `translateY(-14px) rotateX(${-cy * 8}deg) rotateY(${cx * 8}deg)`;
    hero.querySelectorAll('.tech-float-badge').forEach((b, i) => {
      const f = (i % 2 === 0 ? 1 : -1) * (i * 0.6 + 0.5);
      b.style.transform = `translate(var(--tx), calc(var(--ty) + ${cy * 14 * f}px))`;
    });
  }, { passive: true });
  hero.addEventListener('mouseleave', () => {
    const pf = hero.querySelector('.profile-float');
    if (pf) pf.style.transform = '';
    hero.querySelectorAll('.tech-float-badge').forEach(b => b.style.transform = '');
  });
}
