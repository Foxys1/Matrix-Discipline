const STORAGE_KEY = 'will_architect_v1';

const state = {
    dopamine: 50, testosterone: 50, habits: [],
    isBreathing: false, breathInterval: null,
    audioFiles: [], currentTrack: -1,
    onboardingCompleted: false,
    chaosScore: 0,
    wisdomIndex: 0,
    startDate: null,
    lastMilestone: 0
};

function saveState() {
    const payload = {
        dopamine: state.dopamine,
        testosterone: state.testosterone,
        habits: state.habits,
        onboardingCompleted: state.onboardingCompleted,
        chaosScore: state.chaosScore,
        wisdomIndex: state.wisdomIndex,
        startDate: state.startDate,
        lastMilestone: state.lastMilestone,
        audioMeta: state.audioFiles.map(t => ({ name: t.name, path: t.path || '' }))
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const data = JSON.parse(raw);
        if (data.dopamine !== undefined) state.dopamine = data.dopamine;
        if (data.testosterone !== undefined) state.testosterone = data.testosterone;
        if (data.habits) state.habits = data.habits;
        if (data.onboardingCompleted) state.onboardingCompleted = data.onboardingCompleted;
        if (data.chaosScore !== undefined) state.chaosScore = data.chaosScore;
        if (data.wisdomIndex !== undefined) state.wisdomIndex = data.wisdomIndex;
        if (data.startDate) state.startDate = data.startDate;
        if (data.lastMilestone !== undefined) state.lastMilestone = data.lastMilestone;
        else state.lastMilestone = 0;
        return true;
    } catch (e) { return false; }
}

const onboardingData = [
    { q: "Во сколько ты ложишься спать?", ans: ["До 23:00", "После 02:00"], badIdx: 1 },
    { q: "Сколько часов в телефоне ежедневно?", ans: ["Меньше 2 часов", "Больше 4 часов"], badIdx: 1 },
    { q: "Есть ли зависимости? (курение, сахар)", ans: ["Нет, чист", "Да, зависим"], badIdx: 1 },
    { q: "Физическая активность?", ans: ["Регулярная", "Отсутствует"], badIdx: 1 }
];
let obIdx = 0;

function initOnboarding() {
    if (state.onboardingCompleted) {
        document.getElementById('onboarding').style.display = 'none';
        applyPostOnboarding();
        return;
    }
    obIdx = 0;
    renderQuestion();
}

function renderQuestion() {
    if (obIdx >= onboardingData.length) return finishOnboarding();
    const data = onboardingData[obIdx];
    document.getElementById('questionText').innerText = data.q;
    const container = document.getElementById('answersContainer');
    container.innerHTML = '';
    data.ans.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.className = 'ans-btn';
        btn.innerText = ans;
        btn.onclick = () => {
            if (i === data.badIdx) state.chaosScore += 25;
            obIdx++;
            updateObProgress();
            renderQuestion();
        };
        container.appendChild(btn);
    });
    updateObProgress();
}

function updateObProgress() {
    const pct = ((obIdx) / onboardingData.length) * 100;
    document.getElementById('obFill').style.width = pct + '%';
    document.getElementById('obCounter').innerText = `${Math.min(obIdx + 1, onboardingData.length)} / ${onboardingData.length}`;
}

function finishOnboarding() {
    document.getElementById('onboarding').style.opacity = 0;
    setTimeout(() => document.getElementById('onboarding').style.display = 'none', 600);
    state.dopamine = 50 - (state.chaosScore / 2);
    state.testosterone = 50 - (state.chaosScore / 2);
    state.onboardingCompleted = true;
    if (!state.startDate) state.startDate = Date.now();
    applyPostOnboarding();
    saveState();
}

function applyPostOnboarding() {
    if (state.habits.length === 0) {
        if (state.chaosScore >= 25) addHabit("Лечь спать до 23:00", true);
        if (state.chaosScore >= 50) addHabit("Дофаминовый детокс (телефон < 1 часа)", true);
        if (state.chaosScore >= 75) addHabit("Отказ от зависимостей (сахар/никотин)", true);
        addHabit("Холодный душ (3 мин)", true);
        addHabit("Тренировка (отказ от комфорта)", true);
        addHabit("Работа (глубокий фокус 90 мин)", true);
    }
    updateStats();
    renderHabits();
    renderDayCounter();
    checkMilestones();
}

