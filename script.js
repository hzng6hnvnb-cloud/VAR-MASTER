const home = document.getElementById("home");
const levels = document.getElementById("levels");
const game = document.getElementById("game");
const finalScreen = document.getElementById("final");

const startButton = document.getElementById("startButton");
const backHome = document.getElementById("backHome");
const restartButton = document.getElementById("restartButton");

const levelsGrid = document.getElementById("levelsGrid");

const stageNumber = document.getElementById("stageNumber");
const difficulty = document.getElementById("difficulty");
const scoreDisplay = document.getElementById("score");

const caseTitle = document.getElementById("caseTitle");
const caseDescription = document.getElementById("caseDescription");
const answers = document.getElementById("answers");

const resultBox = document.getElementById("resultBox");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");

const nextButton = document.getElementById("nextButton");

const transition = document.getElementById("transition");
const transitionStage = document.getElementById("transitionStage");

const homeProgress = document.getElementById("homeProgress");
const homeProgressBar = document.getElementById("homeProgressBar");
const levelsProgress = document.getElementById("levelsProgress");

const finalScore = document.getElementById("finalScore");
const finalBar = document.getElementById("finalBar");
const finalRank = document.getElementById("finalRank");
const finalMessage = document.getElementById("finalMessage");

let currentStage = 1;
let correctAnswers = 0;
let score = 0;

let completedStages =
    Number(localStorage.getItem("varCompletedStages")) || 0;


/*
    الـ50 مرحلة
*/

