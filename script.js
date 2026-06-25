const STORAGE_KEY = 'will_architect_v1';

const state = {
    dopamine: 50, testosterone: 50, habits: [],
    isBreathing: false, breathInterval: null,
    audioFiles: [], currentTrack: -1,
    onboardingCompleted: false,
    chaosScore: 0,
    wisdomIndex: 0,
    startDate: null,
    lastMilestone: 0,
    lang: 'ru'
};

const i18n = {
    ru: { dopamine: "Дофамин", testosterone: "Тестостерон", master_core: "Мастер / Ядро", app_title: "Матрица Дисциплины", app_subtitle: "Управление биологическим скафандром", logo_title: "Архитектура Воли", drop_hint: "Перетащи фото или аудио сюда", next_protocol: "Следующий протокол", voice_of_will: "Голос Воли", no_data: "Нет данных", volume: "Громкость", scan_folder: "Сканировать папку", day_in_matrix: "День в Матрице", current_status: "Текущий статус", protocols: "Протоколы", add: "Добавить", parasympathetic: "Парасимпатика", ready: "Готов", start_478: "Старт 4-7-8", stop: "Стоп", rank_chaos: "Хаос", rank_survivor: "Выживающий", rank_warrior: "Воин", rank_architect: "Архитектор Воли", rank_ruler: "Правитель Судьбы", task_ph: "Добавить новый протокол...", do: "Выполнить", done_btn: "Выполнено", delete: "Удалить", streak: "Серия", ob1q: "Во сколько ты ложишься спать?", ob1a1: "До 23:00", ob1a2: "После 02:00", ob2q: "Сколько часов в телефоне ежедневно?", ob2a1: "Меньше 2 часов", ob2a2: "Больше 4 часов", ob3q: "Есть ли зависимости? (курение, сахар)", ob3a1: "Нет, чист", ob3a2: "Да, зависим", ob4q: "Физическая активность?", ob4a1: "Регулярная", ob4a2: "Отсутствует", inhale: "Вдох", hold: "Задержка", exhale: "Выдох", h1: "Лечь спать до 23:00", h2: "Дофаминовый детокс (телефон < 1 часа)", h3: "Отказ от зависимостей (сахар/никотин)", h4: "Холодный душ (3 мин)", h5: "Тренировка (отказ от комфорта)", h6: "Работа (глубокий фокус 90 мин)", drag_scan: "Перетащи или сканируй папку", no_audio: "Аудио не найдено" },
    en: { dopamine: "Dopamine", testosterone: "Testosterone", master_core: "Master / Core", app_title: "Discipline Matrix", app_subtitle: "Biological suit management", logo_title: "Architecture of Will", drop_hint: "Drag photo or audio here", next_protocol: "Next protocol", voice_of_will: "Voice of Will", no_data: "No data", volume: "Volume", scan_folder: "Scan folder", day_in_matrix: "Day in the Matrix", current_status: "Current status", protocols: "Protocols", add: "Add", parasympathetic: "Parasympathetic", ready: "Ready", start_478: "Start 4-7-8", stop: "Stop", rank_chaos: "Chaos", rank_survivor: "Survivor", rank_warrior: "Warrior", rank_architect: "Architect of Will", rank_ruler: "Ruler of Destiny", task_ph: "Add new protocol...", do: "Do", done_btn: "Done", delete: "Delete", streak: "Streak", ob1q: "What time do you go to sleep?", ob1a1: "Before 23:00", ob1a2: "After 02:00", ob2q: "How many hours on the phone daily?", ob2a1: "Less than 2 hours", ob2a2: "More than 4 hours", ob3q: "Any addictions? (smoking, sugar)", ob3a1: "No, clean", ob3a2: "Yes, addicted", ob4q: "Physical activity?", ob4a1: "Regular", ob4a2: "None", inhale: "Inhale", hold: "Hold", exhale: "Exhale", h1: "Sleep before 23:00", h2: "Dopamine detox (phone < 1 hour)", h3: "Quit addictions (sugar/nicotine)", h4: "Cold shower (3 min)", h5: "Training (rejecting comfort)", h6: "Work (deep focus 90 min)", drag_scan: "Drag or scan folder", no_audio: "Audio not found" },
    ja: { dopamine: "ドーパミン", testosterone: "テストステロン", master_core: "マスター / コア", app_title: "規律のマトリックス", app_subtitle: "生物学的スーツの管理", logo_title: "意志のアーキテクチャ", drop_hint: "写真やオーディオをここにドラッグ", next_protocol: "次のプロトコル", voice_of_will: "意志の声", no_data: "データなし", volume: "音量", scan_folder: "フォルダをスキャン", day_in_matrix: "マトリックスでの日", current_status: "現在のステータス", protocols: "プロトコル", add: "追加", parasympathetic: "副交感神経", ready: "準備完了", start_478: "開始 4-7-8", stop: "停止", rank_chaos: "カオス", rank_survivor: "生存者", rank_warrior: "戦士", rank_architect: "意志の建築家", rank_ruler: "運命の支配者", task_ph: "新しいプロトコルを追加...", do: "実行", done_btn: "完了", delete: "削除", streak: "連続", ob1q: "何時に寝ますか？", ob1a1: "23:00まで", ob1a2: "02:00以降", ob2q: "毎日スマホの時間は？", ob2a1: "2時間未満", ob2a2: "4時間以上", ob3q: "依存症はありますか？（喫煙、砂糖）", ob3a1: "いいえ、クリーン", ob3a2: "はい、依存しています", ob4q: "身体活動は？", ob4a1: "定期的", ob4a2: "なし", inhale: "吸気", hold: "停止", exhale: "呼気", h1: "23:00までに寝る", h2: "ドーパミンデトックス（スマホ<1時間）", h3: "依存症をやめる（砂糖/ニコチン）", h4: "冷水シャワー（3分）", h5: "トレーニング（快適さの拒否）", h6: "仕事（深い集中90分）", drag_scan: "ドラッグまたはフォルダをスキャン", no_audio: "オーディオが見つかりません" },
    zh: { dopamine: "多巴胺", testosterone: "睾酮", master_core: "大师 / 核心", app_title: "纪律矩阵", app_subtitle: "生物机体管理", logo_title: "意志架构", drop_hint: "将照片或音频拖到此处", next_protocol: "下一个协议", voice_of_will: "意志之声", no_data: "无数据", volume: "音量", scan_folder: "扫描文件夹", day_in_matrix: "矩阵中的天数", current_status: "当前状态", protocols: "协议", add: "添加", parasympathetic: "副交感神经", ready: "准备就绪", start_478: "开始 4-7-8", stop: "停止", rank_chaos: "混沌", rank_survivor: "幸存者", rank_warrior: "战士", rank_architect: "意志架构师", rank_ruler: "命运统治者", task_ph: "添加新协议...", do: "执行", done_btn: "完成", delete: "删除", streak: "连胜", ob1q: "你几点睡觉？", ob1a1: "23:00之前", ob1a2: "02:00之后", ob2q: "每天用手机几小时？", ob2a1: "少于2小时", ob2a2: "超过4小时", ob3q: "有上瘾吗？（吸烟、糖）", ob3a1: "没有，干净", ob3a2: "是的，上瘾", ob4q: "体力活动？", ob4a1: "定期", ob4a2: "无", inhale: "吸气", hold: "屏息", exhale: "呼气", h1: "23:00前睡觉", h2: "多巴胺排毒（手机<1小时）", h3: "戒除成瘾（糖/尼古丁）", h4: "冷水淋浴（3分钟）", h5: "训练（拒绝舒适）", h6: "工作（深度专注90分钟）", drag_scan: "拖动或扫描文件夹", no_audio: "未找到音频" },
    uz: { dopamine: "Dopamin", testosterone: "Testosteron", master_core: "Usta / Yadro", app_title: "Intizom Matritsasi", app_subtitle: "Biologik kostyum boshqaruvi", logo_title: "Iroda Arxitekturasi", drop_hint: "Rasm yoki audioni shu yerga tashlang", next_protocol: "Keyingi protokol", voice_of_will: "Iroda ovozi", no_data: "Ma'lumot yo'q", volume: "Ovoz", scan_folder: "Papkani skanerlash", day_in_matrix: "Matritsadagi kun", current_status: "Joriy holat", protocols: "Protokollar", add: "Qo'shish", parasympathetic: "Parasimpatik", ready: "Tayyor", start_478: "Boshlash 4-7-8", stop: "To'xtash", rank_chaos: "Xaos", rank_survivor: "Omon qoluvchi", rank_warrior: "Jangchi", rank_architect: "Iroda Arxitektori", rank_ruler: "Taqdir Hukmdori", task_ph: "Yangi protokol qo'shish...", do: "Bajarish", done_btn: "Bajarildi", delete: "O'chirish", streak: "Ketma-ketlik", ob1q: "Soat nechada uxlaysiz?", ob1a1: "23:00 gacha", ob1a2: "02:00 dan keyin", ob2q: "Kuniga telefonda necha soat?", ob2a1: "2 soatdan kam", ob2a2: "4 soatdan ko'p", ob3q: "Qaramlik bormi? (chekish, shakar)", ob3a1: "Yo'q, toza", ob3a2: "Ha, qaram", ob4q: "Jismoniy faollik?", ob4a1: "Muntazam", ob4a2: "Yo'q", inhale: "Nafas olish", hold: "Us hold", exhale: "Nafas chiqarish", h1: "23:00 gacha uxla", h2: "Dopamin detoks (telefon < 1 soat)", h3: "Qaramlikni tashlash (shakar/nikotin)", h4: "Sovuq dush (3 daqiqa)", h5: "Mashq (qulaylikni rad etish)", h6: "Ish (chuqur fokus 90 daqiqa)", drag_scan: "Tashlang yoki papkani skanerlang", no_audio: "Audio topilmadi" },
    ro: { dopamine: "Dopamină", testosterone: "Testosteron", master_core: "Maestru / Nucleu", app_title: "Matricea Disciplinei", app_subtitle: "Managementul costumului biologic", logo_title: "Arhitectura Voinței", drop_hint: "Trage foto sau audio aici", next_protocol: "Protocolul următor", voice_of_will: "Voinea Voinței", no_data: "Fără date", volume: "Volum", scan_folder: "Scanare folder", day_in_matrix: "Ziua în Matrice", current_status: "Status curent", protocols: "Protocoale", add: "Adaugă", parasympathetic: "Parasimpatic", ready: "Gata", start_478: "Start 4-7-8", stop: "Stop", rank_chaos: "Haos", rank_survivor: "Supraviețuitor", rank_warrior: "Războinic", rank_architect: "Arhitectul Voinței", rank_ruler: "Stăpânul Destinului", task_ph: "Adaugă protocol nou...", do: "Efectuează", done_btn: "Efectuat", delete: "Șterge", streak: "Serie", ob1q: "La ce oră te culci?", ob1a1: "Înainte de 23:00", ob1a2: "După 02:00", ob2q: "Câte ore pe telefon zilnic?", ob2a1: "Mai puțin de 2 ore", ob2a2: "Mai mult de 4 ore", ob3q: "Ai dependențe? (fumat, zahăr)", ob3a1: "Nu, curat", ob3a2: "Da, dependent", ob4q: "Activitate fizică?", ob4a1: "Regulată", ob4a2: "Lipsă", inhale: "Inspiră", hold: "Reține", exhale: "Expiră", h1: "Culcă-te înainte de 23:00", h2: "Detox dopaminică (telefon < 1 oră)", h3: "Renunță la dependențe (zahăr/nicotină)", h4: "Duș rece (3 min)", h5: "Antrenament (respingerea confortului)", h6: "Muncă (concentrare profundă 90 min)", drag_scan: "Trage sau scanează folderul", no_audio: "Audio negăsit" }
};

