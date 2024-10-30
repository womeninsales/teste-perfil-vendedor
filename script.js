const questions = [
    {
        question: "Como você reage ao receber uma objeção de preço do cliente?",
        options: [
            { text: "Explico por que o valor faz sentido e mostro o impacto do ROI.", points: 5 },
            { text: "Tento negociar com um desconto no momento certo.", points: 4 },
            { text: "Reforço os benefícios até convencer.", points: 3 },
            { text: "Busco entender o que o cliente precisa para aceitar o valor.", points: 2 },
            { text: "Verifico se existe alguma questão técnica que precise ser resolvida.", points: 1 }
        ]
    },
    // Adicione as outras perguntas aqui seguindo o mesmo formato...
];

const questionsContainer = document.getElementById('questions-container');
const quizForm = document.getElementById('quiz-form');
const resultContainer = document.getElementById('result');
const profileResult = document.getElementById('profile-result');

function renderQuestions() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionTitle = document.createElement('h3');
        questionTitle.innerText = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionTitle);

        q.options.forEach(option => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question-${index}`;
            radio.value = option.points;
            label.appendChild(radio);
            label.append(option.text);
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });

        questionsContainer.appendChild(questionDiv);
    });
}

function calculateScore(formData) {
    let totalScore = 0;
    for (let [key, value] of formData.entries()) {
        totalScore += parseInt(value);
    }
    return totalScore;
}

function getProfile(score) {
    if (score >= 41) return "Challenger – Estratégico e questionador.";
    if (score >= 31) return "Lone Wolf – Independente e confiante.";
    if (score >= 21) return "Hard Worker – Persistente e automotivado.";
    if (score >= 11) return "Relationship Builder – Constrói relações fortes.";
    return "Problem Solver – Focado nos detalhes.";
}

quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(quizForm);
    const score = calculateScore(formData);
    const profile = getProfile(score);

    profileResult.innerText = `Sua pontuação: ${score}\n${profile}`;
    quizForm.classList.add('hidden');
    resultContainer.classList.remove('hidden');
});

function restartQuiz() {
    quizForm.reset();
    quizForm.classList.remove('hidden');
    resultContainer.classList.add('hidden');
}

renderQuestions();
