(function () {
    'use strict';

    console.log('[Demo] Студия загружена');

    // Табы
    document.querySelectorAll('.studio-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const name = tab.dataset.tab;
            document.querySelectorAll('.studio-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.studio-panel').forEach(p => p.classList.remove('active'));
            document.querySelector(`.studio-panel[data-panel="${name}"]`)?.classList.add('active');
            console.log('[Demo] Таб студии:', name);
        });
    });

    // Создать видео  переход на таб "Загрузка"
    document.getElementById('createVideoBtn')?.addEventListener('click', () => {
        console.log('[Demo] Создать видео');
        document.querySelector('.studio-tab[data-tab="upload"]')?.click();
    });

    // Кнопка "Выбрать файл" — alert
    document.querySelector('.btn-choose-file')?.addEventListener('click', () => {
        console.log('[Demo] Выбор файла');
        alert('Демо-режим: загрузка файлов недоступна');
    });

    // Опубликовать
    document.getElementById('publishBtn')?.addEventListener('click', () => {
        console.log('[Demo] Опубликовать');
        alert('Демо-режим: публикация недоступна');
    });

    // Сохранить черновик
    document.getElementById('draftBtn')?.addEventListener('click', () => {
        console.log('[Demo] Сохранить черновик');
        alert('Демо-режим: сохранение недоступно');
    });

    // Тумблеры
    document.querySelectorAll('.editor-toggle-row .toggle input').forEach(input => {
        input.addEventListener('change', (e) => {
            console.log('[Demo] Тумблер:', e.target.checked ? 'вкл' : 'выкл');
        });
    });

    // Кнопка "Изменить обложку"
    document.querySelector('.btn-change-cover')?.addEventListener('click', () => {
        console.log('[Demo] Изменить обложку');
        alert('Демо-режим: изменение обложки недоступно');
    });

    // Ссылки "Все" — заглушки
    document.querySelectorAll('.link-all').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('[Demo] Переход "Все" — в разработке');
        });
    });
})();