<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style2.css">
    <script src="https://kit.fontawesome.com/a2db49bfe2.js" crossorigin="anonymous"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <title>Document</title>
</head>
<body class="end">
    <?php
        require_once 'config.php';
        $article = $_POST['article'];
        $taille = $_POST['taille'];
        if(empty($article)) {
            echo("<center>Le champ '<b>Article</b>' est vide !</center>");
            exit();
        }
        if(empty($taille)) {
            echo("<center>Le champ '<b>Taille</b>' est vide !</center>");
            exit();
        }
        if (is_numeric($taille)) {
            $check = $bdd->prepare("SELECT Taille FROM Habits WHERE Article = '$article'");
            $check->execute();
            $data = $check->fetchAll();
            $row = $check->rowCount();
            if($row == 0){
                echo("<center>Aucun article: $article !</center>");
            } else {
                echo("<center><h1 class='title_find'>Il y a $row articles avec la référence : $article !</h1><br></center>");
                echo("<center><h3>Voici les tailles disponibles:</h3><br></center>");
                for ($i = 0; $i < $row; $i++) {
                    for ($a = 0; $a < $i; $a++) {
                        if ($data[$i]['Taille'] == $data[$a]['Taille']) {
                            continue;
                        } else {
                            echo "<center><div class='encadre'> Taille: ";
                            echo "<strong>";
                            echo $data[$i]['Taille'];
                            echo "</strong>";
                            $my_data = intval($data[$i]['Taille']);
                            $check2 = $bdd->prepare("SELECT Taille FROM Habits WHERE Taille = '$my_data' AND Article = '$article'");
                            $check2->execute();
                            $data2 = $check2->fetchAll();
                            $row2 = $check2->rowCount();
                            echo " Stock : ";
                            echo "<strong>";
                            echo "$row2";
                            echo "</strong>";
                            ?>
                            <div class="buttonp_m">
                                <div class="plus" id="click"><i class="fa-solid fa-circle-plus"></i> </div>
                                <div class="moins"><i class="fa-solid fa-circle-minus"></i> </div>
                            </div>
                            <?php
                            echo "</div></center>";
                        }
                    }
                }
            }
        } else {
            echo("<center>La taille doit être un chiffre !</center>");
        }
        ?>
    <script type="module" src="index.js"></script>
</body>
</html>