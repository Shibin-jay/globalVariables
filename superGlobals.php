<?php

/**
 * File name: superGlobals.php
 * PHP script to handle form submissions containing the user's information.
 * PHP version 8.2.3
 * @category Database
 * @package  CodilarProjects
 * @license  https://opensource.org/licenses/MIT MIT
 * @link     https://www.example.com/docs/auth
 * @author   Shibin <shibin.s@codilar.com>
 */

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$image = $_FILES['image']['name'];
$tmp_image = $_FILES['image']['tmp_name'];
// $json_data=file_get_contents('data.json');
$json_data = file_exists('data.json') ? file_get_contents('data.json') : '';
$array_data = json_decode($json_data, true);
$data = array(
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'image_url' => $image,
);

if (!empty($array_data)) {
    $last_element = end($array_data);
    if ($last_element) {
        $json_data = rtrim($json_data, "]");
        $json_data .= ",";
    }
}
$array_data[] = $data;
$json_new = json_encode($array_data, JSON_PRETTY_PRINT);
// Add closing square bracket to complete the JSON array
move_uploaded_file($tmp_image, 'uploads/' . $image);
// echo $json_new;
file_put_contents('data.json', $json_new);
