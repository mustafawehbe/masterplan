const pages = [
  { href: 'index.html',          icon: '⊞', label: 'Overview' },
  { href: 'business-plan.html',  icon: '◈', label: 'Business Plan' },
  { href: 'financial.html',      icon: '◉', label: 'Financial Statements' },
  { href: 'architecture.html',   icon: '⬡', label: 'Architecture' },
  { href: 'roadmap.html',        icon: '◷', label: 'Roadmap' },
];

const EDIT_SELECTORS = '.placeholder, tbody td, .timeline-title, .timeline-desc, .stat-value, .stat-sub, .tag, .arch-list li';

let editMode = false;

function pageKey() {
  return 'mp_' + (window.location.pathname.split('/').pop() || 'index.html');
}

function saveContent() {
  const data = {};
  document.querySelectorAll('[data-eid]').forEach(el => {
    data[el.dataset.eid] = el.innerHTML;
  });
  localStorage.setItem(pageKey(), JSON.stringify(data));
}

function loadContent() {
  const raw = localStorage.getItem(pageKey());
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    Object.entries(data).forEach(([k, v]) => {
      const el = document.querySelector(`[data-eid="${k}"]`);
      if (el) el.innerHTML = v;
    });
  } catch (e) {}
}

function initEditable() {
  document.querySelectorAll(EDIT_SELECTORS).forEach((el, i) => {
    el.dataset.eid = i;
  });
  loadContent();
}

function enableEditMode() {
  editMode = true;
  document.body.classList.add('edit-mode');

  let banner = document.getElementById('edit-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'edit-banner';
    banner.className = 'edit-banner';
    banner.innerHTML = '✎ &nbsp;<strong>Edit mode on</strong> — click any highlighted area to type. Changes save automatically.';
    const main = document.querySelector('.main');
    if (main) main.insertBefore(banner, main.firstChild);
  }
  banner.style.display = 'flex';

  document.querySelectorAll('[data-eid]').forEach(el => {
    el.contentEditable = 'true';
  });

  const btn = document.getElementById('edit-btn');
  if (btn) { btn.textContent = '✓ Done Editing'; btn.classList.add('editing'); }
}

function disableEditMode() {
  editMode = false;
  document.body.classList.remove('edit-mode');

  const banner = document.getElementById('edit-banner');
  if (banner) banner.style.display = 'none';

  document.querySelectorAll('[data-eid]').forEach(el => {
    el.removeAttribute('contenteditable');
  });

  saveContent();

  const btn = document.getElementById('edit-btn');
  if (btn) { btn.textContent = '✎ Edit Page'; btn.classList.remove('editing'); }
}

function toggleEditMode() {
  if (editMode) disableEditMode();
  else enableEditMode();
}

function buildSidebar() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const sidebar = document.getElementById('sidebar');

  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="brand-mark">
        <div class="brand-icon">M</div>
        <span class="brand-name">Masterplan</span>
      </div>
      <div class="brand-sub">Live Documentation</div>
    </div>
    <nav class="nav">
      <div class="nav-label">Navigation</div>
      ${pages.map(p => `
        <a href="${p.href}" class="nav-item ${current === p.href || (current === '' && p.href === 'index.html') ? 'active' : ''}">
          <span class="nav-icon">${p.icon}</span>
          ${p.label}
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <button id="edit-btn" onclick="toggleEditMode()">✎ Edit Page</button>
      <div class="sidebar-updated">Last updated <span>${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  initEditable();
  document.addEventListener('input', e => {
    if (e.target.dataset.eid !== undefined) saveContent();
  });
});
