<?php

require 'database.php';

$source = $_GET['source'];

switch($source)
{
  case "deleteUser":
    // Extract, validate and sanitize the id.
    $id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

    if(!$id)
    {
      return http_response_code(400);
    }
    // Delete.
    $sql = "CALL deleteUser({$id})";
    if(mysqli_query($con, $sql))
    {
      http_response_code(204);
    }
    else
    {
      return http_response_code(422);
    }
    break;

  default:
    http_response_code(404);
    break;
}
