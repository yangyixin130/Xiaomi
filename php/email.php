<?php

header("content-Type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin:*");//允许所有来源访问 
header("Access-Control-Allow-Method:POST,GET");//允许访问的方式
 $email=$_POST['email'];

 $link=@mysqli_connect('127.0.0.1','root','root','test');
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
     //只要数组存在就可以就行修改密码 并且要抛出密码
     if($arr){
         echo 1,$arr[0]['password'];
     }else{
         echo 2;
     }


?>