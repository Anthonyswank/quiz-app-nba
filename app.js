const store = {
  questions: [
    {
      question: 'What year was the NBA (National Basketball Association) founded?',
      answers: [
        '1956',
        '1946',
        '1950',
        '1869'
      ],
      correctAnswer: '1946'
    },
    {
      question: 'What team has appeared in the most NBA Finals?',
      answers: [
        'Boston Celtics',
        'Miami Heat',
        'Los Angeles Lakers',
        'Houston Rockets'
      ],
      correctAnswer: 'Los Angeles Lakers'
    },
    {
      question: 'Which company did Vince Carter sign with for his very first shoe collaboration?',
      answers: [
        'Nike',
        'Under Armour',
        'Adidas',
        'Puma'
      ],
      correctAnswer: 'Puma'
    },
    {
      question: 'What university did Bill Russell play for in NCAA Basketball?',
      answers: [
        'Univ. of San Francisco',
        'Univ. of Iowa',
        'Southern Methodist Univ.',
        'Temple Univ.'
      ],
      correctAnswer: 'Univ. of San Francisco'
    },
    {
      question: 'Which of these players were on the same team at one point?',
      answers: [
        'Tracy McGrady and Dwight Howard',
        'Jason Kidd and John Stockton',
        'Ray Allen and Kevin Durant',
        'Vince Carter and Chris Bosh'
      ],
      correctAnswer: 'Vince Carter and Chris Bosh'
    },
    {
      question: 'Which player below never scored above 60 points in a single game with the matching team?',
      answers: [
        'Lebron James (Cavaliers)',
        'Tracy McGrady (Magic)',
        'Allen Iverson (76ers)',
        'Gilbert Arenas (Wizards)'
      ],
      correctAnswer: 'Lebron James (Cavaliers)'
    },
    {
      question: 'What team drafted Rajon Rondo?',
      answers: [
        'Houston Rockets',
        'Phoenix Suns',
        'New Jersey Nets',
        'Denver Nuggets'
      ],
      correctAnswer: 'Phoenix Suns'
    },
    {
      question: 'In Jason Kidds first 3 years with the Mavericks, what was the move most people associated him with?',
      answers: [
        'Baseball pass',
        'Crossover dribble',
        'Behind the back dribble',
        'No-look pass'
      ],
      correctAnswer: 'Baseball pass'
    },
    {
      question: 'Which team scored 184 points in a game and still lost?',
      answers: [
        'Detroit Pistons',
        'Denver Nuggets',
        'Los Angeles Lakers',
        'New York Knicks'
      ],
      correctAnswer: 'Denver Nuggets'
    },
    {
      question: 'Who is the oldest player ever to have been active in the NBA?',
      answers: [
        'Moses Malone',
        'Kareem Jabbar',
        'Robert Parish',
        'Sam Mitchell'
      ],
      correctAnswer: 'Robert Parish'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  incorrect: 0
};


function generateStartPage(){
  //return the starting screen
  //add button to start quiz
  return `<div id="startPage" class="start">
  <h2>This is a quiz about the history and sport<br> of basketball, specifically to the NBA.</h2>
  <h2>Good luck and have fun!</h2>
  <button id="startQuiz">Start Quiz</button>
</div>
`
};

function generateQuestionPage(){
  //gather question and answers from global variable
  //set them to local variables
  //if statement to make answer choice required to move on
  //setup question and answers on screen in html with local variables
  let question = store.questions[store.questionNumber];
  let answers = question.answers.map((answer, idx) => {
    if(idx === 0) {
      return `<input type="radio" id="answer${idx}" name="answer" value="${answer}" required>
      <label for="answer${idx}">${answer}</label><br>`;
    }
    return `<input type="radio" id="answer${idx}" name="answer" value="${answer}">
    <label for="answer${idx}">${answer}</label><br>`;
  });
  return `<div class="questionDiv">
  <div class="status"><span class="currentQuestion">Question ${store.questionNumber + 1} out of ${store.questions.length}</span>
  <span class="score">Correct: ${store.score}  Incorrect: ${store.incorrect}</span>
  </div>

  <form id="question">
  <h2>${question.question}</h2>
  ${answers.join("")}
  <button type="submit">Submit</button>
  </form>         
  </div>
`
};

function generateFeedbackPage(){
  //get user's answer from question
  //compare that to correct answer of question
  //if statement on if they got it correct or incorrect
  //return specific html depending on if statement
  //display right answer if they got it wrong, display their answer if they got it right
  //display their new score on the page
  //implement next question button on page that generates next question html
  let userInput = $('input[name="answer"]:checked').val();
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  if(userInput === correctAnswer){
    store.score++;
    return `<div id="feedbackPage" class="feedback">
    <h2>You got it right!</h2>
    <p>The answer was: ${correctAnswer}</p>
    <p>New score: ${store.score} out of ${store.questionNumber + 1}</p>
    <form id="nextQuestion">
      <button type="submit">Next Question</button>
    </form>
</div>
`
  } else {
    store.incorrect++;
    return `<div id="feedbackPage" class="feedback">
    <h2>Oh no, you got it wrong. :(</h2>
    <p>You chose: ${userInput}</p>
    <p>The answer was: ${correctAnswer}</p>
    <p>New score: ${store.score} out of ${store.questionNumber + 1}</p>
    <form id="nextQuestion">
      <button type="submit">Next Question</button>
    </form>
</div>
`
  };
};

function generateEndPage(){
  //collect score and incorrect variables from global
  //return html page with button to restart quiz
  return `<div id="EndPage" class="end">
  <h2>You made it!</h2>
  <p class="bigger">Total score:</p>
  <p class="bigger">Correct: ${store.score}  Incorrect: ${store.incorrect}</p>
  <p>Thanks for taking my quiz!</p>
  <form id="endForm">
      <p>Would you like to retake it?</p>
      <button type="submit">Retake Quiz</button>
  </form>
</div>
`
};



function handleStartQuiz(){
  //listener for start quiz button on start page
  //set quiz started variable to true
  //render the page
  $('main').on('click', '#startQuiz', function(event){
    store.quizStarted = true;
    render();
  })
};

function handleAnswerSubmit(){
  //listener for user input on answers
  //increase question number variable each time submit button is pressed
  //render feedback page
  $('main').on('submit', '#question', function(event){
    event.preventDefault();
    let htmlFeed = generateFeedbackPage();
    store.questionNumber++;
    $('main').html(htmlFeed)
  })
};

function handleNextQuestion(){
  //listener for next question button on feedback page
  //render next question
  $('main').on('submit', '#nextQuestion', function(event){
    render();
  })
};

function handleRestartQuiz(){
  //listener for restart quiz button
  //set quiz started variable to false
  //render the start page
  $('main').on('submit', '#endForm', function(event){
    event.preventDefault();
    store.questionNumber = 0;
    store.score = 0;
    store.incorrect = 0;
    render();
  })
};





function render(){
  //handles on rendering of the html to the page
  //gather the quizstarted variable from global variable to determine
  //what to render
  //render start page if it hasnt started yet
  //update html with input given
  let html = '';
  if(store.quizStarted === true){
    if(store.questionNumber === store.questions.length){
      html = generateEndPage();
    } else{
      html = generateQuestionPage();
    }
  } else{
    html = generateStartPage();
  }
  $('main').html(html);
};



function main(){
  //gather all functions to start on page load here
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleNextQuestion();
  handleRestartQuiz();
};

$(main);




/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)