(function () {
    'use strict';

    const rawQuery = getParam('q');
    const query = (rawQuery || '').trim();
    console.log('[Demo] Поиск по запросу:', query || '(все видео)');

    // Показать запрос
    const qEl = document.getElementById('searchQuery');
    if (qEl) qEl.textContent = query || 'все видео';

    // Показать в шапке
    const mainSearch = document.getElementById('searchInput');
    if (mainSearch) mainSearch.value = query;

    // Данные пользователя в сайдбаре
    renderSidebarUser();

    // Фильтр
    function filterVideos(q) {
        if (!q) return window.DEMO_VIDEOS;
        const lower = q.toLowerCase();
        return window.DEMO_VIDEOS.filter(v =>
            v.title.toLowerCase().includes(lower) ||
            v.channel.toLowerCase().includes(lower)
        );
    }

    const matched = filterVideos(query);
    // ⬇️ ВАЖНО: если пусто — показываем всё
    const results = matched.length > 0 ? matched : window.DEMO_VIDEOS;
    const nothingFound = query && matched.length === 0;

    // Статистика
    const statsEl = document.getElementById('searchStats');
    if (statsEl) {
        if (nothingFound) {
            statsEl.textContent = `По запросу «${query}» ничего не найдено — показаны все видео`;
        } else if (!query) {
            statsEl.textContent = `Все видео: ${results.length}`;
        } else {
            statsEl.textContent = `Найдено ${results.length} видео по запросу «${query}»`;
        }
    }

    // Отрисовка карточек
    function renderCard(v) {
        const card = document.createElement('a');
        card.href = `watch.html?v=${v.id}`;
        card.className = 'video-card';
        const initial = (v.channel || 'A').trim()[0].toUpperCase();
        card.innerHTML = `
            <div class="video-thumb">
                <span class="video-duration">${v.duration}</span>
            </div>
            <p class="video-title">${v.title}</p>
            <div class="video-meta">
                <div class="channel-avatar-sm">${initial}</div>
                <div class="video-meta-info">
                    <div class="channel-name-sm">${v.channel}</div>
                    <div class="video-stats">${v.views} · ${v.ago}</div>
                </div>
            </div>
        `;
        return card;
    }

    const grid = document.getElementById('searchResults');
    if (grid) {
        grid.innerHTML = '';
        results.forEach(v => grid.appendChild(renderCard(v)));
    }

    // Спиннер
    const loading = document.querySelector('.search-loading');
    if (loading) {
        setTimeout(() => {
            loading.innerHTML = '<span style="color:var(--text-muted)">Показаны все результаты</span>';
        }, 1500);
    }

    // Очистить
    document.getElementById('searchClear')?.addEventListener('click', () => {
        window.location.href = 'search.html';
    });

    // Табы
    document.querySelectorAll('.search-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            console.log('[Demo] Таб:', tab.dataset.tab);
        });
    });

    // Сортировка
    document.getElementById('searchSort')?.addEventListener('click', () => {
        alert('Демо-режим: сортировка недоступна');
    });

    // Перейти к моменту
    document.getElementById('matchJump')?.addEventListener('click', () => {
        window.location.href = 'watch.html?v=v1';
    });
})();