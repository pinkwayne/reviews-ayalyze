/**
 * Created by 怡炜 on 2015/1/21 0021.
 */
function showResult(resp){
    var results = eval("("+resp+")");
    var tabs=
        "<ul class='nav nav-tabs'>"+
        "<li class='active'><a href='#panel-rate' data-toggle='tab'>Rating</a></li>"+
        "<li><a href='#panel-reviews' data-toggle='tab'>Reviews</a></li>"+
        "</ul>"+
        "<div class='tab-content'>"+
        "<div class='tab-pane fade in active' id='panel-rate'></div>"+
        "<div class='tab-pane fade' id='panel-reviews'>第二部分内容.</div>"+
        "</div>";
    $("#resultArea").html(tabs);
    var table=
        "<table class='' border='1' align='left'>"+
        "<tr><td colspan='5'>tittle</td><tr>"+
        "<tr>" +
        "<td rowspan='15'><a href='#' class='thumbnail thumbnail-sm'><img id='thumb' src='T1WK.jpg' alt='缩略图'></a></td>"+
        "<td rowspan='15' width='300px'></td><td colspan='3'></td>" +
        "</tr>"+
        "<tr><td>物流</td><td rowspan='10' width='20px'></td><td id='1'></td></tr>"+
        "<tr><td>价格</td><td id='2'></td></tr>"+
        "<tr><td>服务</td><td id='3'></td></tr>"+
        "<tr><td>发货</td><td id='4'></td></tr>"+
        "<tr><td>包装</td><td id='5'></td></tr>"+
        "<tr><td>质量</td><td id='6'></td></tr>"+
        "<tr><td>款式</td><td id='7'></td></tr>"+
        "<tr><td>尺寸</td><td id='8'></td></tr>"+
        "<tr><td>做工</td><td id='9'></td></tr>"+
        "<tr><td>面料</td><td id='10'></td></tr>"+
        "<tr><td rowspan='' colspan='3'></td></tr>"+
        "</table>";
    $("#panel-rate").html("<br>"+table);
    for(var i=1;i<11;i++){
        $("#"+i).html(
            "<div id='progress' class='progress progress-striped rating-bar'>"+
            "<div id='bar_"+i+"' class='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style=''>"+
            "<span class='sr-only'>90% 完成（成功）</span>"+
            "</div>"+
            "</div>");
        var bar_style="warning";
        $("#bar_"+i).attr({
            "style":"width: 50%;",
            "class":"progress-bar progress-bar-"+bar_style
        });}

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

