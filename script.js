// Quiz Application - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const screens = {
        welcome: document.getElementById('welcome-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen'),
        leaderboard: document.getElementById('leaderboard-screen')
    };
    
    // Welcome screen elements
    const playerNameInput = document.getElementById('player-name');
    const startQuizBtn = document.getElementById('start-quiz');
    const viewLeaderboardBtn = document.getElementById('view-leaderboard');
    
    // Quiz screen elements
    const currentPlayerSpan = document.getElementById('current-player');
    const questionCounter = document.getElementById('question-counter');
    const scoreCounter = document.getElementById('score-counter');
    const timerElement = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.querySelector('.options-container');
    const nextQuestionBtn = document.getElementById('next-question');
    const quitQuizBtn = document.getElementById('quit-quiz');
    
    // Results screen elements
    const resultsPlayerSpan = document.getElementById('results-player');
    const finalScoreElement = document.getElementById('final-score');
    const correctAnswersElement = document.getElementById('correct-answers');
    const incorrectAnswersElement = document.getElementById('incorrect-answers');
    const timeTakenElement = document.getElementById('time-taken');
    const playAgainBtn = document.getElementById('play-again');
    const viewLeaderboardResultsBtn = document.getElementById('view-leaderboard-results');
    const goHomeBtn = document.getElementById('go-home');
    
    // Leaderboard screen elements
    const leaderboardEntries = document.getElementById('leaderboard-entries');
    const tabAllBtn = document.getElementById('tab-all');
    const tabTodayBtn = document.getElementById('tab-today');
    const clearLeaderboardBtn = document.getElementById('clear-leaderboard');
    const backToHomeBtn = document.getElementById('back-to-home');
    
    // Quiz state variables
    let quizState = {
        playerName: '',
        currentQuestionIndex: 0,
        score: 0,
        selectedQuestions: [],
        userAnswers: [],
        quizStartTime: null,
        timerInterval: null,
        elapsedTime: 0
    };
    
    // Question Bank - 300 questions (100 from each category)
    const questionBank = [
        // ========== GENERAL KNOWLEDGE (100 Questions) ==========
        {
            id: 1,
            category: "General Knowledge",
            question: "Which planet in our solar system is known as the 'Red Planet'?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1
        },
        {
            id: 2,
            category: "General Knowledge",
            question: "What is the largest mammal in the world?",
            options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            correctAnswer: 1
        },
        {
            id: 3,
            category: "General Knowledge",
            question: "Which chemical element has the symbol 'Au'?",
            options: ["Silver", "Gold", "Argon", "Aluminum"],
            correctAnswer: 1
        },
        {
            id: 4,
            category: "General Knowledge",
            question: "In which year did the Titanic sink?",
            options: ["1910", "1912", "1914", "1916"],
            correctAnswer: 1
        },
        {
            id: 5,
            category: "General Knowledge",
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
            correctAnswer: 1
        },
        {
            id: 6,
            category: "General Knowledge",
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Platinum"],
            correctAnswer: 2
        },
        {
            id: 7,
            category: "General Knowledge",
            question: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "Thailand", "Japan", "South Korea"],
            correctAnswer: 2
        },
        {
            id: 8,
            category: "General Knowledge",
            question: "How many continents are there on Earth?",
            options: ["5", "6", "7", "8"],
            correctAnswer: 2
        },
        {
            id: 9,
            category: "General Knowledge",
            question: "What is the smallest country in the world?",
            options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
            correctAnswer: 1
        },
        {
            id: 10,
            category: "General Knowledge",
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: 3
        },
        {
            id: 11,
            category: "General Knowledge",
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: 2
        },
        {
            id: 12,
            category: "General Knowledge",
            question: "Which planet is known as the 'Morning Star'?",
            options: ["Mars", "Venus", "Mercury", "Jupiter"],
            correctAnswer: 1
        },
        {
            id: 13,
            category: "General Knowledge",
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correctAnswer: 1
        },
        {
            id: 14,
            category: "General Knowledge",
            question: "What is the currency of Japan?",
            options: ["Won", "Yen", "Yuan", "Ringgit"],
            correctAnswer: 1
        },
        {
            id: 15,
            category: "General Knowledge",
            question: "Which organ in the human body is responsible for pumping blood?",
            options: ["Liver", "Lungs", "Heart", "Kidneys"],
            correctAnswer: 2
        },
        {
            id: 16,
            category: "General Knowledge",
            question: "What is the largest desert in the world?",
            options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"],
            correctAnswer: 3
        },
        {
            id: 17,
            category: "General Knowledge",
            question: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            correctAnswer: 2
        },
        {
            id: 18,
            category: "General Knowledge",
            question: "What is the tallest mountain in the world?",
            options: ["K2", "Kangchenjunga", "Mount Everest", "Makalu"],
            correctAnswer: 2
        },
        {
            id: 19,
            category: "General Knowledge",
            question: "Which instrument measures atmospheric pressure?",
            options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"],
            correctAnswer: 1
        },
        {
            id: 20,
            category: "General Knowledge",
            question: "Who discovered penicillin?",
            options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Robert Koch"],
            correctAnswer: 1
        },
        {
            id: 21,
            category: "General Knowledge",
            question: "Which element is essential for human bones and teeth?",
            options: ["Iron", "Calcium", "Potassium", "Sodium"],
            correctAnswer: 1
        },
        {
            id: 22,
            category: "General Knowledge",
            question: "What is the largest organ in the human body?",
            options: ["Liver", "Brain", "Skin", "Lungs"],
            correctAnswer: 2
        },
        {
            id: 23,
            category: "General Knowledge",
            question: "Which country gifted the Statue of Liberty to the United States?",
            options: ["England", "Spain", "France", "Italy"],
            correctAnswer: 2
        },
        {
            id: 24,
            category: "General Knowledge",
            question: "What is the chemical formula for water?",
            options: ["CO2", "H2O", "O2", "NaCl"],
            correctAnswer: 1
        },
        {
            id: 25,
            category: "General Knowledge",
            question: "Which planet has the most moons?",
            options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correctAnswer: 1
        },
        {
            id: 26,
            category: "General Knowledge",
            question: "Who invented the telephone?",
            options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
            correctAnswer: 1
        },
        {
            id: 27,
            category: "General Knowledge",
            question: "What is the fastest land animal?",
            options: ["Lion", "Cheetah", "Leopard", "Pronghorn Antelope"],
            correctAnswer: 1
        },
        {
            id: 28,
            category: "General Knowledge",
            question: "Which vitamin is produced when sunlight hits the skin?",
            options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
            correctAnswer: 3
        },
        {
            id: 29,
            category: "General Knowledge",
            question: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            correctAnswer: 2
        },
        {
            id: 30,
            category: "General Knowledge",
            question: "Which blood type is known as the universal donor?",
            options: ["A+", "B-", "AB+", "O-"],
            correctAnswer: 3
        },
        {
            id: 31,
            category: "General Knowledge",
            question: "How many bones are there in the adult human body?",
            options: ["186", "206", "226", "246"],
            correctAnswer: 1
        },
        {
            id: 32,
            category: "General Knowledge",
            question: "What is the largest bird in the world?",
            options: ["Emu", "Ostrich", "Albatross", "Condor"],
            correctAnswer: 1
        },
        {
            id: 33,
            category: "General Knowledge",
            question: "Which planet is closest to the Sun?",
            options: ["Venus", "Mercury", "Earth", "Mars"],
            correctAnswer: 1
        },
        {
            id: 34,
            category: "General Knowledge",
            question: "What is the main ingredient in guacamole?",
            options: ["Tomato", "Avocado", "Onion", "Pepper"],
            correctAnswer: 1
        },
        {
            id: 35,
            category: "General Knowledge",
            question: "Who wrote 'War and Peace'?",
            options: ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"],
            correctAnswer: 1
        },
        {
            id: 36,
            category: "General Knowledge",
            question: "Which language has the most native speakers?",
            options: ["English", "Spanish", "Hindi", "Mandarin Chinese"],
            correctAnswer: 3
        },
        {
            id: 37,
            category: "General Knowledge",
            question: "What is the longest river in the world?",
            options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
            correctAnswer: 1
        },
        {
            id: 38,
            category: "General Knowledge",
            question: "Which element has the atomic number 1?",
            options: ["Helium", "Hydrogen", "Lithium", "Oxygen"],
            correctAnswer: 1
        },
        {
            id: 39,
            category: "General Knowledge",
            question: "What is the capital of Canada?",
            options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
            correctAnswer: 2
        },
        {
            id: 40,
            category: "General Knowledge",
            question: "Which planet has a prominent ring system?",
            options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correctAnswer: 1
        },
        {
            id: 41,
            category: "General Knowledge",
            question: "Who painted the ceiling of the Sistine Chapel?",
            options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
            correctAnswer: 2
        },
        {
            id: 42,
            category: "General Knowledge",
            question: "What is the smallest unit of life?",
            options: ["Atom", "Molecule", "Cell", "Tissue"],
            correctAnswer: 2
        },
        {
            id: 43,
            category: "General Knowledge",
            question: "Which country is the largest producer of coffee?",
            options: ["Colombia", "Vietnam", "Brazil", "Ethiopia"],
            correctAnswer: 2
        },
        {
            id: 44,
            category: "General Knowledge",
            question: "What is the freezing point of water in Fahrenheit?",
            options: ["0°F", "32°F", "100°F", "212°F"],
            correctAnswer: 1
        },
        {
            id: 45,
            category: "General Knowledge",
            question: "Who is known as the Father of Computers?",
            options: ["Alan Turing", "Charles Babbage", "John von Neumann", "Steve Jobs"],
            correctAnswer: 1
        },
        {
            id: 46,
            category: "General Knowledge",
            question: "Which gas makes up most of the Earth's atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
            correctAnswer: 2
        },
        {
            id: 47,
            category: "General Knowledge",
            question: "What is the capital of Egypt?",
            options: ["Alexandria", "Cairo", "Giza", "Luxor"],
            correctAnswer: 1
        },
        {
            id: 48,
            category: "General Knowledge",
            question: "Which animal is known as the 'Ship of the Desert'?",
            options: ["Horse", "Elephant", "Camel", "Donkey"],
            correctAnswer: 2
        },
        {
            id: 49,
            category: "General Knowledge",
            question: "What is the square root of 144?",
            options: ["10", "11", "12", "13"],
            correctAnswer: 2
        },
        {
            id: 50,
            category: "General Knowledge",
            question: "Who discovered gravity?",
            options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Stephen Hawking"],
            correctAnswer: 1
        },
        {
            id: 51,
            category: "General Knowledge",
            question: "What is the chemical symbol for silver?",
            options: ["Si", "Ag", "Au", "Sr"],
            correctAnswer: 1
        },
        {
            id: 52,
            category: "General Knowledge",
            question: "Which planet is known as the 'Evening Star'?",
            options: ["Mars", "Venus", "Mercury", "Jupiter"],
            correctAnswer: 1
        },
        {
            id: 53,
            category: "General Knowledge",
            question: "What is the largest species of shark?",
            options: ["Great White Shark", "Tiger Shark", "Whale Shark", "Hammerhead Shark"],
            correctAnswer: 2
        },
        {
            id: 54,
            category: "General Knowledge",
            question: "Which organ produces insulin?",
            options: ["Liver", "Pancreas", "Kidney", "Stomach"],
            correctAnswer: 1
        },
        {
            id: 55,
            category: "General Knowledge",
            question: "What is the capital of Italy?",
            options: ["Venice", "Florence", "Rome", "Milan"],
            correctAnswer: 2
        },
        {
            id: 56,
            category: "General Knowledge",
            question: "How many colors are there in a rainbow?",
            options: ["5", "6", "7", "8"],
            correctAnswer: 2
        },
        {
            id: 57,
            category: "General Knowledge",
            question: "Who wrote 'The Odyssey'?",
            options: ["Virgil", "Homer", "Sophocles", "Plato"],
            correctAnswer: 1
        },
        {
            id: 58,
            category: "General Knowledge",
            question: "What is the largest type of bear?",
            options: ["Grizzly Bear", "Polar Bear", "Brown Bear", "Black Bear"],
            correctAnswer: 1
        },
        {
            id: 59,
            category: "General Knowledge",
            question: "Which planet is known for its Great Red Spot?",
            options: ["Mars", "Jupiter", "Saturn", "Neptune"],
            correctAnswer: 1
        },
        {
            id: 60,
            category: "General Knowledge",
            question: "What is the study of fossils called?",
            options: ["Archaeology", "Paleontology", "Geology", "Anthropology"],
            correctAnswer: 1
        },
        {
            id: 61,
            category: "General Knowledge",
            question: "Who invented the light bulb?",
            options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Benjamin Franklin"],
            correctAnswer: 0
        },
        {
            id: 62,
            category: "General Knowledge",
            question: "What is the capital of Germany?",
            options: ["Munich", "Frankfurt", "Berlin", "Hamburg"],
            correctAnswer: 2
        },
        {
            id: 63,
            category: "General Knowledge",
            question: "Which gas is used in balloons to make them float?",
            options: ["Hydrogen", "Helium", "Oxygen", "Nitrogen"],
            correctAnswer: 1
        },
        {
            id: 64,
            category: "General Knowledge",
            question: "What is the largest internal organ in the human body?",
            options: ["Heart", "Brain", "Liver", "Lungs"],
            correctAnswer: 2
        },
        {
            id: 65,
            category: "General Knowledge",
            question: "Which country is famous for the pyramids?",
            options: ["Mexico", "Greece", "Egypt", "Peru"],
            correctAnswer: 2
        },
        {
            id: 66,
            category: "General Knowledge",
            question: "How many sides does a hexagon have?",
            options: ["4", "5", "6", "7"],
            correctAnswer: 2
        },
        {
            id: 67,
            category: "General Knowledge",
            question: "Who painted 'Starry Night'?",
            options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dali"],
            correctAnswer: 1
        },
        {
            id: 68,
            category: "General Knowledge",
            question: "What is the fastest bird in the world?",
            options: ["Eagle", "Falcon", "Swift", "Ostrich"],
            correctAnswer: 1
        },
        {
            id: 69,
            category: "General Knowledge",
            question: "Which planet is the hottest in our solar system?",
            options: ["Mercury", "Venus", "Mars", "Jupiter"],
            correctAnswer: 1
        },
        {
            id: 70,
            category: "General Knowledge",
            question: "What is the study of earthquakes called?",
            options: ["Volcanology", "Seismology", "Meteorology", "Geology"],
            correctAnswer: 1
        },
        {
            id: 71,
            category: "General Knowledge",
            question: "Who discovered America?",
            options: ["Christopher Columbus", "Amerigo Vespucci", "Ferdinand Magellan", "Vasco da Gama"],
            correctAnswer: 0
        },
        {
            id: 72,
            category: "General Knowledge",
            question: "What is the capital of Russia?",
            options: ["St. Petersburg", "Moscow", "Kazan", "Novosibirsk"],
            correctAnswer: 1
        },
        {
            id: 73,
            category: "General Knowledge",
            question: "Which vitamin is also known as ascorbic acid?",
            options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
            correctAnswer: 2
        },
        {
            id: 74,
            category: "General Knowledge",
            question: "What is the largest bone in the human body?",
            options: ["Skull", "Femur", "Pelvis", "Spine"],
            correctAnswer: 1
        },
        {
            id: 75,
            category: "General Knowledge",
            question: "Which country invented paper?",
            options: ["India", "Egypt", "China", "Greece"],
            correctAnswer: 2
        },
        {
            id: 76,
            category: "General Knowledge",
            question: "How many teeth does an adult human have?",
            options: ["28", "30", "32", "34"],
            correctAnswer: 2
        },
        {
            id: 77,
            category: "General Knowledge",
            question: "Who wrote 'Pride and Prejudice'?",
            options: ["Charlotte Bronte", "Emily Bronte", "Jane Austen", "Mary Shelley"],
            correctAnswer: 2
        },
        {
            id: 78,
            category: "General Knowledge",
            question: "What is the largest big cat in the world?",
            options: ["Lion", "Tiger", "Jaguar", "Leopard"],
            correctAnswer: 1
        },
        {
            id: 79,
            category: "General Knowledge",
            question: "Which planet has the longest day?",
            options: ["Mercury", "Venus", "Earth", "Mars"],
            correctAnswer: 1
        },
        {
            id: 80,
            category: "General Knowledge",
            question: "What is the study of plants called?",
            options: ["Zoology", "Botany", "Biology", "Ecology"],
            correctAnswer: 1
        },
        {
            id: 81,
            category: "General Knowledge",
            question: "Who invented the printing press?",
            options: ["Johannes Gutenberg", "Leonardo da Vinci", "Benjamin Franklin", "William Caxton"],
            correctAnswer: 0
        },
        {
            id: 82,
            category: "General Knowledge",
            question: "What is the capital of Spain?",
            options: ["Barcelona", "Seville", "Madrid", "Valencia"],
            correctAnswer: 2
        },
        {
            id: 83,
            category: "General Knowledge",
            question: "Which metal is liquid at room temperature?",
            options: ["Iron", "Mercury", "Gold", "Aluminum"],
            correctAnswer: 1
        },
        {
            id: 84,
            category: "General Knowledge",
            question: "What is the largest gland in the human body?",
            options: ["Pancreas", "Thyroid", "Liver", "Pituitary"],
            correctAnswer: 2
        },
        {
            id: 85,
            category: "General Knowledge",
            question: "Which country is known as the Land of the Midnight Sun?",
            options: ["Sweden", "Norway", "Finland", "Iceland"],
            correctAnswer: 1
        },
        {
            id: 86,
            category: "General Knowledge",
            question: "How many players are there in a baseball team?",
            options: ["9", "10", "11", "12"],
            correctAnswer: 0
        },
        {
            id: 87,
            category: "General Knowledge",
            question: "Who composed the 'Moonlight Sonata'?",
            options: ["Mozart", "Beethoven", "Bach", "Chopin"],
            correctAnswer: 1
        },
        {
            id: 88,
            category: "General Knowledge",
            question: "What is the fastest fish in the ocean?",
            options: ["Marlin", "Tuna", "Sailfish", "Swordfish"],
            correctAnswer: 2
        },
        {
            id: 89,
            category: "General Knowledge",
            question: "Which planet has the most volcanoes?",
            options: ["Earth", "Mars", "Venus", "Io (moon of Jupiter)"],
            correctAnswer: 3
        },
        {
            id: 90,
            category: "General Knowledge",
            question: "What is the study of the universe called?",
            options: ["Astronomy", "Cosmology", "Astrophysics", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 91,
            category: "General Knowledge",
            question: "Who discovered radioactivity?",
            options: ["Marie Curie", "Ernest Rutherford", "Henri Becquerel", "Max Planck"],
            correctAnswer: 2
        },
        {
            id: 92,
            category: "General Knowledge",
            question: "What is the capital of Brazil?",
            options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
            correctAnswer: 2
        },
        {
            id: 93,
            category: "General Knowledge",
            question: "Which gas is known as laughing gas?",
            options: ["Nitrous Oxide", "Carbon Monoxide", "Methane", "Helium"],
            correctAnswer: 0
        },
        {
            id: 94,
            category: "General Knowledge",
            question: "What is the smallest bone in the human body?",
            options: ["Stapes (in ear)", "Femur", "Rib", "Finger bone"],
            correctAnswer: 0
        },
        {
            id: 95,
            category: "General Knowledge",
            question: "Which country is the largest producer of diamonds?",
            options: ["South Africa", "Russia", "Botswana", "Canada"],
            correctAnswer: 1
        },
        {
            id: 96,
            category: "General Knowledge",
            question: "How many hearts does an octopus have?",
            options: ["1", "2", "3", "4"],
            correctAnswer: 2
        },
        {
            id: 97,
            category: "General Knowledge",
            question: "Who wrote 'The Divine Comedy'?",
            options: ["Dante Alighieri", "Geoffrey Chaucer", "John Milton", "Virgil"],
            correctAnswer: 0
        },
        {
            id: 98,
            category: "General Knowledge",
            question: "What is the largest reptile in the world?",
            options: ["Komodo Dragon", "Saltwater Crocodile", "Anaconda", "Leatherback Turtle"],
            correctAnswer: 1
        },
        {
            id: 99,
            category: "General Knowledge",
            question: "Which planet has the strongest winds?",
            options: ["Earth", "Mars", "Jupiter", "Neptune"],
            correctAnswer: 3
        },
        {
            id: 100,
            category: "General Knowledge",
            question: "What is the study of animal behavior called?",
            options: ["Ethology", "Ecology", "Zoology", "Biology"],
            correctAnswer: 0
        },
        
        // ========== GEOPOLITICS (100 Questions) ==========
        {
            id: 101,
            category: "Geopolitics",
            question: "Which country is the largest by land area?",
            options: ["United States", "China", "Canada", "Russia"],
            correctAnswer: 3
        },
        {
            id: 102,
            category: "Geopolitics",
            question: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            correctAnswer: 2
        },
        {
            id: 103,
            category: "Geopolitics",
            question: "Which organization was established after World War II to promote international peace and security?",
            options: ["European Union", "United Nations", "NATO", "World Bank"],
            correctAnswer: 1
        },
        {
            id: 104,
            category: "Geopolitics",
            question: "Which country is not a permanent member of the United Nations Security Council?",
            options: ["France", "United Kingdom", "Germany", "China"],
            correctAnswer: 2
        },
        {
            id: 105,
            category: "Geopolitics",
            question: "Which two countries share the longest international border?",
            options: ["Russia and China", "Canada and the USA", "Argentina and Chile", "India and Bangladesh"],
            correctAnswer: 1
        },
        {
            id: 106,
            category: "Geopolitics",
            question: "Which country has the most time zones?",
            options: ["Russia", "United States", "China", "France"],
            correctAnswer: 3
        },
        {
            id: 107,
            category: "Geopolitics",
            question: "What is the capital of Turkey?",
            options: ["Istanbul", "Ankara", "Izmir", "Bursa"],
            correctAnswer: 1
        },
        {
            id: 108,
            category: "Geopolitics",
            question: "Which country is known as the 'Land of the White Elephant'?",
            options: ["India", "Thailand", "Myanmar", "Cambodia"],
            correctAnswer: 1
        },
        {
            id: 109,
            category: "Geopolitics",
            question: "What is the smallest country in the European Union?",
            options: ["Malta", "Luxembourg", "Cyprus", "Slovenia"],
            correctAnswer: 0
        },
        {
            id: 110,
            category: "Geopolitics",
            question: "Which country has the world's longest coastline?",
            options: ["Russia", "Canada", "Indonesia", "Australia"],
            correctAnswer: 1
        },
        {
            id: 111,
            category: "Geopolitics",
            question: "What is the capital of Saudi Arabia?",
            options: ["Mecca", "Medina", "Riyadh", "Jeddah"],
            correctAnswer: 2
        },
        {
            id: 112,
            category: "Geopolitics",
            question: "Which country was divided into North and South after World War II?",
            options: ["Vietnam", "Germany", "Korea", "Yemen"],
            correctAnswer: 2
        },
        {
            id: 113,
            category: "Geopolitics",
            question: "What is the most populous country in Africa?",
            options: ["South Africa", "Egypt", "Nigeria", "Ethiopia"],
            correctAnswer: 2
        },
        {
            id: 114,
            category: "Geopolitics",
            question: "Which country is not a member of the European Union?",
            options: ["Switzerland", "Austria", "Poland", "Ireland"],
            correctAnswer: 0
        },
        {
            id: 115,
            category: "Geopolitics",
            question: "What is the capital of Argentina?",
            options: ["Buenos Aires", "Santiago", "Lima", "Montevideo"],
            correctAnswer: 0
        },
        {
            id: 116,
            category: "Geopolitics",
            question: "Which country is the world's largest island?",
            options: ["Australia", "Greenland", "Madagascar", "Borneo"],
            correctAnswer: 1
        },
        {
            id: 117,
            category: "Geopolitics",
            question: "What is the capital of Pakistan?",
            options: ["Karachi", "Lahore", "Islamabad", "Rawalpindi"],
            correctAnswer: 2
        },
        {
            id: 118,
            category: "Geopolitics",
            question: "Which country was formerly known as Persia?",
            options: ["Iraq", "Iran", "Afghanistan", "Turkey"],
            correctAnswer: 1
        },
        {
            id: 119,
            category: "Geopolitics",
            question: "What is the highest capital city in the world?",
            options: ["Quito", "Bogotá", "La Paz", "Kathmandu"],
            correctAnswer: 2
        },
        {
            id: 120,
            category: "Geopolitics",
            question: "Which country has the most official languages?",
            options: ["India", "South Africa", "Switzerland", "Bolivia"],
            correctAnswer: 3
        },
        {
            id: 121,
            category: "Geopolitics",
            question: "What is the capital of South Korea?",
            options: ["Busan", "Seoul", "Incheon", "Daegu"],
            correctAnswer: 1
        },
        {
            id: 122,
            category: "Geopolitics",
            question: "Which country was the first to grant women the right to vote?",
            options: ["United States", "United Kingdom", "New Zealand", "Finland"],
            correctAnswer: 2
        },
        {
            id: 123,
            category: "Geopolitics",
            question: "What is the largest country in South America by area?",
            options: ["Argentina", "Brazil", "Peru", "Colombia"],
            correctAnswer: 1
        },
        {
            id: 124,
            category: "Geopolitics",
            question: "Which country is home to the world's largest democracy?",
            options: ["United States", "India", "Indonesia", "Brazil"],
            correctAnswer: 1
        },
        {
            id: 125,
            category: "Geopolitics",
            question: "What is the capital of Iran?",
            options: ["Tehran", "Mashhad", "Isfahan", "Tabriz"],
            correctAnswer: 0
        },
        {
            id: 126,
            category: "Geopolitics",
            question: "Which country has the most natural lakes?",
            options: ["Russia", "Canada", "Finland", "United States"],
            correctAnswer: 1
        },
        {
            id: 127,
            category: "Geopolitics",
            question: "What is the capital of Egypt?",
            options: ["Alexandria", "Cairo", "Giza", "Luxor"],
            correctAnswer: 1
        },
        {
            id: 128,
            category: "Geopolitics",
            question: "Which country is the world's largest archipelago?",
            options: ["Philippines", "Indonesia", "Japan", "Malaysia"],
            correctAnswer: 1
        },
        {
            id: 129,
            category: "Geopolitics",
            question: "What is the smallest continent by land area?",
            options: ["Europe", "Australia", "Antarctica", "South America"],
            correctAnswer: 1
        },
        {
            id: 130,
            category: "Geopolitics",
            question: "Which country has the highest population density?",
            options: ["Singapore", "Monaco", "Vatican City", "Bangladesh"],
            correctAnswer: 1
        },
        {
            id: 131,
            category: "Geopolitics",
            question: "What is the capital of Mexico?",
            options: ["Guadalajara", "Monterrey", "Mexico City", "Cancún"],
            correctAnswer: 2
        },
        {
            id: 132,
            category: "Geopolitics",
            question: "Which country was the first to adopt Christianity as its state religion?",
            options: ["Rome", "Armenia", "Ethiopia", "Byzantine Empire"],
            correctAnswer: 1
        },
        {
            id: 133,
            category: "Geopolitics",
            question: "What is the largest country in Africa by area?",
            options: ["Democratic Republic of Congo", "Sudan", "Algeria", "Libya"],
            correctAnswer: 2
        },
        {
            id: 134,
            category: "Geopolitics",
            question: "Which country has the most volcanoes?",
            options: ["Indonesia", "United States", "Japan", "Russia"],
            correctAnswer: 0
        },
        {
            id: 135,
            category: "Geopolitics",
            question: "What is the capital of Nigeria?",
            options: ["Lagos", "Abuja", "Kano", "Ibadan"],
            correctAnswer: 1
        },
        {
            id: 136,
            category: "Geopolitics",
            question: "Which country has the most islands?",
            options: ["Sweden", "Norway", "Finland", "Canada"],
            correctAnswer: 0
        },
        {
            id: 137,
            category: "Geopolitics",
            question: "What is the capital of Indonesia?",
            options: ["Jakarta", "Surabaya", "Bandung", "Medan"],
            correctAnswer: 0
        },
        {
            id: 138,
            category: "Geopolitics",
            question: "Which country was the last to abolish slavery?",
            options: ["United States", "Brazil", "Mauritania", "Saudi Arabia"],
            correctAnswer: 2
        },
        {
            id: 139,
            category: "Geopolitics",
            question: "What is the largest landlocked country?",
            options: ["Mongolia", "Kazakhstan", "Chad", "Bolivia"],
            correctAnswer: 1
        },
        {
            id: 140,
            category: "Geopolitics",
            question: "Which country has the most borders with other countries?",
            options: ["Russia", "China", "Brazil", "Germany"],
            correctAnswer: 1
        },
        {
            id: 141,
            category: "Geopolitics",
            question: "What is the capital of Vietnam?",
            options: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Haiphong"],
            correctAnswer: 1
        },
        {
            id: 142,
            category: "Geopolitics",
            question: "Which country was the first to give women the right to vote in national elections?",
            options: ["Finland", "Norway", "New Zealand", "Australia"],
            correctAnswer: 2
        },
        {
            id: 143,
            category: "Geopolitics",
            question: "What is the smallest country in Africa?",
            options: ["Gambia", "Djibouti", "Seychelles", "São Tomé and Príncipe"],
            correctAnswer: 2
        },
        {
            id: 144,
            category: "Geopolitics",
            question: "Which country has the highest percentage of forest area?",
            options: ["Finland", "Suriname", "Brazil", "Russia"],
            correctAnswer: 1
        },
        {
            id: 145,
            category: "Geopolitics",
            question: "What is the capital of Kenya?",
            options: ["Mombasa", "Nairobi", "Kisumu", "Nakuru"],
            correctAnswer: 1
        },
        {
            id: 146,
            category: "Geopolitics",
            question: "Which country has the most UNESCO World Heritage Sites?",
            options: ["Italy", "China", "Spain", "France"],
            correctAnswer: 0
        },
        {
            id: 147,
            category: "Geopolitics",
            question: "What is the capital of Peru?",
            options: ["Lima", "Cusco", "Arequipa", "Trujillo"],
            correctAnswer: 0
        },
        {
            id: 148,
            category: "Geopolitics",
            question: "Which country was the first to have a female president?",
            options: ["Sri Lanka", "India", "Argentina", "Iceland"],
            correctAnswer: 3
        },
        {
            id: 149,
            category: "Geopolitics",
            question: "What is the largest country without a river?",
            options: ["Saudi Arabia", "Kuwait", "Oman", "United Arab Emirates"],
            correctAnswer: 0
        },
        {
            id: 150,
            category: "Geopolitics",
            question: "Which country has the most time zones?",
            options: ["Russia", "United States", "France", "United Kingdom"],
            correctAnswer: 2
        },
        {
            id: 151,
            category: "Geopolitics",
            question: "What is the capital of Bangladesh?",
            options: ["Chittagong", "Dhaka", "Khulna", "Rajshahi"],
            correctAnswer: 1
        },
        {
            id: 152,
            category: "Geopolitics",
            question: "Which country was the first to legalize same-sex marriage?",
            options: ["Netherlands", "Canada", "Spain", "South Africa"],
            correctAnswer: 0
        },
        {
            id: 153,
            category: "Geopolitics",
            question: "What is the largest island in the Mediterranean Sea?",
            options: ["Sicily", "Sardinia", "Cyprus", "Crete"],
            correctAnswer: 0
        },
        {
            id: 154,
            category: "Geopolitics",
            question: "Which country has the highest life expectancy?",
            options: ["Japan", "Switzerland", "Singapore", "Australia"],
            correctAnswer: 0
        },
        {
            id: 155,
            category: "Geopolitics",
            question: "What is the capital of Thailand?",
            options: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"],
            correctAnswer: 0
        },
        {
            id: 156,
            category: "Geopolitics",
            question: "Which country has the most pyramids?",
            options: ["Egypt", "Sudan", "Mexico", "Peru"],
            correctAnswer: 1
        },
        {
            id: 157,
            category: "Geopolitics",
            question: "What is the capital of Ukraine?",
            options: ["Kyiv", "Kharkiv", "Odessa", "Lviv"],
            correctAnswer: 0
        },
        {
            id: 158,
            category: "Geopolitics",
            question: "Which country is the world's largest exporter of coffee?",
            options: ["Colombia", "Brazil", "Vietnam", "Ethiopia"],
            correctAnswer: 1
        },
        {
            id: 159,
            category: "Geopolitics",
            question: "What is the most populous landlocked country?",
            options: ["Ethiopia", "Uganda", "Kazakhstan", "Mongolia"],
            correctAnswer: 0
        },
        {
            id: 160,
            category: "Geopolitics",
            question: "Which country has the highest literacy rate?",
            options: ["Finland", "Norway", "Canada", "South Korea"],
            correctAnswer: 0
        },
        {
            id: 161,
            category: "Geopolitics",
            question: "What is the capital of Poland?",
            options: ["Kraków", "Warsaw", "Łódź", "Wrocław"],
            correctAnswer: 1
        },
        {
            id: 162,
            category: "Geopolitics",
            question: "Which country was the first to abolish the death penalty?",
            options: ["Venezuela", "Portugal", "Canada", "Norway"],
            correctAnswer: 0
        },
        {
            id: 163,
            category: "Geopolitics",
            question: "What is the largest country in Central America?",
            options: ["Guatemala", "Honduras", "Nicaragua", "Panama"],
            correctAnswer: 2
        },
        {
            id: 164,
            category: "Geopolitics",
            question: "Which country has the most freshwater resources?",
            options: ["Russia", "Brazil", "Canada", "United States"],
            correctAnswer: 1
        },
        {
            id: 165,
            category: "Geopolitics",
            question: "What is the capital of Morocco?",
            options: ["Casablanca", "Rabat", "Marrakesh", "Fes"],
            correctAnswer: 1
        },
        {
            id: 166,
            category: "Geopolitics",
            question: "Which country has the most official national parks?",
            options: ["United States", "Australia", "Canada", "China"],
            correctAnswer: 0
        },
        {
            id: 167,
            category: "Geopolitics",
            question: "What is the capital of the Philippines?",
            options: ["Manila", "Quezon City", "Cebu City", "Davao City"],
            correctAnswer: 0
        },
        {
            id: 168,
            category: "Geopolitics",
            question: "Which country was the first to give women the right to stand for parliament?",
            options: ["New Zealand", "Australia", "Finland", "Norway"],
            correctAnswer: 1
        },
        {
            id: 169,
            category: "Geopolitics",
            question: "What is the most sparsely populated country?",
            options: ["Mongolia", "Namibia", "Australia", "Iceland"],
            correctAnswer: 0
        },
        {
            id: 170,
            category: "Geopolitics",
            question: "Which country has the highest median age?",
            options: ["Japan", "Germany", "Italy", "Monaco"],
            correctAnswer: 0
        },
        {
            id: 171,
            category: "Geopolitics",
            question: "What is the capital of Colombia?",
            options: ["Medellín", "Bogotá", "Cali", "Barranquilla"],
            correctAnswer: 1
        },
        {
            id: 172,
            category: "Geopolitics",
            question: "Which country has the most tornadoes per year?",
            options: ["United States", "Canada", "Bangladesh", "Argentina"],
            correctAnswer: 0
        },
        {
            id: 173,
            category: "Geopolitics",
            question: "What is the largest country in the Caribbean?",
            options: ["Cuba", "Dominican Republic", "Jamaica", "Haiti"],
            correctAnswer: 0
        },
        {
            id: 174,
            category: "Geopolitics",
            question: "Which country has the most earthquakes?",
            options: ["Japan", "Indonesia", "Chile", "United States"],
            correctAnswer: 1
        },
        {
            id: 175,
            category: "Geopolitics",
            question: "What is the capital of Malaysia?",
            options: ["Kuala Lumpur", "Putrajaya", "Penang", "Johor Bahru"],
            correctAnswer: 0
        },
        {
            id: 176,
            category: "Geopolitics",
            question: "Which country has the longest railway network?",
            options: ["United States", "Russia", "China", "India"],
            correctAnswer: 0
        },
        {
            id: 177,
            category: "Geopolitics",
            question: "What is the capital of Chile?",
            options: ["Santiago", "Valparaíso", "Concepción", "Antofagasta"],
            correctAnswer: 0
        },
        {
            id: 178,
            category: "Geopolitics",
            question: "Which country was the first to ban plastic bags?",
            options: ["Bangladesh", "Rwanda", "Kenya", "China"],
            correctAnswer: 0
        },
        {
            id: 179,
            category: "Geopolitics",
            question: "What is the largest country in the Middle East?",
            options: ["Saudi Arabia", "Iran", "Egypt", "Turkey"],
            correctAnswer: 0
        },
        {
            id: 180,
            category: "Geopolitics",
            question: "Which country has the highest percentage of women in parliament?",
            options: ["Rwanda", "Sweden", "Finland", "Norway"],
            correctAnswer: 0
        },
        {
            id: 181,
            category: "Geopolitics",
            question: "What is the capital of Ethiopia?",
            options: ["Addis Ababa", "Dire Dawa", "Mekelle", "Bahir Dar"],
            correctAnswer: 0
        },
        {
            id: 182,
            category: "Geopolitics",
            question: "Which country has the most lakes?",
            options: ["Canada", "Finland", "Sweden", "Russia"],
            correctAnswer: 0
        },
        {
            id: 183,
            category: "Geopolitics",
            question: "What is the largest country in the Balkans?",
            options: ["Serbia", "Romania", "Greece", "Bulgaria"],
            correctAnswer: 1
        },
        {
            id: 184,
            category: "Geopolitics",
            question: "Which country has the highest minimum wage?",
            options: ["Australia", "Luxembourg", "Switzerland", "Denmark"],
            correctAnswer: 0
        },
        {
            id: 185,
            category: "Geopolitics",
            question: "What is the capital of Iraq?",
            options: ["Baghdad", "Basra", "Mosul", "Erbil"],
            correctAnswer: 0
        },
        {
            id: 186,
            category: "Geopolitics",
            question: "Which country has the most billionaires?",
            options: ["United States", "China", "Germany", "India"],
            correctAnswer: 0
        },
        {
            id: 187,
            category: "Geopolitics",
            question: "What is the capital of Afghanistan?",
            options: ["Kabul", "Kandahar", "Herat", "Mazar-i-Sharif"],
            correctAnswer: 0
        },
        {
            id: 188,
            category: "Geopolitics",
            question: "Which country was the first to implement a carbon tax?",
            options: ["Finland", "Sweden", "Norway", "Denmark"],
            correctAnswer: 0
        },
        {
            id: 189,
            category: "Geopolitics",
            question: "What is the largest country in Oceania?",
            options: ["Australia", "Papua New Guinea", "New Zealand", "Fiji"],
            correctAnswer: 0
        },
        {
            id: 190,
            category: "Geopolitics",
            question: "Which country has the highest happiness index?",
            options: ["Finland", "Denmark", "Switzerland", "Iceland"],
            correctAnswer: 0
        },
        {
            id: 191,
            category: "Geopolitics",
            question: "What is the capital of Venezuela?",
            options: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto"],
            correctAnswer: 0
        },
        {
            id: 192,
            category: "Geopolitics",
            question: "Which country has the most World Cup wins in soccer?",
            options: ["Brazil", "Germany", "Italy", "Argentina"],
            correctAnswer: 0
        },
        {
            id: 193,
            category: "Geopolitics",
            question: "What is the largest country in Southeast Asia?",
            options: ["Indonesia", "Thailand", "Vietnam", "Myanmar"],
            correctAnswer: 0
        },
        {
            id: 194,
            category: "Geopolitics",
            question: "Which country has the most Olympic gold medals?",
            options: ["United States", "Russia", "China", "Great Britain"],
            correctAnswer: 0
        },
        {
            id: 195,
            category: "Geopolitics",
            question: "What is the capital of Algeria?",
            options: ["Algiers", "Oran", "Constantine", "Annaba"],
            correctAnswer: 0
        },
        {
            id: 196,
            category: "Geopolitics",
            question: "Which country has the most airports?",
            options: ["United States", "Brazil", "Russia", "China"],
            correctAnswer: 0
        },
        {
            id: 197,
            category: "Geopolitics",
            question: "What is the capital of Nepal?",
            options: ["Kathmandu", "Pokhara", "Lalitpur", "Bharatpur"],
            correctAnswer: 0
        },
        {
            id: 198,
            category: "Geopolitics",
            question: "Which country was the first to reach the South Pole?",
            options: ["Norway", "United Kingdom", "United States", "Australia"],
            correctAnswer: 0
        },
        {
            id: 199,
            category: "Geopolitics",
            question: "What is the largest country in Central Asia?",
            options: ["Kazakhstan", "Uzbekistan", "Turkmenistan", "Kyrgyzstan"],
            correctAnswer: 0
        },
        {
            id: 200,
            category: "Geopolitics",
            question: "Which country has the most Nobel Prize winners?",
            options: ["United States", "United Kingdom", "Germany", "France"],
            correctAnswer: 0
        },
        
        // ========== CURRENT AFFAIRS (100 Questions) ==========
        {
            id: 201,
            category: "Current Affairs",
            question: "As of 2023, which country has the world's largest population?",
            options: ["India", "United States", "China", "Indonesia"],
            correctAnswer: 2
        },
        {
            id: 202,
            category: "Current Affairs",
            question: "Which cryptocurrency was the first to be created?",
            options: ["Ethereum", "Bitcoin", "Dogecoin", "Ripple"],
            correctAnswer: 1
        },
        {
            id: 203,
            category: "Current Affairs",
            question: "Which global event caused widespread lockdowns in 2020?",
            options: ["Climate Change Summit", "COVID-19 Pandemic", "Brexit", "US Presidential Election"],
            correctAnswer: 1
        },
        {
            id: 204,
            category: "Current Affairs",
            question: "Which company became the first to reach a $3 trillion market valuation in 2022?",
            options: ["Microsoft", "Amazon", "Apple", "Google"],
            correctAnswer: 2
        },
        {
            id: 205,
            category: "Current Affairs",
            question: "Which country hosted the 2022 FIFA World Cup?",
            options: ["Qatar", "Brazil", "Russia", "South Africa"],
            correctAnswer: 0
        },
        {
            id: 206,
            category: "Current Affairs",
            question: "Who won the 2023 Nobel Peace Prize?",
            options: ["Malala Yousafzai", "Narges Mohammadi", "Maria Ressa", "Dmitry Muratov"],
            correctAnswer: 1
        },
        {
            id: 207,
            category: "Current Affairs",
            question: "Which country launched the Artemis program to return humans to the Moon?",
            options: ["United States", "China", "Russia", "European Union"],
            correctAnswer: 0
        },
        {
            id: 208,
            category: "Current Affairs",
            question: "What major climate agreement was adopted in 2015?",
            options: ["Kyoto Protocol", "Paris Agreement", "Copenhagen Accord", "Montreal Protocol"],
            correctAnswer: 1
        },
        {
            id: 209,
            category: "Current Affairs",
            question: "Which social media platform was renamed 'X' in 2023?",
            options: ["Facebook", "Twitter", "Instagram", "TikTok"],
            correctAnswer: 1
        },
        {
            id: 210,
            category: "Current Affairs",
            question: "Who is the current Secretary-General of the United Nations?",
            options: ["Ban Ki-moon", "António Guterres", "Kofi Annan", "Boutros Boutros-Ghali"],
            correctAnswer: 1
        },
        {
            id: 211,
            category: "Current Affairs",
            question: "Which country experienced massive wildfires in 2023, described as the worst in its history?",
            options: ["Greece", "Canada", "Australia", "Brazil"],
            correctAnswer: 1
        },
        {
            id: 212,
            category: "Current Affairs",
            question: "What is the name of the AI chatbot released by OpenAI in November 2022?",
            options: ["Bard", "Claude", "ChatGPT", "Copilot"],
            correctAnswer: 2
        },
        {
            id: 213,
            category: "Current Affairs",
            question: "Which country joined NATO in 2023?",
            options: ["Sweden", "Finland", "Ukraine", "Georgia"],
            correctAnswer: 1
        },
        {
            id: 214,
            category: "Current Affairs",
            question: "Who won the 2023 US Open Men's Singles tennis championship?",
            options: ["Novak Djokovic", "Carlos Alcaraz", "Daniil Medvedev", "Rafael Nadal"],
            correctAnswer: 1
        },
        {
            id: 215,
            category: "Current Affairs",
            question: "Which tech company announced major layoffs exceeding 10,000 employees in early 2023?",
            options: ["Amazon", "Google", "Meta", "Microsoft"],
            correctAnswer: 2
        },
        {
            id: 216,
            category: "Current Affairs",
            question: "What was the main cause of the 2023 global banking crisis?",
            options: ["Cryptocurrency collapse", "COVID-19 aftermath", "Silicon Valley Bank failure", "Chinese real estate crisis"],
            correctAnswer: 2
        },
        {
            id: 217,
            category: "Current Affairs",
            question: "Which country launched its first mission to study the Sun in 2023?",
            options: ["India", "United States", "China", "European Union"],
            correctAnswer: 0
        },
        {
            id: 218,
            category: "Current Affairs",
            question: "Who became the King of the United Kingdom in 2022?",
            options: ["Prince William", "Prince Charles", "Prince Harry", "Prince Andrew"],
            correctAnswer: 1
        },
        {
            id: 219,
            category: "Current Affairs",
            question: "Which country legalized same-sex marriage in a 2023 referendum?",
            options: ["Slovenia", "Cuba", "Chile", "Switzerland"],
            correctAnswer: 2
        },
        {
            id: 220,
            category: "Current Affairs",
            question: "What major sporting event was held in Hangzhou, China in 2023?",
            options: ["Summer Olympics", "Winter Olympics", "Asian Games", "Commonwealth Games"],
            correctAnswer: 2
        },
        {
            id: 221,
            category: "Current Affairs",
            question: "Which streaming service had the most Oscar nominations in 2023?",
            options: ["Netflix", "Apple TV+", "Amazon Prime", "Disney+"],
            correctAnswer: 0
        },
        {
            id: 222,
            category: "Current Affairs",
            question: "Who won the 2023 Formula 1 World Championship?",
            options: ["Lewis Hamilton", "Max Verstappen", "Charles Leclerc", "George Russell"],
            correctAnswer: 1
        },
        {
            id: 223,
            category: "Current Affairs",
            question: "Which country experienced a massive earthquake in February 2023?",
            options: ["Turkey", "Japan", "Mexico", "Italy"],
            correctAnswer: 0
        },
        {
            id: 224,
            category: "Current Affairs",
            question: "What was the theme of World Environment Day 2023?",
            options: ["Beat Plastic Pollution", "Only One Earth", "Ecosystem Restoration", "Solutions to Plastic Pollution"],
            correctAnswer: 3
        },
        {
            id: 225,
            category: "Current Affairs",
            question: "Which company released Threads, a Twitter competitor, in 2023?",
            options: ["Google", "Meta", "Microsoft", "Snap"],
            correctAnswer: 1
        },
        {
            id: 226,
            category: "Current Affairs",
            question: "Who won the 2023 Women's World Cup in soccer?",
            options: ["United States", "Spain", "England", "Germany"],
            correctAnswer: 1
        },
        {
            id: 227,
            category: "Current Affairs",
            question: "Which country launched the Chandrayaan-3 moon mission in 2023?",
            options: ["China", "India", "United States", "Russia"],
            correctAnswer: 1
        },
        {
            id: 228,
            category: "Current Affairs",
            question: "What was the inflation rate target set by most central banks in 2023?",
            options: ["1%", "2%", "3%", "4%"],
            correctAnswer: 1
        },
        {
            id: 229,
            category: "Current Affairs",
            question: "Which social media app was banned in several countries over data privacy concerns in 2023?",
            options: ["TikTok", "Instagram", "Snapchat", "WhatsApp"],
            correctAnswer: 0
        },
        {
            id: 230,
            category: "Current Affairs",
            question: "Who won the 2023 Nobel Prize in Literature?",
            options: ["Annie Ernaux", "Jon Fosse", "Abdulrazak Gurnah", "Louise Glück"],
            correctAnswer: 1
        },
        {
            id: 231,
            category: "Current Affairs",
            question: "Which country experienced unprecedented heatwaves in 2023, breaking temperature records?",
            options: ["India", "United States", "China", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 232,
            category: "Current Affairs",
            question: "What major trade agreement was signed by Pacific nations in 2023?",
            options: ["CPTPP", "RCEP", "USMCA", "MERCOSUR"],
            correctAnswer: 1
        },
        {
            id: 233,
            category: "Current Affairs",
            question: "Who became the President of Brazil in 2023?",
            options: ["Jair Bolsonaro", "Luiz Inácio Lula da Silva", "Fernando Haddad", "Ciro Gomes"],
            correctAnswer: 1
        },
        {
            id: 234,
            category: "Current Affairs",
            question: "Which technology company announced a $10 billion investment in AI in 2023?",
            options: ["Microsoft", "Google", "Amazon", "Meta"],
            correctAnswer: 0
        },
        {
            id: 235,
            category: "Current Affairs",
            question: "What was the global theme for Earth Day 2023?",
            options: ["Invest in Our Planet", "Restore Our Earth", "Protect Our Species", "Climate Action"],
            correctAnswer: 0
        },
        {
            id: 236,
            category: "Current Affairs",
            question: "Which country approved the first vaccine for malaria in 2023?",
            options: ["United States", "European Union", "World Health Organization", "African Union"],
            correctAnswer: 2
        },
        {
            id: 237,
            category: "Current Affairs",
            question: "Who won the 2023 Academy Award for Best Picture?",
            options: ["Everything Everywhere All at Once", "The Fabelmans", "Tár", "Women Talking"],
            correctAnswer: 0
        },
        {
            id: 238,
            category: "Current Affairs",
            question: "Which country launched a digital currency in 2023?",
            options: ["China", "United States", "European Union", "India"],
            correctAnswer: 0
        },
        {
            id: 239,
            category: "Current Affairs",
            question: "What major space telescope began operations in 2022?",
            options: ["Hubble Space Telescope", "James Webb Space Telescope", "Chandra X-ray Observatory", "Spitzer Space Telescope"],
            correctAnswer: 1
        },
        {
            id: 240,
            category: "Current Affairs",
            question: "Which country experienced severe flooding in 2023 affecting millions?",
            options: ["Pakistan", "Bangladesh", "Nigeria", "Indonesia"],
            correctAnswer: 0
        },
        {
            id: 241,
            category: "Current Affairs",
            question: "Who became the Prime Minister of the United Kingdom in 2022?",
            options: ["Boris Johnson", "Liz Truss", "Rishi Sunak", "Jeremy Hunt"],
            correctAnswer: 2
        },
        {
            id: 242,
            category: "Current Affairs",
            question: "Which company became the most valuable in the world in 2023?",
            options: ["Apple", "Microsoft", "Saudi Aramco", "Amazon"],
            correctAnswer: 0
        },
        {
            id: 243,
            category: "Current Affairs",
            question: "What was the main focus of the G20 Summit in 2023?",
            options: ["Climate Change", "Global Economy", "Digital Transformation", "Sustainable Development"],
            correctAnswer: 3
        },
        {
            id: 244,
            category: "Current Affairs",
            question: "Which country legalized recreational cannabis in 2023?",
            options: ["Germany", "Thailand", "Mexico", "South Africa"],
            correctAnswer: 0
        },
        {
            id: 245,
            category: "Current Affairs",
            question: "Who won the 2023 Ballon d'Or for best football player?",
            options: ["Lionel Messi", "Kylian Mbappé", "Karim Benzema", "Erling Haaland"],
            correctAnswer: 0
        },
        {
            id: 246,
            category: "Current Affairs",
            question: "Which country experienced a major political crisis in 2023 leading to presidential elections?",
            options: ["Argentina", "Turkey", "Pakistan", "Nigeria"],
            correctAnswer: 2
        },
        {
            id: 247,
            category: "Current Affairs",
            question: "What new feature did Apple introduce in iOS 17?",
            options: ["Interactive Widgets", "Journal App", "StandBy Mode", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 248,
            category: "Current Affairs",
            question: "Which country hosted the COP28 climate conference in 2023?",
            options: ["Egypt", "United Arab Emirates", "United Kingdom", "Germany"],
            correctAnswer: 1
        },
        {
            id: 249,
            category: "Current Affairs",
            question: "Who became the President of Kenya in 2022?",
            options: ["Uhuru Kenyatta", "William Ruto", "Raila Odinga", "Martha Karua"],
            correctAnswer: 1
        },
        {
            id: 250,
            category: "Current Affairs",
            question: "Which social movement gained global attention in 2023 for climate activism?",
            options: ["Fridays for Future", "Extinction Rebellion", "Just Stop Oil", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 251,
            category: "Current Affairs",
            question: "What major banking merger was announced in 2023?",
            options: ["Credit Suisse and UBS", "Deutsche Bank and Commerzbank", "Goldman Sachs and Morgan Stanley", "Bank of America and Wells Fargo"],
            correctAnswer: 0
        },
        {
            id: 252,
            category: "Current Affairs",
            question: "Which country launched a new space station module in 2023?",
            options: ["United States", "China", "Russia", "India"],
            correctAnswer: 1
        },
        {
            id: 253,
            category: "Current Affairs",
            question: "Who won the 2023 Nobel Prize in Physics?",
            options: ["For work on climate change", "For black hole research", "For quantum computing", "For attosecond physics"],
            correctAnswer: 3
        },
        {
            id: 254,
            category: "Current Affairs",
            question: "Which country experienced mass protests in 2023 over pension reforms?",
            options: ["France", "Germany", "United Kingdom", "Italy"],
            correctAnswer: 0
        },
        {
            id: 255,
            category: "Current Affairs",
            question: "What was the main topic at the World Economic Forum in Davos 2023?",
            options: ["AI Regulation", "Climate Change", "Global Recession", "Cooperation in a Fragmented World"],
            correctAnswer: 3
        },
        {
            id: 256,
            category: "Current Affairs",
            question: "Which country approved lab-grown meat for sale in 2023?",
            options: ["United States", "Singapore", "Israel", "Netherlands"],
            correctAnswer: 0
        },
        {
            id: 257,
            category: "Current Affairs",
            question: "Who became the CEO of Twitter in 2022?",
            options: ["Elon Musk", "Jack Dorsey", "Parag Agrawal", "Linda Yaccarino"],
            correctAnswer: 3
        },
        {
            id: 258,
            category: "Current Affairs",
            question: "Which country experienced a major train accident in 2023?",
            options: ["India", "United States", "China", "Greece"],
            correctAnswer: 0
        },
        {
            id: 259,
            category: "Current Affairs",
            question: "What major sports event will be held in Paris in 2024?",
            options: ["Summer Olympics", "Winter Olympics", "FIFA World Cup", "UEFA European Championship"],
            correctAnswer: 0
        },
        {
            id: 260,
            category: "Current Affairs",
            question: "Which country launched a mission to Jupiter's moons in 2023?",
            options: ["European Space Agency", "NASA", "Roscosmos", "ISRO"],
            correctAnswer: 0
        },
        {
            id: 261,
            category: "Current Affairs",
            question: "Who won the 2023 US Presidential election?",
            options: ["Joe Biden", "Donald Trump", "Kamala Harris", "Ron DeSantis"],
            correctAnswer: 0
        },
        {
            id: 262,
            category: "Current Affairs",
            question: "Which tech company faced major antitrust lawsuits in 2023?",
            options: ["Google", "Amazon", "Apple", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 263,
            category: "Current Affairs",
            question: "What was the global population estimated to reach in 2023?",
            options: ["7 billion", "8 billion", "9 billion", "10 billion"],
            correctAnswer: 1
        },
        {
            id: 264,
            category: "Current Affairs",
            question: "Which country experienced a major drought affecting food production in 2023?",
            options: ["Argentina", "Australia", "Spain", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 265,
            category: "Current Affairs",
            question: "Who became the President of Chile in 2022?",
            options: ["Sebastián Piñera", "Gabriel Boric", "Michelle Bachelet", "José Antonio Kast"],
            correctAnswer: 1
        },
        {
            id: 266,
            category: "Current Affairs",
            question: "Which company announced a $100 billion investment in renewable energy?",
            options: ["Saudi Aramco", "ExxonMobil", "Shell", "BP"],
            correctAnswer: 0
        },
        {
            id: 267,
            category: "Current Affairs",
            question: "What major peace agreement was signed in 2023?",
            options: ["Israel-Saudi Arabia normalization", "Ethiopia-Tigray peace", "Colombia-ELN ceasefire", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 268,
            category: "Current Affairs",
            question: "Which country launched a national AI strategy in 2023?",
            options: ["United Kingdom", "Canada", "Australia", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 269,
            category: "Current Affairs",
            question: "Who won the 2023 Pulitzer Prize for Fiction?",
            options: ["Barbara Kingsolver", "Hernan Diaz", "Joshua Cohen", "Tara Westover"],
            correctAnswer: 1
        },
        {
            id: 270,
            category: "Current Affairs",
            question: "Which country experienced a major stock market crash in 2023?",
            options: ["China", "United States", "Japan", "Germany"],
            correctAnswer: 0
        },
        {
            id: 271,
            category: "Current Affairs",
            question: "What new social media app gained popularity among teenagers in 2023?",
            options: ["BeReal", "TikTok", "Instagram Reels", "Snapchat Spotlight"],
            correctAnswer: 0
        },
        {
            id: 272,
            category: "Current Affairs",
            question: "Which country approved the first gene therapy for sickle cell disease?",
            options: ["United States", "United Kingdom", "European Union", "Canada"],
            correctAnswer: 1
        },
        {
            id: 273,
            category: "Current Affairs",
            question: "Who became the CEO of Disney in 2022?",
            options: ["Bob Iger", "Bob Chapek", "Susan Arnold", "Mark Parker"],
            correctAnswer: 0
        },
        {
            id: 274,
            category: "Current Affairs",
            question: "Which country experienced a major volcanic eruption in 2023?",
            options: ["Iceland", "Italy", "Japan", "Indonesia"],
            correctAnswer: 0
        },
        {
            id: 275,
            category: "Current Affairs",
            question: "What was the main achievement of the Montreal Biodiversity Conference in 2022?",
            options: ["30x30 agreement", "Plastic pollution treaty", "Climate finance fund", "Carbon trading system"],
            correctAnswer: 0
        },
        {
            id: 276,
            category: "Current Affairs",
            question: "Which country launched a digital nomad visa in 2023?",
            options: ["Portugal", "Spain", "Italy", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 277,
            category: "Current Affairs",
            question: "Who won the 2023 Women's Tennis Association Finals?",
            options: ["Iga Świątek", "Aryna Sabalenka", "Coco Gauff", "Elena Rybakina"],
            correctAnswer: 1
        },
        {
            id: 278,
            category: "Current Affairs",
            question: "Which company announced a breakthrough in nuclear fusion in 2022?",
            options: ["ITER", "National Ignition Facility", "Commonwealth Fusion Systems", "Helion Energy"],
            correctAnswer: 1
        },
        {
            id: 279,
            category: "Current Affairs",
            question: "What major infrastructure project was completed in 2023?",
            options: ["Istanbul Canal", "California High-Speed Rail", "Brent Spence Bridge", "None were completed"],
            correctAnswer: 3
        },
        {
            id: 280,
            category: "Current Affairs",
            question: "Which country experienced a major political scandal in 2023?",
            options: ["United Kingdom", "United States", "Japan", "Brazil"],
            correctAnswer: 2
        },
        {
            id: 281,
            category: "Current Affairs",
            question: "Who became the President of the Philippines in 2022?",
            options: ["Rodrigo Duterte", "Bongbong Marcos", "Leni Robredo", "Manny Pacquiao"],
            correctAnswer: 1
        },
        {
            id: 282,
            category: "Current Affairs",
            question: "Which country approved the first over-the-counter birth control pill?",
            options: ["United States", "United Kingdom", "Canada", "Australia"],
            correctAnswer: 0
        },
        {
            id: 283,
            category: "Current Affairs",
            question: "What was the main outcome of the WTO Ministerial Conference in 2022?",
            options: ["Fisheries subsidies agreement", "COVID-19 vaccine waiver", "Digital trade rules", "Agriculture reforms"],
            correctAnswer: 0
        },
        {
            id: 284,
            category: "Current Affairs",
            question: "Which company faced a major data breach affecting millions in 2023?",
            options: ["LastPass", "Twitter", "T-Mobile", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 285,
            category: "Current Affairs",
            question: "Who won the 2023 Man Booker International Prize?",
            options: ["Time Shelter by Georgi Gospodinov", "The Books of Jacob by Olga Tokarczuk", "The Discomfort of Evening by Marieke Lucas Rijneveld", "Celestial Bodies by Jokha Alharthi"],
            correctAnswer: 0
        },
        {
            id: 286,
            category: "Current Affairs",
            question: "Which country experienced a major cyber attack on critical infrastructure in 2023?",
            options: ["United States", "United Kingdom", "Australia", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 287,
            category: "Current Affairs",
            question: "What new technology was showcased at CES 2023?",
            options: ["Foldable laptops", "AI-powered assistants", "Electric vehicles", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 288,
            category: "Current Affairs",
            question: "Which country passed a law requiring companies to disclose climate risks?",
            options: ["European Union", "United States", "Japan", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 289,
            category: "Current Affairs",
            question: "Who became the CEO of Starbucks in 2023?",
            options: ["Howard Schultz", "Laxman Narasimhan", "Kevin Johnson", "Rosalind Brewer"],
            correctAnswer: 1
        },
        {
            id: 290,
            category: "Current Affairs",
            question: "Which country experienced a major transport strike in 2023?",
            options: ["United Kingdom", "France", "Germany", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 291,
            category: "Current Affairs",
            question: "What was the theme of International Women's Day 2023?",
            options: ["Choose to Challenge", "Break the Bias", "DigitALL: Innovation and technology for gender equality", "Women in leadership"],
            correctAnswer: 2
        },
        {
            id: 292,
            category: "Current Affairs",
            question: "Which company announced plans for a humanoid robot?",
            options: ["Tesla", "Boston Dynamics", "Google", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 293,
            category: "Current Affairs",
            question: "Who became the President of Angola in 2022?",
            options: ["João Lourenço", "José Eduardo dos Santos", "Adalberto Costa Júnior", "Isabel dos Santos"],
            correctAnswer: 0
        },
        {
            id: 294,
            category: "Current Affairs",
            question: "Which country launched a national hydrogen strategy in 2023?",
            options: ["United States", "Germany", "Japan", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 295,
            category: "Current Affairs",
            question: "What major sporting event was held in Birmingham in 2022?",
            options: ["Commonwealth Games", "Asian Games", "Pan American Games", "African Games"],
            correctAnswer: 0
        },
        {
            id: 296,
            category: "Current Affairs",
            question: "Which company announced a major investment in quantum computing?",
            options: ["IBM", "Google", "Microsoft", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 297,
            category: "Current Affairs",
            question: "Who won the 2023 Academy Award for Best Director?",
            options: ["Steven Spielberg", "Daniel Kwan and Daniel Scheinert", "Martin McDonagh", "Todd Field"],
            correctAnswer: 1
        },
        {
            id: 298,
            category: "Current Affairs",
            question: "Which country experienced a major migration crisis in 2023?",
            options: ["United States", "European Union", "United Kingdom", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 299,
            category: "Current Affairs",
            question: "What new feature was added to WhatsApp in 2023?",
            options: ["Channels", "Edit messages", "Screen sharing", "All of the above"],
            correctAnswer: 3
        },
        {
            id: 300,
            category: "Current Affairs",
            question: "Which country hosted the G7 Summit in 2023?",
            options: ["Germany", "Japan", "United Kingdom", "Canada"],
            correctAnswer: 1
        }
    ];
    
    // Initialize the application
    function init() {
        // Load leaderboard from localStorage
        loadLeaderboard();
        
        // Set up event listeners
        setupEventListeners();
    }
    
    // Set up all event listeners
    function setupEventListeners() {
        // Welcome screen
        startQuizBtn.addEventListener('click', startQuiz);
        viewLeaderboardBtn.addEventListener('click', () => showScreen('leaderboard'));
        
        // Quiz screen
        nextQuestionBtn.addEventListener('click', nextQuestion);
        quitQuizBtn.addEventListener('click', quitQuiz);
        
        // Results screen
        playAgainBtn.addEventListener('click', playAgain);
        viewLeaderboardResultsBtn.addEventListener('click', () => showScreen('leaderboard'));
        goHomeBtn.addEventListener('click', () => showScreen('welcome'));
        
        // Leaderboard screen
        tabAllBtn.addEventListener('click', () => switchLeaderboardTab('all'));
        tabTodayBtn.addEventListener('click', () => switchLeaderboardTab('today'));
        clearLeaderboardBtn.addEventListener('click', clearLeaderboard);
        backToHomeBtn.addEventListener('click', () => showScreen('welcome'));
        
        // Allow Enter key to start quiz
        playerNameInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                startQuiz();
            }
        });
    }
    
    // Show a specific screen and hide others
    function showScreen(screenName) {
        // Hide all screens
        Object.keys(screens).forEach(key => {
            screens[key].classList.remove('active');
        });
        
        // Show the requested screen
        screens[screenName].classList.add('active');
        
        // If showing leaderboard, update it
        if (screenName === 'leaderboard') {
            updateLeaderboard();
        }
    }
    
    // Start the quiz
    function startQuiz() {
        const playerName = playerNameInput.value.trim();
        
        if (!playerName) {
            alert('Please enter your name to start the quiz.');
            playerNameInput.focus();
            return;
        }
        
        // Set player name
        quizState.playerName = playerName;
        currentPlayerSpan.textContent = playerName;
        resultsPlayerSpan.textContent = playerName;
        
        // Reset quiz state
        quizState.currentQuestionIndex = 0;
        quizState.score = 0;
        quizState.userAnswers = [];
        quizState.quizStartTime = new Date();
        quizState.elapsedTime = 0;
        
        // Select 10 random unique questions from the bank
        quizState.selectedQuestions = selectRandomQuestions(10);
        
        // Update UI
        updateQuestionCounter();
        updateScoreCounter();
        updateProgressBar();
        
        // Start timer
        startTimer();
        
        // Load first question
        loadQuestion();
        
        // Show quiz screen
        showScreen('quiz');
    }
    
    // Select random unique questions from the question bank
    function selectRandomQuestions(count) {
        // Create a copy of the question bank
        const availableQuestions = [...questionBank];
        const selected = [];
        
        // If we don't have enough questions, return what we have
        if (availableQuestions.length < count) {
            console.warn(`Not enough questions in the bank. Requested: ${count}, Available: ${availableQuestions.length}`);
            return availableQuestions;
        }
        
        // Select random questions
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            selected.push(availableQuestions[randomIndex]);
            
            // Remove the selected question from available questions
            availableQuestions.splice(randomIndex, 1);
        }
        
        return selected;
    }
    
    // Start the quiz timer
    function startTimer() {
        quizState.quizStartTime = new Date();
        
        // Clear any existing timer
        if (quizState.timerInterval) {
            clearInterval(quizState.timerInterval);
        }
        
        // Update timer every second
        quizState.timerInterval = setInterval(updateTimer, 1000);
    }
    
    // Update the timer display
    function updateTimer() {
        const now = new Date();
        quizState.elapsedTime = Math.floor((now - quizState.quizStartTime) / 1000);
        
        const minutes = Math.floor(quizState.elapsedTime / 60);
        const seconds = quizState.elapsedTime % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Load the current question
    function loadQuestion() {
        const currentQuestion = quizState.selectedQuestions[quizState.currentQuestionIndex];
        
        // Update question text
        questionElement.textContent = currentQuestion.question;
        
        // Update category indicator
        questionElement.dataset.category = currentQuestion.category;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Create option elements
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.index = index;
            
            // Add label (A, B, C, D)
            const labelSpan = document.createElement('span');
            labelSpan.className = 'option-label';
            labelSpan.textContent = String.fromCharCode(65 + index); // A, B, C, D
            
            // Add option text
            const textParagraph = document.createElement('p');
            textParagraph.className = 'option-text';
            textParagraph.textContent = option;
            
            optionElement.appendChild(labelSpan);
            optionElement.appendChild(textParagraph);
            
            // Add click event
            optionElement.addEventListener('click', () => selectOption(index));
            
            optionsContainer.appendChild(optionElement);
        });
        
        // Reset next button
        nextQuestionBtn.disabled = true;
        
        // If user already answered this question, show their answer
        if (quizState.userAnswers[quizState.currentQuestionIndex] !== undefined) {
            const userAnswer = quizState.userAnswers[quizState.currentQuestionIndex];
            const options = document.querySelectorAll('.option');
            
            options[userAnswer].classList.add('selected');
            
            // Show correct/incorrect if we're reviewing
            if (quizState.currentQuestionIndex === quizState.selectedQuestions.length) {
                const correctAnswer = currentQuestion.correctAnswer;
                
                options[correctAnswer].classList.add('correct');
                
                if (userAnswer !== correctAnswer) {
                    options[userAnswer].classList.add('incorrect');
                }
            }
            
            nextQuestionBtn.disabled = false;
        }
    }
    
    // Select an option
    function selectOption(optionIndex) {
        // Only allow selection if we haven't answered this question yet
        if (quizState.userAnswers[quizState.currentQuestionIndex] !== undefined) {
            return;
        }
        
        // Remove 'selected' class from all options
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add 'selected' class to clicked option
        options[optionIndex].classList.add('selected');
        
        // Enable next button
        nextQuestionBtn.disabled = false;
        
        // Store user's answer
        quizState.userAnswers[quizState.currentQuestionIndex] = optionIndex;
        
        // Check if answer is correct
        const currentQuestion = quizState.selectedQuestions[quizState.currentQuestionIndex];
        if (optionIndex === currentQuestion.correctAnswer) {
            quizState.score++;
            updateScoreCounter();
        }
    }
    
    // Move to the next question
    function nextQuestion() {
        // If user hasn't answered this question, don't proceed
        if (quizState.userAnswers[quizState.currentQuestionIndex] === undefined) {
            alert('Please select an answer before proceeding.');
            return;
        }
        
        // Move to next question
        quizState.currentQuestionIndex++;
        
        // Update progress
        updateQuestionCounter();
        updateProgressBar();
        
        // If we've answered all questions, show results
        if (quizState.currentQuestionIndex >= quizState.selectedQuestions.length) {
            finishQuiz();
        } else {
            // Load next question
            loadQuestion();
        }
    }
    
    // Finish the quiz and show results
    function finishQuiz() {
        // Stop the timer
        clearInterval(quizState.timerInterval);
        
        // Calculate final score
        const correctAnswers = quizState.score;
        const incorrectAnswers = quizState.selectedQuestions.length - quizState.score;
        
        // Update results screen
        finalScoreElement.textContent = quizState.score;
        correctAnswersElement.textContent = correctAnswers;
        incorrectAnswersElement.textContent = incorrectAnswers;
        
        // Format time taken
        const minutes = Math.floor(quizState.elapsedTime / 60);
        const seconds = quizState.elapsedTime % 60;
        timeTakenElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update the progress ring animation
        const circumference = 2 * Math.PI * 90;
        const scorePercentage = quizState.score / quizState.selectedQuestions.length;
        const offset = circumference - (scorePercentage * circumference);
        
        const circle = document.querySelector('.progress-ring__circle');
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        // Animate the progress ring
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
        
        // Save score to leaderboard
        saveScoreToLeaderboard();
        
        // Show results screen
        showScreen('results');
    }
    
    // Quit the quiz and go back to welcome screen
    function quitQuiz() {
        if (confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
            // Stop timer
            clearInterval(quizState.timerInterval);
            
            // Reset quiz state
            quizState = {
                playerName: '',
                currentQuestionIndex: 0,
                score: 0,
                selectedQuestions: [],
                userAnswers: [],
                quizStartTime: null,
                timerInterval: null,
                elapsedTime: 0
            };
            
            // Show welcome screen
            showScreen('welcome');
        }
    }
    
    // Play again
    function playAgain() {
        // Reset player name input
        playerNameInput.value = quizState.playerName;
        
        // Start new quiz
        startQuiz();
    }
    
    // Update question counter
    function updateQuestionCounter() {
        questionCounter.textContent = `${quizState.currentQuestionIndex + 1}/${quizState.selectedQuestions.length}`;
    }
    
    // Update score counter
    function updateScoreCounter() {
        scoreCounter.textContent = quizState.score;
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progressPercentage = ((quizState.currentQuestionIndex + 1) / quizState.selectedQuestions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
    
    // Leaderboard functions
    function loadLeaderboard() {
        const leaderboardData = localStorage.getItem('quizLeaderboard');
        if (leaderboardData) {
            return JSON.parse(leaderboardData);
        }
        return [];
    }
    
    function saveScoreToLeaderboard() {
        const leaderboard = loadLeaderboard();
        
        // Create new score entry
        const newScore = {
            playerName: quizState.playerName,
            score: quizState.score,
            date: new Date().toISOString(),
            time: quizState.elapsedTime
        };
        
        // Add to leaderboard
        leaderboard.push(newScore);
        
        // Sort by score (highest first), then by time (fastest first for same score)
        leaderboard.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.time - b.time;
        });
        
        // Keep only top 25 scores
        const topScores = leaderboard.slice(0, 25);
        
        // Save back to localStorage
        localStorage.setItem('quizLeaderboard', JSON.stringify(topScores));
    }
    
    function updateLeaderboard(filter = 'all') {
        const leaderboard = loadLeaderboard();
        
        // Clear current entries
        leaderboardEntries.innerHTML = '';
        
        // Filter if needed
        let filteredLeaderboard = leaderboard;
        if (filter === 'today') {
            const today = new Date().toDateString();
            filteredLeaderboard = leaderboard.filter(entry => {
                const entryDate = new Date(entry.date).toDateString();
                return entryDate === today;
            });
        }
        
        // Display entries
        if (filteredLeaderboard.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'leaderboard-entry';
            emptyMessage.innerHTML = `<div class="no-scores" style="grid-column: 1 / span 4; text-align: center; padding: 30px; color: #a9a9a9;">
                <i class="fas fa-trophy" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                <p>No scores yet. Be the first to take the quiz!</p>
            </div>`;
            leaderboardEntries.appendChild(emptyMessage);
        } else {
            filteredLeaderboard.forEach((entry, index) => {
                const entryElement = document.createElement('div');
                entryElement.className = 'leaderboard-entry';
                
                // Highlight current player
                if (entry.playerName === quizState.playerName) {
                    entryElement.classList.add('current-player');
                }
                
                // Format date
                const dateObj = new Date(entry.date);
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
                
                // Format time
                const minutes = Math.floor(entry.time / 60);
                const seconds = entry.time % 60;
                const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                entryElement.innerHTML = `
                    <span class="rank">${index + 1}</span>
                    <span class="player">
                        <i class="fas fa-user"></i>
                        ${entry.playerName}
                    </span>
                    <span class="score">${entry.score}/10</span>
                    <span class="date" title="Time: ${formattedTime}">${formattedDate}</span>
                `;
                
                leaderboardEntries.appendChild(entryElement);
            });
        }
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (filter === 'all') {
            tabAllBtn.classList.add('active');
        } else {
            tabTodayBtn.classList.add('active');
        }
    }
    
    function switchLeaderboardTab(tab) {
        updateLeaderboard(tab);
    }
    
    function clearLeaderboard() {
        if (confirm('Are you sure you want to clear the entire leaderboard? This action cannot be undone.')) {
            localStorage.removeItem('quizLeaderboard');
            updateLeaderboard();
        }
    }
    
    // Initialize the app
    init();
});
