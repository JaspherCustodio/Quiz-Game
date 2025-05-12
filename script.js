const questions = [
	{
		question: "What is the capital of the Philippines?",
		answers: [
			{text: "Cebu City", correct: false},
			{text: "Davao City", correct: false},
			{text: "Manila", correct: true},
			{text: "Quezon City", correct: false},
		]
	},
	{
		question: "Who is known as the national hero of the Philippines?",
		answers: [
			{text: "Andres Bonifacio", correct: false},
			{text: "Jose Rizal", correct: true},
			{text: "Emilio Aquinaldo", correct: false},
			{text: "Apolinario Mabini", correct: false},
		]
	},
	{
		question: "What is the longest river in the Philippines?",
		answers: [
			{text: "Agusan River", correct: false},
			{text: "Marikina River", correct: false},
			{text: "Cagayan River", correct: true},
			{text: "Pasig River", correct: false},
		]
	},
	{
		question: "What is the Philippine national bird?",
		answers: [
			{text: "Maya", correct: false},
			{text: "Eagle", correct: true},
			{text: "Owl", correct: false},
			{text: "Parrot", correct: false},
		]
	},
	{
		question: "In which year did the Philippines gain independence fro the United States?",
		answers: [
			{text: "1898", correct: false},
			{text: "1941", correct: false},
			{text: "1946", correct: true},
			{text: "1965", correct: false},
		]
	},
	{
		question: "What is the smallest province in the Philippines by land area?",
		answers: [
			{text: "Batanes", correct: true},
			{text: "Siquijor", correct: false},
			{text: "Marinduque", correct: false},
			{text: "Camiguin", correct: false},
		]
	},
	{
		question: "Which Filipino boxer is an 8-division world champion?",
		answers: [
			{text: "Nonito Donaire", correct: false},
			{text: "Flash Elorde", correct: false},
			{text: "Manny Pacquiao", correct: true},
			{text: "Jerwin Ancajas", correct: false},
		]
	},
	{
		question: "What is the native script of ancient Filipinos called?",
		answers: [
			{text: "Hiragani", correct: false},
			{text: "Baybayin", correct: true},
			{text: "Alibata", correct: false},
			{text: "Katakana", correct: false},
		]
	},
	{
		question: "What is the name of the active volcano near Legazpi City?",
		answers: [
			{text: "Taal Volcano", correct: false},
			{text: "Kanlaon", correct: false},
			{text: "Hibok-Hibok", correct: false},
			{text: "Mayon Volcano", correct: true},
		]
	},
	{
		question: "Which festival is celebrated in Cebu every January?",
		answers: [
			{text: "Pahiyas", correct: false},
			{text: "Kadayawan", correct: false},
			{text: "Sinulog", correct: true},
			{text: "Ati-Atihan", correct: false},
		]
	}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	})
}

function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e){
	const selectBtn = e.target;
	const isCorrect = selectBtn.dataset.correct === "true";
	if(isCorrect){
		selectBtn.classList.add("correct");
		score++;
	} else {
		selectBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	} else {
		showScore();
	}
}

nextButton.addEventListener("click", ()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	} else {
		startQuiz();
	}
});

function showScore(){
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}

startQuiz();