<?php
require_once dirname(__DIR__) . '/core.php';

if(check_user_login()){
    send_jsond(STATUS_GOOD);
}

$username = isset($_POST['username']) ? $_POST['username'] : null;

$password = isset($_POST['password']) ? $_POST['password'] : null;

if($username && $password){
    $password = sha1(md5($password));

    if(!check_user_exist($username)){
        send_json(STATUS_FAIL, ERROR_USER_EXIST);
    }elseif(!check_user_pass($username, $password)){
        send_json(STATUS_FAIL, ERROR_WRONG_PASS);
    }else{
        setcookie('username', $username, time() + 3600 * 24);
        setcookie('password', $password, time() + 3600 * 24);
        $_SESSION[$username]['username'] = $username;
        $_SESSION[$username]['password'] = $password;
        send_json(STATUS_GOOD);
    }
}