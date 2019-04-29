<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$source = $_GET['source'];

switch ($source)
{
  case "readUserComplex":
    if($id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false)
    {
      $complex = [];
      $sql = "CALL displayComplexForUser('{$id}')";
      if($result = mysqli_query($con,$sql))
      {
        $i = 0;

        while($row = mysqli_fetch_assoc($result))
        {
          $j = 0;
          $complex[$i]['city'] = $row['city'];
          $complex[$i]['address'] = $row['address'];
          $complex[$i]['apartments'] = [];
          $sql2 = "CALL getComplexApps('{$id}',"$row['complexID']")";
          if($result2 = mysqli_query($con,$sql2))
          {
            while($row2 = mysqli_fetch_assoc($result2))
            {
              $complex[$i]['apartments'][$j] = $row2['appnumber'];
            }
          }
          $i++;
        }
        echo json_encode($complex);
      }
      else
      {
        http_response_code(404);
      }
      break;
    }
  case "readUsers":
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
    break;
  default:
    http_response_code(404);
    break;
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
  // case "readUser":
  // $users = [];
  // $sql = "SELECT id, username, first_name, last_name, op5_key FROM user";
  //
  // if($result = mysqli_query($con,$sql))
  // {
  //   $i = 0;
  //   while($row = mysqli_fetch_assoc($result))
  //   {
  //     $users[$i]['id']    = $row['id'];
  //     $users[$i]['username'] = $row['username'];
  //     $users[$i]['first_name'] = $row['first_name'];
  //     $users[$i]['last_name'] = $row['last_name'];
  //     $users[$i]['op5_key'] = $row['op5_key'];
  //     $i++;
  //   }
  //
  //   echo json_encode($users);
  // }
  // else
  // {
  //   http_response_code(404);
  // }
