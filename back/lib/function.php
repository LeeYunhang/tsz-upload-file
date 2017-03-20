<?php
session_start();

//发送一个json数据
function send_json($code, $msg = ''){
    echo json_encode(array(
        'status' => $code,
        'msg'    => $msg
    ));
}
//发送一个json数据并且终止脚本
function send_jsond($code, $msg=''){
    send_json($code, $msg);
    die();
}

//检查用户是否存在
function check_user_exist($username){
    global $pdo, $config;
    $result = $pdo->query("SELECT username FROM {$config['t_user']}
                           WHERE  username = '$username'");
    return $result->rowCount() !== 0;      
}

//检查用户名格式
function check_user_format($username){
    return preg_match("/[0-9|a-z|A-Z]{6,18}/", $username);
}

/*
**检查用户是否已经登录
**return 登录返回用户名
**       未登录返回null
**/
function check_user_login(){
    
    if(!isset($_COOKIE['username']) && !isset($_COOKIE['password'])){
        die();
    }
    
    $pwd = $_COOKIE['password'];
    $usr = $_COOKIE['username'];
    $susr =  isset($_SESSION[$usr]['username']) ? $_SESSION[$usr]['username'] : null;
    $spwd =  isset($_SESSION[$usr]['password']) ? $_SESSION[$usr]['password'] : null;
    
    if($susr && $spwd && $pwd === $spwd && $usr === $susr){
        return $_COOKIE['username'];
    }

    return null;
}

//检查用户名密码
function check_user_pass($username, $password){
    global $pdo, $config;

    $result = $pdo->query("SELECT * FROM {$config['t_user']}
                           WHERE username='$username' and password='$password'");
    
    return $result->rowCount() !== 0;                       
}

//检查密码格式
function check_pass_format($password){
     return preg_match("/[0-9|a-z|A-Z]{6,24}/", $password);
}