// === БАЗА ЦИТАТ АРСЕНА МАРКАРЯНА ===
const wisdomDB = [
    { quote: "Вопрос о смысле жизни — это red flag. Вопрос о смысле жизни возникает только тогда, когда ты занимаешься чем-то, что ненавидишь.", fact: "Экзистенциальная пустота возникает при отсутствии дофаминовой стимуляции от деятельности." },
    { quote: "Смысл жизни — быть свидетелем реальности. Я существую, какой восторг!", fact: "Осознание собственного существования активирует префронтальную кору и снижает тревожность." },
    { quote: "В чём сила? В обращении внутрь себя. Чем больше я иду навстречу себе, тем приятнее как человек становлюсь.", fact: "Интроспекция увеличивает активность медиальной префронтальной коры, связанной с самоосознанием." },
    { quote: "Никогда нельзя терять волю к жизни. Это откуда, друг мой? Это Кеншин. Это Руруни Кеншин.", fact: "Воля к жизни коррелирует с уровнем серотонина и норадреналина в лимбической системе." },
    { quote: "Цели ставят долбоёбы. Самое тупое, что я слышал — «тебе нужно поставить себе цель». Если себе поставить цель, она чё, хотеться начнёт?", fact: "Внутренняя мотивация (autonomy) в 3 раза эффективнее внешней постановки целей." },
    { quote: "Это не жизнь, такую жизнь в рот ебать надо. Нахуй такую жизнь, в которой нет праздника.", fact: "Хронический стресс без радости приводит к истощению надпочечников и снижению кортизола." },
    { quote: "Скукожьте горизонт восприятия своей жизни до сегодняшнего дня. Я не знаю, что будет сегодня.", fact: "Майндфулнесс (осознанность в настоящем) снижает кортизол на 23% по данным исследований." },
    { quote: "Моё новаторское изобретение — не позволить себе гнить заживо. Несмотря ни на что — улучшать своё состояние.", fact: "Принцип кайдзен: ежедневное улучшение на 1% даёт 37-кратный рост за год." },
    { quote: "Умность — это способность решать задачи. Если ты умный — разберись, как быть счастливым.", fact: "Эмоциональный интеллект (EQ) предсказывает успех в 2 раза лучше, чем IQ." },
    { quote: "Когда я прочитал цитаты Ницше — я почувствовал себя менее одиноким, чем на ужине с родственниками.", fact: "Философская литература активирует те же нейронные сети, что и социальное взаимодействие." },
    { quote: "Я ненавижу, когда говорят «поставить цель». Человек абсолютно сломан, у него уничтожена дофаминовая система.", fact: "Дофаминовые рецепторы D2 восстанавливаются при отказе от дешёвой стимуляции за 2-3 месяца." },
    { quote: "Вот ты умираешь, и всё. Глаза закрыты, тебя не существует. Как можно считать жизнью то, где лучшие годы потрачены на хуйню?", fact: "Осознание смертности (memento mori) увеличивает ценность времени и продуктивность на 40%." },
    { quote: "Я люблю любое изменение трека болотной стабильности. Для меня, полного сил, без добавок не может ни пукнуть ни встать.", fact: "Новизна (novelty) стимулирует выброс дофамина и увеличивает нейропластичность." },
    { quote: "Любви в моей жизни нету, потому что я слишком много знаю. Чем более глупый человек, тем легче ему влюбиться.", fact: "Романтическая любь активирует те же участки мозга, что и кокаин — привыкание происходит быстро." },
    { quote: "Многие знания — многие печали. Но если ты умный — разберись, как быть счастливым.", fact: "Позитивная психология: фокус на сильных сторонах увеличивает жизненное удовлетворение на 30%." },
    { quote: "У очень многих людей объём психический маленький. Поэтому они неуверенные, зажатые. Аниме — вот где сила!", fact: "Нарративная транспортация (погружение в историю) увеличивает эмпатию и когнитивную гибкость." },
    { quote: "Ты не живёшь, ты ебалу какую-то страдаешь. Это не жизнь, это отыгрыш номера.", fact: "Пассивное потребление контента снижает активность префронтальной коры на 15-20%." },
    { quote: "Всё, в чём вы считаете, что я сильный — это мои самые слабые стороны. Если я говорю, что нельзя унывать — я самый большой нытик.", fact: "Принцип «теневой работы» Юнга: борьба со слабостями делает их источником силы." },
    { quote: "Жизнь очень жестокая, очень жёсткая. Внутренняя пустота — оправдание, чтобы ничего не делать и гнить заживо.", fact: "Экзистенциальный вакуум заполняется целями, которые выходят за рамки собственного эго." },
    { quote: "Когда нас родили, мы обнаружили, что есть приятные ощущения. И мы живём до тех пор, пока они есть.", fact: "Гедонистическая адаптация: люди возвращаются к базовому уровню счастья независимо от событий." },
    { quote: "Не зачем, а почему. Потому что нравится. Люди заканчивают жизнь самоубийством, когда у них исчезает «почему».", fact: "Логотерапия Виктора Франкла: смысл жизни — в «почему», а не в «зачем»." },
    { quote: "Я не знаю, кем я вижу себя через 5 лет. Пошёл нахуй, в чёрный список. Не надо разрушать мне моё приключение.", fact: "Фиксация на будущем снижает текущую субъективную благополучность на 25%." },
    { quote: "Если мне сейчас красивая леди напишет — приезжай в Стамбул, я поеду. Я не знаю, что будет сегодня.", fact: "Спонтанность и открытость опыту (Openness) коррелируют с креативностью и удовлетворённостью." },
    { quote: "На каких людей мы смотрим, на какие идеи мы смотрим — тем мы и становимся.", fact: "Зеркальные нейроны копируют поведение окружения: ты становишься средним из 5 ближайших людей." },
    { quote: "Мне никогда не нравилась классическая литература. Там силы нет. Я хочу быть сильным.", fact: "Сила воли (grit) предсказывает успех лучше, чем талант или IQ в 2 раза." },
    { quote: "Вопросом задаться, в чём смысл жизни, может только глубоко больной и несчастный человек.", fact: "Депрессия ассоциирована с гиперактивностью медиальной префронтальной коры — «центра смысла»." }
];

