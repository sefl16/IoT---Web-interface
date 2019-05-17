<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  // Sanitize.
  $userID = mysqli_real_escape_string($con, (string)($request->userID));
  $address = mysqli_real_escape_string($con, (string)$request->address);
  $city = mysqli_real_escape_string($con, (string)$request->city);
  // Create.
  $sql = "CALL addComplex('{$userID}', '{$address}', '{$city}')";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $complex = [
      'id'    => mysqli_insert_id($con),
      'address' => $address
    ];
    echo json_encode($complex);
  }
  else
  {
    http_response_code(422);
  }
}
