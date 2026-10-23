(function () {
    const videoId = getParam('v') || 'v1';
    const video = window.DEMO_VIDEOS.find(v => v.id === videoId) || window.DEMO_VIDEOS[0];

    console.log('[Demo] Просмотр видео:', video.title);

    const videoEl = $('mainVideo');
    const titleEl = $('videoTitle');

    if (videoEl) {
        videoEl.src = 'test.mp4';
        videoEl.load();
    }
    if (titleEl) titleEl.textContent = video.title;

    document.title = `${video.title} — Aster`;
})();