const audioElement = document.getElementById('arsenAudio');
const playBtn = document.getElementById('playBtn');
const photoImg = document.getElementById('masterPhotoImg');
const leftPanel = document.getElementById('leftPanel');
const photoWrap = document.getElementById('photoContainer');

function updateClock() {
    const el = document.getElementById('clock');
    if (el) el.innerText = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000); updateClock();

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const sp = document.getElementById('scrollProgress');
    if (sp) sp.style.width = scrolled + '%';
});

function renderDayCounter() {
    const el = document.getElementById('dayNumber');
    if (!state.startDate) {
        if (el) el.innerText = '0';
        return;
    }
    const days = Math.floor((Date.now() - state.startDate) / (1000*60*60*24)) + 1;
    if (el) el.innerText = days;
}

function checkMilestones() {
    if (!state.startDate) return;
    const days = Math.floor((Date.now() - state.startDate) / (1000*60*60*24)) + 1;
    const milestone = Math.floor((days - 1) / 7) * 7;
    if (milestone > 0 && milestone > state.lastMilestone) {
        state.lastMilestone = milestone;
        saveState();
        launchConfetti();
        showToast(`🎉 ${milestone} дней на пути! Ты не остановился.`);
    }
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colors = ['#D4AF37', '#c9a45c', '#e0853a', '#fff', '#8a6e2f', '#e8d5a3'];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.5) * 15 - 5,
            size: Math.random() * 6 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
            decay: Math.random() * 0.01 + 0.005
        });
    }
    let animId;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            if (p.life <= 0) return;
            alive = true;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3;
            p.vx *= 0.98;
            p.life -= p.decay;
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.rect(p.x, p.y, p.size, p.size);
            ctx.fill();
        });
        if (alive) {
            animId = requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animId);
        }
    }
    draw();
}

function showToast(msg) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 5500);
}

