<?php
/**
 * Created by PhpStorm.
 * User: 怡炜
 * Date: 2015/1/21 0021
 * Time: 下午 20:56 
 */
$link = mysql_connect("localhost","root","417046512")or die("failed to connect mysql".mysql_error());
if($link){echo "connecting success<br>";}
mysql_select_db("opinion_mining",$link);
$url=$_POST['url'];
$id = $_POST['urlId'];
date_default_timezone_set('PRC');
$time = date("Y-m-d H:i:s");
echo $url."<br>".$id."<br>";
echo "connecting success<br>";
$sql=mysql_query("insert into urls(id,url,done,createtime)values('$id','$url','0','$time')");
if($sql==1){echo "1";}else{echo "0";}

