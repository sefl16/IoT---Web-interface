<?php

require 'database.php';

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
// Extract the data.
$request = json_decode($postdata);

$id = mysqli_real_escape_string($con, (string)($request->id));
$address = mysqli_real_escape_string($con, (string)$request->address);

// Delete.
$sql = "call removeComplex('{$id}', '{$address}')";

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