async function scanFolder() {
    try {
        const dirHandle = await window.showDirectoryPicker();
        state.audioFiles = [];
        let foundImage = false;

        async function scanDirectory(handle, path = '') {
            for await (const entry of handle.values()) {
                const entryPath = path ? `${path}/${entry.name}` : entry.name;
                if (entry.kind === 'directory') {
                    await scanDirectory(entry, entryPath);
                } else if (entry.kind === 'file') {
                    const file = await entry.getFile();
                    if (file.type.startsWith('audio/')) {
                        const fileURL = URL.createObjectURL(file);
                        const cleanName = file.name.replace(/\.[^/.]+$/, "");
                        state.audioFiles.push({ name: cleanName, src: fileURL, path: entryPath });
                    } else if (file.type.startsWith('image/') && !foundImage) {
                        photoImg.src = URL.createObjectURL(file);
                        photoImg.style.display = 'block';
                        foundImage = true;
                    }
                }
            }
        }

        await scanDirectory(dirHandle);
        state.audioFiles.sort((a, b) => {
            const aA = (a.path + a.name).toLowerCase().includes('arsen') || (a.path + a.name).toLowerCase().includes('арсен');
            const bA = (b.path + b.name).toLowerCase().includes('arsen') || (b.path + b.name).toLowerCase().includes('арсен');
            if (aA && !bA) return -1;
            if (!aA && bA) return 1;
            return 0;
        });

        if (state.audioFiles.length > 0) { state.currentTrack = 0; loadTrack(0); }
        else { document.getElementById('trackName').innerText = "Аудио не найдено"; }
        renderTrackList();
        saveState();
    } catch (e) {
        console.log(e);
    }
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => {
    leftPanel.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); }, false);
    document.body.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); }, false);
});
leftPanel.addEventListener('dragover', () => leftPanel.classList.add('drag-over'));
leftPanel.addEventListener('dragleave', () => leftPanel.classList.remove('drag-over'));
leftPanel.addEventListener('drop', handleDrop);

photoWrap.addEventListener('dragenter', (e) => { e.stopPropagation(); photoWrap.classList.add('drag-active'); });
photoWrap.addEventListener('dragleave', (e) => { e.stopPropagation(); photoWrap.classList.remove('drag-active'); });

async function handleDrop(e) {
    leftPanel.classList.remove('drag-over');
    photoWrap.classList.remove('drag-active');
    const items = e.dataTransfer.items;
    if (items && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            const entry = items[i].webkitGetAsEntry();
            if (entry) await processEntry(entry);
        }
    } else {
        const files = e.dataTransfer.files;
        for (let f of files) processFile(f);
    }
    if (state.currentTrack === -1 && state.audioFiles.length > 0) { state.currentTrack = 0; loadTrack(0); }
    renderTrackList();
}

async function processEntry(entry, path = '') {
    if (entry.isDirectory) {
        const reader = entry.createReader();
        const entries = await new Promise(r => reader.readEntries(r));
        for (const e of entries) await processEntry(e, path ? `${path}/${entry.name}` : entry.name);
    } else {
        const file = await new Promise(r => entry.file(r));
        processFile(file, path);
    }
}

function processFile(file, path = '') {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith('audio/')) {
        state.audioFiles.push({ name: file.name.replace(/\.[^/.]+$/, ""), src: url, path });
    } else if (file.type.startsWith('image/')) {
        photoImg.src = url; photoImg.style.display = 'block';
    }
}

function renderTrackList() {
    const c = document.getElementById('trackListContainer');
    c.innerHTML = '';
    state.audioFiles.forEach((t, i) => {
        const div = document.createElement('div');
        div.className = 'track-item' + (i === state.currentTrack ? ' active' : '');
        div.innerText = `${i + 1}. ${t.name}`;
        div.onclick = () => { state.currentTrack = i; loadTrack(i); if (audioElement.paused) toggleAudio(); };
        c.appendChild(div);
    });
}

function loadTrack(index) {
    if (!state.audioFiles[index]) return;
    state.currentTrack = index;
    audioElement.src = state.audioFiles[index].src;
    document.getElementById('trackName').innerText = state.audioFiles[index].name;
    document.getElementById('trackName').style.color = "var(--text)";
    renderTrackList();
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('trackTime').innerText = '0:00 / 0:00';
}

