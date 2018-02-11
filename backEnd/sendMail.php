<?php
	require_once('Mail.php');
	require_once('Mail/mime.php');
	require_once('Net/SMTP.php');
	function buildCommunity($name, $desc, $person, $phone, $eMail) {
		$smtpinfo = array();
		$smtpinfo["host"] = "smtp.163.com";
		$smtpinfo["port"] = "25";
		$smtpinfo["username"] = "email@163.com";
		$smtpinfo["password"] = "password";
		$smtpinfo["timeout"] = 10;
		$smtpinfo["auth"] = true;
		$mailAddr = array('song_pku@foxmail.com');
		$from = "Name<songMAPKU@163.com>";
		$to = implode(',', $mailAddr);
		$subject = "text";
		$content = "<h1>社团名称：".$name."</h1><h2>社团描述：".$desc."</h2><h2>负责人姓名：".$person."</h2><p>负责人联系电话：".$phone."</p><p>社团联系邮箱：".$eMail."</p>";
		$contentType = "text/html; charset=utf-8";
		$crlf = "\n";
		$mime = new Mail_mime($crlf);
		$mime->setHTMLBody($content);
		$param['text_charset'] = 'utf-8';
		$param['html_charset'] = 'utf-8';
		$param['head_charset'] = 'utf-8';
		$body = $mime->get($param);
		$headers = array();
		$headers["From"] = $from;
		$headers["To"] = $to;
		$headers["Subject"] = $subject;
		$headers["Content-Type"] = $contentType;
		$headers = $mime->headers($headers);

		$smtp = & Mail::factory("smtp", $smtpinfo);
		$mail = $smtp->send($mailAddr, $headers, $body);
		$smtp->disconnect();
		if (PEAR::isError($mail)) {
			echo "WRONG\r\n".$mail->getMessage()."\n";
		}
	}
	function sendMail($accpet, $contentSend) {
		$smtpinfo = array();
		$smtpinfo["host"] = "smtp.163.com";
		$smtpinfo["port"] = "25";
		$smtpinfo["username"] = "email@163.com";
		$smtpinfo["password"] = "password";
		$smtpinfo["timeout"] = 10;
		$smtpinfo["auth"] = true;
		$mailAddr = array($accpet);
		$from = "活动管理员<songMAPKU@163.com>";
		$to = implode(',', $mailAddr);
		$subject = "北大认证验证码";
		$content = $contentSend;
		$contentType = "text/html; charset=utf-8";
		$crlf = "\n";
		$mime = new Mail_mime($crlf);
		$mime->setHTMLBody($content);
		$param['text_charset'] = 'utf-8';
		$param['html_charset'] = 'utf-8';
		$param['head_charset'] = 'utf-8';
		$body = $mime->get($param);
		$headers = array();
		$headers["From"] = $from;
		$headers["To"] = $to;
		$headers["Subject"] = $subject;
		$headers["Content-Type"] = $contentType;
		$headers = $mime->headers($headers);

		$smtp = & Mail::factory("smtp", $smtpinfo);
		$mail = $smtp->send($mailAddr, $headers, $body);
		$smtp->disconnect();
		if (PEAR::isError($mail)) {
			false;
		}
		return true;
	}
?>