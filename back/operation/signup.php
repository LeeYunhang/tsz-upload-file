<?php
require_once dirname(__DIR__) . '/core.php';

$username = isset($_POST['username']) ? $_POST['username'] : null;

$password = isset($_POST['password']) ? $_POST['password'] : null;



if($username && $password){

    if(check_user_exist($username)){
        send_json(STATUS_FAIL, ERROR_USER_EXIST);
    }elseif(!check_user_format($username)){
        send_json(STATUS_FAIL, ERROR_USER_FORMAT);
    }elseif(!check_pass_format($password)){
        send_json(STATUS_FAIL, ERROR_PASS_FORMAT);
    }else{
        $password = sha1(md5($password));

        $pdo->query("CREATE TABLE IF NOT EXISTS {$config['user_prefix']}$username(
                        url VARCHAR(200) NOT NULL,
                        tags VARCHAR(200) NOT NULL,
                        date INT UNSIGNED NOT NULL,
                        filename VARCHAR(60) NOT NULL
                    )");

        $pdo->query("INSERT INTO {$config['t_user']}(username, password)
                     VALUES('$username', '$password')");  

        send_json(STATUS_GOOD);         
    }
}