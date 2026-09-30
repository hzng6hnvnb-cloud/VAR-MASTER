"use strict";

/*
  VAR MASTER
  لعبة تحكيم فيديو تفاعلية
*/

const TOTAL_STAGES = 50;

const stages = [
  {
    title: "هل الكرة دخلت المرمى؟",
    question: "هل تحتسب الهدف؟",
    answer: "goal",
    reason: "الكرة تجاوزت خط المرمى بالكامل.",
    type: "goal",
    difficulty: "سهل",
    speed: 1
  },
  {
    title: "تسلل واضح",
    question: "ما القرار الصحيح؟",
    answer: "offside",
    reason: "المهاجم كان متقدمًا على آخر مدافع لحظة تمرير الكرة.",
    type: "offside",
    difficulty: "سهل",
    speed: 1
  },
  {
    title: "لا يوجد تسلل",
    question: "هل يوجد تسلل؟",
    answer: "no-offside",
    reason: "المهاجم كان على نفس خط آخر مدافع لحظة التمريرة.",
    type: "no-offside",
    difficulty: "سهل",
    speed: 1
  },
  {
    title: "احتكاك داخل المنطقة",
    question: "هل تحتسب ركلة جزاء؟",
    answer: "penalty",
    reason: "المدافع عرقل المهاجم داخل منطقة الجزاء.",
    type: "penalty",
    difficulty: "سهل",
    speed: 1
  },
  {
    title: "احتكاك قانوني",
    question: "هل توجد ركلة جزاء؟",
    answer: "no-penalty",
    reason: "الاحتكاك كان ضمن الالتحام القانوني ولا توجد مخالفة.",
    type: "no-penalty",
    difficulty: "سهل",
    speed: 1
  },

  {
    title: "لمسة يد داخل المنطقة",
    question: "ما قرارك؟",
    answer: "penalty",
    reason: "اليد جعلت الجسم أكبر بشكل غير قانوني وتسببت في إيقاف الهجمة.",
    type: "hand",
    difficulty: "سهل",
    speed: 1
  },
  {
    title: "لمسة يد غير مخالفة",
    question: "هل تحتسب ركلة جزاء؟",
    answer: "no-penalty",
    reason: "وضع الذراع كان طبيعيًا ولم تكن هناك مخالفة يد.",
    type: "hand-no",
    difficulty: "سهل",
    speed: 1
  },
  {
    title: "تدخل متأخر",
    question: "ما العقوبة؟",
    answer: "yellow",
    reason: "التدخل متأخر ويستحق بطاقة صفراء.",
    type: "yellow",
    difficulty: "متوسط",
    speed: .95
  },
  {
    title: "تدخل خطير",
    question: "ما العقوبة؟",
    answer: "red",
    reason: "التدخل كان خطيرًا بصورة تستوجب الطرد.",
    type: "red",
    difficulty: "متوسط",
    speed: .9
  },
  {
    title: "هدف بعد لمسة مدافع",
    question: "هل الهدف صحيح؟",
    answer: "goal",
    reason: "المدافع هو من لعب الكرة قبل وصولها للمهاجم.",
    type: "goal",
    difficulty: "متوسط",
    speed: .95
  },

  {
    title: "تسلل قبل تسجيل الهدف",
    question: "هل يحتسب الهدف؟",
    answer: "offside",
    reason: "المهاجم كان في موقف تسلل عند لحظة لعب زميله للكرة.",
    type: "offside",
    difficulty: "متوسط",
    speed: .9
  },
  {
    title: "الكرة خرجت قبل الهدف",
    question: "ما القرار؟",
    answer: "no-goal",
    reason: "الكرة تجاوزت خط التماس قبل بناء الهجمة.",
    type: "no-goal",
    difficulty: "متوسط",
    speed: .9
  },
  {
    title: "تدخل داخل منطقة الجزاء",
    question: "ركلة جزاء أم لا؟",
    answer: "penalty",
    reason: "المخالفة حدثت داخل منطقة الجزاء.",
    type: "penalty",
    difficulty: "متوسط",
    speed: .9
  },
  {
    title: "مخالفة خارج المنطقة",
    question: "هل تحتسب ركلة جزاء؟",
    answer: "no-penalty",
    reason: "مكان المخالفة كان خارج منطقة الجزاء.",
    type: "no-penalty",
    difficulty: "متوسط",
    speed: .9
  },
  {
    title: "تدخل يستحق الإنذار",
    question: "هل تعطي بطاقة صفراء؟",
    answer: "yellow",
    reason: "التدخل يوقف هجمة واعدة ويستحق الإنذار.",
    type: "yellow",
    difficulty: "متوسط",
    speed: .85
  },

  {
    title: "فرصة محققة وتدخل خطير",
    question: "ما القرار؟",
    answer: "red",
    reason: "التدخل حرم الخصم من فرصة تسجيل محققة ويستوجب العقوبة المناسبة.",
    type: "red",
    difficulty: "صعب",
    speed: .85
  },
  {
    title: "المهاجم خلف المدافع",
    question: "هل يوجد تسلل؟",
    answer: "no-offside",
    reason: "المهاجم كان خلف خط آخر مدافع عند لعب الكرة.",
    type: "no-offside",
    difficulty: "صعب",
    speed: .8
  },
  {
    title: "المهاجم متقدم بجزء من الجسم",
    question: "ما قرارك؟",
    answer: "offside",
    reason: "جزء من الجسم يمكن تسجيل الهدف به كان في موقف تسلل.",
    type: "offside",
    difficulty: "صعب",
    speed: .8
  },
  {
    title: "تسلل بعد ارتداد الكرة",
    question: "هل يوجد تسلل؟",
    answer: "offside",
    reason: "الموقف يُقاس عند لحظة لعب زميله للكرة وليس عند الارتداد اللاحق.",
    type: "offside",
    difficulty: "صعب",
    speed: .8
  },
  {
    title: "تغيير اتجاه الكرة",
    question: "هل تحتسب الهدف؟",
    answer: "goal",
    reason: "تغيير اتجاه الكرة لم يلغِ صحة بناء الهجمة.",
    type: "goal",
    difficulty: "صعب",
    speed: .8
  },

  {
    title: "يد في منطقة الجزاء",
    question: "ما القرار؟",
    answer: "penalty",
    reason: "المدافع استخدم ذراعه بطريقة غير قانونية داخل المنطقة.",
    type: "hand",
    difficulty: "صعب",
    speed: .75
  },
  {
    title: "كرة اصطدمت باليد من مسافة قصيرة",
    question: "هل توجد ركلة جزاء؟",
    answer: "no-penalty",
    reason: "الموقف لا يثبت مخالفة يد لمجرد حدوث التلامس.",
    type: "hand-no",
    difficulty: "صعب",
    speed: .75
  },
  {
    title: "احتكاك بين مهاجم ومدافع",
    question: "هل تحتسب ركلة جزاء؟",
    answer: "penalty",
    reason: "المدافع تسبب في إسقاط المهاجم داخل المنطقة.",
    type: "penalty",
    difficulty: "صعب",
    speed: .75
  },
  {
    title: "المهاجم يسقط دون مخالفة",
    question: "ما قرارك؟",
    answer: "no-penalty",
    reason: "السقوط حدث دون مخالفة واضحة من المدافع.",
    type: "no-penalty",
    difficulty: "صعب",
    speed: .75
  },
  {
    title: "مرفق أثناء الالتحام",
    question: "هل تستحق اللقطة بطاقة؟",
    answer: "yellow",
    reason: "الاحتكاك يستوجب العقوبة الانضباطية المناسبة.",
    type: "yellow",
    difficulty: "صعب",
    speed: .7
  },

  {
    title: "تدخل بعنف شديد",
    question: "ما العقوبة؟",
    answer: "red",
    reason: "استخدام القوة المفرطة يجعل الحالة من حالات الطرد.",
    type: "red",
    difficulty: "صعب",
    speed: .7
  },
  {
    title: "هدف من وضع تسلل",
    question: "هل تحتسب الهدف؟",
    answer: "offside",
    reason: "المهاجم المتسلل شارك بشكل مؤثر في الهجمة.",
    type: "offside",
    difficulty: "صعب",
    speed: .7
  },
  {
    title: "المهاجم لم يتدخل في اللعب",
    question: "هل يوجد تسلل مؤثر؟",
    answer: "no-offside",
    reason: "وجود اللاعب في المنطقة لم يكن كافيًا وحده لإثبات مخالفة تسلل.",
    type: "no-offside",
    difficulty: "صعب",
    speed: .7
  },
  {
    title: "الكرة على خط المرمى",
    question: "هل تجاوزت الكرة الخط بالكامل؟",
    answer: "no-goal",
    reason: "الكرة لم تتجاوز خط المرمى بالكامل.",
    type: "no-goal",
    difficulty: "صعب",
    speed: .65
  },
  {
    title: "الكرة عبرت الخط بالكامل",
    question: "هل تحتسب الهدف؟",
    answer: "goal",
    reason: "الكرة تجاوزت خط المرمى بالكامل قبل إبعادها.",
    type: "goal",
    difficulty: "صعب",
    speed: .65
  },

  {
    title: "تسلل بفارق بسيط",
    question: "هل يوجد تسلل؟",
    answer: "offside",
    reason: "المهاجم كان متقدمًا عند لحظة تمرير الكرة.",
    type: "offside",
    difficulty: "خبير",
    speed: .6
  },
  {
    title: "على نفس الخط",
    question: "ما القرار؟",
    answer: "no-offside",
    reason: "لا يُعد اللاعب متسللًا عندما يكون على نفس خط المدافع.",
    type: "no-offside",
    difficulty: "خبير",
    speed: .6
  },
  {
    title: "تداخل مع الحارس",
    question: "هل تحتسب الهدف؟",
    answer: "no-goal",
    reason: "تداخل المهاجم مع الحارس أثّر في قدرته على لعب الكرة.",
    type: "no-goal",
    difficulty: "خبير",
    speed: .6
  },
  {
    title: "المدافع لعب الكرة عمدًا",
    question: "هل تستمر الهجمة؟",
    answer: "goal",
    reason: "اللعب المتعمد من المدافع يؤثر في تقييم موقف التسلل.",
    type: "goal",
    difficulty: "خبير",
    speed: .55
  },
  {
    title: "ركلة جزاء بعد مراجعة",
    question: "هل تحتسب ركلة الجزاء؟",
    answer: "penalty",
    reason: "المراجعة أوضحت وجود مخالفة داخل المنطقة.",
    type: "penalty",
    difficulty: "خبير",
    speed: .55
  },

  {
    title: "احتكاك بسيط جدًا",
    question: "هل تحتسب ركلة جزاء؟",
    answer: "no-penalty",
    reason: "الاحتكاك وحده لا يعني وجود مخالفة تستوجب ركلة جزاء.",
    type: "no-penalty",
    difficulty: "خبير",
    speed: .55
  },
  {
    title: "بطاقة صفراء أم حمراء؟",
    question: "ما العقوبة المناسبة؟",
    answer: "yellow",
    reason: "التدخل لا يصل إلى مستوى الطرد في هذه الحالة.",
    type: "yellow",
    difficulty: "خبير",
    speed: .5
  },
  {
    title: "بطاقة حمراء بعد مراجعة",
    question: "ما قرارك؟",
    answer: "red",
    reason: "المراجعة أظهرت أن التدخل يستوجب الطرد.",
    type: "red",
    difficulty: "خبير",
    speed: .5
  },
  {
    title: "هدف أم تسلل؟",
    question: "هل تحتسب الهدف؟",
    answer: "offside",
    reason: "المهاجم كان متقدمًا لحظة تمرير الكرة.",
    type: "offside",
    difficulty: "خبير",
    speed: .5
  },
  {
    title: "لا تسلل رغم السرعة",
    question: "ما قرارك؟",
    answer: "no-offside",
    reason: "اللاعب انطلق من موقف قانوني.",
    type: "no-offside",
    difficulty: "خبير",
    speed: .5
  },

  {
    title: "مراجعة خط المرمى",
    question: "هل الكرة عبرت بالكامل؟",
    answer: "goal",
    reason: "الإعادة توضح أن الكرة عبرت الخط بالكامل.",
    type: "goal",
    difficulty: "خبير",
    speed: .45
  },
  {
    title: "لم تعبر بالكامل",
    question: "ما القرار؟",
    answer: "no-goal",
    reason: "جزء من الكرة بقي فوق خط المرمى.",
    type: "no-goal",
    difficulty: "خبير",
    speed: .45
  },
  {
    title: "يد حاسمة",
    question: "هل تحتسب ركلة جزاء؟",
    answer: "penalty",
    reason: "اللمسة باليد كانت مؤثرة في مسار اللعب داخل المنطقة.",
    type: "hand",
    difficulty: "خبير",
    speed: .45
  },
  {
    title: "لمسة لا تستوجب الجزاء",
    question: "ما قرارك؟",
    answer: "no-penalty",
    reason: "لا توجد مخالفة يد تستوجب ركلة جزاء في هذه الحالة.",
    type: "hand-no",
    difficulty: "خبير",
    speed: .45
  },
  {
    title: "تدخل قوي لكن غير مفرط",
    question: "ما العقوبة؟",
    answer: "yellow",
    reason: "التدخل يستحق الإنذار وليس الطرد.",
    type: "yellow",
    difficulty: "خبير",
    speed: .4
  },

  {
    title: "تدخل بقوة مفرطة",
    question: "هل تطرد اللاعب؟",
    answer: "red",
    reason: "استخدام القوة المفرطة يستوجب البطاقة الحمراء.",
    type: "red",
    difficulty: "خبير",
    speed: .4
  },
  {
    title: "أصعب تسلل",
    question: "ما القرار بعد الخطوط؟",
    answer: "offside",
    reason: "خطوط المراجعة تؤكد وجود موقف تسلل لحظة لعب الكرة.",
    type: "offside",
    difficulty: "أسطوري",
    speed: .35
  },
  {
    title: "أصعب حالة بدون تسلل",
    question: "هل تلغي الهدف؟",
    answer: "no-offside",
    reason: "الإعادة والزاوية الثانية تؤكدان أن المهاجم كان في موقف قانوني.",
    type: "no-offside",
    difficulty: "أسطوري",
    speed: .35
  },
  {
    title: "قرار جزاء في اللحظة الأخيرة",
    question: "هل تحتسب ركلة الجزاء؟",
    answer: "penalty",
    reason: "المراجعة تبين وجود مخالفة داخل منطقة الجزاء.",
    type: "penalty",
    difficulty: "أسطوري",
    speed: .3
  },
  {
    title: "اللقطة الأخيرة",
    question: "هل تحتسب الهدف؟",
    answer: "goal",
    reason: "المراجعة النهائية تؤكد صحة الهدف.",
    type: "goal",
    difficulty: "أسطوري",
    speed: .25
  }
];

