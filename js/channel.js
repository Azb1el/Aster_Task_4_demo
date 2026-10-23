(function () {
    'use strict';

    const TEST_VIDEO = 'test.mp4';
    let previewDataUrl = null;

    function generatePreview(src, atSecond) {
        return new Promise((resolve) => {
            if (previewDataUrl) { resolve(previewDataUrl); return; }
            const v = document.createElement('video');
            v.src = src;
            v.muted = true;
            v.playsInline = true;
            v.preload = 'metadata';
            const timeout = setTimeout(() => resolve(null), 15000);
            v.addEventListener('loadedmetadata', () => {
                const target = Math.min(atSecond, Math.max(0, (v.duration || 0) - 0.1));
                try { v.currentTime = target; } catch (e) { resolve(null); }
            });
            v.addEventListener('seeked', () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = 538;
                    canvas.height = 302;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
                    previewDataUrl = canvas.toDataURL('image/jpeg', 0.85);
                    clearTimeout(timeout);
                    resolve(previewDataUrl);
                } catch (e) { clearTimeout(timeout); resolve(null); }
            });
            v.addEventListener('error', () => { clearTimeout(timeout); resolve(null); });
            v.load();
        });
    }

    function applyPreview(url) {
        if (!url) return;
        document.querySelectorAll('.video-thumb').forEach(el => {
            el.style.backgroundImage = `url(${url})`;
        });
    }

    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    function generateGradient(seed) {
        const h = hashString(seed);
        const h1 = h % 360;
        const h2 = (h * 7) % 360;
        return `linear-gradient(135deg, hsl(${h1}, 65%, 25%) 0%, hsl(${h2}, 70%, 55%) 100%)`;
    }

    function renderVideoCard(v) {
        const card = document.createElement('a');
        card.href = `watch.html?v=${v.id}`;
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-thumb">
                <span class="video-duration">${v.duration}</span>
            </div>
            <div class="video-info">
                <p class="video-title">${v.title}</p>
                <div class="video-stats">${v.views} · ${v.ago}</div>
            </div>
        `;
        return card;
    }

    function renderVideoGrid() {
        const grid = document.getElementById('channelVideoGrid');
        if (!grid) return;
        grid.innerHTML = '';
        window.DEMO_VIDEOS.slice(0, 1).forEach(v => grid.appendChild(renderVideoCard(v)));
    }

    function renderChannel() {
        const user = window.DEMO_USER;
        const channel = window.DEMO_CHANNEL;

        document.title = `${channel.name} — Aster`;

        const nameEl = document.getElementById('channelName');
        if (nameEl) nameEl.textContent = channel.name;

        const metaEl = document.getElementById('channelMeta');
        if (metaEl) metaEl.textContent = `@demo · ${channel.subscribers} подписчиков · ${channel.views} просмотров`;

        const descEl = document.getElementById('channelDescription');
        if (descEl) descEl.textContent = channel.description;

        const avatarEl = document.getElementById('channelAvatar');
        if (avatarEl) avatarEl.textContent = channel.name[0].toUpperCase();

        const bannerEl = document.getElementById('channelBanner');
        if (bannerEl) bannerEl.style.background = generateGradient(user.id);

        const sideName = document.getElementById('sidebarUserName');
        const sideEmail = document.getElementById('sidebarUserEmail');
        const sideAvatar = document.getElementById('sidebarUserAvatar');
        if (sideName) sideName.textContent = user.username;
        if (sideEmail) sideEmail.textContent = '@demo';
        if (sideAvatar) sideAvatar.textContent = user.username[0];
    }

    function initChannelActions() {
        const subscribeBtn = document.getElementById('subscribeBtn');
        const writeBtn = document.getElementById('writeBtn');
        const moreBtn = document.getElementById('moreBtn');
        let subscribed = false;

        subscribeBtn?.addEventListener('click', () => {
            subscribed = !subscribed;
            const span = subscribeBtn.querySelector('span');
            const icon = subscribeBtn.querySelector('i');
            if (subscribed) {
                subscribeBtn.classList.add('subscribed');
                if (span) span.textContent = 'Вы подписаны';
                if (icon) icon.className = 'fas fa-check';
                alert('Вы подписались!');
            } else {
                subscribeBtn.classList.remove('subscribed');
                if (span) span.textContent = 'Подписаться';
                if (icon) icon.className = 'fas fa-bell';
                alert('Вы отписались');
            }
        });

        writeBtn?.addEventListener('click', () => {
            console.log('[Demo] Написать — в разработке');
            alert('Демо-режим: функция недоступна');
        });
        moreBtn?.addEventListener('click', () => {
            console.log('[Demo] Меню — в разработке');
            alert('Демо-режим: функция недоступна');
        });
    }

    function initTabs() {
        document.querySelectorAll('.channel-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const name = tab.dataset.tab;
                document.querySelectorAll('.channel-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                document.getElementById('tab-' + name)?.classList.add('active');
            });
        });
    }

    function initViewToggle() {
        const grid = document.getElementById('channelVideoGrid');
        const toggle = document.getElementById('viewToggle');
        if (!grid || !toggle) return;
        const savedView = localStorage.getItem('aster_channel_view') || 'grid';
        applyView(savedView);
        toggle.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                applyView(view);
                localStorage.setItem('aster_channel_view', view);
            });
        });
        function applyView(view) {
            grid.classList.toggle('list-view', view === 'list');
            toggle.querySelectorAll('.view-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.view === view);
            });
        }
    }

    document.addEventListener('DOMContentLoaded', async () => {
        console.log('[Demo] Channel: загрузка');
        renderChannel();
        initChannelActions();
        initTabs();
        renderVideoGrid();
        initViewToggle();
        const preview = await generatePreview(TEST_VIDEO, 3);
        applyPreview(preview);
    });
})();