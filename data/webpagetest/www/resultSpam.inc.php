<?php
// Copyright 2020 Catchpoint Systems Inc.
// Use of this source code is governed by the Polyform Shield 1.0.0 license that can be
// found in the LICENSE.md file.
$page_keywords = array('Access Denied','Blocked','WebPageTest','Website Speed Test','Page Speed');
$page_description = "Website speed test blocked.";
?>
<!DOCTYPE html>
<html lang="en-us">
    <head>
        <title>WebPageTest - Test Blocked</title>
        <?php $gaTemplate = 'Blocked'; include ('head.inc'); ?>
    </head>
    <body>
            <?php
            include 'header.inc';
            ?>
                <h1>Test Blocked</h1>

            <div class="box">
                <p>Sorry, but your test was blocked as part of our anti-abuse system.  We do not allow testing of certain domains, to prevent use of the system to inflate page/video views or to drive traffic to sites where revenue is generated by impression.</p>
                <p><?php if(GetSetting('contact')) echo 'If there is a site you want tested which was blocked, please <a href="mailto:' . GetSetting('contact') . '">contact us</a>'. ' and send us your IP address (below) and URL that you are trying to test'; ?>.</p>
                <p>
                Your IP address: <b><?php echo $_SERVER['REMOTE_ADDR']; ?></b><br>
                URL Tested: <b><?php echo htmlspecialchars($url); ?></b><br>
                </p>
            </div>

            <?php include('footer.inc'); ?>
        </div>
    </body>
</html>