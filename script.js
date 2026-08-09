let currentQuestion = 0;
let score = 0;

let studentName = "";
let department = "";
let year = "";

let timeLeft = 30;
let timer;

let userAnswers = [];

const questions = [
    {
        question: "Which language is used to create the structure of a web page?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "HTML"
    },

    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "CSS", "Java", "C++"],
        answer: "CSS"
    },

    {
        question: "Which language is used to make web pages interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing Utility"
        ],
        answer: "Central Processing Unit"
    },

    {
        question: "Which one is an operating system?",
        options: ["Windows", "HTML", "Google", "Python"],
        answer: "Windows"
    }
];

function startQuiz() {

    studentName =
        document.getElementById("studentName").value;

    department =
        document.getElementById("department").value;

    year =
        document.getElementById("year").value;

    if (studentName.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    if (department === "") {
        alert("Please select your department.");
        return;
    }

    if (year === "") {
        alert("Please select your year.");
        return;
    }

    currentQuestion = 0;
    score = 0;
    userAnswers = [];

    document.getElementById("startScreen").style.display =
        "none";

    document.getElementById("quizScreen").style.display =
        "block";

    showQuestion();
    startTimer();
}

function showQuestion() {

    const questionElement =
        document.getElementById("question");

    const optionsElement =
        document.getElementById("options");

    questionElement.innerText =
        (currentQuestion + 1) + ". " +
        questions[currentQuestion].question;

    document.getElementById("questionNumber").innerText =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;

    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

    optionsElement.innerHTML = "";

    timeLeft = 30;

    document.getElementById("timer").innerText =
        "Time: 30s";

    questions[currentQuestion].options.forEach(
        function(option) {

            const button =
                document.createElement("button");

            button.innerText = option;

            button.classList.add("option");

            button.onclick = function() {
                selectAnswer(button, option);
            };

            optionsElement.appendChild(button);
        }
    );
}

function selectAnswer(
    selectedButton,
    selectedAnswer
) {

    const correctAnswer =
        questions[currentQuestion].answer;

    userAnswers[currentQuestion] =
        selectedAnswer;

    const buttons =
        document.querySelectorAll(".option");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {

        selectedButton.classList.add("correct");

        score++;

    } else {

        selectedButton.classList.add("wrong");

        buttons.forEach(function(button) {

            if (button.innerText === correctAnswer) {
                button.classList.add("correct");
            }

        });
    }
}

function nextQuestion() {

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();
        startTimer();

    } else {

        showResult();
    }
}

function startTimer() {

    clearInterval(timer);

    timer = setInterval(function() {

        timeLeft--;

        document.getElementById("timer").innerText =
            "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {

            clearInterval(timer);

            userAnswers[currentQuestion] =
                "Not Answered";

            nextQuestion();
        }

    }, 1000);
}

function showResult() {

    clearInterval(timer);

    document.getElementById("quizScreen").style.display =
        "none";

    document.getElementById("resultScreen").style.display =
        "block";

    document.getElementById("resultName").innerText =
        studentName;

    document.getElementById("score").innerText =
        score + " / " + questions.length;

    const percentage =
        (score / questions.length) * 100;

    document.getElementById("percentage").innerText =
        percentage + "%";

    const status =
        document.getElementById("resultStatus");

    const message =
        document.getElementById("performanceMessage");

    if (percentage >= 50) {

        status.innerText = "PASS ✅";

        status.className =
            "result-status pass";

        message.innerText =
            "Great job! Keep learning and improving.";

    } else {

        status.innerText = "FAIL ❌";

        status.className =
            "result-status fail";

        message.innerText =
            "Keep practicing. You can do better next time!";
    }

    showAnswerSummary();
}

function showAnswerSummary() {

    const summary =
        document.getElementById("answerSummary");

    summary.innerHTML =
        "<h3>Answer Summary</h3>";

    questions.forEach(function(question, index) {

        const userAnswer =
            userAnswers[index] ||
            "Not Answered";

        const result =
            document.createElement("p");

        result.innerHTML =
            "<strong>Q" +
            (index + 1) +
            ":</strong> " +
            userAnswer +
            " | Correct: " +
            question.answer;

        if (userAnswer === question.answer) {

            result.classList.add(
                "summary-correct"
            );

        } else {

            result.classList.add(
                "summary-wrong"
            );
        }

        summary.appendChild(result);
    });
}
function printResult() {
    window.print();
}