const cases = [

    ["هل يوجد تسلل؟", "المهاجم تجاوز آخر مدافع بجزء بسيط من جسمه لحظة تمرير الكرة.", "تسلل", "لا يوجد تسلل"],

    ["هل تحتسب ركلة جزاء؟", "حدث احتكاك داخل منطقة الجزاء وسقط المهاجم.", "ركلة جزاء", "استمرار اللعب"],

    ["هل الهدف صحيح؟", "الكرة تجاوزت خط المرمى بالكامل قبل أن يخرجها المدافع.", "هدف", "لا يوجد هدف"],

    ["هل توجد لمسة يد؟", "الكرة اصطدمت بذراع اللاعب داخل منطقة الجزاء.", "لمسة يد", "استمرار اللعب"],

    ["هل يستحق اللاعب بطاقة؟", "دخل اللاعب على الخصم بتدخل متهور.", "بطاقة صفراء", "لا بطاقة"],

    ["هل يوجد تسلل؟", "المهاجم كان في موقف تسلل لكنه لم يشارك في اللعب.", "لا يوجد تسلل", "تسلل"],

    ["هل تحتسب ركلة جزاء؟", "المدافع لمس الكرة أولًا ثم حدث احتكاك مع المهاجم.", "استمرار اللعب", "ركلة جزاء"],

    ["هل الهدف صحيح؟", "المهاجم استلم الكرة من زميله وكان متقدمًا قليلًا عن المدافع الأخير.", "لا يوجد هدف", "هدف"],

    ["هل تستحق الحالة بطاقة حمراء؟", "تدخل قوي أدى إلى تعريض سلامة الخصم للخطر.", "بطاقة حمراء", "بطاقة صفراء"],

    ["هل توجد لمسة يد؟", "الكرة ارتدت من جسم اللاعب ثم لمست ذراعه.", "استمرار اللعب", "لمسة يد"],

    ["هل يوجد تسلل؟", "قدم المهاجم كانت على نفس خط آخر مدافع لحظة التمرير.", "لا يوجد تسلل", "تسلل"],

    ["هل تحتسب ركلة جزاء؟", "المدافع أمسك بقميص المهاجم داخل منطقة الجزاء.", "ركلة جزاء", "استمرار اللعب"],

    ["هل الهدف صحيح؟", "المهاجم لمس الكرة بيده قبل تسجيل الهدف.", "لا يوجد هدف", "هدف"],

    ["هل تستحق بطاقة حمراء؟", "اللاعب منع فرصة تسجيل واضحة بارتكاب مخالفة متعمدة.", "بطاقة حمراء", "بطاقة صفراء"],

    ["هل يوجد تسلل؟", "المهاجم كان متقدمًا لكن الكرة وصلت إليه بعد ارتدادها من الخصم.", "لا يوجد تسلل", "تسلل"],

    ["هل تحتسب ركلة جزاء؟", "الاحتكاك حدث خارج منطقة الجزاء مباشرة.", "لا توجد ركلة جزاء", "ركلة جزاء"],

    ["هل الهدف صحيح؟", "الحارس أمسك الكرة ثم دخل بها إلى داخل المرمى.", "هدف", "لا يوجد هدف"],

    ["هل توجد لمسة يد؟", "ذراع اللاعب كانت في وضع طبيعي وقريبة من جسمه.", "استمرار اللعب", "لمسة يد"],

    ["هل يستحق اللاعب بطاقة؟", "أوقف هجمة واعدة بمخالفة تكتيكية.", "بطاقة صفراء", "لا بطاقة"],

    ["هل يوجد تسلل؟", "اللاعب استلم الكرة وهو خلف آخر مدافع لكنه كان في نصف ملعبه.", "لا يوجد تسلل", "تسلل"],

    ["هل تحتسب ركلة جزاء؟", "المهاجم تعمد ترك قدمه خلف المدافع للحصول على احتكاك.", "استمرار اللعب", "ركلة جزاء"],

    ["هل الهدف صحيح؟", "المهاجم كان في موقف تسلل لكنه لم يلمس الكرة، والحارس أخطأ في التعامل معها.", "يعتمد على الحالة", "هدف دائمًا"],

    ["هل توجد لمسة يد؟", "الكرة اصطدمت بذراع اللاعب بعد أن حاول إبعادها عن جسمه.", "لمسة يد", "استمرار اللعب"],

    ["هل بطاقة حمراء؟", "التدخل كان باستخدام قوة مفرطة.", "بطاقة حمراء", "بطاقة صفراء"],

    ["هل يوجد تسلل؟", "اللاعب كان أقرب للمرمى من الكرة لحظة تمريرها.", "تسلل", "لا يوجد تسلل"],

    ["هل تحتسب ركلة جزاء؟", "المهاجم سقط دون وجود احتكاك واضح.", "استمرار اللعب", "ركلة جزاء"],

    ["هل الهدف صحيح؟", "الحكم أطلق صافرته قبل دخول الكرة للمرمى.", "لا يوجد هدف", "هدف"],

    ["هل توجد لمسة يد؟", "الكرة ارتدت من يد زميل اللاعب ثم لمست يده مباشرة.", "استمرار اللعب", "لمسة يد"],

    ["هل بطاقة صفراء؟", "اللاعب أوقف هجمة واعدة بعرقلة من الخلف.", "بطاقة صفراء", "لا بطاقة"],

    ["هل يوجد تسلل؟", "جزء من جسم المهاجم القابل للتسجيل كان متقدمًا عن المدافع.", "تسلل", "لا يوجد تسلل"],

    ["هل ركلة جزاء؟", "المدافع دفع المهاجم من الخلف داخل المنطقة.", "ركلة جزاء", "استمرار اللعب"],

    ["هل الهدف صحيح؟", "المهاجم كان في موقف تسلل لكنه لم يتدخل في اللعب.", "هدف", "لا يوجد هدف"],

    ["هل توجد لمسة يد؟", "الكرة ضربت كتف اللاعب ثم ذراعه.", "استمرار اللعب", "لمسة يد"],

    ["هل بطاقة حمراء؟", "اللاعب استخدم قوة خطيرة جدًا أثناء التدخل.", "بطاقة حمراء", "بطاقة صفراء"],

    ["هل يوجد تسلل؟", "المهاجم كان متقدمًا بجزء من قدمه فقط.", "تسلل", "لا يوجد تسلل"],

    ["هل ركلة جزاء؟", "المهاجم وصل للكرة أولًا ثم أسقطه المدافع.", "ركلة جزاء", "استمرار اللعب"],

    ["هل الهدف صحيح؟", "الكرة لم تتجاوز خط المرمى بالكامل.", "لا يوجد هدف", "هدف"],

    ["هل توجد لمسة يد؟", "اليد كانت خلف الجسم والكرة اصطدمت بها من مسافة قريبة.", "استمرار اللعب", "لمسة يد"],

    ["هل بطاقة صفراء؟", "اللاعب ارتكب مخالفة لإيقاف هجمة واعدة.", "بطاقة صفراء", "لا بطاقة"],

    ["هل يوجد تسلل؟", "المهاجم كان على نفس مستوى ثاني آخر مدافع.", "لا يوجد تسلل", "تسلل"],

    ["هل ركلة جزاء؟", "المدافع لمس قدم المهاجم قبل أن يلمس الكرة.", "ركلة جزاء", "استمرار اللعب"],

    ["هل الهدف صحيح؟", "المهاجم سجل بعد ارتداد الكرة من القائم.", "هدف", "لا يوجد هدف"],

    ["هل توجد لمسة يد؟", "اللاعب حرّك يده نحو الكرة بشكل واضح.", "لمسة يد", "استمرار اللعب"],

    ["هل بطاقة حمراء؟", "اللاعب حرم الخصم من فرصة محققة بطريقة مخالفة.", "بطاقة حمراء", "بطاقة صفراء"],

    ["هل يوجد تسلل؟", "المهاجم كان خلف الكرة لحظة التمرير.", "لا يوجد تسلل", "تسلل"],

    ["هل ركلة جزاء؟", "الاحتكاك كان طبيعيًا أثناء محاولة لعب الكرة.", "استمرار اللعب", "ركلة جزاء"],

    ["هل الهدف صحيح؟", "المهاجم سجل بقدمه دون وجود مخالفة قبل التسديد.", "هدف", "لا يوجد هدف"],

    ["هل توجد لمسة يد؟", "اللاعب تعمد توسيع جسمه بذراعه ومنع الكرة.", "لمسة يد", "استمرار اللعب"],

    ["هل بطاقة حمراء؟", "الحالة تتضمن تدخلًا عنيفًا جدًا في آخر مراحل المباراة.", "بطاقة حمراء", "بطاقة صفراء"]

];


