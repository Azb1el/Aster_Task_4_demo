(function () {
    'use strict';

    function renderUser() {
        const user = window.DEMO_USER;
        const avatarEl = document.getElementById('settingsAvatar');
        if (avatarEl) avatarEl.textContent = user.username[0];

        const nameEl = document.getElementById('settingsName');
        const subEl = document.getElementById('settingsSub');
        if (nameEl) nameEl.textContent = user.username;
        if (subEl) subEl.textContent = user.email + ' · подтверждён';

        const fieldName = document.getElementById('fieldName');
        const fieldEmail = document.getElementById('fieldEmail');
        if (fieldName) fieldName.value = user.username;
        if (fieldEmail) fieldEmail.value = user.email;

        const sideName = document.getElementById('sidebarUserName');
        const sideEmail = document.getElementById('sidebarUserEmail');
        const sideAvatar = document.getElementById('sidebarUserAvatar');
        if (sideName) sideName.textContent = user.username;
        if (sideEmail) sideEmail.textContent = '@demo';
        if (sideAvatar) sideAvatar.textContent = user.username[0];
    }

    function initNav() {
        document.querySelectorAll('.settings-nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                document.querySelectorAll('.settings-nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
                document.querySelector(`.settings-panel[data-panel="${section}"]`)?.classList.add('active');
            });
        });
    }

    function initThemeCards() {
        const cards = document.querySelectorAll('.theme-card');
        const saved = localStorage.getItem('aion_theme') || 'light';
        cards.forEach(card => card.classList.toggle('active', card.dataset.themeValue === saved));

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const value = card.dataset.themeValue;
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                let applied = value;
                if (value === 'system') {
                    applied = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.setAttribute('data-theme', applied);
                localStorage.setItem('aion_theme', value);
                console.log('[Demo] Тема переключена на:', value);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        console.log('[Demo] Settings: загрузка');
        renderUser();
        initNav();
        initThemeCards();

        document.getElementById('changeAvatarBtn')?.addEventListener('click', () => {
            console.log('[Demo] Изменить фото — в разработке');
            alert('Демо-режим: функция недоступна');
        });
        document.getElementById('changePasswordBtn')?.addEventListener('click', () => {
            console.log('[Demo] Сменить пароль — в разработке');
            alert('Демо-режим: функция недоступна');
        });
        document.getElementById('fieldName')?.addEventListener('blur', () => {
            console.log('[Demo] Изменение имени — недоступно');
        });
        document.getElementById('fieldEmail')?.addEventListener('blur', () => {
            console.log('[Demo] Изменение email — недоступно');
        });

        ['toggleAutoplay', 'toggleSubtitles', 'toggleComfort', 'toggleCompact', 'toggleReduceMotion'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', (e) => {
                console.log(`[Demo] ${id}: ${e.target.checked ? 'вкл' : 'выкл'}`);
            });
        });
        ['qualitySelect', 'speedSelect', 'langSelect'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', (e) => {
                console.log(`[Demo] ${id}: ${e.target.value}`);
            });
        });

        document.getElementById('resetBtn')?.addEventListener('click', () => {
            if (confirm('Сбросить настройки?')) location.reload();
        });
        document.getElementById('saveBtn')?.addEventListener('click', () => {
            console.log('[Demo] Сохранить — недоступно');
            alert('Демо-режим: сохранение недоступно');
        });
    });
})();