var score = 0;
function correct(){
        score += 2;
        x ="/10"
        document.getElementById("visible").style.visibility = 'visible';
        document.getElementById("hidden").style.visibility = 'hidden';
    }
function skip(){
    document.getElementById("visible").style.visibility = 'visible';
        document.getElementById("hidden").style.visibility = 'hidden';
}
function multipleChoiceTrue1(){
    score += 2;
    document.getElementById("visible1").style.visibility = 'visible';
    document.getElementById("hidden1").style.visibility = 'hidden';
}
function multipleChoiceWrong1(){
    document.getElementById("visible1").style.visibility = 'visible';
        document.getElementById("hidden1").style.visibility = 'hidden';
}
function multipleChoiceTrue2(){
    score += 2;
        document.getElementById("visible2").style.visibility = 'visible';
        document.getElementById("hidden2").style.visibility = 'hidden';
}
function multipleChoiceWrong2(){
    document.getElementById("visible2").style.visibility = 'visible';
    document.getElementById("hidden2").style.visibility = 'hidden';
}
function multipleChoiceTrue3(){
    score += 2;
        document.getElementById("visible3").style.visibility = 'visible';
        document.getElementById("visible").style.visibility = 'hidden';
        document.getElementById("visible1").style.visibility = 'hidden';
        document.getElementById("visible2").style.visibility = 'hidden';
}
function multipleChoiceWrong3(){
    document.getElementById("visible3").style.visibility = 'visible';
    document.getElementById("visible").style.visibility = 'hidden';
    document.getElementById("visible1").style.visibility = 'hidden';
    document.getElementById("visible2").style.visibility = 'hidden';
}
function skip2(){
    document.getElementById("visible3").style.visibility = 'visible';
    document.getElementById("visible").style.visibility = 'hidden';
    document.getElementById("visible1").style.visibility = 'hidden';
    document.getElementById("visible2").style.visibility = 'hidden';
}
function skip3(){
document.getElementById("visible3").style.visibility = 'hidden';
}
function submit(){
    score += 2;
    document.getElementById("visible4").style.visibility = 'visible';
    document.getElementById("visible3").style.visibility = 'hidden';
    document.getElementById("score").innerHTML = score + x ;
}
function backYesOrNo(){

}
function backmultiple1(){

}
function backmultiple2(){}
function backmultiple3(){}
function darkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");
}


