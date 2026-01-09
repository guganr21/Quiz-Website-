// =============================================
// QUIZ DATA - 300 QUESTIONS (Sample of each category)
// =============================================

const questionBank = {
    // General Knowledge Questions (100 total - showing 10 as examples)
    generalKnowledge: [
        {
            question: "What is the capital city of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            correct: 2,
            category: "General Knowledge"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1,
            category: "General Knowledge"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
            correct: 1,
            category: "General Knowledge"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3,
            category: "General Knowledge"
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
            correct: 1,
            category: "General Knowledge"
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Platinum"],
            correct: 2,
            category: "General Knowledge"
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "Thailand", "Japan", "South Korea"],
            correct: 2,
            category: "General Knowledge"
        },
        {
            question: "Who wrote the play 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correct: 1,
            category: "General Knowledge"
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
            correct: 1,
            category: "General Knowledge"
        },
        {
            question: "Which animal is known as the 'King of the Jungle'?",
            options: ["Elephant", "Tiger", "Lion", "Gorilla"],
            correct: 2,
            category: "General Knowledge"
        }
        // 90 more General Knowledge questions would be added here
    ],
    
    // Geopolitics Questions (100 total - showing 10 as examples)
    geopolitics: [
        {
            question: "Which country is not a permanent member of the United Nations Security Council?",
            options: ["United States", "China", "Germany", "Russia"],
            correct: 2,
            category: "Geopolitics"
        },
        {
            question: "What year did the Berlin Wall fall?",
            options: ["1987", "1989", "1991", "1993"],
            correct: 1,
            category: "Geopolitics"
        },
        {
            question: "Which organization was established by the Treaty of Rome in 1957?",
            options: ["NATO", "European Economic Community", "United Nations", "WTO"],
            correct: 1,
            category: "Geopolitics"
        },
        {
            question: "What is the capital of Ukraine?",
            options: ["Lviv", "Kharkiv", "Kyiv", "Odessa"],
            correct: 2,
            category: "Geopolitics"
        },
        {
            question: "Which country is the world's largest democracy by population?",
            options: ["United States", "India", "Indonesia", "Brazil"],
            correct: 1,
            category: "Geopolitics"
        },
        {
            question: "What is the currency of Switzerland?",
            options: ["Euro", "Swiss Franc", "Swiss Mark", "Swiss Lira"],
            correct: 1,
            category: "Geopolitics"
        },
        {
            question: "Which country has the longest coastline in the world?",
            options: ["Canada", "Russia", "Indonesia", "Australia"],
            correct: 0,
            category: "Geopolitics"
        },
        {
            question: "The Suez Canal connects which two bodies of water?",
            options: ["Mediterranean Sea and Red Sea", "Atlantic Ocean and Pacific Ocean", "Black Sea and Aegean Sea", "Indian Ocean and Arabian Sea"],
            correct: 0,
            category: "Geopolitics"
        },
        {
            question: "Which country is not a member of the European Union?",
            options: ["Norway", "Germany", "France", "Italy"],
            correct: 0,
            category: "Geopolitics"
        },
        {
            question: "What is the most widely spoken language in the world by number of native speakers?",
            options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
            correct: 2,
            category: "Geopolitics"
        }
        // 90 more Geopolitics questions would be added here
    ],
    
    // Current Affairs Questions (100 total - showing 10 as examples)
    currentAffairs: [
        {
            question: "As of 2023, which country has the world's largest economy?",
            options: ["United States", "China", "Japan", "Germany"],
            correct: 0,
            category: "Current Affairs"
        },
        {
            question: "Which country hosted the 2022 FIFA World Cup?",
            options: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait"],
            correct: 2,
            category: "Current Affairs"
        },
        {
            question: "As of 2023, who is the Secretary-General of the United Nations?",
            options: ["Ban Ki-moon", "António Guterres", "Kofi Annan", "Boutros Boutros-Ghali"],
            correct: 1,
            category: "Current Affairs"
        },
        {
            question: "Which tech company launched ChatGPT in November 2022?",
            options: ["Google", "Microsoft", "OpenAI", "Meta"],
            correct: 2,
            category: "Current Affairs"
        },
        {
            question: "Which country applied to join BRICS in 2023?",
            options: ["Mexico", "Turkey", "Saudi Arabia", "Indonesia"],
            correct: 2,
            category: "Current Affairs"
        },
        {
            question: "As of 2023, which country has the world's largest population?",
            options: ["India", "China", "United States", "Indonesia"],
            correct: 1,
            category: "Current Affairs"
        },
        {
            question: "Which cryptocurrency experienced a major collapse in 2022?",
            options: ["Bitcoin", "Ethereum", "Terra (LUNA)", "Dogecoin"],
            correct: 2,
            category: "Current Affairs"
        },
        {
            question: "Which country won the 2023 Rugby World Cup?",
            options: ["New Zealand", "South Africa", "England", "Ireland"],
            correct: 1,
            category: "Current Affairs"
        },
        {
            question: "In 2023, which country experienced severe wildfires in Maui?",
            options: ["Greece", "Canada", "Australia", "United States"],
            correct: 3,
            category: "Current Affairs"
        },
        {
            question: "Which country launched the Chandrayaan-3 moon mission in 2023?",
            options: ["United States", "China", "India", "Russia"],
            correct: 2,
            category: "Current Affairs"
        }
        // 90 more Current Affairs questions would be added here
    ]
};