const wisdomDB = {
    ru: [
        { quote: "Вопрос о смысле жизни — это red flag. Вопрос о смысле жизни возникает только тогда, когда ты занимаешься чем-то, что ненавидишь.", fact: "Экзистенциальная пустота возникает при отсутствии дофаминовой стимуляции от деятельности." },
        { quote: "Смысл жизни — быть свидетелем реальности. Я существую, какой восторг!", fact: "Осознание собственного существования активирует префронтальную кору и снижает тревожность." },
        { quote: "В чём сила? В обращении внутрь себя. Чем больше я иду навстречу себе, тем приятнее как человек становлюсь.", fact: "Интроспекция увеличивает активность медиальной префронтальной коры, связанной с самоосознанием." },
        { quote: "Никогда нельзя терять волю к жизни. Это откуда, друг мой? Это Кеншин. Это Руруни Кеншин.", fact: "Воля к жизни коррелирует с уровнем серотонина и норадреналина в лимбической системе." },
        { quote: "Цели ставят долбоёбы. Если себе поставить цель, она чё, хотеться начнёт?", fact: "Внутренняя мотивация (autonomy) в 3 раза эффективнее внешней постановки целей." },
        { quote: "Это не жизнь, такую жизнь в рот ебать надо. Нахуй такую жизнь, в которой нет праздника.", fact: "Хронический стресс без радости приводит к истощению надпочечников и снижению кортизола." },
        { quote: "Скукожьте горизонт восприятия своей жизни до сегодняшнего дня. Я не знаю, что будет сегодня.", fact: "Майндфулнесс (осознанность в настоящем) снижает кортизол на 23% по данным исследований." },
        { quote: "Моё новаторское изобретение — не позволить себе гнить заживо. Несмотря ни на что — улучшать своё состояние.", fact: "Принцип кайдзен: ежедневное улучшение на 1% даёт 37-кратный рост за год." },
        { quote: "Умность — это способность решать задачи. Если ты умный — разберись, как быть счастливым.", fact: "Эмоциональный интеллект (EQ) предсказывает успех в 2 раза лучше, чем IQ." },
        { quote: "Вот ты умираешь, и всё. Как можно считать жизнью то, где лучшие годы потрачены на хуйню?", fact: "Осознание смертности (memento mori) увеличивает ценность времени и продуктивность на 40%." }
    ],
    en: [
        { quote: "The question of the meaning of life is a red flag. It only arises when you are doing something you hate.", fact: "Existential emptiness occurs due to a lack of dopamine stimulation from activity." },
        { quote: "The meaning of life is to be a witness to reality. I exist, what a thrill!", fact: "Awareness of one's own existence activates the prefrontal cortex and reduces anxiety." },
        { quote: "Where is the strength? In turning inward. The more I face myself, the more pleasant I become as a person.", fact: "Introspection increases the activity of the medial prefrontal cortex associated with self-awareness." },
        { quote: "Never lose the will to live. Where does it come from, my friend? It's Kenshin. Rurouni Kenshin.", fact: "The will to live correlates with serotonin and norepinephrine levels in the limbic system." },
        { quote: "Idiots set goals. If you set a goal for yourself, will it magically make you want it?", fact: "Intrinsic motivation (autonomy) is 3 times more effective than external goal setting." },
        { quote: "This is not a life, fuck such a life. Fuck a life where there is no celebration.", fact: "Chronic stress without joy leads to adrenal exhaustion and decreased cortisol." },
        { quote: "Shrink the horizon of your life's perception to today. I don't know what will happen today.", fact: "Mindfulness reduces cortisol by 23% according to research." },
        { quote: "My innovative invention is not allowing yourself to rot alive. Despite everything, improve your condition.", fact: "The Kaizen principle: a 1% daily improvement gives a 37-fold growth in a year." },
        { quote: "Smartness is the ability to solve problems. If you're smart, figure out how to be happy.", fact: "Emotional intelligence (EQ) predicts success twice as well as IQ." },
        { quote: "You die, and that's it. How can you call life a thing where the best years are spent on bullshit?", fact: "Awareness of death (memento mori) increases the value of time and productivity by 40%." }
    ],
    ja: [
        { quote: "人生の意味についての問いはレッドフラグです。それは嫌いなことをしている時にだけ生じます。", fact: "実存的空虚は、活動によるドーパミン刺激の欠如から生じます。" },
        { quote: "人生の意味は現実の証人になることです。私は存在する、なんてスリルだ！", fact: "自己の存在の認識は前頭前皮質を活性化し、不安を軽減します。" },
        { quote: "強さとは何か？内なる自分に向き合うことです。自分と向き合えば向き合うほど、人として魅力的になります。", fact: "内省は、自己認識に関連する内側前頭前皮質の活動を高めます。" },
        { quote: "生きる意志を決して失ってはならない。それはどこから来るのか、私の友よ？剣心だ。るろうに剣心だ。", fact: "生きる意志は、大脳辺縁系のセロトニンとノルアドレナリンのレベルと相関しています。" },
        { quote: "目標を立てるのはバカだ。自分に目標を課せば、それが魔法のようにやりたくなるのか？", fact: "内発的動機づけ（自律性）は、外的な目標設定の3倍効果的です。" },
        { quote: "これは人生ではない、そんな人生はクソくらえだ。祝いのない人生なんてクソだ。", fact: "喜びのない慢性ストレスは、副腎の疲労とコルチゾールの低下を招きます。" },
        { quote: "人生の知覚の地平を今日まで縮めろ。今日何が起こるかはわからない。", fact: "マインドフルネスは研究によるとコルチゾールを23%低下させます。" },
        { quote: "私の画期的な発明は、生きたまま腐ることを許さないことだ。何があろうと、自分の状態を改善する。", fact: "改善の原則：毎日1%の改善は、1年で37倍の成長をもたらします。" },
        { quote: "賢さとは問題を解決する能力だ。賢いなら、幸せになる方法を理解しろ。", fact: "感情知性（EQ）は、IQの2倍の成功を予測します。" },
        { quote: "お前は死ぬ、それだけだ。最良の年をくだらないことに費やしたものを人生と呼べるか？", fact: "死の認識は、時間の価値と生産性を40%高めます。" }
    ],
    zh: [
        { quote: "关于生命意义的问题是一个危险信号。它只在你做自己讨厌的事情时出现。", fact: "存在主义空虚是由于活动中缺乏多巴胺刺激而产生的。" },
        { quote: "生命的意义是成为现实的见证者。我存在，多么令人振奋！", fact: "对自身存在的意识会激活前额叶皮层并减少焦虑。" },
        { quote: "力量在哪里？在于向内探索。我越是面对自己，作为一个个体就变得越愉悦。", fact: "内省会增加与自我意识相关的内侧前额叶皮层的活动。" },
        { quote: "永远不要失去活下去的意志。它从何而来，我的朋友？是剑心。浪客剑心。", fact: "生存意志与边缘系统中的血清素和去甲肾上腺素水平相关。" },
        { quote: "白痴才设定目标。如果你为自己设定一个目标，它就会奇迹般地让你想要它吗？", fact: "内在动机（自主性）的效果是外部目标设定的3倍。" },
        { quote: "这不是生活，去他妈的这种生活。去他妈的没有庆祝的生活。", fact: "没有快乐的慢性压力会导致肾上腺衰竭和皮质醇降低。" },
        { quote: "把你对生活感知的地平线缩小到今天。我不知道今天会发生什么。", fact: "正念根据研究能使皮质醇降低23%。" },
        { quote: "我的创新发明是不让自己活着腐烂。尽管一切，改善你的状态。", fact: "改善原则：每天1%的改善在一年内带来37倍的增长。" },
        { quote: "聪明是解决问题的能力。如果你聪明，就想清楚如何快乐。", fact: "情绪智力（EQ）预测成功的能力是IQ的两倍。" },
        { quote: "你死了，就这样。你怎么能把最好的年华浪费在废话上的东西称为生活？", fact: "对死亡的认识能使时间的价值和生产力提高40%。" }
    ],
    uz: [
        { quote: "Hayot ma'nosi haqidagi savol - qizil bayroq. U faqat siz nafratlanadigan narsani qilganda paydo bo'ladi.", fact: "Egzistensial bo'shliq faoliyatdan dopamin stimulyatsiyasining yetishmasligidan kelib chiqadi." },
        { quote: "Hayotning ma'nosi - haqiqat guvohi bo'lishdir. Men mavjudman, qanday hayajon!", fact: "O'z mavjudligini anglash prefrontal po'stloqni faollashtiradi va tashvishni kamaytiradi." },
        { quote: "Kuch qayerda? Ichkariga qarashda. O'zimga qancha ko'p yursam, odam sifatida shuncha yoqimli bo'laman.", fact: "Introspeksiya o'z-o'zini anglash bilan bog'liq medial prefrontal po'stloq faoliyatini oshiradi." },
        { quote: "Hech qachon yashash irodasini yo'qotmang. Bu qayerdan keladi, do'stim? Bu Kenshin. Rurouni Kenshin.", fact: "Yashash irodasi limbik tizimdagi serotonin va noradrenalin darajasi bilan bog'liq." },
        { quote: "Maqsad qo'yadiganlar ahmoqdir. O'zingga maqsad qo'ysang, u sehrgardek xohlay boshlaydimi?", fact: "Ichki motivatsiya (avtonomiya) tashqi maqsad qo'yishdan 3 marta samaraliroq." },
        { quote: "Bu hayot emas, bunday hayotni nahar qil. Bayramsiz hayotni nahar qil.", fact: "Quvnoqsiz doimiy stress buyrak usti bezlarining tugashi va kortizolning pasayishiga olib keladi." },
        { quote: "Hayotingizni idrok etish ufqini bugungacha qisqartiring. Bugun nima bo'lishini bilmayman.", fact: "Mindfulness tadqiqotlarga ko'ra kortizolni 23% ga kamaytiradi." },
        { quote: "Mening innovatsion ixtiroim - o'zingizni tiriklayin chirishiga yo'l qo'maslikdir. Hamma narsaga qaramay, holatingizni yaxshilang.", fact: "Kaizen printsipi: kuniga 1% yaxshilanish bir yilda 37 barobar o'sishni beradi." },
        { quote: "Aql - muammolarni hal qilish qobiliyati. Agar aqlli bo'lsang, baxtli bo'lishni tushun.", fact: "Hissiy intellekt (EQ) IQdan ikki baravar ko'proq muvaffaqiyatni bashorat qiladi." },
        { quote: "Sen o'lib qolasan, shu. Eng yaxshi yillaringni axlatga sarflagan narsani qanday qilib hayot deyish mumkin?", fact: "O'limni anglash (memento mori) vaqt qadrini va unumdorlikni 40% ga oshiradi." }
    ],
    ro: [
        { quote: "Întrebarea despre sensul vieții este un semnal de alarmă. Apare doar când faci ceva ce urăști.", fact: "Golul existențial apare din lipsa stimulării dopaminice din activitate." },
        { quote: "Sensul vieții este să fii martor la realitate. Exist, ce entuziasm!", fact: "Conștientizarea propriei existențe activează cortexul prefrontal și reduce anxietatea." },
        { quote: "Unde este puterea? În întoarcerea spre interior. Cu cât mă confrunt mai mult cu mine însumi, cu atât devin o persoană mai plăcută.", fact: "Introspecția crește activitatea cortexului prefrontal medial asociat cu conștientizarea de sine." },
        { quote: "Nu pierde niciodată voința de a trăi. De unde vine, prietene? Este Kenshin. Rurouni Kenshin.", fact: "Voința de a trăi corelează cu nivelul de serotonină și noradrenalină în sistemul limbic." },
        { quote: "Idioții își fixează obiective. Dacă îți fixezi un obiectiv, va face magie să îți și dorești să-l atingi?", fact: "Motivația intrinsecă (autonomia) este de 3 ori mai eficientă decât stabilirea obiectivelor externe." },
        { quote: "Aceasta nu este o viață, fut o astfel de viață. Fut o viață în care nu există sărbătoare.", fact: "Stresul cronic fără bucurie duce la epuizarea suprarenalelor și la scăderea cortizolului." },
        { quote: "Micșorează orizontul de percepție al vieții tale la ziua de azi. Nu știu ce va fi astăzi.", fact: "Mindfulness reduce cortizolul cu 23% conform studiilor." },
        { quote: "Invenția mea inovatoare este să nu îți permiți să putrezești de viu. În ciuda a tot, îți îmbunătățește starea.", fact: "Principiul Kaizen: o îmbunătățire zilnică de 1% oferă o creștere de 37 de ori într-un an." },
        { quote: "Inteligența este capacitatea de a rezolva probleme. Dacă ești deștept, află cum să fii fericit.", fact: "Inteligența emoțională (EQ) prezice succesul de două ori mai bine decât IQ-ul." },
        { quote: "Cazi și gata. Cum poți numi viață un lucru în care cei mai buni ani sunt irosiți pe prostii?", fact: "Conștientizarea morții (memento mori) crește valoarea timpului și productivitatea cu 40%." }
    ]
};