/*
    أصوات اللعبة
    يتم توليدها من المتصفح بدون ملفات خارجية
*/

const audioContext =
    new (window.AudioContext || window.webkitAudioContext)();


function sound(frequency, duration, type = "sine") {

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.18,
        audioContext.currentTime + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(
        audioContext.currentTime + duration
    );
}


function correctSound() {

    sound(523, .12);
    setTimeout(() => sound(659, .12), 100);
    setTimeout(() => sound(784, .2), 200);

}


function wrongSound() {

    sound(220, .18, "sawtooth");
    setTimeout(() => sound(150, .25, "sawtooth"), 130);

}


function transitionSound() {

    sound(330, .08);
    setTimeout(() => sound(440, .08), 80);
    setTimeout(() => sound(660, .18), 160);

}


/*
    الصفحة الرئيسية
*/

startButton.addEventListener("click", () => {

    showLevels();

});


backHome.addEventListener("click", () => {

    showScreen(home);

});


function showScreen(screen) {

    document.querySelectorAll(".screen")
        .forEach(s => s.classList.remove("active"));

    screen.classList.add("active");

}


/*
    المراحل
*/

function showLevels() {

    showScreen(levels);

    renderLevels();

}


function renderLevels() {

    levelsGrid.innerHTML = "";

    levelsProgress.textContent =
        completedStages + " / 50";

    for (let i = 1; i <= 50; i++) {

        const button =
            document.createElement("button");

        button.className = "level";

        button.textContent =
            String(i).padStart(2, "0");

        if (i <= completedStages) {

            button.classList.add("completed");
            button.innerHTML =
                "✓";

        }

        if (i === completedStages + 1) {

            button.classList.add("unlocked");
            button.classList.add("current");

        }

        if (i > completedStages + 1) {

            button.classList.add("locked");
            button.textContent = "🔒";

        }

        if (i <= completedStages + 1) {

            button.addEventListener("click", () => {

                currentStage = i;

                startStage();

            });

        }

        levelsGrid.appendChild(button);

    }

}


/*
    بداية المرحلة
*/

function startStage() {

    showTransition(() => {

        showScreen(game);

        loadStage();

    });

}


/*
    الانتقال الفخم
*/

function showTransition(callback) {

    transitionStage.textContent =
        "المرحلة " +
        String(currentStage).padStart(2, "0");

    transition.classList.add("show");

    transitionSound();

    setTimeout(() => {

        transition.classList.remove("show");

        callback();

    }, 1000);

}


/*
    تحميل المرحلة
*/

