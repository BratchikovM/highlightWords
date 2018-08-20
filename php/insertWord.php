<?php

$mysql = new mysqli('localhost', 'root', '12345678', 'highlightWords');
$mysql->set_charset("utf8");

if(!function_exists('getallheaders'))
{
    function getallheaders()
    {
        foreach($_SERVER as $name => $value)
        {
            if(substr($name, 0, 5) == 'HTTP_')
            {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

$token = $mysql->real_escape_string(getallheaders()["Token"]);
$word = $mysql->real_escape_string($_POST['word']);
$color = $mysql->real_escape_string($_POST['color']);

$queryToken = $mysql->query("SELECT `userid`, `token` FROM `usertoken` WHERE  `token`='$token'");
$row = $queryToken->fetch_array(MYSQLI_ASSOC);
$userId = $row['userid'];
$query = $mysql->query("INSERT INTO `words` VALUE ('$userId', '$word', '$color', NULL)");