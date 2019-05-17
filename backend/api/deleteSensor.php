<?php

require 'database.php';

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
// Extract the data.
$request = json_decode($postdata);

$devEUI = mysqli_real_escape_string($con, (string)($request->devEUI));

// Delete.
$sql = "call removeSensor('{$devEUI}')";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
  echo 'Removed successfully';
}
else
{
  return http_response_code(422);
}
}