function loadWisdom() {
    const data = wisdomDB[state.wisdomIndex % wisdomDB.length];
    document.getElementById('arsenQuote').innerText = `"${data.quote}"`;
    document.getElementById('scienceFact').innerText = data.fact;
    state.wisdomIndex++;
    saveState();
}

function toggleAudio() {
    if (state.audioFiles.length === 0) {
        document.getElementById('trackName').innerText = "Перетащи или сканируй папку";
        return;
    }
    if (audioElement.paused) {
        audioElement.play().catch(()=>{});
        playBtn.innerText = '⏸';
    } else {
        audioElement.pause();
        playBtn.innerText = '▶';
    }
}

function changeTrack(dir) {
    if (state.audioFiles.length === 0) return;
    state.currentTrack = (state.currentTrack + dir + state.audioFiles.length) % state.audioFiles.length;
    loadTrack(state.currentTrack);
    if (playBtn.innerText === '⏸') audioElement.play().catch(()=>{});
}

function seekAudio(e) {
    if (!audioElement.duration) return;
    const bar = document.getElementById('progressBar');
    const rect = bar.getBoundingClientRect();
    audioElement.currentTime = ((e.clientX - rect.left) / rect.width) * audioElement.duration;
}

function formatTime(s) {
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

let uiAudioCtx;
function playUiSound(type) {
    if (!uiAudioCtx) uiAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (type === 'success') {
        const o1 = uiAudioCtx.createOscillator(), o2 = uiAudioCtx.createOscillator(), g = uiAudioCtx.createGain();
        o1.type = 'sine'; o1.frequency.value = 523.25;
        o2.type = 'sine'; o2.frequency.value = 659.25;
        o1.connect(g); o2.connect(g); g.connect(uiAudioCtx.destination);
        g.gain.setValueAtTime(0.1, uiAudioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, uiAudioCtx.currentTime + 0.4);
        o1.start(); o2.start(); o1.stop(uiAudioCtx.currentTime + 0.4); o2.stop(uiAudioCtx.currentTime + 0.4);
    } else if (type === 'shock') {
        const o = uiAudioCtx.createOscillator(), g = uiAudioCtx.createGain();
        o.type = 'sawtooth'; o.frequency.setValueAtTime(180, uiAudioCtx.currentTime);
        o.frequency.exponentialRampToValueAtTime(40, uiAudioCtx.currentTime + 0.35);
        o.connect(g); g.connect(uiAudioCtx.destination);
        g.gain.setValueAtTime(0.2, uiAudioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, uiAudioCtx.currentTime + 0.4);
        o.start(); o.stop(uiAudioCtx.currentTime + 0.4);
    }
}

function addHabit(text, silent = false) {
    const txt = text || document.getElementById('taskInput').value;
    if (!txt.trim()) return;
    state.habits.push({ text: txt, done: false, streak: 0 });
    document.getElementById('taskInput').value = '';
    renderHabits();
    if (!silent) { playUiSound('success'); saveState(); }
}

function handleKeyPress(e) { if (e.key === 'Enter') addHabit(); }

function renderHabits() {
    const list = document.getElementById('habitList');
    list.innerHTML = '';
    state.habits.forEach((h, i) => {
        const li = document.createElement('li');
        li.className = 'habit-item' + (h.done ? ' done' : '');
        li.innerHTML = `
            <div class="habit-info">
                <span class="habit-name">${h.text}</span>
                <span class="habit-meta">Серия: <span class="streak">${h.streak}🔥</span></span>
            </div>
            <div class="habit-actions">
                <button class="btn-done" onclick="toggleHabit(${i})">${h.done ? '✓ Выполнено' : 'Выполнить'}</button>
                <button class="btn-del" onclick="deleteHabit(${i})">Удалить</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function toggleHabit(i) {
    if (!state.habits[i].done) {
        state.habits[i].done = true; state.habits[i].streak++;
        state.dopamine += 20; state.testosterone += 10;
        playUiSound('success');
    } else {
        state.habits[i].done = false; state.habits[i].streak = Math.max(0, state.habits[i].streak - 1);
        state.dopamine -= 15; state.testosterone -= 10;
    }
    renderHabits(); updateStats(); saveState();
}

function deleteHabit(i) {
    if (!state.habits[i].done) { state.dopamine -= 10; state.testosterone -= 5; }
    state.habits.splice(i, 1);
    renderHabits(); updateStats(); saveState();
}

function updateStats() {
    state.dopamine = Math.max(0, Math.min(100, state.dopamine));
    state.testosterone = Math.max(0, Math.min(100, state.testosterone));
    document.getElementById('dopamineBar').style.width = state.dopamine + '%';
    document.getElementById('testBar').style.width = state.testosterone + '%';
    document.getElementById('dopamineVal').innerText = state.dopamine + '%';
    document.getElementById('testVal').innerText = state.testosterone + '%';

    let rank = 'Хаос', progress = Math.max(5, state.dopamine);
    if (state.dopamine >= 80) { rank = 'Правитель Судьбы'; progress = 100; }
    else if (state.dopamine >= 60) { rank = 'Архитектор Воли'; progress = 75; }
    else if (state.dopamine >= 40) { rank = 'Воин'; progress = 50; }
    else if (state.dopamine >= 20) { rank = 'Выживающий'; progress = 25; }

    document.getElementById('rankDisplay').innerText = rank;
    document.getElementById('rankProgress').style.width = progress + '%';
}

function toggleBreathing() {
    const btn = document.getElementById('breathBtn');
    if (state.isBreathing) {
        clearInterval(state.breathInterval); state.isBreathing = false;
        btn.innerText = 'Старт 4-7-8';
        document.getElementById('breathText').innerText = 'Готов';
        document.getElementById('breathTimer').innerText = '';
        document.getElementById('breathCore').className = 'breath-circle';
    } else {
        state.isBreathing = true; btn.innerText = 'Стоп';
        let phase = 0, timer = 0;
        const update = () => {
            if (!state.isBreathing) return;
            const core = document.getElementById('breathCore');
            const text = document.getElementById('breathText');
            const timeEl = document.getElementById('breathTimer');
            if (phase === 0) { text.innerText = 'Вдох'; core.className = 'breath-circle inhale'; if (timer >= 4) { phase = 1; timer = 0; } }
            else if (phase === 1) { text.innerText = 'Задержка'; core.className = 'breath-circle hold'; if (timer >= 7) { phase = 2; timer = 0; } }
            else { text.innerText = 'Выдох'; core.className = 'breath-circle exhale'; if (timer >= 8) { phase = 0; timer = 0; } }
            timeEl.innerText = timer; timer++;
        };
        update();
        state.breathInterval = setInterval(update, 1000);
    }
}

function activateShock() {
    playUiSound('shock');
    document.body.classList.add('shock-flash');
    setTimeout(() => document.body.classList.remove('shock-flash'), 500);
    state.dopamine += 15; state.testosterone += 10;
    updateStats(); saveState();
    const flash = document.createElement('div');
    flash.style.cssText = `position:fixed;inset:0;background:radial-gradient(circle,rgba(220,38,38,0.2),transparent);z-index:9999;pointer-events:none;animation:flashAnim 0.5s ease-out;`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
}

function initApp() {
    const hadState = loadState();
    initOnboarding();
    if (hadState && state.onboardingCompleted) {
        loadWisdom();
        renderDayCounter();
        checkMilestones();
    } else {
        loadWisdom();
    }
    audioElement.volume = 0.8;
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
        audioElement.volume = e.target.value;
        document.getElementById('volValue').innerText = Math.round(e.target.value * 100) + '%';
    });
    audioElement.addEventListener('loadedmetadata', () => {
        if (audioElement.duration) document.getElementById('trackTime').innerText = `0:00 / ${formatTime(audioElement.duration)}`;
    });
    audioElement.addEventListener('timeupdate', () => {
        if (audioElement.duration) {
            document.getElementById('progressFill').style.width = ((audioElement.currentTime / audioElement.duration) * 100) + '%';
            document.getElementById('trackTime').innerText = `${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
        }
    });
    audioElement.addEventListener('ended', () => {
        if (state.audioFiles.length > 0) {
            state.currentTrack = (state.currentTrack + 1) % state.audioFiles.length;
            loadTrack(state.currentTrack); audioElement.play().catch(()=>{});
        } else { playBtn.innerText = '▶'; }
    });
}

initApp();