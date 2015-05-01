<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="author" content="Yiwei GU">
    <meta name="description" content="a opinion mining system ">
    <meta name="keywords" content="opinion mining, machine learning, neural network">
    <title>Fudan Opinion-Mining System </title>
    <link rel="icon" href="icon.ico" >
    <link rel="shortcut icon" href="icon.ico" >
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/jquery-ui.min.css" rel="stylesheet">
    <link href="css/myStyle.css" type="text/css" rel="stylesheet">
    <script src="js/jquery-1.11.2.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jsFunctions.js"></script>
    <script src="js/Chart.js"></script>
</head>
<body contenteditable="false" style=" font-family: '微软雅黑', sans-serif">
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#example-navbar-collapse">
                <span class="sr-only">切换导航</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <span class="navbar-brand disabled"><big>E.E.Dept Fudan </big></span>
        </div>
        <div class="collapse navbar-collapse" id="example-navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="index.php"><span class="glyphicon glyphicon-home " aria-hidden="true"></span> Home</a></li>
                <li class="divider-vertical"></li>
                <li><a href="" data-toggle="modal" data-target="#about"><span class="glyphicon glyphicon-info-sign " aria-hidden="true"></span> About us</a></li>
                <li class="divider-vertical"></li>
                <li><a href="mailto:wayne92gu@gmail.com"><span class="glyphicon glyphicon-envelope " aria-hidden="true"></span> Email</a></li>
            </ul>
        </div>
    </nav>
    <div class="container" style="background-color: #ffffff">
        <h1 class="text-center" style="color: black;
         font-style: normal; font-family: '微软雅黑', sans-serif">
           Reviews' Opinion-mining System  <br><br>
        </h1>
        <div class="row">
            <form name="input_url" method="post" action="" onsubmit="checkForm();return false;">
                <div class="col-lg-12" >
                    <div class="input-group input-group-lg" style="width: 100%" >
                        <input class="form-control " type="url" name="url" id="url" required="required" placeholder="input your url begin with 'http(s)://' to analysis...">
                        <span class="input-group-btn">
                             <button class="btn btn-success" type="submit" id="submit" name="submit" value="post" >
                                 <span class="glyphicon glyphicon-search " aria-hidden="true" id="search"></span> Dig!
                             </button>
                        </span>
                    </div>
                </div>
            </form>
        </div>
        <div><br></div>
        <div class="text" id="resultArea">

        </div>
    </div>
    <script>
        var tabs=
            "<ul class='nav nav-tabs'>"+
            "<li class='active'><a href='#panel-rate' data-toggle='tab'>Rating</a></li>"+
            "<li><a href='#panel-reviews' data-toggle='tab'>Reviews</a></li>"+
            "</ul>"+
            "<div class='tab-content'>"+
            "<div class='tab-pane fade in active' id='panel-rate' style='background-color: ghostwhite; height: 340px'></div>"+
            "<div class='tab-pane fade' id='panel-reviews'>第二部分内容.</div>"+
            "</div>";
        $("#resultArea").html(tabs);
        var tab_content=
            "<br><div id='thumb-div' style=' padding-left: 10px'><a href='#' class='thumbnail thumbnail-sm'><img id='thumb' src='T1WK.jpg' alt='缩略图'></a></div>"+
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
                "<div style='float: right;padding-right: 10px'>"+
                    "<div id='rate_1' class='rating-label'>xxx</div>"+
                    "<div id='rate_2' class='rating-label'>xxx</div>"+
                    "<div id='rate_3' class='rating-label'>xxx</div>"+
                    "<div id='rate_4' class='rating-label'>xxx</div>"+
                    "<div id='rate_5' class='rating-label'>xxx</div>"+
                    "<div id='rate_6' class='rating-label'>xxx</div>"+
                    "<div id='rate_7' class='rating-label'>xxx</div>"+
                    "<div id='rate_8' class='rating-label'>xxx</div>"+
                    "<div id='rate_9' class='rating-label'>xxx</div>"+
                    "<div id='rate_10' class=rating-label'>xxx</div>"+
                "</div>"+
                "<div id='bars-area' style='float: right;padding-top: 3px'></div>"+
            "</div>";
        $("#panel-rate").html(tab_content);
        var bars="";
        for(var i=1;i<11;i++){
                bars=bars+
                    "<div id='progress' class='progress progress-striped rating-bar'>"+
                        "<div id='bar_"+i+"' class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: 43.2569%;'></div>"+
                    "</div>";
            }
        $("#bars-area").html(bars);
    </script>
    <nav class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">
        <div class="text-center" >
            <span style="color: gray">
                E.E.Dept Fudan University Shanghai China<br>WebSite Ver.0.1 by Webstorm
            </span>
        </div>
    </nav>
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="about" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true">×
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                        About us
                    </h4>
                </div>
                <div class="modal-body">
                    about info...<br>
                    ...<br>...<br>...<br>...<br>...<br>...<br>...<br>...<br>
                    website icons designed by <a href="http://glyphicons.com/" target="_blank">GLYPHICONS</a>.
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</body>
</html>