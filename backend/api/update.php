<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if ((int)$request->id < 1 || trim($request->username) == '' ){
    return http_response_code(400);
  }

  // Sanitize.
  $id    = mysqli_real_escape_string($con, (int)$request->id);
  $username = mysqli_real_escape_string($con, (string)($request->username));
  $password = mysqli_real_escape_string($con, (string)$request->password);
  $first_name = mysqli_real_escape_string($con, (string)$request->first_name);
  $last_name = mysqli_real_escape_string($con, (string)$request->last_name);
  $phone_number = mysqli_real_escape_string($con, (string)$request->phone_number);
  $email = mysqli_real_escape_string($con, (string)$request->email);
  $address = isset($request->op5_key) ? mysqli_real_escape_string($con, (string)$request->address) : null;
  $op5_key = isset($request->op5_key) ? mysqli_real_escape_string($con, (string)$request->op5_key) : null;
  $admin = mysqli_real_escape_string($con, (int)$request->admin);

  $hash = password_hash($password, PASSWORD_DEFAULT);

  // Update.
  $sql = "CALL updateUser('{$id}','{$hash}', '{$first_name}', '{$last_name}', '{$email}', '{$phone_number}', '{$address}', '{$op5_key}', '{$admin}', '{$username}')";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }
}
