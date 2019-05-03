<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
// // generate json web token
use ReallySimpleJWT\Token;

$user = [];
$postdata = json_decode(file_get_contents("php://input"));

function email_exists($email, $con)
{
    $email = mysqli_real_escape_string($con, (string)($email));
    $query = "SELECT id, username, first_name, last_name, P_hash, email, op5_key, address, phoneNumber
            FROM user
            WHERE email = '{$email}'
            LIMIT 0,1";
    $result = mysqli_query($con,$query);
    if (mysqli_num_rows($result) > 0) {
        if($row = mysqli_fetch_assoc($result)) {
          $user['id']    = $row['id'];
          $user['username'] = $row['username'];
          $user['first_name'] = $row['first_name'];
          $user['last_name'] = $row['last_name'];
          $user['p_hash'] = $row['P_hash'];
          $user['email'] = $row['email'];
          $user['op5_key'] = $row['op5_key'];
          $user['address'] = $row['address'];
          $user['phoneNumber'] = $row['phoneNumber'];
        }
        return $user;
    }
    return false;
}

if($res = email_exists($postdata->email, $con))
{
    if(password_verify($postdata->password, $res['p_hash'])){
        // Create token header as a JSON string
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        // Create token payload as a JSON string
        $payload = json_encode([
            'id' => $res["id"],
            'first_name' => $res["first_name"],
            'last_name' => $res["last_name"],
            'username' => $res["username"],
            'admin' => True
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
                    "username" => $res["username"]
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
