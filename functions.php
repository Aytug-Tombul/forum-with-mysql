<?php

use PHPMailer\PHPMailer;


require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";



$servername = "localhost";
$DBusername = "root";
$DBpassword = "";
$DBname = "blog_db";
$pdo = new PDO("mysql:host=$servername;dbname=$DBname", $DBusername, $DBpassword);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

switch($_POST['functionName']) {
    case 'login':
       echo "you did it!";
    break;
    case 'register':
        
        $image = $_FILES['image']['name'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $email = $_POST['email'];
        $referrer = $_POST['referrer'];
        $date = date('Y-m-d H:i:s');
        $target = "images/" . basename($image);

        $usernamecheck = $pdo->prepare("SELECT `username` FROM `users` WHERE username=? OR email=?");
        $usernamecheck->execute(array($username , $email));
        if (isset($taken) ) {
            echo $username . " or " . $email . " is already taken";
        } else {
            try {

                $sql = "INSERT INTO `users_tbl` (`id`, `username`, `password`, `email`, `referrer`, `photo`, `token`, `token_Expire`,role) VALUES (?,?,?,?,?,?,?,?,?)";
                $register=$pdo->prepare($sql);
                $register->execute(array(NULL,$username, $password,$email,$referrer,$image,NULL,date("Y-m-d H:i:s"),"user"));
                echo "New record created successfully";
                if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
                    $msg = "Image uploaded successfully";
                } else {
                    $msg = "Failed to upload image";
                }
                $mail = new PHPMailer();
                $mail->isSMTP();
                $mail->Host = "smtp.gmail.com";
                $mail->SMTPAuth = true;
                $mail->Username = "exampleblogServ@gmail.com";
                $mail->Password = "blogservice";
                $mail->Port = 465;
                $mail->SMTPSecure = "ssl";
                $subject = "Thanks For Registration";
                $body = "Thanks for registration I hope you can do this :)";
        
        
        
                $mail->isHTML(true);
                $mail->setFrom($email, $username);
                $mail->addAddress($email);
                $mail->Subject = $subject;
                $mail->Body = $body;
        
        
                if ($mail->send()) {
                    echo "   Email is Sent";
                } else {
                    echo "  " . $mail->ErrorInfo;
                }
            } catch (PDOException $e) {
                echo $sql . "<br>" . $e->getMessage();
            }
        }
        


}
