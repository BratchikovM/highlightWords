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

$queryToken = $mysql->query("DELETE FROM `usertoken` WHERE `token`='$token'");