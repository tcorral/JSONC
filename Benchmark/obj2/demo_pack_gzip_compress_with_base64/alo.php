<?php
include_once('GzipJSON.php');

    if ( isset( $_POST['json'] ) )
    {
        $gzjson = new GzipJSON();
        $json = $gzjson->decompress($_POST['json']);
        $json->test2 = 3;
        echo json_encode($json);
    }