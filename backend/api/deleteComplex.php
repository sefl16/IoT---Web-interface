<?php

require 'database.php';
//$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;
$id = $_GET['id'];
$address = $_GET['address'];
if(!$id)
{
    return http_response_code(400);
}
//$postdata = file_get_contents("php://input");
//if(isset($postdata) && !empty($postdata))
//{
// Extract the data.
//$request = json_decode($postdata);
//$complexTestID = mysqli_real_escape_string($con, (string)($complex->complexID));
//$complexTestAddress = mysqli_real_escape_string($con, (string)($complex->address));
//$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;
//$complexID = mysqli_real_escape_string($con, (string)($request->complexID));
//$address = mysqli_real_escape_string($con, (string)$request->address);

// Delete.
//$sql = "CALL removeComplex('{$complexID}', '{$address}')";
$sql = "CALL removeComplex('{$id}', '{$address}')";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
//}
