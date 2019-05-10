<?php

require 'database.php';
$complex = $_GET['complex'];
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
// Extract the data.
$request = json_decode($postdata);

//$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;
$complexID = mysqli_real_escape_string($con, (string)($request->complexID));
$address = mysqli_real_escape_string($con, (string)$request->address);

// Delete.
$sql = "CALL removeComplex('{$complexID}', '{$address}')";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
}
