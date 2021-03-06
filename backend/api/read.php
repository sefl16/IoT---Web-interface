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
      $sql = "CALL displayComplexes('{$id}')";
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
            $complex[$i]['city'] = $row['city'];
            $complex[$i]['address'] = $row['address'];
            $complex[$i]['id'] = $row['id'];
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
    $sql = "CALL displayUsers()";

    if($result = mysqli_query($con,$sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $users[$i]['id']    = $row['id'];
        $users[$i]['username'] = $row['username'];
        $users[$i]['firstname'] = $row['firstname'];
        $users[$i]['lastname'] = $row['lastname'];
        $users[$i]['email'] = $row['email'];
        $users[$i]['phonenumber'] = $row['phonenumber'];
        $users[$i]['address'] = $row['address'];
        $users[$i]['op5Key'] = $row['op5Key'];
        $users[$i]['admin'] = $row['admin'];
        $i++;
      }

      echo json_encode($users);
    }
    else
    {
      http_response_code(404);
    }
    break;
  case "readAdminComplex":
  if($id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false)
  {
    $complex = [];
    $complexID = [];
    $sql = "CALL displayComplexApartments('{$id}')";
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
          $complex[$i]['id'] = $row['id'];
          $complex[$i]['complexID'] = $row['complexID'];
          $complex[$i]['appNumber'] = $row['appNumber'];
          $complex[$i]['address'] = $row['address'];
          $i++;
      }

    echo json_encode($complex);
    http_response_code(222);
    }
    else
    {
      http_response_code(404);
    }
    break;
  }

  case "readSensors":
  if($id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false)
  {
    $sensor = [];
    $complexID = [];
    $sql = "CALL displaySensors('{$id}')";
    $result = array();
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
          $sensor[$i]['appID'] = $row['appID'];
          $sensor[$i]['devEUI'] = $row['devEUI'];
          $i++;
      }

    echo json_encode($sensor);
    http_response_code(222);
    }
    else
    {
      http_response_code(404);
    }
    break;
  }

  default:
    http_response_code(404);
    break;
}