function applyTranslations() {
    const t = i18n[state.lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
    const taskInput = document.getElementById('taskInput');
    if (taskInput) taskInput.placeholder = t.task_ph;
    const langSelect = document.getElementById('langSelect');
    const obLangSelect = document.getElementById('obLangSelect');
    if (langSelect) langSelect.value = state.lang;
    if (obLangSelect) obLangSelect.value = state.lang;
    updateStats();
    if (state.onboardingCompleted) renderHabits();
    loadWisdom();
}

function initLangSelectors() {
    const langs = [
        { code: 'ru', name: 'Русский' }, { code: 'en', name: 'English' }, { code: 'ja', name: '日本語' },
        { code: 'zh', name: '中文' }, { code: 'uz', name: 'O\'zbek' }, { code: 'ro', name: 'Română' }
    ];
    const mainSelect = document.getElementById('langSelect');
    const obSelect = document.getElementById('obLangSelect');
    if(mainSelect) mainSelect.innerHTML = ''; 
    if(obSelect) obSelect.innerHTML = '';
    langs.forEach(l => {
        const opt1 = document.createElement('option'); opt1.value = l.code; opt1.innerText = l.code.toUpperCase();
        if (l.code === state.lang) opt1.selected = true; if(mainSelect) mainSelect.appendChild(opt1);
        const opt2 = document.createElement('option'); opt2.value = l.code; opt2.innerText = l.name;
        if (l.code === state.lang) opt2.selected = true; if(obSelect) obSelect.appendChild(opt2);
    });
}

function changeLanguage(lang) { state.lang = lang; applyTranslations(); saveState(); }
function changeObLanguage(lang) { state.lang = lang; applyTranslations(); renderQuestion(); saveState(); }

function saveState() {
    const payload = { dopamine: state.dopamine, testosterone: state.testosterone, habits: state.habits, onboardingCompleted: state.onboardingCompleted, chaosScore: state.chaosScore, wisdomIndex: state.wisdomIndex, startDate: state.startDate, lastMilestone: state.lastMilestone, audioMeta: state.audioFiles.map(t => ({ name: t.name, path: t.path || '' })), lang: state.lang };
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
        if (data.lang) state.lang = data.lang;
        return true;
    } catch (e) { return false; }
}

