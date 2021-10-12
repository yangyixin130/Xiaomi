<?php
    header("content-Type:text/html;charset=utf-8");
    header("Access-Control-Allow-Origin:*");//允许所有来源访问 
    header("Access-Control-Allow-Method:POST,GET");//允许访问的方式
    $user=$_POST['username'];
    $password=$_POST['password'];


   

    // $Tuser='yang';
    // $Rpassword='123456';
    // if($user==$Tuser&&$password==$Rpassword){
    //     echo 1;
    // }else{
    //     echo 2;
    // }
     //建立数据库连接
    $link=@mysqli_connect('127.0.0.1','root','root','test');
    if(!$link){
        die('失败');
    }
    // echo '连接成功';
    //设置mysql语句
    $sql="select * from user where user='$user'";

    //执行语句
    $res=mysqli_query($link,$sql);
    // print_r($res)
    //返回集合
    $arr=[];
    while($row=mysqli_fetch_assoc($res)){
        $arr[]=$row;
    }
    // var_dump($arr);
    //判断 如果数组存在且值相等
    if($arr && $arr[0]['password']==$password){
        echo 1;
    }else{
        echo 2;
    }

?>