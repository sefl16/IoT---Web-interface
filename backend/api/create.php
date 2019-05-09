<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  // Validate.
  if(trim($request->username) === '')
  {
    return http_response_code(400);
  }
  // Sanitize.
  $username = mysqli_real_escape_string($con, (string)($request->username));
  $password = mysqli_real_escape_string($con, (string)$request->password);
  $firstname = mysqli_real_escape_string($con, (string)$request->firstname);
  $lastname = mysqli_real_escape_string($con, (string)$request->lastname);
  $email = mysqli_real_escape_string($con, (string)$request->email);
  $phonenumber = mysqli_real_escape_string($con, (string)$request->phonenumber);
  $address = mysqli_real_escape_string($con, (string)$request->address);
  $op5_key = mysqli_real_escape_string($con, (string)$request->op5_key);
<<<<<<< HEAD
  $admin = mysqli_real_escape_string($con, (int)$request->admin);

  $hash = password_hash($password, PASSWORD_DEFAULT);
  // Create.
  $sql = "CALL addUser('{$username}', '{$hash}', '{$first_name}', '{$last_name}', '{$email}', '{$phone_number}', '{$address}', '{$op5_key}', '{$admin}')";
=======
  $admin = mysqli_real_escape_string($con, (string)$request->admin);
  $hash = password_hash($password, PASSWORD_DEFAULT);
  // Create.
  $sql = "CALL addUser('{$username}', '{$hash}', '{$firstname}', '{$lastname}', '{$email}', '{$phonenumber}', '{$address}', '{$op5_key}', {$admin})";
>>>>>>> f68dff848b5a8d1e5de52ee0a4079b3745944824
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $user = [
      'username' => $username,
      'password' => $password,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($user);
  }
  else
  {
    http_response_code(422);
  }
}