let currentStage = 0;
let score = 0;
let correct = 0;
let wrong = 0;

let playing = false;
let animationStart = 0;
let animationFrame = null;
let speed = 1;
let elapsed = 0;

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const finalScreen = document.getElementById("finalScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const backBtn = document.getElementById("backBtn");

const stageNumber = document.getElementById("stageNumber");
const difficulty = document.getElementById("difficulty");
const caseTitle = document.getElementById("caseTitle");
const question = document.getElementById("question");

const scoreEl = document.getElementById("score");
const timeDisplay = document.getElementById("timeDisplay");
const progressBar = document.getElementById("progressBar");
const playState = document.getElementById("playState");

const playBtn = document.getElementById("playBtn");
const replayBtn = document.getElementById("replayBtn");
const slowBtn = document.getElementById("slowBtn");
const varBtn = document.getElementById("varBtn");
const nextBtn = document.getElementById("nextBtn");

const result = document.getElementById("result");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");

const ball = document.getElementById("ball");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player3 = document.getElementById("player3");
const player4 = document.getElementById("player4");
const keeper = document.getElementById("keeper");
const referee = document.getElementById("referee");
const offsideLine = document.getElementById("offsideLine");
const impact = document.getElementById("impact");
const varFrame = document.getElementById("varFrame");
const cameraLabel = document.getElementById("cameraLabel");

const transition = document.getElementById("transition");

const answerButtons = document.querySelectorAll(".answer");

function showScreen(screen) {
  [homeScreen, gameScreen, finalScreen].forEach(s => {
    s.classList.remove("active");
  });

  screen.classList.add("active");
}

function beep(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    if (type === "correct") {
      oscillator.frequency.value = 700;
      gain.gain.value = .07;
      oscillator.start();

      setTimeout(() => {
        oscillator.frequency.value = 900;
      }, 100);

      setTimeout(() => {
        oscillator.stop();
        ctx.close();
      }, 230);

    } else if (type === "wrong") {
      oscillator.frequency.value = 220;
      gain.gain.value = .08;
      oscillator.start();

      setTimeout(() => {
        oscillator.frequency.value = 150;
      }, 100);

      setTimeout(() => {
        oscillator.stop();
        ctx.close();
      }, 280);

    } else {
      oscillator.frequency.value = 420;
      gain.gain.value = .04;
      oscillator.start();

      setTimeout(() => {
        oscillator.stop();
        ctx.close();
      }, 120);
    }

  } catch (e) {}
}

