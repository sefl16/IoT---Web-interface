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
  $first_name = mysqli_real_escape_string($con, (string)$request->first_name);
  $last_name = mysqli_real_escape_string($con, (string)$request->last_name);
  $op5_key = mysqli_real_escape_string($con, (string)$request->op5_key);


  // Create.
  $sql = "INSERT INTO `users`(`username`,`password`, `first_name`, `last_name`, `op5_key`) VALUES ('{$username}','{$password}','{$first_name}','{$last_name}','{$op5_key}')";

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
