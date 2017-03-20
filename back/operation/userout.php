<?php
require_once dirname(__DIR__) . '/core.php';

if($username = check_user_login()){
    unset($_SESSION[$username]);
    setcookie('username', time() - 3600);
    setcookie('password', time() - 3600);

    send_jsond(STATUS_GOOD);
    
}

send_jsond(STATUS_FAIL, ERROR_LOGOUT);