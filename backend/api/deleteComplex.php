<?php

require 'database.php';

$id = $_GET['id'];
$address = $_GET['address'];
if(!$id)
{
// Extract the data.
$request = json_decode($postdata);

$id = mysqli_real_escape_string($con, (string)($request->id));

// Delete.
$sql = "call removeComplex('{$id}')";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
