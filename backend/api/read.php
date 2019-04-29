<?php
/**
 * Returns the list of policies.
 */
require 'database.php';


//echo ($id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false);

if($id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false)
{
  $complex = [];

  //$sql = "CALL displayComplexForUser('{$id}')";
  $sql = "CALL displayComplexForUser('{$id}')";
  if($result = mysqli_query($con,$sql))
  {
    $i = 0;

    while($row = mysqli_fetch_assoc($result))
    {
      $j = 0;
      $complex[$i]['city'] = $row['city'];
      $complex[$i]['address'] = $row['address'];

      $i++;
    }
    echo json_encode($complex);
  }
  else
  {
    http_response_code(404);
  }
}
//this should get the apartments for each complex
// else if($appid = ($_GET['appid'] !== null && (int)$_GET['appid'] > 0)? mysqli_real_escape_string($con, (int)$_GET['appid']) : false)
// {
//   $apartment = [];
//   $sql = "SELECT * FROM apartments";
//   if($results = mysqli_query($con,$sql))
//   {
//     $i = 0;
//     while($row = mysqli_fetch_assoc($result))
//     {
//       $apartment[$i]['appnumber'] = $row['appnumber'];
//       $i++;
//     }
//     echo json_encode($apartment);
//   }
//   else
//   {
//     http_response_code(404);
//   }
// }
else
{
  $users = [];
  $sql = "SELECT id, username, first_name, last_name, op5_key FROM user";

  if($result = mysqli_query($con,$sql))
  {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $users[$i]['id']    = $row['id'];
      $users[$i]['username'] = $row['username'];
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
}
