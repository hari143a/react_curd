<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow the following HTTP methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// Allow the following HTTP headers
header("Access-Control-Allow-Headers: Content-Type");

include("db.php");

if ($_POST['action'] == 'save') {
    @$hallticket = $_POST['hallticket'];
    @$name = $_POST['name'];
    @$email = $_POST['email'];
    @$phone = $_POST['phone'];
    // random id 
    $n = 4;
    $rand = bin2hex(random_bytes($n)); 
    $query = "INSERT INTO register (hallticket, name, email, phone, random_id)
    VALUES ('".$hallticket."', '".$name."', '".$email."', '".$phone."', '".$rand."');";
    $result = mysqli_query($conn, $query);

    // if ($result) {
    //     // Return a successful HTTP status code along with the response
    //     echo 'OK';
    // } else {
    //     // Return an error HTTP status code along with the response
    //     echo 'Error';
    // }
}

if (isset($_POST['action']) && $_POST['action'] == 'view') {
    $query = "SELECT * FROM `register`";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    mysqli_free_result($result);    
    mysqli_close($conn);

    header('Content-Type: application/json');
    echo json_encode($data);
}

// delete
if (@$_POST['action'] == 'delete') {
    $id = $_POST['id'];
    $query = "DELETE FROM `register` WHERE id = '".$id."' ;";
    $result = mysqli_query($conn, $query);
    // echo $query;
    // exit;    
    // if ($result) {
    //     echo"<script>alert('deleted successful.'); location.href = '';</script>";
    // } 
} 

if ($_POST['action'] == 'edit') {
    @$id = $_POST['id'];
    $query = "SELECT * FROM `register` WHERE id = '".$id."' ;";
    $result = mysqli_query($conn, $query);

    // if ($result) {
    //     echo 'ok';
    // } else {
    //    echo "not ok";
    // }
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    mysqli_free_result($result);    
    mysqli_close($conn);

    header('Content-Type: application/json');
    echo json_encode($data);
}

if ($_POST['action'] == 'update') {
    @$id = $_POST['id'];
    @$hallticket = $_POST['hallticket'];
    @$name = $_POST['name'];
    @$email = $_POST['email'];
    @$phone = $_POST['phone'];
    
    $query = "UPDATE `register` SET `hallticket`='".$hallticket."',`name`='".$name."',`email`='".$email."',`phone`='".$phone."' WHERE id = '".$id."' ;";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Return a successful HTTP status code along with the response
        echo 'OK';
    } else {
        // Return an error HTTP status code along with the response
        echo 'Error';
    }
}

?>