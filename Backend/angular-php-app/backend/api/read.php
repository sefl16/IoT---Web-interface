<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$users = [];
$sql = "SELECT id, username, password, first_name, last_name, op5_key FROM users";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $users[$i]['id']    = $row['id'];
    $users[$i]['username'] = $row['username'];
    $users[$i]['password'] = $row['password'];
    $users[$i]['first_name'] = $row['first_name'];
    $users[$i]['last_name'] = $row['last_name'];
    $users[$i]['op5_key'] = $row['op5_key'];
    $i++;
  }

  echo json_encode($users);
}
else
{
  http_response_code(404);
}
