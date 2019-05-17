<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  // Sanitize.
  $appID = mysqli_real_escape_string($con, (string)$request->appID);
  $devEUI = mysqli_real_escape_string($con, (string)$request->devEUI);
  // Create.
  $sql = "CALL addSensor('{$appID}', '{$devEUI}')";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    echo json_encode($request);
  }
  else
  {
    http_response_code(422);
  }
}
