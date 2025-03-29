<?php 
require_once 'loadEnv.php';
loadEnv('../.env');

$data =json_decode(file_get_contents('php://input'),true);

if(empty($data['text'])){
   echo "ไม่สามารถส่งข้อมูลได้";
   exit();
}

$Bot_Token = $_ENV['BOT_TOKEN'];
$Chat_ID = $_ENV['CHAT_ID'];

$url = "https://api.telegram.org/bot$Bot_Token/sendMessage?chat_id=$Chat_ID&text=$data[text]";

// $result = file_get_contents($url, false);
// echo $result;
file_get_contents($url, false);

?>