function resetVisuals() {
  offsideLine.classList.remove("show");
  impact.classList.remove("show");
  varFrame.classList.remove("show");

  cameraLabel.textContent = "الكاميرا الرئيسية";

  player1.style.left = "35%";
  player1.style.top = "45%";

  player2.style.left = "48%";
  player2.style.top = "50%";

  player3.style.left = "58%";
  player3.style.top = "42%";

  player4.style.left = "66%";
  player4.style.top = "58%";

  keeper.style.left = "88%";
  keeper.style.top = "50%";

  referee.style.left = "51%";
  referee.style.top = "18%";

  ball.style.left = "25%";
  ball.style.top = "50%";
}

function loadStage(index) {
  currentStage = index;

  const stage = stages[currentStage];

  resetVisuals();

  stageNumber.textContent = currentStage + 1;
  difficulty.textContent = stage.difficulty;
  caseTitle.textContent = stage.title;
  question.textContent = stage.question;

  scoreEl.textContent = score;

  speed = stage.speed;

  slowBtn.classList.remove("active");
  playing = false;
  elapsed = 0;

  playBtn.textContent = "▶ تشغيل";
  playState.textContent = "جاهز";

  progressBar.style.width = "0%";
  timeDisplay.textContent = "00:00";

  result.className = "result hidden";
  nextBtn.classList.add("hidden");

  answerButtons.forEach(btn => {
    btn.classList.remove("disabled", "correct", "wrong");
  });

  cancelAnimationFrame(animationFrame);
}

