<?php
// Copyright 2020 Catchpoint Systems Inc.
// Use of this source code is governed by the Polyform Shield 1.0.0 license that can be
// found in the LICENSE.md file.
chdir('..');
include 'common.inc';

$urls = $_REQUEST['url'];
$labels = $_REQUEST['label'];
$ids = array();
$ip = $_SERVER['REMOTE_ADDR'];
$key = '';
$keys_file = __DIR__ . '/../settings/keys.ini';
if (file_exists(__DIR__ . '/../settings/common/keys.ini'))
  $keys_file = __DIR__ . '/../settings/common/keys.ini';
if (file_exists(__DIR__ . '/../settings/server/keys.ini'))
  $keys_file = __DIR__ . '/../settings/server/keys.ini';
$key = GetServerKey();
$headless = false;
if (GetSetting('headless')) {
    $headless = true;
}

$duplicates = false;
foreach( $urls as $index => $url ) {
  $url = trim($url);
  if( strlen($url) ) {
    foreach( $urls as $index2 => $url2 ) {
      $url2 = trim($url2);
      if ($index != $index2 && $url == $url2) {
        $duplicates = true;
      }
    }
  }
}

if (!$duplicates && !$headless) {
  foreach( $urls as $index => $url ) {
    $url = trim($url);
    if( strlen($url) )
    {
      $id = SubmitTest($url, $labels[$index], $key);
      if( $id && strlen($id) )
        $ids[] = $id;
    }
  }

  // now add the industry URLs
  if (isset($_REQUEST['t']) && is_array($_REQUEST['t']) && count($_REQUEST['t'])) {
    foreach( $_REQUEST['t'] as $tid ) {
      $tid = trim($tid);
      if( strlen($tid) )
        $ids[] = $tid;
    }
  }
}

// if we were successful, redirect to the result page
if( count($ids) )
{
    $idStr = '';
    if( $_GET['tid'] )
    {
        $idStr = $_GET['tid'];
        if( $_GET['tidlabel'] )
            $idStr .= '-l:' . urlencode($_GET['tidlabel']);
    }
    foreach($ids as $id)
    {
        if( strlen($idStr) )
            $idStr .= ',';
        $idStr .= $id;
    }

    $protocol = getUrlProtocol();
    $compareUrl = "$protocol://" . $_SERVER['HTTP_HOST'] . "/video/compare.php?tests=$idStr";
    header("Location: $compareUrl");
}
else
{
    DisplayError();
}

/**
* Submit a video test request with the appropriate parameters
*
* @param mixed $url
* @param mixed $label
*/
function SubmitTest($url, $label, $key)
{
    global $uid;
    global $user;
    global $ip;
    $id = null;

    $protocol = getUrlProtocol();
    $testUrl = "$protocol://" . $_SERVER['HTTP_HOST'] . '/runtest.php?';
    $testUrl .= 'f=xml&priority=2&runs=3&video=1&mv=1&fvonly=1&url=' . urlencode($url);
    if( $label && strlen($label) )
        $testUrl .= '&label=' . urlencode($label);
    if (isset($_REQUEST['profile']) && strlen($_REQUEST['profile']) && 
        (file_exists(__DIR__ . '/../settings/profiles.ini') ||
         file_exists(__DIR__ . '/../settings/common/profiles.ini') ||
         file_exists(__DIR__ . '/../settings/server/profiles.ini'))) {
        $testUrl .= "&profile={$_REQUEST['profile']}";
    }
    if( $ip )
        $testUrl .= "&addr=$ip";
    if( $uid )
        $testUrl .= "&uid=$uid";
    if( $user )
        $testUrl .= '&user=' . urlencode($uid);
    if( strlen($key) )
        $testUrl .= '&k=' . urlencode($key);
    $saml_cookie = GetSetting('saml_cookie', 'samlu');
    if (isset($_COOKIE[$saml_cookie])) {
      $testUrl .= '&samlu=' . urlencode($_COOKIE[$saml_cookie]);
    }
      
    // submit the request
    $result = simplexml_load_file($testUrl, 'SimpleXMLElement',LIBXML_NOERROR);
    if( $result && $result->data )
        $id = (string)$result->data->testId;

    return $id;
}

/**
* Something went wrong, give them an error message
*
*/
function DisplayError()
{
?>
<!DOCTYPE html>
<html lang="en-us">
    <head>
        <title>WebPageTest - Visual Comparison</title>
        <?php $gaTemplate = 'Visual Comparison Error'; include ('head.inc'); ?>
    </head>
    <body>
            <?php
            $tab = null;
            $headerType = 'video';
            include 'header.inc';
            ?>

            <h1>There was an error running the test(s).</h1>

            <?php include('footer.inc'); ?>
        </div>
    </body>
</html>
<?php
}
?>
