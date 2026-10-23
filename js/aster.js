const TEST_VIDEO = 'test.mp4';
const PREVIEW_AT_SECOND = 3;

let previewDataUrl = null;

function generatePreview(videoSrc, atSecond = PREVIEW_AT_SECOND) {
    return new Promise((resolve) => {
        if (previewDataUrl) { resolve(previewDataUrl); return; }

        const v = document.createElement('video');
        v.src = videoSrc;
        v.muted = true;
        v.playsInline = true;
        v.preload = 'metadata';

        const timeout = setTimeout(() => {
            console.warn('[Demo] Preview timeout');
            resolve(null);
        }, 15000);

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
            } catch (e) {
                clearTimeout(timeout);
                resolve(null);
            }
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

function renderVideoCard(v) {
    const card = document.createElement('a');
    card.href = `watch.html?v=${v.id}`;
    card.className = 'video-card';

    const initial = (v.channel || 'A').trim()[0].toUpperCase();
    const progressBar = v.progress > 0
        ? `<div class="video-progress"><span style="width:${v.progress}%"></span></div>`
        : '';

    card.innerHTML = `
        <div class="video-thumb">
            <span class="video-duration">${v.duration}</span>
            ${progressBar}
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

function renderVideoGrid() {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;
    grid.innerHTML = '';
    window.DEMO_VIDEOS.forEach(v => grid.appendChild(renderVideoCard(v)));
}

function renderSidebarUser() {
    const user = window.DEMO_USER;
    const nameEl = document.getElementById('sidebarUserName');
    const emailEl = document.getElementById('sidebarUserEmail');
    const avatarEl = document.getElementById('sidebarUserAvatar');

    if (nameEl) nameEl.textContent = user.username;
    if (emailEl) emailEl.textContent = user.email;
    if (avatarEl) avatarEl.textContent = user.username[0];
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('[Demo] Aster главная: загрузка');
    renderSidebarUser();
    renderVideoGrid();
    const preview = await generatePreview(TEST_VIDEO, PREVIEW_AT_SECOND);
    applyPreview(preview);
});