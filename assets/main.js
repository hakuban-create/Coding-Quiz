    
    var timeEl=document.getElementById("time");
    var startBtn=document.getElementById("start-btn");
    var highScore=document.getElementById("high-score");
    var modalTitle=document.getElementById("modal-title");
    var modalBody=document.getElementById("modal-body");
    var modalFooter=document.getElementById("modal-footer");
    var nextBtn=document.getElementById("next-btn");
    var finishBtn=document.getElementById("finish-btn");
    var status=document.getElementById("status");
    var radios=document.getElementsByName("quiz");
    
    var remainingTime=75;
    var quizNum=-1;
    var intervalObj;

    var correct=0;
    var incorrect=0;
    var skipped=0;
    var clickCount=0;


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
    labelEl[i].innerHTML="<input type=\"radio\" name=\"quiz\">"+questions[quizNum].choices[i];
    }
    if(quizNum==questions.length-1){
        $("#next-btn").css("display","none");
        $("#finish-btn").css("display","block");
        //change the next button to finish button
        
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
    modalFooter.textContent="";
    modalTitle.textContent=status;
    modalBody.innerHTML="Correct answers: "+correct+"<br>Incorrect answers: "+incorrect+"<br>Skipped: "+(questions.length-correct-incorrect);
}



startBtn.addEventListener("click",start);
nextBtn.addEventListener("click",displayNextQuiz);
finishBtn.addEventListener("click",function(){
    $("#modal-title").css("color","#3dab07");
    endQuiz("You have completed the quiz in "+remainingTime+" seconds!");
});



