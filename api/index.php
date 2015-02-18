<?php

 $verb = $_SERVER['REQUEST_METHOD'];

 $uri = $_SERVER['REQUEST_URI'];

 function foo($parameters){
    echo $parameters;
    echo "<br />";
}

 $url_parts = parse_url($uri);
 $path = $url_parts["path"];
 $parameters = $url_parts["query"];

 $prefix = "api";
 $ind = strpos($path, $prefix);
 $request = substr($path, $ind + strlen($prefix));

if ($request == "/games") {
  if ($verb == "GET") {
    $dbhandle = new PDO("sqlite:bgg.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);
 
 	echo $path;
    echo "<br />";
    echo $parameters;
    echo "<br />";
    parse_str($parameters, $array);
    echo($array['minGames']);
    echo "<hr />";
    //foo($parameters);
    
    
    $query = "SELECT objectname as game
          from games order by random() limit 0, 10";
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);

    //header('HTTP/1.1 200 OK');
    //header('Content-Type: application/json');
    echo json_encode($results);
  
  } else {
    
    header('HTTP/1.1 404 Not Found');
  
  }
} else {
    
  header('HTTP/1.1 404 Not Found');
}
?>