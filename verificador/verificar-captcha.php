<?php
// verificar-captcha.php

$input = json_decode(file_get_contents('php://input'), true);
$token = $input['token'] ?? null;

if (!$token) {
    echo json_encode(['success' => false]);
    exit;
}

$secretKey = '0x4AAAAAABd1SNadPJQbaw1qZJHONEao530';

$response = file_get_contents("https://challenges.cloudflare.com/turnstile/v0/siteverify", false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query([
            'secret' => $secretKey,
            'response' => $token
        ])
    ]
]));

$result = json_decode($response);
echo json_encode(['success' => $result->success ?? false]);
?>