<?php

$verb = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];

$url_parts = parse_url($uri);
$path = $url_parts["path"];
$parameters = $url_parts["query"];

$temp_param = urldecode($parameters);
$len = strlen($parameters);
$arguments = array();
$j = 0;

//echo($parameters);
for ($i = 0; $i < $len; $i++){
  $char = $temp_param[$i];
  //echo($char.", ");
  if($char === "<" || $char === ">" || $char === "=") {
    $arguments[$j] = $char;
    $temp_param[$i] = "=";
    //echo($arguments[$j].", ");
    $j++;
    //echo($arguments[$j]);
    //echo("<br>");

  }
}
//echo("<br>");

$prefix = "api";
$ind = strpos($path, $prefix);
$request = substr($path, $ind + strlen($prefix));

if ($request == "/games") {
  if ($verb == "GET") {
    $dbhandle = new PDO("sqlite:bgg.sqlite") or die("Failed to open DB");
    if (!$dbhandle){
     die ($error);
   }

   	//echo $path;
    //echo $parameters;
    //echo "<br />";
    //echo $temp_param;
    //echo "<br />";
    $parameters = $temp_param;
    parse_str($parameters, $array); //This parses paramaters into an array with columns (minplayers) as keys
                                    //and values (2) as values (heh). $array['minplayers'] = 2 (example)
    //echo($array['minGames']);
    $keys = (array_keys($array));
    //echo "<hr />";
    $ans = "";
    if (count($keys) > 0){
      $ans = "WHERE  " . $keys[0] . $arguments[0] . $array[$keys[0]];
    }
    for ($i = 1; $i < count($keys); $i++) {
      $ans = $ans . " AND " . $keys[$i] . $arguments[$i] . $array[$keys[$i]];
    }
    //echo $ans;
    //echo "<br />";
    //foo($parameters);
    
    $numGames = 5;
    $numGamesStr = strval($numGames);
    $query = "SELECT objectname as game,
    rank,
    maxplayers,
    minplayers,
    playingtime
    from games " . $ans . " order by random() limit 0, " . $numGamesStr;
    $statement = $dbhandle->prepare($query);
    error_log($query);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);

    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
    //echo("<hr>");
    echo json_encode($results);
    
  } else {

    header('HTTP/1.1 404 Not Found');

  }
} else {

  header('HTTP/1.1 404 Not Found');
}
?>
