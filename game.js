const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("timer");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeLeft = 15;
let timer;

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// Predefined questions and feedback
const questions = [
  {
    question: "What is a firewall?",
    choice1: "A type of malware",
    choice2: "A network security system",
    choice3: "An encryption method",
    choice4: "A type of virus",
    answer: 2,
    feedback: "A firewall is a network security system that monitors and controls incoming and outgoing network traffic."
  },
  {
    question: "What does HTTPS stand for?",
    choice1: "HyperText Transfer Protocol Secure",
    choice2: "High Transfer Text Protocol Secure",
    choice3: "Hyper Transfer Text Process Secure",
    choice4: "Hyper Transfer Protocol Safe",
    answer: 1,
    feedback: "HTTPS encrypts communication between browser and server, keeping your data safe."
  },
  {
    question: "What is phishing?",
    choice1: "A method of fishing",
    choice2: "Hacking into a database",
    choice3: "Fraudulent attempts to obtain sensitive information",
    choice4: "A type of virus",
    answer: 3,
    feedback: "Phishing is a scam designed to steal sensitive information through fake emails or messages."
  },
  {
    question: "What is ransomware?",
    choice1: "A program that steals passwords",
    choice2: "A malware that demands payment to unlock data",
    choice3: "A tool for testing system vulnerabilities",
    choice4: "A software used for encrypting files",
    answer: 2,
    feedback: "Ransomware is a type of malware that encrypts data and demands payment for its decryption."
  },
  {
    question: "What is the purpose of two-factor authentication (2FA)?",
    choice1: "To provide an alternative to passwords",
    choice2: "To add an extra layer of security by combining two forms of verification",
    choice3: "To reset passwords more easily",
    choice4: "To increase the speed of authentication",
    answer: 2,
    feedback: "2FA enhances security by requiring a password and an additional verification method, like a code sent to your phone."
  },
  {
    question: "What is a brute force attack?",
    choice1: "An attempt to guess passwords by trying all possible combinations",
    choice2: "A network attack that overloads servers",
    choice3: "A phishing attack on multiple users",
    choice4: "A malware that spreads through brute systems",
    answer: 1,
    feedback: "A brute force attack involves systematically trying all possible combinations of a password until the correct one is found."
  },
  {
    question: "What does the principle of 'Least Privilege' mean in cybersecurity?",
    choice1: "Granting users the maximum access rights",
    choice2: "Limiting access to only what is necessary for a user's role",
    choice3: "Allowing unrestricted access during off-peak hours",
    choice4: "Sharing privileges among all users equally",
    answer: 2,
    feedback: "The principle of 'Least Privilege' ensures users have only the access needed to perform their job, reducing security risks."
  },
  {
    question: "What is a VPN used for?",
    choice1: "Detecting malware on a network",
    choice2: "Encrypting internet traffic and masking your IP address",
    choice3: "Blocking malicious websites",
    choice4: "Speeding up internet connections",
    answer: 2,
    feedback: "A VPN encrypts your internet traffic and hides your IP address, improving online privacy and security."
  },
  {
    question: "What is social engineering in cybersecurity?",
    choice1: "Using advanced algorithms to hack networks",
    choice2: "Manipulating people to disclose confidential information",
    choice3: "Developing software to protect against threats",
    choice4: "Encrypting data to prevent theft",
    answer: 2,
    feedback: "Social engineering exploits human psychology to manipulate individuals into divulging sensitive information."
  },
  {
    question: "What is a zero-day vulnerability?",
    choice1: "A flaw in software that is exploited before it is patched",
    choice2: "A bug that is fixed within a day of discovery",
    choice3: "A vulnerability in outdated hardware",
    choice4: "An error that occurs when software runs for 24 hours",
    answer: 1,
    feedback: "A zero-day vulnerability is a security flaw that attackers exploit before the developer has issued a fix."
  },
  
  // Add more questions as needed
];

// Start the game
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

// Get a new question
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html"); // Redirect to the end page
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

  resetTimer();
};

// Handle choice selection
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      feedbackElement.innerText = "Correct!";
      incrementScore(CORRECT_BONUS);
    } else {
      const correctAnswer = currentQuestion["choice" + currentQuestion.answer];
      feedbackElement.innerText = `Oops! The correct answer was '${correctAnswer}'. ${currentQuestion.feedback}`;
    }

    feedbackElement.classList.remove("hidden");
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      feedbackElement.classList.add("hidden");
      getNewQuestion();
    }, 3000);
  });
});

// Increment score
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

// Timer functions
startTimer = () => {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timerElement.innerText = `${timeLeft}s`;
      timeLeft--;
    } else {
      clearInterval(timer);
      declareIncorrect();
    }
  }, 1000);
};

resetTimer = () => {
  clearInterval(timer);
  timeLeft = 15;
  timerElement.innerText = `${timeLeft}s`;
  startTimer();
};

// Start the game when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  startGame();
});


