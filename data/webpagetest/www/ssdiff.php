<?php
// Copyright 2020 Catchpoint Systems Inc.
// Use of this source code is governed by the Polyform Shield 1.0.0 license that can be
// found in the LICENSE.md file.
include 'common.inc';
require_once('page_data.inc');
$page_keywords = array('image','comparison','WebPageTest','Website Speed Test');
$page_description = "Visual comparison of multiple website screenshots.";
$title = 'WebPageTest screenshot diff';
$gaTemplate = 'Screenshot Diff';

$refPath = GetTestPath($_REQUEST['ref']);
$refData = loadAllPageData($refPath);
$cmpPath = GetTestPath($_REQUEST['cmp']);
$cmpData = loadAllPageData($cmpPath);
$refRun = GetMedianRun($refData, 0, $median_metric);
$cmpRun = GetMedianRun($cmpData, 0, $median_metric);
if( $refRun && $cmpRun )
{
    $refFile = "$refPath/{$refRun}_screen.png";
    $cmpFile = "$cmpPath/{$cmpRun}_screen.png";
    if( is_file($refFile) && is_file($cmpFile) )
    {
        $refImg = urlencode("{$_REQUEST['ref']}/{$refRun}_screen.png");
        $cmpImg = urlencode("{$_REQUEST['cmp']}/{$cmpRun}_screen.png");
    }
}
?>
<!DOCTYPE html>
<html lang="en-us">
    <head>
        <title>WebPageTest - Screenshot Diff</title>
        <?php include ('head.inc'); ?>
    </head>
    <body>
        <div class="page">
            <?php
            $tab = 'Test Result';
            $nosubheader = true;
            $filmstrip = $_REQUEST['tests'];
            include 'header.inc';

            if( isset($refImg) && isset($cmpImg) )
            {
                echo '<table style="text-align:center;">';
                echo '<tr><th>Reference Image</th><th>Comparison Image</th></tr>';
                echo '<tr><td>';
                echo "<a href=\"/$refFile\"><img style=\"max-width:450px; -ms-interpolation-mode: bicubic;\" src=\"/$refFile\"></a>";
                echo '</td><td>';
                echo "<a href=\"/$cmpFile\"><img style=\"max-width:450px; -ms-interpolation-mode: bicubic;\" src=\"/$cmpFile\"></a>";
                echo '</td></tr>';
                echo '<tr><th colspan=2>Comparison</th></tr>';
                echo '<tr><td colspan=2>';
                $cmpImgFile = "/imgdiff.php?ref=$refImg&amp;cmp=$cmpImg";
                echo "<a href=\"$cmpImgFile\"><img style=\"max-width:930px; -ms-interpolation-mode: bicubic;\" src=\"$cmpImgFile\"></a>";
                echo '</td></tr>';
                echo '</table>';
            }
            else
                echo 'Sorry, the screenshots were not available for comparison';

            include('footer.inc');
            ?>
        </div>
    </body>
</html>
