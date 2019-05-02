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
      $complexID = [];
      //$complexID = array();
      $sql = "CALL userApartmentsInfo('{$id}')";
      //$sql = "CALL displayComplexForUser('{$id}')";
      $result2 = array();
      if($result = mysqli_query($con,$sql))
      {

        $i = 0;
        $j = 0;
        $y = 0;
        while($row = mysqli_fetch_assoc($result))
        {
          $data_array[] = $row;
          $y = 0;
          $j = 0;
          if(in_array($row['complexID'], $complexID) == false)
          {
            $complex[$i]['city'] = $row['city'];
            $complex[$i]['address'] = $row['address'];
            $complex[$i]['complexID'] = $row['complexID'];
            $complexID[$i] = $row['complexID'];
            $complex[$i]['apartments'] = [];
            $i++;
          }
        }

        $sizeofcomplexID = sizeof($complexID);
        for($y = 0; $y < $sizeofcomplexID; $y++)
        {
          foreach($data_array as $item)
          {
            //http_response_code(300);
            if($complexID[$y] == $item['complexID'])
            {
                //http_response_code(300);
                $complex[$y]['apartments'][$j] = $item['appNumber'];
                $j++;
            }

          }
          $j = 0;
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

  // $sql2 = "CALL getComplexApps('{$id}', '{$complexID}')";
  //
  // if($result2 = mysqli_query($con,$sql2))
  // {
  //   http_response_code(133);
  //   while($row = mysqli_fetch_assoc($result))
  //   {
  //     $complex[$i]['apartments'][$j] = $row['appNumber'];
  //
  //     $j++;
  //   }
  // }

  // $result = mysqli_query($con,$sql);
  // if($result == true)
  // {
  //   http_response_code(200);
  // }
  // else if($result == false)
  // {
  //   http_response_code(404);
  // }

  // while($row2 = $result2->fetch_assoc())
  // {
  //   if($complexID[$y] == $row2['complexID'])
  //   {
  //     //http_response_code(300);
  //     $complex[$y]['apartments'][$j] = $row['appNumber'];
  //     $j++;
  //     $y++;
  //     $j++;
  //   }
  // }




          // $complex[$i]['apartments'][$j] = $row['appNumber'];
          // $i++;
          // $j++;
        // $complex[1]['apartments'][1] =
        //   while($row = mysqli_fetch_assoc($result))
        //   {
        //     $complex[$i]['apartments'][$j] = $row['appNumber'];
        //     $j++;
        //     $i++;
        //   }