function loadStage() {

    const data =
        cases[currentStage - 1];

    stageNumber.textContent =
        String(currentStage).padStart(2, "0");

    scoreDisplay.textContent = score;

    difficulty.textContent =
        getDifficulty(currentStage);

    caseTitle.textContent =
        data[0];

    caseDescription.textContent =
        data[1];

    answers.innerHTML = "";

    resultBox.classList.add("hidden");
    nextButton.classList.add("hidden");

    data.slice(2).forEach(answer => {

        const button =
            document.createElement("button");

        button.className = "answer";

        button.textContent = answer;

        button.addEventListener("click", () => {

            chooseAnswer(button, answer);

        });

        answers.appendChild(button);

    });

}


/*
    مستوى الصعوبة
*/

function getDifficulty(stage) {

    if (stage <= 10) return "سهل";
    if (stage <= 20) return "متوسط";
    if (stage <= 30) return "صعب";
    if (stage <= 40) return "خبير";

    return "نخبة";

}


/*
    اختيار الإجابة
*/

function chooseAnswer(button, answer) {

    const data =
        cases[currentStage - 1];

    const correctAnswer =
        data[2];

    const allButtons =
        document.querySelectorAll(".answer");

    allButtons.forEach(btn => {

        btn.classList.add("disabled");

    });


    if (answer === correctAnswer) {

        button.classList.add("correct");

        correctAnswers++;

        score += 100;

        resultBox.classList.remove("hidden");

        resultBox.classList.remove("wrong-result");

        resultIcon.textContent = "✓";

        resultTitle.textContent =
            "إجابة صحيحة!";

        resultDescription.textContent =
            "قرار ممتاز. عين الحكم عندك قوية.";

        correctSound();

    } else {

        button.classList.add("wrong");

        allButtons.forEach(btn => {

            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }

        });

        resultBox.classList.remove("hidden");

        resultBox.classList.add("wrong-result");

        resultIcon.textContent = "×";

        resultTitle.textContent =
            "إجابة غير صحيحة";

        resultDescription.textContent =
            "القرار الصحيح هو: " +
            correctAnswer;

        wrongSound();

    }


    scoreDisplay.textContent = score;

    nextButton.classList.remove("hidden");

}


/*
    المرحلة التالية
*/

nextButton.addEventListener("click", () => {

    if (currentStage >= 50) {

        finishGame();

        return;

    }

    currentStage++;

    if (currentStage > completedStages) {

        completedStages = currentStage - 1;

        localStorage.setItem(
            "varCompletedStages",
            completedStages
        );

    }

    showTransition(() => {

        loadStage();

    });

});


/*
    نهاية اللعبة
*/

function finishGame() {

    completedStages = 50;

    localStorage.setItem(
        "varCompletedStages",
        50
    );

    finalScore.textContent =
        correctAnswers;

    finalBar.style.width =
        ((correctAnswers / 50) * 100) + "%";


    if (correctAnswers >= 48) {

        finalRank.textContent =
            "🏆 حكم استثنائي";

        finalMessage.textContent =
            "قراراتك كانت على مستوى عالٍ جدًا. لديك عين ممتازة في قراءة الحالات التحكيمية.";

    } else if (correctAnswers >= 42) {

        finalRank.textContent =
            "👑 حكم ممتاز";

        finalMessage.textContent =
            "مستوى قوي جدًا في اتخاذ القرارات ومراجعة الحالات.";

    } else if (correctAnswers >= 35) {

        finalRank.textContent =
            "⭐ حكم جيد جدًا";

        finalMessage.textContent =
            "لديك أساس ممتاز، ومع المزيد من التدريب ستصبح أقوى.";

    } else if (correctAnswers >= 25) {

        finalRank.textContent =
            "⚽ حكم جيد";

        finalMessage.textContent =
            "أداء جيد، لكن بعض الحالات الصعبة تحتاج إلى تركيز أكثر.";

    } else {

        finalRank.textContent =
            "📋 حكم تحت التدريب";

        finalMessage.textContent =
            "أكملت الاختبار، والآن تعرف الحالات التي تحتاج إلى تطويرها.";

    }


    showScreen(finalScreen);

    sound(523, .15);

    setTimeout(() => sound(659, .15), 150);

    setTimeout(() => sound(784, .3), 300);

}


/*
    إعادة الاختبار
*/

restartButton.addEventListener("click", () => {

    currentStage = 1;
    correctAnswers = 0;
    score = 0;

    showLevels();

});


/*
    تحديث الصفحة الرئيسية
*/

function updateHome() {

    homeProgress.textContent =
        completedStages + " / 50";

    homeProgressBar.style.width =
        ((completedStages / 50) * 100) + "%";

}

updateHome();
