<?php
// 'user' object
class User{

    // database connection and table name
    private $conn;
    private $table_name = "user";

    // object properties
    public $id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;

    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

// create() method will be here
}