function startAnimation() {
  if (playing) {
    playing = false;
    playBtn.textContent = "▶ تشغيل";
    playState.textContent = "متوقف";
    return;
  }

  playing = true;
  playBtn.textContent = "⏸ إيقاف";
  playState.textContent = "تجري اللقطة";

  animationStart = performance.now() - elapsed;

  animationFrame = requestAnimationFrame(animate);
}

function animate(now) {
  if (!playing) return;

  elapsed = (now - animationStart) * speed;

  const duration = 6000;
  let progress = elapsed / duration;

  if (progress >= 1) {
    progress = 1;
    playing = false;
    playBtn.textContent = "▶ تشغيل";
    playState.textContent = "انتهت اللقطة";
  }

  progressBar.style.width = `${progress * 100}%`;

  const seconds = Math.min(6, Math.floor(elapsed / 1000));
  timeDisplay.textContent = `00:0${seconds}`;

  animateScene(progress);

  if (playing) {
    animationFrame = requestAnimationFrame(animate);
  }
}

function animateScene(p) {
  const stage = stages[currentStage];
  const type = stage.type;

  /*
    حركة اللاعبين والكرة تختلف حسب نوع الحالة.
  */

  if (
    type === "offside" ||
    type === "no-offside"
  ) {
    player1.style.left = `${30 + p * 28}%`;
    player1.style.top = `${48 - p * 5}%`;

    player2.style.left = `${42 + p * 10}%`;
    player2.style.top = `${53 - p * 3}%`;

    player3.style.left = `${57 + p * 18}%`;
    player3.style.top = `${42 + p * 5}%`;

    player4.style.left = `${67 + p * 5}%`;
    player4.style.top = "57%";

    ball.style.left = `${25 + p * 53}%`;
    ball.style.top = `${50 - p * 5}%`;

    if (p > .58 && type === "offside") {
      offsideLine.style.left = "63%";
    }

  } else if (
    type === "penalty" ||
    type === "no-penalty" ||
    type === "hand" ||
    type === "hand-no"
  ) {

    player1.style.left = `${25 + p * 47}%`;
    player1.style.top = `${52 - p * 5}%`;

    player2.style.left = `${46 + p * 22}%`;
    player2.style.top = `${55 - p * 2}%`;

    player3.style.left = `${63 + p * 10}%`;
    player3.style.top = `${43 + p * 5}%`;

    ball.style.left = `${24 + p * 52}%`;
    ball.style.top = `${55 - p * 7}%`;

    if (p > .62 && p < .82) {
      impact.classList.add("show");
    } else {
      impact.classList.remove("show");
    }

  } else if (
    type === "yellow" ||
    type === "red"
  ) {

    player1.style.left = `${30 + p * 30}%`;
    player1.style.top = `${43 + p * 9}%`;

    player2.style.left = `${48 + p * 17}%`;
    player2.style.top = `${59 - p * 11}%`;

    player3.style.left = `${60 + p * 10}%`;
    player3.style.top = "43%";

    ball.style.left = `${30 + p * 35}%`;
    ball.style.top = `${45 + p * 5}%`;

    if (p > .55 && p < .72) {
      impact.classList.add("show");
    } else {
      impact.classList.remove("show");
    }

  } else {

    player1.style.left = `${25 + p * 40}%`;
    player1.style.top = `${45 - p * 5}%`;

    player2.style.left = `${43 + p * 20}%`;
    player2.style.top = `${54 + p * 4}%`;

    player3.style.left = `${58 + p * 12}%`;
    player3.style.top = "40%";

    player4.style.left = `${65 + p * 7}%`;
    player4.style.top = "58%";

    ball.style.left = `${25 + p * 60}%`;
    ball.style.top = `${52 - p * 4}%`;

    keeper.style.top = `${50 + Math.sin(p * Math.PI) * 8}%`;

    if (p > .78 && type === "goal") {
      impact.classList.add("show");
    }
  }

  if (p > .98) {
    playState.textContent = "انتهت اللقطة";
  }
}

