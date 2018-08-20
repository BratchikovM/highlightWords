<?php

$mysql = new mysqli('localhost', 'root', '12345678', 'highlightWords');
$mysql->set_charset("utf8");

$time = time()-30*1;
$checkTime = $mysql->query("DELETE FROM `usertoken` WHERE `time` < '$time'");