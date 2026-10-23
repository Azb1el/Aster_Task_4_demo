const $ = (id) => document.getElementById(id);

function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function requireAuth() {
    return window.DEMO_USER;
}

function renderUserHeader() {
    const user = requireAuth();
    if (!user) return;
    const avatarBtn = $('avatarBtn');
    if (!avatarBtn) return;
    const name = user.username || 'Пользователь';
    avatarBtn.textContent = name[0].toUpperCase();
}

function renderSidebarUser() {
    const user = window.DEMO_USER;
    if (!user) return;
    const nameEl = document.getElementById('sidebarUserName');
    const emailEl = document.getElementById('sidebarUserEmail');
    const avatarEl = document.getElementById('sidebarUserAvatar');
    if (nameEl) nameEl.textContent = user.username;
    if (emailEl) emailEl.textContent = user.email;
    if (avatarEl) avatarEl.textContent = user.username[0];
}

// Чиним поиск: disabled → enabled, добавляем id если нет
function fixSearchInputs() {
    document.querySelectorAll('.search-box input[type="text"]').forEach(el => {
        if (!el.id) el.id = 'searchInput';
        el.disabled = false;
    });
    document.querySelectorAll('.search-box button.search-btn').forEach(el => {
        if (!el.id) el.id = 'searchBtn';
        el.disabled = false;
    });
}

// Вставляем сайдбар в watch.html (если его нет)
function injectSidebarIfNeeded() {
    if (!document.querySelector('.watch-container')) return;
    if (document.querySelector('.aster-layout')) return;

    const wc = document.querySelector('.watch-container');
    const layout = document.createElement('div');
    layout.className = 'aster-layout';

    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <nav class="sidebar-nav">
            <a href="aster.html" class="nav-item"><i class="fas fa-home"></i><span>Главная</span></a>
        </nav>
        <div class="sidebar-divider"></div>
        <div class="user-card" id="sidebarUserCard">
            <div class="user-avatar" id="sidebarUserAvatar">—</div>
            <div class="user-info">
                <div class="user-name" id="sidebarUserName">Пользователь</div>
                <div class="user-email" id="sidebarUserEmail">—</div>
            </div>
        </div>
        <nav class="sidebar-nav">
            <a href="channel.html" class="nav-item"><i class="fas fa-tv"></i><span>Мой канал</span></a>
            <a href="#" class="nav-item"><i class="fas fa-history"></i><span>История</span></a>
            <a href="#" class="nav-item"><i class="fas fa-list-ul"></i><span>Плейлисты</span></a>
            <a href="#" class="nav-item"><i class="fas fa-users"></i><span>Подписки</span></a>
        </nav>
        <div class="sidebar-divider"></div>
        <button class="nav-item expand-btn" type="button">
            <i class="fas fa-chevron-up"></i><span>Развернуть</span>
        </button>
        <nav class="sidebar-nav">
            <a href="#" class="nav-item"><i class="fas fa-film"></i><span>Фильмы</span></a>
            <a href="#" class="nav-item"><i class="fas fa-gamepad"></i><span>Игры</span></a>
        </nav>
        <div class="sidebar-spacer"></div>
        <div class="sidebar-divider"></div>
        <nav class="sidebar-nav">
            <a href="settings.html" class="nav-item"><i class="fas fa-cog"></i><span>Настройки</span></a>
            <a href="#" class="nav-item"><i class="fas fa-question-circle"></i><span>Помощь</span></a>
        </nav>
        <div class="copyright">© 2025 Aster</div>
    `;

    wc.parentNode.insertBefore(layout, wc);
    layout.appendChild(sidebar);
    layout.appendChild(wc);
}

function initSearchButton() {
    const input = $('searchInput');
    const btn = $('searchBtn');
    if (!input || !btn) return;

    const updateState = () => {
        btn.classList.toggle('active', input.value.trim().length > 0);
    };
    input.addEventListener('input', updateState);
    updateState();

    const goSearch = () => {
        const q = input.value.trim();
        window.location.href = q
            ? `search.html?q=${encodeURIComponent(q)}`
            : 'search.html';
    };

    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') goSearch(); });
    btn.addEventListener('click', goSearch);
}

function initBurger() {
    const btn = $('burgerBtn');
    if (btn) btn.addEventListener('click', () => console.log('[Demo] Burger clicked'));
}

function initAvatarArrow() {
    const wrapper = $('avatarWrapper');
    if (wrapper) wrapper.addEventListener('click', () => console.log('[Demo] Avatar menu clicked'));
}

document.addEventListener('DOMContentLoaded', () => {
    fixSearchInputs();          // 1. Включаем поиск и добавляем id
    injectSidebarIfNeeded();    // 2. Вставляем сайдбар в watch.html
    renderUserHeader();
    renderSidebarUser();        // 3. Заполняем сайдбар (уже существует)
    initSearchButton();         // 4. Вешаем обработчики на поиск
    initBurger();
    initAvatarArrow();
});