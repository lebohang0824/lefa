<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $to = "info@bakhidibricks.co.za";
  $subject = "Website Contact Form";

  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $messages = $_POST['message'];

  $message = '
  <html>
    <head>
    <title>Website Contact Form</title>
    </head>
    <body>
      <h1>Website Email</h1>
      <table border="1" style="border: solid 1px #999; width: 100%">
        <tr><th>Name</th></tr>
        <tr><td>'.$name.'</td></tr>
        <tr><th>Subject</th></tr>
        <tr><td>'.$subject.'</td></tr>
        <tr><th>Email</th></tr>
        <tr><td>'.$email.'</td></tr>
      </table>
      <h1>Message</h1>
      <p>'.$message.'</p>
    </body>
  </html>
  ';

  // Always set content-type when sending HTML email
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

  // More headers
  $headers .= 'From: maintenance@bakhidibricks.co.za';

  try {
    mail($to,$subject,$message,$headers);
    echo 'Message sent successful.';
  } catch(Exception $e) {
      echo 'Message: ' .$e->getMessage();
  }

} else {
  header('Location: http://bakhidibricks.co.za');
}

?>
