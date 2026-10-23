// ЗВЁЗДНОЕ НЕБО (два canvas)
function createStarField(canvas) {
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const panel = canvas.parentElement;
    let stars = [];

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = panel.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        createStars(rect.width, rect.height);
    }

    function createStars(w, h) {
        stars = [];
        const count = Math.min(150, Math.floor((w * h) / 6000));

        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.3 + 0.3,
                alpha: Math.random() * 0.6 + 0.3,
                twinkle: (Math.random() - 0.5) * 0.015,
                vx: (Math.random() - 0.5) * 0.12,
                vy: (Math.random() - 0.5) * 0.12
            });
        }
    }

    function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);

        stars.forEach(s => {
            s.alpha += s.twinkle;
            if (s.alpha <= 0.15 || s.alpha >= 0.95) s.twinkle *= -1;

            s.x += s.vx;
            s.y += s.vy;
            if (s.x < 0) s.x = w;
            if (s.x > w) s.x = 0;
            if (s.y < 0) s.y = h;
            if (s.y > h) s.y = 0;

            if (s.r > 1) {
                const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
                grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha * 0.35})`);
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    return { resize };
}

// Инициализация обоих полей
function initStars() {
    createStarField(document.getElementById('starsLeft'));
    createStarField(document.getElementById('starsRight'));
}