// =============================================
// APP STATE AND VARIABLES
// =============================================

let currentScreen = 'welcome';
let playerName = '';
let selectedCategories = ['generalKnowledge', 'geopolitics', 'currentAffairs'];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let quizQuestions = [];
let quizStartTime = null;
let quizEndTime = null;

// =============================================
// DOM ELEMENTS
// =============================================

// Screens
const screens = {
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen'),
    leaderboard: document.getElementById('leaderboard-screen')
};

// Welcome screen elements
const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const categoryCheckboxes = {
    gk: document.getElementById('category-gk'),
    geo: document.getElementById('category-geo'),
    current: document.getElementById('category-current')
};

// Quiz screen elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.querySelector('.options-container');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const currentPlayer = document.getElementById('current-player');
const currentScore = document.getElementById('current-score');
const currentCategory = document.getElementById('current-category');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

// Results screen elements
const finalScore = document.getElementById('final-score');
const resultsPlayer = document.getElementById('results-player');
const resultsMessage = document.getElementById('results-message');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const timeTaken = document.getElementById('time-taken');
const retryBtn = document.getElementById('retry-btn');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const homeBtn = document.getElementById('home-btn');

// Leaderboard screen elements
const leaderboardBody = document.getElementById('leaderboard-body');
const emptyLeaderboard = document.getElementById('empty-leaderboard');
const allScoresBtn = document.getElementById('all-scores-btn');
const todayScoresBtn = document.getElementById('today-scores-btn');
const weekScoresBtn = document.getElementById('week-scores-btn');
const clearLeaderboardBtn = document.getElementById('clear-leaderboard');
const backToHomeBtn = document.getElementById('back-to-home');

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Get random questions from selected categories
function getRandomQuestions() {
    // Combine questions from selected categories
    let allQuestions = [];
    selectedCategories.forEach(category => {
        allQuestions = allQuestions.concat(questionBank[category]);
    });
    
    // Shuffle all questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    
    // Select first 10 questions
    return shuffled.slice(0, 10);
}

// Format time in minutes and seconds
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

// =============================================
// QUIZ LOGIC FUNCTIONS
// =============================================

// Initialize quiz
function initializeQuiz() {
    // Get player name
    playerName = playerNameInput.value.trim() || 'Anonymous';
    
    // Update selected categories
    selectedCategories = [];
    if (categoryCheckboxes.gk.checked) selectedCategories.push('generalKnowledge');
    if (categoryCheckboxes.geo.checked) selectedCategories.push('geopolitics');
    if (categoryCheckboxes.current.checked) selectedCategories.push('currentAffairs');
    
    // If no categories selected, default to all
    if (selectedCategories.length === 0) {
        selectedCategories = ['generalKnowledge', 'geopolitics', 'currentAffairs'];
        categoryCheckboxes.gk.checked = true;
        categoryCheckboxes.geo.checked = true;
        categoryCheckboxes.current.checked = true;
    }
    
    // Get random questions
    quizQuestions = getRandomQuestions();
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    score = 0;
    quizStartTime = new Date();
    
    // Update UI
    currentPlayer.textContent = playerName;
    currentScore.textContent = 'Score: 0';
    
    // Show quiz screen
    showScreen('quiz');
    loadQuestion();
}

