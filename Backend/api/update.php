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
  $op5_key = isset($request->op5_key) ? mysqli_real_escape_string($con, (string)$request->op5_key) : null;

  // Update.
  $sql = "UPDATE `users` SET `username`='$username',`password`='$password', `first_name`='$first_name', `last_name`='$last_name', `op5_key`='$op5_key' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }
}