function replay() {
  cancelAnimationFrame(animationFrame);

  elapsed = 0;
  playing = false;

  resetVisuals();

  playBtn.textContent = "▶ تشغيل";
  playState.textContent = "إعادة اللقطة";
  progressBar.style.width = "0%";
  timeDisplay.textContent = "00:00";

  setTimeout(() => {
    startAnimation();
  }, 180);
}

function toggleSlow() {
  if (speed < 1) {
    speed = 1;
    slowBtn.classList.remove("active");
    slowBtn.textContent = "🐢 بطيء";
  } else {
    speed = .35;
    slowBtn.classList.add("active");
    slowBtn.textContent = "🐢 بطيء ✓";
  }
}

function openVAR() {
  varFrame.classList.toggle("show");

  if (varFrame.classList.contains("show")) {
    cameraLabel.textContent = "مراجعة VAR";
    playState.textContent = "زاوية المراجعة";

    if (
      stages[currentStage].type === "offside" ||
      stages[currentStage].type === "no-offside"
    ) {
      offsideLine.classList.add("show");
    }

    beep("normal");

  } else {
    cameraLabel.textContent = "الكاميرا الرئيسية";
    playState.textContent = "جاهز";
    offsideLine.classList.remove("show");
  }
}

function checkAnswer(selected) {
  const stage = stages[currentStage];

  if (
    result.classList.contains("correct") ||
    result.classList.contains("wrong")
  ) {
    return;
  }

  playing = false;
  cancelAnimationFrame(animationFrame);

  playBtn.textContent = "▶ تشغيل";

  answerButtons.forEach(btn => {
    btn.classList.add("disabled");

    if (btn.dataset.answer === selected) {
      btn.classList.add(
        selected === stage.answer ? "correct" : "wrong"
      );
    }

    if (
      btn.dataset.answer === stage.answer &&
      selected !== stage.answer
    ) {
      btn.classList.add("correct");
    }
  });

  if (selected === stage.answer) {
    correct++;

    const points = Math.max(
      10,
      Math.round(100 * stage.speed)
    );

    score += points;

    scoreEl.textContent = score;

    result.className = "result correct";

    resultIcon.textContent = "✓";
    resultTitle.textContent = "إجابة صحيحة!";

    resultText.textContent =
      `${stage.reason} +${points} نقطة`;

    beep("correct");

  } else {

    wrong++;

    result.className = "result wrong";

    resultIcon.textContent = "×";
    resultTitle.textContent = "إجابة غير صحيحة";

    resultText.textContent =
      `القرار الصحيح: ${getAnswerName(stage.answer)} — ${stage.reason}`;

    beep("wrong");
  }

  nextBtn.classList.remove("hidden");
}

