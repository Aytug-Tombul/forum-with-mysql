<?php

$servername = "localhost";
$DBusername = "root";
$DBpassword = "";
$DBname = "forum";
$pdo = new PDO("mysql:host=$servername;dbname=$DBname", $DBusername, $DBpassword);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



date_default_timezone_set('Europe/Istanbul');

function redirectToIndex()
{
    header('Location:index.html');
    exit();
}


function generetaNewString($len = 10)
{

    $token = "qpalzmnxskwoeidjcnbvhfurgyt5876439021";
    $token = str_shuffle($token);
    $token = substr($token, 0, $len);

    return $token;
}

if (isset($_GET['email']) && isset($_GET['token'])) {
    $email = $_GET['email'];
    $token = $_GET['token'];
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? AND token=? AND token<>'' AND token_Expire > NOW()");
    $stmt->execute(array($email, $token));

    if ($stmt->rowCount() > 0) {
        $newPassword = generetaNewString();
        $newPass = $pdo->prepare("UPDATE users SET token=?, password =?
        WHERE email =?
        ");
        $newPass->execute(array("", $newPassword, $email));
        echo "Your New Password Is $newPassword<br><a href='index.html'>Click Here To Login</a>";
    } else {
        redirectToIndex();
    }
} else {
    redirectToIndex();
}