const onboardingData = [
    { qKey: "ob1q", aKeys: ["ob1a1", "ob1a2"], badIdx: 1 },
    { qKey: "ob2q", aKeys: ["ob2a1", "ob2a2"], badIdx: 1 },
    { qKey: "ob3q", aKeys: ["ob3a1", "ob3a2"], badIdx: 1 },
    { qKey: "ob4q", aKeys: ["ob4a1", "ob4a2"], badIdx: 1 }
];
let obIdx = 0;

function initOnboarding() {
    if (state.onboardingCompleted) { document.getElementById('onboarding').style.display = 'none'; applyPostOnboarding(); return; }
    obIdx = 0; renderQuestion();
}

function renderQuestion() {
    if (obIdx >= onboardingData.length) return finishOnboarding();
    const data = onboardingData[obIdx]; const t = i18n[state.lang];
    document.getElementById('questionText').innerText = t[data.qKey];
    const container = document.getElementById('answersContainer'); container.innerHTML = '';
    data.aKeys.forEach((aKey, i) => {
        const btn = document.createElement('button'); btn.className = 'ans-btn'; btn.innerText = t[aKey];
        btn.onclick = () => { if (i === data.badIdx) state.chaosScore += 25; obIdx++; updateObProgress(); renderQuestion(); };
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
    state.dopamine = 50 - (state.chaosScore / 2); state.testosterone = 50 - (state.chaosScore / 2);
    state.onboardingCompleted = true; if (!state.startDate) state.startDate = Date.now();
    applyPostOnboarding(); saveState();
}

function applyPostOnboarding() {
    const t = i18n[state.lang];
    if (state.habits.length === 0) {
        if (state.chaosScore >= 25) addHabit(t.h1, true, 'h1');
        if (state.chaosScore >= 50) addHabit(t.h2, true, 'h2');
        if (state.chaosScore >= 75) addHabit(t.h3, true, 'h3');
        addHabit(t.h4, true, 'h4'); addHabit(t.h5, true, 'h5'); addHabit(t.h6, true, 'h6');
    }
    updateStats(); renderHabits(); renderDayCounter(); checkMilestones();
}

const audioElement = document.getElementById('arsenAudio');
const playBtn = document.getElementById('playBtn');
const photoImg = document.getElementById('masterPhotoImg');
const leftPanel = document.getElementById('leftPanel');
const photoWrap = document.getElementById('photoContainer');
const playIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
const pauseIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';

function updateClock() { const el = document.getElementById('clock'); if (el) el.innerText = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }); }
setInterval(updateClock, 1000); updateClock();

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100; const sp = document.getElementById('scrollProgress');
    if (sp) sp.style.width = scrolled + '%';
});

