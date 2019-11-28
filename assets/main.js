    
    var timeEl=document.getElementById("time");
    var startBtn=document.getElementById("start-btn");
    var highScore=document.getElementById("high-score");
    var modalTitle=document.getElementById("modal-title");
    var modalBody=document.getElementById("modal-body");
    var modalFooter=document.getElementById("modal-footer");
    var nextBtn=document.getElementById("next-btn");
    var finishBtn=document.getElementById("finish-btn");
    var saveBtn=document.getElementById("save-btn");
    var status=document.getElementById("status");
    var radios=document.getElementsByName("quiz");
    var highScore=document.getElementById("high-score");
    
    var remainingTime=75;
    var quizNum=-1;
    var intervalObj;

    var correct=0;
    var incorrect=0;
    var skipped=0;
    var clickCount=0;
    var totalScore=0;
    var playerName="";


function start(){
    displayNextQuiz();

    intervalObj=setInterval(function(){
        if(remainingTime<=0){
            $("#modal-title").css("color","red");
            endQuiz("Time is up!");
        }
        remainingTime--;
        timeEl.textContent=remainingTime;
    },1000);
}

function displayNextQuiz(){
    $("#status").html("&nbsp;");
    quizNum++;
    modalTitle.textContent=(quizNum+1)+". "+questions[quizNum].title;
    clickCount=0;
    for(var i=0; i<4; i++){
    var labelEl=document.getElementsByClassName("quiz");
    labelEl[i].innerHTML=radioHtml+questions[quizNum].choices[i];
    }
    if(quizNum==questions.length-1){
        $("#next-btn").css("display","none");
        $("#finish-btn").css("display","block");       
    }
}

$('label').on('click',function(){
    clickCount++;
    if(clickCount==1){
    checkAnswer(this.textContent);
}
});

function checkAnswer(userChoice){
    var correctAnswer=questions[quizNum].answer;
    var statusEl= $("#status");

    if(userChoice==correctAnswer){
        correct++;
       statusEl.text("Correct!");
       statusEl.css("color","#3dab07");
    }else{
        incorrect++;
        if(remainingTime>=15){
            console.log("being called");
            remainingTime=remainingTime-15;
        }else{
            remainingTime=0;
            timeEl.innerHTML=remainingTime;
        }
        statusEl.html("Incorrect! You lost 15 seconds.<br>Correct answer is: "+correctAnswer);
        statusEl.css("color","red");
    }
}

function endQuiz(status){
    clearInterval(intervalObj);
    $("#status").text("");
    modalTitle.textContent=status;
    modalBody.innerHTML="Correct answers: "+correct+"<br>Incorrect answers: "+incorrect+"<br>Skipped: "+(questions.length-correct-incorrect)
    +scoreHtml+nameInputHtml;
    $("#score").text(calculateScore());
    $("#score").text();
    $("#save-btn").css("display","block");
    $("#finish-btn").css("display","none");
}

function calculateScore(){
    if(correct>0){
    totalScore+=correct*5;
    if(remainingTime>0){
        totalScore+=remainingTime/(incorrect+skipped+1);
        }
    }
    totalScore=Math.floor(totalScore);
    return "Total Score: "+totalScore;
}

function saveScore(){
playerName=$(".form-control").val();
   localStorage.setItem("Code_Quiz_Player-"+playerName,totalScore);
}  

function displayHighScore(){
    modalFooter.innerText="";
    modalTitle.textContent="The highest score: ";
    modalBody.innerHTML="";
    var maxName="undefined";
    var maxScore=0;
    for(var i=0; i<localStorage.length; i++){
        if(localStorage.key(i).startsWith("Code_Quiz_Player")){
            var tempName=localStorage.key(i);
            var tempScore=localStorage.getItem(localStorage.key(i));
           if(tempScore>maxScore){
               console.log("greater");
               maxScore=tempScore;
               maxName=tempName.slice(tempName.indexOf("-")+1);
           }
        }
    }

    var div= document.createElement("div");
    div.setAttribute("id","high-score");
    if(maxName=="undefined"){
        div.textContent="No history to display.";
    }else{
     div.textContent=maxName+" scored: "+maxScore;
    }
    modalBody.appendChild(div);
}


startBtn.addEventListener("click",start);
nextBtn.addEventListener("click",displayNextQuiz);
finishBtn.addEventListener("click",function(){
    $("#modal-title").css("color","#007bff");
    endQuiz("You have completed the quiz!");
});
saveBtn.addEventListener("click",saveScore);
highScore.addEventListener("click",displayHighScore);


var nameInputHtml="<br>"+"<input placeholder=\"Enter your name here\" class=\"form-control\"></input>";
var scoreHtml="<br>"+"<div id=\"score\"></div>";
var radioHtml="<input type=\"radio\" name=\"quiz\">";
