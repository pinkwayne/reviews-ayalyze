<?php
/**
 * Created by PhpStorm.
 * User: 怡炜
 * Date: 2015/1/22 0022
 * Time: 下午 17:25 
 */
$link = mysql_connect("localhost","root","417046512")or die("failed to connect mysql".mysql_error());
if(!$link){echo('false');exit;}
mysql_select_db("opinion_mining",$link);
$id = $_POST['urlId'];
$sql = mysql_query("select * from result where id = '$id' AND done = 1");
$row = mysql_fetch_object($sql);
if($row==false){echo('false');exit;}
echo(json_encode($row));