function renderDayCounter() {
    const el = document.getElementById('dayNumber');
    if (!state.startDate) { if (el) el.innerText = '0'; return; }
    const days = Math.floor((Date.now() - state.startDate) / (1000*60*60*24)) + 1;
    if (el) el.innerText = days;
}

function checkMilestones() {
    if (!state.startDate) return;
    const days = Math.floor((Date.now() - state.startDate) / (1000*60*60*24)) + 1;
    const milestone = Math.floor((days - 1) / 7) * 7;
    if (milestone > 0 && milestone > state.lastMilestone) {
        state.lastMilestone = milestone; saveState(); launchConfetti();
        showToast(`${milestone} дней на пути. Ты не остановился.`);
    }
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas'); if (!canvas) return;
    const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const particles = []; const colors = ['#c9a45c', '#e8d5a3', '#fff'];
    for (let i = 0; i < 80; i++) { particles.push({ x: canvas.width / 2, y: canvas.height / 2, vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10 - 5, size: Math.random() * 4 + 2, color: colors[Math.floor(Math.random() * colors.length)], life: 1, decay: 0.01 }); }
    let animId;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); let alive = false;
        particles.forEach(p => { if (p.life <= 0) return; alive = true; p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life -= p.decay; ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size); });
        if (alive) animId = requestAnimationFrame(draw); else { ctx.clearRect(0, 0, canvas.width, canvas.height); cancelAnimationFrame(animId); }
    }
    draw();
}

