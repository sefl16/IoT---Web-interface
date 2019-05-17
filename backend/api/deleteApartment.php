<?php

require 'database.php';

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
// Extract the data.
$request = json_decode($postdata);

$id = mysqli_real_escape_string($con, (string)($request->id));

// Delete.
$sql = "call removeApartment('{$id}')";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
  echo "Removed successfully";
}
else
{
  return http_response_code(422);
}
}
