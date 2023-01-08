var score = 0;
var cross = true;
var gameOverSound = new Audio('sounds/gameover.mp3');
var audio = new Audio('sounds/music.mp3');


document.querySelector(".up").addEventListener("click",()=>{
    dino = document.querySelector(".dino");
    dino.classList.add('animateDino');
    
    setTimeout(() => {
        dino.classList.remove('animateDino');
    }, 700);
});

document.querySelector(".left").addEventListener("click",()=>{
    dino = document.querySelector(".dino");
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 100) + "px";
});

document.querySelector(".right").addEventListener("click",()=>{
    dino = document.querySelector(".dino");
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dino.style.left = dinoX + 100+ "px";
});



document.querySelector(".play").addEventListener('click', () => {
     
    document.querySelector(".obstacle").classList.add('obstacleAni');

    const x = window.matchMedia('(max-width:768px)');

    if(x.matches){
         document.querySelector(".movement").style.visibility = "visible";
    }



   
    setTimeout(() => {

        audio.play();
        document.querySelector('.play').style.display = "none";
        document.querySelector(".restart").style.display = "inherit";
        document.getElementById('scoreCount').style.display = "inherit";

    }, 100);
    KeyCheck();
});



function KeyCheck() {

    document.onkeydown = function (e) {

        if (e.keyCode == 38) {

            dino = document.querySelector(".dino");
            dino.classList.add('animateDino');
            
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);
        }

        if (e.keyCode == 39) {

            dino = document.querySelector(".dino");
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px";

        }

        if (e.keyCode == 37) {

            dino = document.querySelector(".dino");
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 112) + "px";

        }




    }
}

  document.querySelector(".restart").addEventListener('click', () => {
            window.location.reload();
        });


setInterval(() => {

    dino = document.querySelector(".dino");
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);


    if (offsetX < 80 && offsetY < 52) {

        gameOver.innerHTML = "Game Over";
        obstacle.classList.remove('obstacleAni');
        audio.pause();
        gameOverSound.play();
        setTimeout(() => {
            gameOverSound.pause();
            window.location.reload();

        }, 4000)


      


    } else if (offsetX < 80 && cross) {

        score += 5;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {

            obstacle = document.querySelector('.obstacle');
            animationDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = animationDur - 0.1;

            obstacle.style.animationDuration = newDur + 's';

        }, 500);



    }


}, 10);



// update score

function updateScore(score) {
    document.getElementById("scoreCount").innerHTML = "Score: " + score;
}