function showToast(msg) {
    let container = document.getElementById('toast-container');
    if (!container) { container = document.createElement('div'); container.id = 'toast-container'; document.body.appendChild(container); }
    const toast = document.createElement('div'); toast.className = 'toast'; toast.textContent = msg;
    container.appendChild(toast); setTimeout(() => { toast.remove(); }, 5500);
}

async function scanFolder() {
    try {
        const dirHandle = await window.showDirectoryPicker(); state.audioFiles = []; let foundImage = false;
        async function scanDirectory(handle, path = '') {
            for await (const entry of handle.values()) {
                const entryPath = path ? `${path}/${entry.name}` : entry.name;
                if (entry.kind === 'directory') await scanDirectory(entry, entryPath);
                else if (entry.kind === 'file') {
                    const file = await entry.getFile();
                    if (file.type.startsWith('audio/')) { state.audioFiles.push({ name: file.name.replace(/\.[^/.]+$/, ""), src: URL.createObjectURL(file), path: entryPath }); }
                    else if (file.type.startsWith('image/') && !foundImage) { photoImg.src = URL.createObjectURL(file); photoImg.style.display = 'block'; foundImage = true; }
                }
            }
        }
        await scanDirectory(dirHandle);
        if (state.audioFiles.length > 0) { state.currentTrack = 0; loadTrack(0); } else { document.getElementById('trackName').innerText = i18n[state.lang].no_audio; }
        renderTrackList(); saveState();
    } catch (e) { console.log(e); }
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => { leftPanel.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); }, false); document.body.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); }, false); });
leftPanel.addEventListener('dragover', () => leftPanel.classList.add('drag-over'));
leftPanel.addEventListener('dragleave', () => leftPanel.classList.remove('drag-over'));
leftPanel.addEventListener('drop', handleDrop);
photoWrap.addEventListener('dragenter', (e) => { e.stopPropagation(); photoWrap.classList.add('drag-active'); });
photoWrap.addEventListener('dragleave', (e) => { e.stopPropagation(); photoWrap.classList.remove('drag-active'); });

