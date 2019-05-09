<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  // Sanitize.
  $userId = mysqli_real_escape_string($con, (string)($request->userId));
  $address = mysqli_real_escape_string($con, (string)$request->address);
  $city = mysqli_real_escape_string($con, (string)$request->city);

  $hash = password_hash($password, PASSWORD_DEFAULT);
  // Create.
  $sql = "CALL addUser('{$username}', '{$hash}', '{$first_name}', '{$last_name}', '{$email}', '{$phone_number}', '{$address}', '{$op5_key}', '{$admin}')";
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
