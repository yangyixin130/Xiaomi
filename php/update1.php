<?php
$email=$_POST['email'];
$password=$_POST['password'];
 //建立数据库连接
 $link=@mysqli_connect('127.0.0.1','root','root','test');
 if(!$link){
     die('失败');
 }
 // echo '连接成功';
 //设置mysql语句
 $sql="select * from user where email='$email'";

 //执行语句
 $res=mysqli_query($link,$sql);
 // print_r($res)
 //返回集合
 $arr=[];
 while($row=mysqli_fetch_assoc($res)){
     $arr[]=$row;
 }
 // var_dump($arr);
 //判断 如果数组存在
 if($arr){
    $sql1="update user set password='$password' where  email='$email'";
    mysqli_query($link,$sql1);
    echo 1
 }else{
     echo 2;
 }
?>