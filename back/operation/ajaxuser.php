<?php
require_once dirname(__DIR__) . '/core.php';

$username = isset($_POST['username']) ? $_POST['username'] : null;

if(check_user_exist($username)){
    send_jsond(STATUS_FAIL, ERROR_USER_EXIST);
}

send_jsond(STATUS_GOOD);