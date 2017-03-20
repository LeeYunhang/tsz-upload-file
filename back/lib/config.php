<?php
//============================================
//****************数据库信息区域****************
//============================================

//数据库用户名
$config['username'] = 'root';
//数据库密码
$config['password'] = 'cfc2013114';
//数据库
//请自行创建config['database']里面的数据库，否则会出现致命错误
$config['database'] = 'test';
//主机
$config['host']     = 'localhost';
//端口
$config['port']     = '3306';
//用户表
$config['t_user']   = 'tsz_user';
//用户文章表前缀
$config['user_prefix']   = $config['t_user'] . '_';

//============================================
//****************×全局变量区域*****************
//============================================
define('ERROR_USER_EXIST', '帐号已经存在');
define('ERROR_USER_FORMAT', '用户格式错误,只能为英文和字母,长度6~18');
define('ERROR_PASS_FORMAT', '密码格式错误,只能为英文和字母,长度6~24');
define('ERROR_UPLOAD', '上传出现未知错误');
define('ERROR_LOGOUT', '注销失败');
define('ERROR_WRONG_PASS', '密码错误');
define('STATUS_FAIL', 500);
define('STATUS_GOOD', 200);

