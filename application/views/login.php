<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SHERPA | Login</title>

    <!-- Bootstrap Core CSS -->
    <link href="<?php echo base_url('assets/theme/vendor/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/css/style.css'); ?>" rel="stylesheet">

    <link rel="shortcut icon" href="<?php echo base_url('assets/images/system.png'); ?>" type="image/x-icon">
    <link rel="icon" href="<?php echo base_url('assets/images/system.png'); ?>" type="image/x-icon">

    <link href="<?php echo base_url('assets/theme/vendor/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet" type="text/css">

</head>

<body>
    <div class="login-page">
        <div class="dark-bg"></div>
        <div class="background-images" style="opacity: 0.5">
            <img src="<?php echo base_url('assets/images/bg2.jpg'); ?>" />
            <img src="<?php echo base_url('assets/images/bg4.jpg'); ?>" />
            <img src="<?php echo base_url('assets/images/bg3.jpg'); ?>" />
            <img src="<?php echo base_url('assets/images/bg1.jpg'); ?>" />
            <img src="<?php echo base_url('assets/images/bg5.jpg'); ?>" />
        </div>
        <div class="login">
            <div class="h10vh"></div>
            <div class="login-bg">
                <div class="logo-div">
                    <div class="logo-brand text-center">
                        <i class="fa fa-pie-chart fa-fw"></i>
                        <!-- <img src="<?php echo base_url('assets/images/system.png'); ?>" /> -->
                    </div>
                    <div class="logo-text text-center">
                        <p class="first">SHERPA</p>
                        <p class="second">Consumer Goods Trading</p>
                    </div>
                </div>
                <div class="login-div">
                    <div class="panel">
                        <div class="panel-header">
                            <h3 class="text-center">Login Here!</h3>
                        </div>
                        <div class="panel-body">
                            <form role="form" method="post" action="<?php echo base_url('login'); ?>">
                                <div class="form-group error error-text text-center">
                                    <i><?php echo @$message; ?></i>
                                </div>
                                <div class="floating-label">
                                    <input type="text" class="form-control" name="username" required autofocus>
                                    <label>Username</label>
                                </div>
                                <div class="floating-label">
                                    <input type="password" class="form-control" name="password" required>
                                    <label>Password</label>
                                </div>
                                <input type="submit" value="LOGIN" class="form-control submit-form">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h30vh"></div>
        </div>
    </div>
</body>

</html>
