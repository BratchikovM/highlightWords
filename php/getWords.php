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
$queryToken = $mysql->query("SELECT `userid` FROM `usertoken` WHERE  `token`='$token'");
$row = $queryToken->fetch_array(MYSQLI_ASSOC);
$userId = $row['userid'];

$queryWordsColor = $mysql->query("SELECT `word`, `color`, `id` FROM `words` WHERE `userid`='$userId'");
$string = '';
while ($row = mysqli_fetch_array($queryWordsColor)) {
    $string .= '<div id="'.$row['id'].'" class="row_content">
        <input class="word" value="'.$row['word'].'">
        <input class="color" value="'.$row['color'].'" style="background-color:'.$row['color'].';">
        <span class="remove"></span>
    </div>';
}

echo $string;