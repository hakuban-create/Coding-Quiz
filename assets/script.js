$(document).ready(function(){
    
    var timeEl=$("#time");
    var startBtn=$("#start-btn");
    var highScore=$("#high-score");
    
    var remainingTime=75;




function start(){
    setInterval(function(){
    if(remainingTime==0){
        document.clearInterval();
    }
        remainingTime--;
        timeEl.html(remainingTime);
    },1000);
}








startBtn.on("click",start);

});