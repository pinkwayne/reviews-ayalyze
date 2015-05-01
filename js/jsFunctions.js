/**
 * Created by 怡炜 on 2015/1/21 0021.
 */
function showResult(resp){
    var results = eval("("+resp+")");


}


function dig(urlId){
    var n=0;
    var play;
    var resultArea = document.getElementById("resultArea");
    var button = document.getElementById("submit");
    var str = "<p><br></p><div class='alert alert-success'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Success！</strong>The url has been uploaded successfully, please wait while analysing.</div>";
    resultArea.innerHTML = str;
    function display(){
        $.post("getResult.php", {urlId:urlId},
        function(resp){
            if(resp=="false"){
                setTimeout(display, 1000);
            }else{
                button.innerHTML="<span class='glyphicon glyphicon-search ' aria-hidden='true'></span> Dig!";
                button.className="btn btn-success";
                showResult(resp);
            }
        }
        );
    }
    setTimeout(display,500);
}

function checkForm(){
    var xmlhttp;
    var insertOK=0;
    var urlId;
    var button = document.getElementById("submit");
    button.innerHTML="<span class='glyphicon glyphicon-refresh ' aria-hidden='true' id='refresh'></span> Dig.";
    button.className="btn btn-success disabled";
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    function send() {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                insertOK = xmlhttp.responseText;
                insertOK = insertOK.charAt(insertOK.length - 1);
                if(insertOK==0){send()};
            }
        }
        urlId = parseInt(Math.random()*100000);
        xmlhttp.open("POST", "post.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("url=" + encodeURIComponent(document.getElementById("url").value) + "&submit=" + document.getElementById("submit").value + "&urlId=" + urlId);
    }
    send();
    dig(urlId);
}

