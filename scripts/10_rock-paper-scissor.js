let score = JSON.parse(localStorage.getItem('score')) || {win: 0,loss: 0,tie: 0};

let intervalId;

    updateScore();

    document.querySelector('.js-reset')
    .addEventListener('click',() =>{
        reset();
    });

    
    
    function reset() {
        stopPlay();
        let htmlElement = `<p>Are your sure you want to reset the code? 
        <button class="js-yes";>Yes</button>
        <button class="js-no";>No</button>
        </p>`;
        // score = { win: 0, loss: 0, tie: 0 };
        // localStorage.removeItem('score');
        // updateScore();
        // alert('Score has been reset. Start a new game!');
        // prompt('Are you sure ?');
        document.querySelector('.js-selectOption').innerHTML = htmlElement;

        document.querySelector('.js-yes')
        .addEventListener(('click'),() => {
            score = { win: 0, loss: 0, tie: 0 };
            localStorage.removeItem('score');
            updateScore();
            document.querySelector('.js-selectOption').innerHTML = '';

        });

        document.querySelector('.js-no')
        .addEventListener(('click'),() => {
            localStorage.setItem('score', JSON.stringify(score));
            updateScore();
            document.querySelector('.js-selectOption').innerHTML = '';
        });
    }

    function updateScore() {
        document.querySelector('.js-score').innerHTML = 
        `Win: ${score.win}, Loss: ${score.loss}, Tie: ${score.tie}`;
    }
    
    function choose() {
        let computerChoice = Math.random();
        let choice;

        if(computerChoice>0 && computerChoice<1/3) {
            choice = 'rock';
        }

        else if(computerChoice>1/3 && computerChoice<2/3) {
            choice = 'paper';
        }

        else if(computerChoice>2/3 && computerChoice<1) {
            choice = 'scissors';
        }

        return choice;
    }

    document.querySelector('.js-auto')
    .addEventListener('click',() =>{
        autoPlay();
    });


    // while clicking on r in the keyboard autoPlay function should start
   
    function autoPlay() {
    
        intervalId = setInterval(() => {
            const autoPlayValue = choose();
            player(autoPlayValue);
        },1000);

        document.querySelector('.js-auto').style.visibility = "hidden";
        document.querySelector('.js-stop').style.visibility = "visible";   
    } 

    document.querySelector('.js-stop')
    .addEventListener('click',() =>{
        stopPlay();
    });

    document.body.addEventListener(('keydown'),(event) => {
        if(event.key === 's') {
            stopPlay();
        }
    });

    function stopPlay() {
        document.querySelector('.js-auto').style.visibility = "visible";
        document.querySelector('.js-stop').style.visibility = "hidden";
        clearInterval(intervalId);
    }


    document.querySelector('.js-rock')
        .addEventListener('click',() => {
        player('rock');
    });

    document.querySelector('.js-paper')
        .addEventListener('click',() => {
            player('paper');
    });

    document.querySelector('.js-scissors')
        .addEventListener('click',() => {
            player('scissors');
    });


    // keydown is an eventListener with the help of the we can know that which keywords we have enter
    document.body.addEventListener('keydown',(event) =>{
        if(event.key === 'r') {
            player('rock');
        }
        else if(event.key === 'p') {
            player('paper');
        }
        else if(event.key === 's') {
            player('scissors');
        }
        else if(event.key === 'Backspace') {
            reset();
        }
        else if(event.key === 'a'){
            autoPlay();
        }
    });



    function player(value) {

        let choice = choose();
        let result = '';

    
        if(choice === value) {
            result = 'Tie.';
            
        }

        else if(
            (value === 'rock' && choice === 'scissors') || 
            (value === 'scissors' && choice === 'paper' ) ||
            (value === 'paper' && choice === 'rock') 
            
        ) {
            result = 'You win.';     
        }

        else {
            result = 'You lose.';
        }


        document.getElementById('js-result1').innerHTML = result;

        if(result === 'You win.') {
            score.win++;
        }

        else if(result === 'You lose.') {
            score.loss++;
        }
        else if(result === 'Tie.') {
            score.tie++;
        }

        document.getElementById('js-move').innerHTML =
        `You
        <img src="img/${value}-emoji.png">
        <img src="img/${choice}-emoji.png">
        Computer`

        updateScore();

        localStorage.setItem('score', JSON.stringify(score));



        // alert(`You have selected ${value}. Computer have selected ${choice}. ${result}! \n win: ${score.win}, loss: ${score.loss}, tie: ${score.tie}`);

    }