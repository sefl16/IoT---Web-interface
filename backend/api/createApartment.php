<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  // Sanitize.
  $complexID = mysqli_real_escape_string($con, (string)$request->complexID);
  $appnumber = mysqli_real_escape_string($con, (string)$request->appnumber);
  // Create.
  $sql = "CALL addApartment('{$complexID}', '{$appnumber}')";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $apartment = [
        'complexID' => $complexID,
        'appnumber' => $appnumber
    ];
    echo json_encode($apartment);
  }
  else
  {
    http_response_code(422);
  }
}
