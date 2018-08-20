<?php

$mysql = new mysqli('localhost', 'root', '12345678', 'highlightWords');
$mysql->set_charset("utf8");

$login = $mysql->real_escape_string($_POST['login']);
$password = $mysql->real_escape_string(password_hash($_POST['password'], PASSWORD_DEFAULT));

$queryLogin = $mysql->query("SELECT `login` FROM `users` WHERE `login`='$login'");
$rowLogin = $queryLogin->fetch_array(MYSQLI_ASSOC);
$repeatLogin = false;

if ($rowLogin['login'] == $login) {
    $repeatLogin = true;
}
echo $repeatLogin;
if (!$repeatLogin) {
    $query = $mysql->query("INSERT INTO `users` VALUE (NULL, '$login', '$password', '')");
}

?>