async function handleDrop(e) {
    leftPanel.classList.remove('drag-over'); photoWrap.classList.remove('drag-active');
    const items = e.dataTransfer.items;
    if (items && items.length > 0) { for (let i = 0; i < items.length; i++) { const entry = items[i].webkitGetAsEntry(); if (entry) await processEntry(entry); } }
    else { const files = e.dataTransfer.files; for (let f of files) processFile(f); }
    if (state.currentTrack === -1 && state.audioFiles.length > 0) { state.currentTrack = 0; loadTrack(0); }
    renderTrackList();
}

async function processEntry(entry, path = '') {
    if (entry.isDirectory) { const reader = entry.createReader(); const entries = await new Promise(r => reader.readEntries(r)); for (const e of entries) await processEntry(e, path ? `${path}/${entry.name}` : entry.name); }
    else { const file = await new Promise(r => entry.file(r)); processFile(file, path); }
}

function processFile(file, path = '') {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith('audio/')) { state.audioFiles.push({ name: file.name.replace(/\.[^/.]+$/, ""), src: url, path }); }
    else if (file.type.startsWith('image/')) { photoImg.src = url; photoImg.style.display = 'block'; }
}

function renderTrackList() {
    const c = document.getElementById('trackListContainer'); c.innerHTML = '';
    state.audioFiles.forEach((t, i) => {
        const div = document.createElement('div'); div.className = 'track-item' + (i === state.currentTrack ? ' active' : '');
        div.innerText = `${i + 1}. ${t.name}`;
        div.onclick = () => { state.currentTrack = i; loadTrack(i); if (audioElement.paused) toggleAudio(); };
        c.appendChild(div);
    });
}

function loadTrack(index) {
    if (!state.audioFiles[index]) return;
    state.currentTrack = index; audioElement.src = state.audioFiles[index].src;
    document.getElementById('trackName').innerText = state.audioFiles[index].name;
    document.getElementById('trackName').style.color = "var(--text)";
    renderTrackList(); document.getElementById('progressFill').style.width = '0%'; document.getElementById('trackTime').innerText = '0:00 / 0:00';
}

function loadWisdom() {
    const langDB = wisdomDB[state.lang] || wisdomDB.ru;
    const data = langDB[state.wisdomIndex % langDB.length];
    document.getElementById('arsenQuote').innerText = `"${data.quote}"`;
    document.getElementById('scienceFact').innerText = data.fact;
}

function nextWisdom() { state.wisdomIndex++; saveState(); loadWisdom(); }

function toggleAudio() {
    if (state.audioFiles.length === 0) { document.getElementById('trackName').innerText = i18n[state.lang].drag_scan; return; }
    if (audioElement.paused) { audioElement.play().catch(()=>{}); playBtn.innerHTML = pauseIcon; }
    else { audioElement.pause(); playBtn.innerHTML = playIcon; }
}

function changeTrack(dir) {
    if (state.audioFiles.length === 0) return;
    state.currentTrack = (state.currentTrack + dir + state.audioFiles.length) % state.audioFiles.length;
    loadTrack(state.currentTrack);
    if (playBtn.innerHTML.includes('h4')) audioElement.play().catch(()=>{});
}

function seekAudio(e) {
    if (!audioElement.duration) return;
    const bar = document.getElementById('progressBar'); const rect = bar.getBoundingClientRect();
    audioElement.currentTime = ((e.clientX - rect.left) / rect.width) * audioElement.duration;
}

function formatTime(s) { const m = Math.floor(s / 60), sec = Math.floor(s % 60); return `${m}:${sec < 10 ? '0' : ''}${sec}`; }

function addHabit(text, silent = false, key = null) {
    if (text === undefined) {
        text = document.getElementById('taskInput').value.trim();
        if (!text) return;
    }
    state.habits.push({ text: text, done: false, streak: 0, key: key });
    document.getElementById('taskInput').value = ''; renderHabits();
    if (!silent) { saveState(); }
}

function handleKeyPress(e) { if (e.key === 'Enter') addHabit(); }

function renderHabits() {
    const list = document.getElementById('habitList'); const t = i18n[state.lang];
    list.innerHTML = '';
    state.habits.forEach((h, i) => {
        const displayName = h.key ? t[h.key] : h.text;
        const li = document.createElement('li'); li.className = 'habit-item' + (h.done ? ' done' : '');
        li.innerHTML = `<div class="habit-info"><span class="habit-name">${displayName}</span><span class="habit-meta">${t.streak}: <span class="streak">${h.streak}</span></span></div><div class="habit-actions"><button class="btn-done" onclick="toggleHabit(${i})">${h.done ? '✓ '+t.done_btn : t.do}</button><button class="btn-del" onclick="deleteHabit(${i})">${t.delete}</button></div>`;
        list.appendChild(li);
    });
}

function toggleHabit(i) {
    if (!state.habits[i].done) { state.habits[i].done = true; state.habits[i].streak++; state.dopamine += 20; state.testosterone += 10; }
    else { state.habits[i].done = false; state.habits[i].streak = Math.max(0, state.habits[i].streak - 1); state.dopamine -= 15; state.testosterone -= 10; }
    renderHabits(); updateStats(); saveState();
}

function deleteHabit(i) {
    if (!state.habits[i].done) { state.dopamine -= 10; state.testosterone -= 5; }
    state.habits.splice(i, 1); renderHabits(); updateStats(); saveState();
}

