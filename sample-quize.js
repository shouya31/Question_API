 // 読み込んだデータを1行ずつ格納する配列
var allData = [];
var sW,sH,s;
var now_question = 0;
if (window.File && window.FileReader && window.FileList && window.Blob) {
//alert('JS対応');
} else {
alert('JS未対応のブラウザです。たぶん動作しません');
}
loadCSV("./data.csv");
setTimeout("setQuestion(now_question)", 10);//ms //一瞬間隔がないとダメみたい
//ウィンドウサイズを取得する
function getWindowSize() {
    sW = window.innerWidth;
    sH = window.innerHeight;
}
function setQuestion(number){
    document.getElementById("id_question").innerHTML=allData[number].question;
    document.getElementById("id_ChoiceA").innerHTML=allData[number].A;
    document.getElementById("id_ChoiceB").innerHTML=allData[number].B;
    document.getElementById("id_ChoiceC").innerHTML=allData[number].C;
    document.getElementById("id_ChoiceD").innerHTML=allData[number].D;
    if(allData[now_question].Q_gazo != 'none'){
        mondairesize();
        document.getElementById("id_mondaigazo").src='./gazo/'+allData[now_question].Q_gazo;
    }else{
        document.getElementById("id_mondaigazo").scr='';
        document.getElementById("id_mondaigazo").width=0;
    }
    document.getElementById("id_pf").innerHTML='';
    document.getElementById("id_kotae").innerHTML='';
    document.getElementById("id_mondaigazo").scr='';
    document.getElementById("id_kaitougazo").src='';
}
function next_question(){
    //現状ではループさせている
    if(allData.length-1 > now_question){
        now_question++;
    }else{
        now_question = 0;
    }
    setQuestion(now_question);
}
function kaitouresize(){
    getWindowSize();
    document.getElementById("id_kaitougazo").width=sW;
}
function mondairesize(){
    getWindowSize();
    document.getElementById("id_mondaigazo").width=sW;
}
function myCheck(){
    var seikai = allData[now_question].ANS;
    var kaitou = '';
    if(document.form1.elements[0].checked){
        kaitou = kaitou + 'A';
    }
    if(document.form1.elements[1].checked){
        kaitou = kaitou + 'B';
    }
    if(document.form1.elements[2].checked){
        kaitou = kaitou + 'C';
    }
    if(document.form1.elements[3].checked){
        kaitou = kaitou + 'D';
    }
    if(kaitou == seikai){
        document.getElementById("id_pf").innerHTML='正解です';
    }else{
        // 不正解の時は背景色を変えたい
        document.getElementById("id_pf").innerHTML='不正解です';
    }
    getWindowSize();
    document.getElementById("id_kotae").innerHTML=seikai;
    document.getElementById("id_kaitougazo").width=sW;
    if(allData[now_question].A_gazo != 'none'){
        document.getElementById("id_kaitougazo").src='./gazo/'+allData[now_question].A_gazo;
    }
}
function loadCSV(targetFile) {
    var request = new XMLHttpRequest();
    request.open("get", targetFile, false);
    request.send(null);
    var csvData = request.responseText;
    var lines = csvData.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var wordSet = lines[i].split(",");
        var wordData = {
            question: wordSet[0],
            A: wordSet[1],
            B: wordSet[2],
            C: wordSet[3],
            D: wordSet[4],
            ANS: wordSet[5],
            Q_gazo: wordSet[6],
            A_gazo: wordSet[7],
        };
        allData.push(wordData);
    }
}
