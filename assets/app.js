const pages = [
  { href: 'index.html',          icon: '⊞', label: 'Overview' },
  { href: 'business-plan.html',  icon: '◈', label: 'Business Plan' },
  { href: 'financial.html',      icon: '◉', label: 'Financial Statements' },
  { href: 'architecture.html',   icon: '⬡', label: 'Architecture' },
  { href: 'roadmap.html',        icon: '◷', label: 'Roadmap' },
];

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
      Last updated <span>${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', buildSidebar);
