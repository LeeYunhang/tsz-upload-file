<?php

/**===================================
**global varible to control the mysql
--------------------------------------**/
$pdo = new \PDO("mysql:host={$config['host']};
                port={$config['port']};dbname={$config['database']}",
                $config['username'], $config['password']);

/**---------------------------------- 
**initialize the user table
==================================**/
$pdo->query("CREATE TABLE IF NOT EXISTS {$config['t_user']}(
            username VARCHAR(40) NOT NULL PRIMARY KEY,
            password VARCHAR(40) NOT NULL
)");

