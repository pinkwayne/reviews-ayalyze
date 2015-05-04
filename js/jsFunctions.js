/**
 * Created by 怡炜 on 2015/1/21 0021.
 */
function showResult(resp){
    var results = eval("("+resp+")");
    var tabs=
        "<ul class='nav nav-tabs'>"+
        "<li class='active'><a href='#panel-rate' data-toggle='tab' style='border-Radius:0;'>Rating</a></li>"+
        "<li><a href='#panel-reviews' data-toggle='tab' style='border-Radius:0;'>Reviews</a></li>"+
        "</ul>"+
        "<div class='tab-content'>"+
        "<div class='tab-pane fade in active' id='panel-rate' style='background-color: ghostwhite; height: 380px'></div>"+
        "<div class='tab-pane fade' id='panel-reviews'>第二部分内容.</div>"+
        "</div>";
    $("#resultArea").html(tabs);
    var tab_content=
        "<div style='padding:10px;font-size:20px' id='title'></div><div id='thumb-div' style=' padding-left: 20px'><a href='#' class='thumbnail thumbnail-sm'><img id='thumb' src='"+results['pic']+"' alt='缩略图'></a></div>"+
        "<div id='rating-bar-div'>"+
        "<div style='float: left;'>"+
        "<div class='rating-label'>物流：</div>"+
        "<div class='rating-label'>价格：</div>"+
        "<div class='rating-label'>服务：</div>"+
        "<div class='rating-label'>发货：</div>"+
        "<div class='rating-label'>包装：</div>"+
        "<div class='rating-label'>质量：</div>"+
        "<div class='rating-label'>款式：</div>"+
        "<div class='rating-label'>尺寸：</div>"+
        "<div class='rating-label'>做工：</div>"+
        "<div class='rating-label'>面料：</div>"+
        "</div>"+
        "<div style='float: right;padding-right: 20px'>"+
        "<div id='rate_1' class='rating-label'></div>"+
        "<div id='rate_2' class='rating-label'></div>"+
        "<div id='rate_3' class='rating-label'></div>"+
        "<div id='rate_4' class='rating-label'></div>"+
        "<div id='rate_5' class='rating-label'></div>"+
        "<div id='rate_6' class='rating-label'></div>"+
        "<div id='rate_7' class='rating-label'></div>"+
        "<div id='rate_8' class='rating-label'></div>"+
        "<div id='rate_9' class='rating-label'></div>"+
        "<div id='rate_10' class='rating-label'></div>"+
        "</div>"+
        "<div id='bars-area' style='float: right;padding-top: 3px'></div>"+
        "</div>";
    $("#panel-rate").html(tab_content);
    $("#title").html(results['title']);
    var bars="";
    for(var i=1;i<11;i++){
        bars=bars+
        "<div id='progress' class='progress progress-striped rating-bar'>"+
        "<div id='bar_"+i+"' class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style=''></div>"+
        "</div>";
    }
    $("#bars-area").html(bars);
    for(i=1;i<11;i++){
        var rate=results['label_p_'+i]*100/results['label_'+i];
        if(parseInt(rate)!=rate)rate=rate.toFixed(1);
        $("#rate_"+i).html(rate+"%");
        $("#bar_"+i).attr("style", "width:"+rate+"%");
    }
}


function dig(urlId){
    var resultArea = document.getElementById("resultArea");
    var button = document.getElementById("submit");
    var str = "<div class='alert alert-success' style='border-Radius:0;'><a href='#' class='close' data-dismiss='alert'>&times;</a>The url has been uploaded successfully, please wait while analysing.</div>";
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
    var input_url = document.getElementById("url").value;
    var patt = /item\.taobao\.com\//;
    var danger_str = "<div class='alert alert-danger' style='border-Radius:0;'><a href='#' class='close' data-dismiss='alert'>&times;</a>Input error, please check your url.</div>";
    if (patt.exec(input_url)==null){
        $("#resultArea").html(danger_str);
        return false;
    }
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
        xmlhttp.send("url=" + encodeURIComponent(input_url) + "&submit=" + document.getElementById("submit").value + "&urlId=" + urlId);
    }
    send();
    dig(urlId);
}

