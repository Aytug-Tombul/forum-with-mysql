<?php

use PHPMailer\PHPMailer\PHPMailer;


date_default_timezone_set('Europe/Istanbul');

require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";

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




$servername = "localhost";
$DBusername = "root";
$DBpassword = "";
$DBname = "forum";
$pdo = new PDO("mysql:host=$servername;dbname=$DBname", $DBusername, $DBpassword);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
switch ($_POST['functionName']) {
    case 'login':
        $username = $_POST['username'];
        $password = $_POST['password'];
        $sql = "SELECT role FROM users WHERE username =? AND password = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array($username, $password));
        $r = $stmt->fetch();
        $role = $r['role'];
        if ($stmt->rowCount() > 0) {


            if ($role == "admin") {
                $res = array(
                    "result" => "success",
                    "username" => $username,
                    "panelBtn" => '4443'
                );
            } else {
                $res = array(
                    "result" => "success",
                    "username" => $username,
                    "panelBtn" => "1234"
                );
            }

            echo json_encode($res);
        } else {
            $res = array(
                "result" => "failed",
                "username" => $username
            );
            echo json_encode($res);
        }
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
        $usernamecheck->execute(array($username, $email));
        while ($row = $usernamecheck->fetch(pdo::FETCH_ASSOC)) {
            $taken[] = $row;
        }


        if (isset($taken)) {
            echo $username . " or " . $email . " is already taken";
        } else {
            try {

                $sql = "INSERT INTO `users` (`id`, `username`, `password`, `email`, `referrer`, `photo`, `token`, `token_Expire`,role) 
                VALUES (?,?,?,?,?,?,?,?,?)";
                $register = $pdo->prepare($sql);
                $register->execute(array(NULL, $username, $password, $email, $referrer, $image, NULL, date("Y-m-d H:i:s"), "user"));
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
        break;


    case 'forgot':
        $email = $_POST["email"];
        $emailcheck = $pdo->prepare("SELECT `email` FROM `users` WHERE email=?");
        $emailcheck->execute(array($email));
        if ($emailcheck->rowCount() > 0) {
            try {
                $token = generetaNewString();
                $sql = "UPDATE users SET token=?,token_Expire=? WHERE email =?";
                $forgot = $pdo->prepare($sql);
                $forgot->execute(array($token, date('Y-m-d H:i:s', strtotime('5 minute')), $email));

                $mail = new PHPMailer();
                $mail->isSMTP();
                $mail->Host = "smtp.gmail.com";
                $mail->SMTPAuth = true;
                $mail->Username = "exampleblogServ@gmail.com";
                $mail->Password = "blogservice";
                $mail->Port = 465;
                $mail->SMTPSecure = "ssl";
                $subject = "Reset Password";
                $body = "
            Hi ,<br><br>
            
            In order to reset password, please click on the link below<br>
            <a href='
            http://localhost/forum/forum-with-mysql/resetPass.php?email=$email&token=$token
            '>http://localhost/forum/forum-with-mysql/resetPass.php?email=$email&token=$token</a><br><br>
            Kind Regards,<br>
            Aytug T.
            ";

                $mail->isHTML(true);
                $mail->setFrom($email);
                $mail->addAddress($email);
                $mail->Subject = $subject;
                $mail->Body = $body;
                if ($mail->send()) {
                    echo 'Email Found. Please Check your mailbox';
                } else {
                    echo "  " . $mail->ErrorInfo;
                }
            } catch (PDOException $e) {
                echo $sql . "<br>" . $e->getMessage();
            }
        } else {
            echo 'Email not found. Please check your inputs.';
        }
        break;

    case 'newTitle':
        $username = $_POST["username"];
        $title = $_POST["title"];
        $post = $_POST["post"];
        $category = $_POST["categoryName"];
        $sql = "INSERT INTO `titles` (`id`, `title`, `user_id`, `category_name`, `date`) 
        VALUES (?,?,(SELECT users.id FROM users WHERE username=?),?,?)";
        $sendTitle = $pdo->prepare($sql);
        $sendTitle->execute(array(NULL, $title, $username, $category, date("Y-m-d H:i:s")));
        $sql2 = "INSERT INTO `posts` (`id`, `post`, `title_id`, `user_id`, `date`) 
        VALUES (?,?,(SELECT id FROM titles WHERE title=?),(SELECT id FROM users WHERE username=?),?)";
        $sendPost = $pdo->prepare($sql2);
        $sendPost->execute(array(NULL, $post, $title, $username, date("Y-m-d H:i:s")));
        echo "New Title Created";
        break;

    case 'getTitles':
        $category = $_POST["category"];
        try {
            $stmt = $pdo->prepare("SELECT titles.id,titles.title,titles.date,users.username 
            FROM titles,users WHERE titles.category_name=? AND titles.user_id = users.id ");
            $stmt->execute(array($category));
            while ($row = $stmt->fetch(pdo::FETCH_ASSOC)) {
                $titles[] = $row;
            }
            if (!isset($titles)) {
                echo false;
            } else {
                echo json_encode($titles);
            }
        } catch (PDOException $e) {
            echo $stmt . "<br>" . $e->getMessage();
        }
        break;

    case 'getPost':
        $titleName = $_POST["title"];
        try {
            $stmt = $pdo->prepare("SELECT posts.post,users.username,posts.date,posts.id
            FROM posts,users,titles WHERE titles.title=? AND users.id=posts.user_id AND titles.id=posts.title_id");
            $stmt->execute(array($titleName));
            while ($row = $stmt->fetch(pdo::FETCH_ASSOC)) {
                $post[] = $row;
            }
            $stmt2 = $pdo->prepare("SELECT replies.reply,users.username,replies.date,replies.id
            FROM replies,users,titles 
            WHERE titles.title=? AND users.id=replies.user_id AND titles.id=replies.title_id");
            $stmt2->execute(array($titleName));
            
            while ($row = $stmt2->fetch(pdo::FETCH_ASSOC)) {
                $replies[] = $row;
            }
            $every=$post+$replies;
            echo json_encode($every);
        } catch (PDOException $e) {
            echo $stmt . "<br>" . $e->getMessage();
        }
    break;

    case 'sendReply':
        $reply = $_POST["reply"];
        $username=$_POST["username"];
        $title = $_POST["title"];
        try {
            $sql2 = "INSERT INTO `replies` (`id`, `reply`, `title_id`, `user_id`, `date`) 
            VALUES (?,?,(SELECT id FROM titles WHERE title=?),(SELECT id FROM users WHERE username=?),?)";
            $sendPost = $pdo->prepare($sql2);
            $sendPost->execute(array(NULL, $reply, $title, $username, date("Y-m-d H:i:s")));
        } catch (PDOException $e) {
            echo $sql2 . "<br>" . $e->getMessage();
        }
    break;

    case 'addCategory':
        $categoryName = $_POST["categoryName"];
        $description=$_POST["description"];
        try {
            $sql2 = "INSERT INTO `categories` (`id`, `name`, `description`, `date`) 
            VALUES (?,?,?,?)";
            $sendPost = $pdo->prepare($sql2);
            $sendPost->execute(array(NULL, $categoryName, $description, date("Y-m-d H:i:s")));
        } catch (PDOException $e) {
            echo $stmt . "<br>" . $e->getMessage();
        }
    break;

    case 'home':
        try {
            $stmt = $pdo->prepare("SELECT name , description FROM categories");
            $stmt->execute();
            while ($row = $stmt->fetch(pdo::FETCH_ASSOC)) {
                $categories[] = $row;
            }
            echo json_encode($categories);
        } catch (PDOException $e) {
            echo $stmt . "<br>" . $e->getMessage();
        }
}