// Load current question
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update progress
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    progressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;
    
    // Update question text
    questionText.textContent = question.question;
    currentCategory.textContent = question.category;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option elements
    const optionLabels = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <span class="option-label">${optionLabels[index]}</span>
            <span class="option-text">${option}</span>
        `;
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === quizQuestions.length - 1;
    
    // Show submit button on last question
    if (currentQuestionIndex === quizQuestions.length - 1) {
        submitBtn.style.display = 'flex';
        nextBtn.style.display = 'none';
    } else {
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'flex';
    }
}

// Select an option
function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI to show selected option
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (index === optionIndex) {
            option.classList.add('selected');
        }
    });
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Navigate to previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Submit quiz and show results
function submitQuiz() {
    // Calculate score
    score = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    // Record end time
    quizEndTime = new Date();
    const timeInSeconds = Math.floor((quizEndTime - quizStartTime) / 1000);
    
    // Save to leaderboard
    saveToLeaderboard(score, timeInSeconds);
    
    // Show results screen
    showResults(score, timeInSeconds);
}

// Show results screen
function showResults(finalScoreValue, timeInSeconds) {
    // Update results UI
    finalScore.textContent = finalScoreValue;
    resultsPlayer.textContent = playerName;
    correctCount.textContent = finalScoreValue;
    incorrectCount.textContent = 10 - finalScoreValue;
    timeTaken.textContent = formatTime(timeInSeconds);
    
    // Set result message based on score
    let message = '';
    if (finalScoreValue <= 3) {
        message = "Keep practicing! You'll do better next time.";
    } else if (finalScoreValue <= 6) {
        message = "Good effort! You have solid general knowledge.";
    } else if (finalScoreValue <= 8) {
        message = "Great job! You're very knowledgeable.";
    } else {
        message = "Excellent! You're a true trivia master!";
    }
    resultsMessage.textContent = message;
    
    // Show results screen
    showScreen('results');
}

// =============================================
// LEADERBOARD FUNCTIONS
// =============================================

// Save score to leaderboard
function saveToLeaderboard(score, timeInSeconds) {
    // Get existing leaderboard
    let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
    
    // Create new score entry
    const scoreEntry = {
        player: playerName,
        score: score,
        date: getCurrentDate(),
        timestamp: new Date().getTime(),
        time: timeInSeconds,
        categories: selectedCategories.join(', ')
    };
    
    // Add to leaderboard
    leaderboard.push(scoreEntry);
    
    // Sort by score (highest first) and time (fastest first for same score)
    leaderboard.sort((a, b) => {
        if (b.score === a.score) {
            return a.time - b.time;
        }
        return b.score - a.score;
    });
    
    // Keep only top 25 scores
    leaderboard = leaderboard.slice(0, 25);
    
    // Save back to localStorage
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
}

// Load and display leaderboard
function loadLeaderboard(filter = 'all') {
    // Get leaderboard from localStorage
    let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
    
    // Apply filter if needed
    if (filter !== 'all') {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const weekAgo = today - (7 * 24 * 60 * 60 * 1000);
        
        leaderboard = leaderboard.filter(entry => {
            const entryDate = new Date(entry.timestamp).getTime();
            if (filter === 'today') {
                return entryDate >= today;
            } else if (filter === 'week') {
                return entryDate >= weekAgo;
            }
            return true;
        });
    }
    
    // Clear table
    leaderboardBody.innerHTML = '';
    
    // Show empty state if no scores
    if (leaderboard.length === 0) {
        emptyLeaderboard.style.display = 'flex';
        return;
    }
    
    // Hide empty state
    emptyLeaderboard.style.display = 'none';
    
    // Add rows to table
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        
        // Format date
        const dateObj = new Date(entry.timestamp);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Format time
        const formattedTime = formatTime(entry.time);
        
        row.innerHTML = `
            <td class="rank-cell">${index + 1}</td>
            <td class="player-cell">${entry.player}</td>
            <td class="score-cell">${entry.score}/10</td>
            <td class="date-cell">${formattedDate}<br><small>${formattedTime}</small></td>
            <td class="category-cell">${entry.categories}</td>
        `;
        
        leaderboardBody.appendChild(row);
    });
}

// Clear leaderboard
function clearLeaderboard() {
    if (confirm('Are you sure you want to clear the leaderboard? This action cannot be undone.')) {
        localStorage.removeItem('quizLeaderboard');
        loadLeaderboard('all');
        
        // Reset filter buttons
        allScoresBtn.classList.add('active');
        todayScoresBtn.classList.remove('active');
        weekScoresBtn.classList.remove('active');
    }
}

// =============================================
// SCREEN MANAGEMENT
// =============================================

// Show specific screen
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show requested screen
    screens[screenName].classList.add('active');
    currentScreen = screenName;
    
    // Perform screen-specific setup
    if (screenName === 'leaderboard') {
        loadLeaderboard();
    } else if (screenName === 'welcome') {
        // Reset form
        playerNameInput.value = playerName || '';
    }
}

// =============================================
// EVENT LISTENERS
// =============================================

// Welcome screen
startBtn.addEventListener('click', initializeQuiz);
playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        initializeQuiz();
    }
});

// Quiz screen navigation
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', submitQuiz);

// Results screen buttons
retryBtn.addEventListener('click', () => {
    initializeQuiz();
});

leaderboardBtn.addEventListener('click', () => {
    showScreen('leaderboard');
});

homeBtn.addEventListener('click', () => {
    showScreen('welcome');
});

// Leaderboard screen buttons
allScoresBtn.addEventListener('click', () => {
    allScoresBtn.classList.add('active');
    todayScoresBtn.classList.remove('active');
    weekScoresBtn.classList.remove('active');
    loadLeaderboard('all');
});

todayScoresBtn.addEventListener('click', () => {
    allScoresBtn.classList.remove('active');
    todayScoresBtn.classList.add('active');
    weekScoresBtn.classList.remove('active');
    loadLeaderboard('today');
});

weekScoresBtn.addEventListener('click', () => {
    allScoresBtn.classList.remove('active');
    todayScoresBtn.classList.remove('active');
    weekScoresBtn.classList.add('active');
    loadLeaderboard('week');
});

clearLeaderboardBtn.addEventListener('click', clearLeaderboard);
backToHomeBtn.addEventListener('click', () => {
    showScreen('welcome');
});

// =============================================
// INITIALIZATION
// =============================================

// Initialize app on load
document.addEventListener('DOMContentLoaded', () => {
    // Set default player name
    playerNameInput.value = 'Quiz Player';
    
    // Show welcome screen
    showScreen('welcome');
    
    // Load any saved leaderboard data
    if (!localStorage.getItem('quizLeaderboard')) {
        // Add some sample scores if leaderboard is empty
        const sampleScores = [
            { player: "Trivia Master", score: 10, timestamp: Date.now() - 86400000, time: 85, categories: "All", date: getCurrentDate() },
            { player: "Knowledge Seeker", score: 9, timestamp: Date.now() - 172800000, time: 120, categories: "All", date: getCurrentDate() },
            { player: "Geography Whiz", score: 8, timestamp: Date.now() - 259200000, time: 95, categories: "Geopolitics", date: getCurrentDate() }
        ];
        localStorage.setItem('quizLeaderboard', JSON.stringify(sampleScores));
    }
});

// =============================================
// NOTES FOR ADDING MORE QUESTIONS
// =============================================

/*
To add more questions to the quiz, simply extend the questionBank arrays:

1. For General Knowledge questions:
   Add more objects to the 'generalKnowledge' array following this format:
   {
        question: "Your question here?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct: 0, // Index of correct option (0-3)
        category: "General Knowledge"
   }

2. For Geopolitics questions:
   Add more objects to the 'geopolitics' array.

3. For Current Affairs questions:
   Add more objects to the 'currentAffairs' array.

The application will automatically include all questions from selected categories
when generating the 10-question quiz.

The current implementation has 30 sample questions (10 from each category).
To reach 300 questions, add 90 more to each category following the same format.
*/