window.DEMO_USER = {
    id: 'demo-user',
    username: 'Иван Иванов',
    email: 'ivan@ivan.ru'
};

window.DEMO_CHANNEL = {
    id: 'demo-channel',
    name: 'Aster Studio',
    subscribers: '999 млн',
    views: '999 млн',
    videosCount: '999 млн',
    description: 'просто тест'
};

window.DEMO_VIDEOS = [
    {
        id: 'v1', title: 'Тестовое видео Aster — демо', channel: 'Aster Studio',
        views: '84 тыс. просмотров', ago: '2 дня назад', duration: '0:10', progress: 29
    },
    {
        id: 'v2', title: '100 Дней Выживания в АДСКОМ ХАРДКОРЕ | Minecraft', channel: 'Кинокомната',
        views: '212 тыс. просмотров', ago: '5 дней назад', duration: '0:10', progress: 0
    },
    {
        id: 'v3', title: 'STARCRAFT Русский трейлер', channel: 'Кадр за кадром',
        views: '47 тыс. просмотров', ago: '1 неделю назад', duration: '0:10', progress: 45
    },
    {
        id: 'v4', title: 'Hammer of Justice - Deltarune Gerson Fight Animation', channel: 'Звук и смысл',
        views: '31 тыс. просмотров', ago: '3 дня назад', duration: '0:10', progress: 0
    },
    {
        id: 'v5', title: 'Трейлер версии 7.1', channel: 'Волны',
        views: '9,4 тыс. просмотров', ago: '6 часов назад', duration: '0:10', progress: 71
    },
    {
        id: 'v6', title: 'Undertale | Finale (Remix)', channel: 'Алексей Пиксель',
        views: '156 тыс. просмотров', ago: 'вчера', duration: '0:10', progress: 0
    },
    {
        id: 'v7', title: '100 Дней Выживания | Minecraft (2 часть)', channel: 'Кинокомната',
        views: '23 тыс. просмотров', ago: '4 дня назад', duration: '0:10', progress: 56
    },
    {
        id: 'v8', title: 'Нейроморфные чипы и мемристоры — как работает ИИ', channel: 'Формат',
        views: '98 тыс. просмотров', ago: '2 недели назад', duration: '0:10', progress: 40
    }
];

window.DEMO_CATEGORIES = [
    'Все', 'Новое', 'Музыка', 'Игры', 'Обучение', 'Подкасты',
    'Прямые эфиры', 'Новости', 'Спорт', 'Технологии', 'Кино', 'Наука'
];

console.log('[Demo] Загружены демо-данные:', {
    user: window.DEMO_USER.username,
    videos: window.DEMO_VIDEOS.length,
    categories: window.DEMO_CATEGORIES.length
});