function getAnswerName(answer) {
  const names = {
    "goal": "هدف",
    "no-goal": "لا هدف",
    "offside": "تسلل",
    "no-offside": "لا يوجد تسلل",
    "penalty": "ركلة جزاء",
    "no-penalty": "لا توجد ركلة جزاء",
    "yellow": "بطاقة صفراء",
    "red": "بطاقة حمراء"
  };

  return names[answer] || answer;
}

function nextStage() {

  if (currentStage >= TOTAL_STAGES - 1) {
    showFinal();
    return;
  }

  transition.classList.add("show");

  setTimeout(() => {
    transition.classList.remove("show");
    loadStage(currentStage + 1);
  }, 750);
}

function showFinal() {

  document.getElementById("finalScore").textContent = correct;
  document.getElementById("correctCount").textContent = correct;
  document.getElementById("wrongCount").textContent = wrong;

  let rank = "";
  let message = "";

  if (correct >= 48) {
    rank = "حكم استثنائي";
    message = "قراراتك كانت دقيقة جدًا. وصلت إلى مستوى استثنائي في مراجعة اللقطات.";
  } else if (correct >= 42) {
    rank = "حكم ممتاز";
    message = "مستوى قوي جدًا في قراءة الحالات واتخاذ القرارات.";
  } else if (correct >= 35) {
    rank = "حكم محترف";
    message = "قرارات ممتازة، لكن ما زالت هناك بعض اللقطات التي تحتاج تدقيقًا.";
  } else if (correct >= 25) {
    rank = "حكم جيد";
    message = "أداء جيد. راجع اللقطات الصعبة وحاول مرة ثانية.";
  } else {
    rank = "تحتاج مراجعة";
    message = "بداية جيدة. أعد التحدي وحاول قراءة كل لقطة ببطء.";
  }

  document.getElementById("finalRank").textContent = rank;
  document.getElementById("finalMessage").textContent = message;

  beep("correct");

  showScreen(finalScreen);
}

startBtn.addEventListener("click", () => {
  score = 0;
  correct = 0;
  wrong = 0;

  showScreen(gameScreen);
  loadStage(0);
});

restartBtn.addEventListener("click", () => {
  score = 0;
  correct = 0;
  wrong = 0;

  showScreen(gameScreen);
  loadStage(0);
});

backBtn.addEventListener("click", () => {
  playing = false;
  cancelAnimationFrame(animationFrame);
  showScreen(homeScreen);
});

playBtn.addEventListener("click", startAnimation);

replayBtn.addEventListener("click", replay);

slowBtn.addEventListener("click", toggleSlow);

varBtn.addEventListener("click", openVAR);

nextBtn.addEventListener("click", nextStage);

answerButtons.forEach(button => {
  button.addEventListener("click", () => {
    checkAnswer(button.dataset.answer);
  });
});

loadStage(0);
