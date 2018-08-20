<?php

$mysql = new mysqli('localhost', 'root', '12345678', 'highlightWords');
$mysql->set_charset("utf8");

$login = $mysql->real_escape_string($_POST['login']);
$password = $mysql->real_escape_string($_POST['password']);

$queryLogin = $mysql->query("SELECT `userid`, `login`, `password` FROM `users` WHERE `login`='$login'");
$row = $queryLogin->fetch_array(MYSQLI_ASSOC);
$repeatLogin = 0;
$repeatPassword = 0;
function generateToken($length) {

    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRQSTUVWXYZ0123456789";

    $code = "";

    $clen = strlen($chars) - 1;
    while (strlen($code) < $length) {

        $code .= $chars[mt_rand(0,$clen)];
    }

    return $code;

}

if ($row['login'] == $login) {
    $repeatLogin += 1;
}

if (password_verify( $password , $row['password'] )) {
    $repeatPassword += 2;
}

if (($repeatLogin + $repeatPassword) == 3) {
    $token = generateToken(40);
    $userId = $row['userid'];
    $query = $mysql->query("INSERT INTO `usertoken` VALUES ('$userId','$token',NULL, '".time()."')");

    echo $token;
} else {
    echo $repeatLogin + $repeatPassword;
}
?>