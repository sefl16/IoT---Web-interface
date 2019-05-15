<?php

require 'database.php';

$id = $_GET['id'];
$address = $_GET['address'];
if(!$id)
{
  return http_response_code(400);
}
$sql = "CALL removeComplex('{$id}', '{$address}')";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
