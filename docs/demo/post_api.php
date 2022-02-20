<?php
//api url
$url = 'https://api.south.com.hk/v1/top-up';
//Authenticated user
$account = 'xxx';
//Random number
$nonce = str_random(10);
//Secret key
$key = 'h9bc388929f30a5f1k15ee0ab5g9c998';
//Timestamp
$timestamp = date('Y-m-d H:i:s');
//Http header data
$header = [
	'BOSS-ACCOUNT: ' . $account,
	'BOSS-NONCE: ' . $nonce,
	'BOSS-SIGN: ' . md5($account . $nonce . $key . $timestamp),
	'BOSS-TIMESTAMP: ' . $timestamp,
	'Content-Type:application/json'
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['account'=>'1220180829000003', 'type'=>'package', 'productId'=>90001005]));
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

$handles = curl_exec($ch);
curl_close($ch);

$result = json_decode($handles,true);