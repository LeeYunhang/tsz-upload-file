<?php
require_once dirname(__DIR__) . '/core.php';

if(!($username = check_user_login()))
    die();

$url       = isset($_POST['url']) ? $_POST['url'] : null;

$tags      = isset($_POST['tags']) ? $_POST['tags'] : null;

$filename  = isset($_POST['filename']) ? $_POST['filename'] : null;

$timestamp = isset($_POST['timestamp']) ? $_POST['timestamp'] : null;

if($url && $tags && $filename && $timestamp){
   $result = $pdo->query("INSERT INTO 
             {$config['user_prefix']}$username(url, filename, tags, date) 
              VALUES('$url', '$filename', '$tags', $timestamp)");
   
   if($result)
    send_json(STATUS_GOOD);
   else
    send_json(STATUS_FAIL, ERROR_UPLOAD);
    
}
