<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
$user = [];
$postdata = json_decode(file_get_contents("php://input"));
function email_exists($email, $con)
{
  $email = mysqli_real_escape_string($con, (string)($email));
  
  $query = "CALL login('{$email}')";
  $result = mysqli_query($con,$query);
  if (mysqli_num_rows($result) > 0)
   {
    if($row = mysqli_fetch_assoc($result)) {
       $user['id']    = $row['id'];
       $user['username'] = $row['username'];
       $user['firstname'] = $row['firstname'];
       $user['lastname'] = $row['lastname'];
       $user['pHash'] = $row['pHash'];
       $user['email'] = $row['email'];
       $user['op5Key'] = $row['op5Key'];
       $user['address'] = $row['address'];
       $user['phonenumber'] = $row['phonenumber'];
       $user['admin'] = $row['admin'];
    }
    return $user;
  }
  return false;
}
if($res = email_exists($postdata->email, $con))
{
  if(password_verify($postdata->password, $res['pHash'])){
    // Create token header as a JSON string
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    // Create token payload as a JSON string
    $payload = json_encode([
        'id' => $res["id"],
        'firstname' => $res["firstname"],
        'lastname' => $res["lastname"],
        'username' => $res["username"],
        'admin' => $res["admin"]
    ]);
    // Encode Header to Base64Url String
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    // Encode Payload to Base64Url String
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    // Create Signature Hash
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
    // Encode Signature to Base64Url String
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    // Create JWT
    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    http_response_code(200);
    // $jwt = JWT::encode($token, $key);
    echo json_encode(
            array(
                "message" => "Successful login.",
                "jwt" => $jwt,
                "exp" => time() + 1500,
                "username" => $res["username"],
                "id" => $res["id"]
            )
        );
} else {
  http_response_code(401);
  echo json_encode(array("message" => "Login failed."));
};
} else {
  http_response_code(500);
  echo json_encode(array("message" => "Email does not exist"));
}
