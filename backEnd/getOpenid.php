<?php
        $wxurl = "https://api.weixin.qq.com/sns/jscode2session?appid=" . $_REQUEST['appID'] . "&secret=" . $_REQUEST['secret']  . "&js_code=" . $_REQUEST['jsonCode'] . "&grant_type=authorization_code";
        $data = file_get_contents($wxurl);
        print($data);
?>