function updateStats() {
    state.dopamine = Math.max(0, Math.min(100, state.dopamine));
    state.testosterone = Math.max(0, Math.min(100, state.testosterone));
    document.getElementById('dopamineBar').style.width = state.dopamine + '%';
    document.getElementById('testBar').style.width = state.testosterone + '%';
    document.getElementById('dopamineVal').innerText = state.dopamine + '%';
    document.getElementById('testVal').innerText = state.testosterone + '%';

    const t = i18n[state.lang]; let rank = t.rank_chaos, progress = Math.max(5, state.dopamine);
    if (state.dopamine >= 80) { rank = t.rank_ruler; progress = 100; }
    else if (state.dopamine >= 60) { rank = t.rank_architect; progress = 75; }
    else if (state.dopamine >= 40) { rank = t.rank_warrior; progress = 50; }
    else if (state.dopamine >= 20) { rank = t.rank_survivor; progress = 25; }

    document.getElementById('rankDisplay').innerText = rank;
    document.getElementById('rankProgress').style.width = progress + '%';
}

function toggleBreathing() {
    const btn = document.getElementById('breathBtn'); const t = i18n[state.lang];
    if (!btn) return;
    
    if (state.isBreathing) {
        clearInterval(state.breathInterval); state.isBreathing = false;
        btn.innerText = t.start_478; 
        document.getElementById('breathText').innerText = t.ready;
        document.getElementById('breathTimer').innerText = ''; 
        document.getElementById('breathCore').className = 'breath-circle';
    } else {
        state.isBreathing = true; btn.innerText = t.stop; let phase = 0, timer = 0;
        const update = () => {
            if (!state.isBreathing) return;
            const core = document.getElementById('breathCore'); 
            const text = document.getElementById('breathText'); 
            const timeEl = document.getElementById('breathTimer');
            if (phase === 0) { text.innerText = t.inhale; core.className = 'breath-circle inhale'; if (timer >= 4) { phase = 1; timer = 0; } }
            else if (phase === 1) { text.innerText = t.hold; core.className = 'breath-circle hold'; if (timer >= 7) { phase = 2; timer = 0; } }
            else { text.innerText = t.exhale; core.className = 'breath-circle exhale'; if (timer >= 8) { phase = 0; timer = 0; } }
            timeEl.innerText = timer; timer++;
        };
        update(); state.breathInterval = setInterval(update, 1000);
    }
}

let godModeInterval = null;
function toggleGodMode(start) {
    const overlay = document.getElementById('godModeOverlay');
    const timerEl = document.getElementById('godModeTimer');
    let time = 90 * 60; // 90 минут
    
    if (start) {
        overlay.classList.add('active');
        godModeInterval = setInterval(() => {
            if (time <= 0) {
                clearInterval(godModeInterval);
                toggleGodMode(false);
                showToast("Фокус завершен. Ты создал нечто великое.");
                return;
            }
            time--;
            const m = Math.floor(time / 60);
            const s = time % 60;
            timerEl.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        }, 1000);
    } else {
        clearInterval(godModeInterval);
        overlay.classList.remove('active');
    }
}

function initApp() {
    const hadState = loadState(); 
    initLangSelectors(); 
    applyTranslations(); 
    initOnboarding();
    
    if (hadState && state.onboardingCompleted) { renderDayCounter(); checkMilestones(); }
    
    if (audioElement) {
        audioElement.volume = 0.8;
        document.getElementById('volumeSlider').addEventListener('input', (e) => {
            audioElement.volume = e.target.value;
            document.getElementById('volValue').innerText = Math.round(e.target.value * 100) + '%';
        });
        audioElement.addEventListener('loadedmetadata', () => { if (audioElement.duration) document.getElementById('trackTime').innerText = `0:00 / ${formatTime(audioElement.duration)}`; });
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
            } else { playBtn.innerHTML = playIcon; }
        });
    }
    
    if (playBtn) playBtn.innerHTML = playIcon;
}

initApp();

// === ОПТИМИЗИРОВАННАЯ АНИМАЦИЯ ЗАПУСКА ===
function runSplashAnimation() {
    const splashEl = document.getElementById('splashScreen');
    const titleEl = document.getElementById('splashTitle');
    const dividerEl = document.getElementById('splashDivider');
    const taglineEl = document.getElementById('splashTagline');
    const appContainer = document.querySelector('.app-container');
    
    if (!titleEl) return;

    // Разбиваем текст на буквы
    const rawText = titleEl.textContent;
    titleEl.innerHTML = '';
    [...rawText].forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'sl-letter';
        span.style.transitionDelay = (i * 40) + 'ms';
        span.textContent = ch;
        titleEl.appendChild(span);
    });
    const letterEls = titleEl.querySelectorAll('.sl-letter');

    // Появление букв
    setTimeout(() => {
        letterEls.forEach(el => el.classList.add('show'));
        setTimeout(() => dividerEl.classList.add('show'), 200);
        setTimeout(() => taglineEl.classList.add('show'), 400);
    }, 100);

    // Логика плавного выхода
    function beginExit() {
        if (appContainer) appContainer.classList.add('ready');
        splashEl.classList.add('hide');
        setTimeout(() => {
            splashEl.style.display = 'none';
        }, 900);
    }

    // Держим экран 2.5 секунды и уходим
    setTimeout(() => {
        beginExit();
    }, 2500);
    
    // Тонкая фоновая анимация пылинок (очень спокойная)
    const canvas = document.getElementById('splashCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    for(let i=0; i<30; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3,
            vy: Math.random() * -0.2 - 0.05,
            a: Math.random() * 0.3 + 0.1
        });
    }

    let animId;
    function draw() {
        if (splashEl.style.display === 'none') {
            cancelAnimationFrame(animId);
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y += p.vy;
            if (p.y < 0) p.y = canvas.height;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201, 164, 92, ${p.a})`;
            ctx.fill();
        });
        animId = requestAnimationFrame(draw);
    }
    draw();
}
runSplashAnimation();
