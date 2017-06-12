# Rapport
## Task 1
Nous avons créé un dockerfile qui copie le contenu de ./html vers /var/www/html pour remplir l'image docker (qui n'a pas de contenu html au démarrage). ./html contient un one-page téléchargé depuis https://startbootstrap.com/template-overviews/grayscale/.
Commande de build : "docker build -t task1 ."
Commande de run : "docker run -p 9090:80 task1"
"docker ps" puis "docker inspect [nom du container]" pour obtenir l'ip du container.
Test du fonctionnement : entrer l'adresse ip du container dans la barre d'adresse du navigateur internet. Le one-page devrait s'afficher.

Les fichiers de configuration d'apache se trouvent dans /etc/apache2, dans le container. Pour y accéder, il faut lancer "docker exec -it [nom du container] /bin/bash".

## Task 2
Nous avons décidé de faire une application qui lance un dé à six faces afin que le contenu affiché soit dynamique.

Manipulations effectuées :
- Création du dockerfile. Il copie le répertoire src/ dans /opt/app dans l'image docker, puis lance /opt/app/index.js (point d'entrée de l'application dynamique).
- Dans le dossier src/ -> "npm init" puis "npm install --save chance" pour installer le générateur aléatoire.
- Toujours dans src/ -> création et édition de index.js.
- dans task2/ -> "docker build -t task2 ." puis "docker run -p8080:3000 task2"

Dans src/ :
- "npm install --save express" pour installer express, qui nous permettra de répondre aux requêtes de la ressource "/".
- Edition de index.js pour utiliser express.

Test du fonctionnement : build et run l'image docker, s'y connecter par browser ("docker inspect" pour obtenir l'ip !) sur le port 3000. Il devrait s'afficher "{"type":"d6","result":X}".

## Task 3
La configuration statique est "fragile" car l'adresse de redirection du proxy est codée en dur, alors que les adresses cibles peuvent changer à chaque démarrage des containers (à corriger à chaque fois dans 001-reverse-proxy.conf).

Manipulations effectuées :
- Création du dockerfile. Il copie les fichiers du dossier conf/ dans /etc/apache2, puis lance le module proxy, proxy_http, et active les sites 000-\* et 001-\*.
- Build l'image avec "docker build -t task3 ."

Configuration à effectuer pour les tests (à chque fois à cause de la config statique) :
- Démarrer les containers task1 et task2.
- Faire des docker inspect pour obtenir les ip de task1 et task2.
- Configuration (dans conf/sites-available/001-reverse-proxy.conf) avec les ip des containers task1 et task2.
- Démarrer le container task3 avec "docker run -d -p 7070:80 task3".
- Trouver l'adresse ip de la vm docker (avec ifconfig ou équivalent)
- Ajouter la ligne "[ip de la vm] demo.res.ch" au fichier hosts (/etc/hosts sur linux).
- Se connecter à "demo.res.ch:7070" ou "demo.res.ch:7070/api/students/" avec un navigateur internet. Les deux sites doivent fonctionner.

## Task 4
Manipulations effectuées :
- Copie des fichiers de task1, 2 et 3 dans le dossier task4.
- Dans task1/html/index.html, ajouter <script src="js/dice.js"></script> juste avant </body>.
- Dans task1/html/js/, créer le fichier dice.js dans le dossier js/ du container task4-1.
- Build la nouvelle version de task1 avec "docker build -t task4-1 ." et task2 avec "docker build -t task4-2 .", idem pour task3.
- Relancer les containers avec "docker run -d --name apache_static task4-1 && docker run -d --name express_dynamic task4-2 && docker run -d -p 7070:80 --name apache_rp task4-3"
- Reconfigurer les IP si nécessaire (Task 3).

Pour tester le fonctionnement, lancer les 3 containers, recharger demo.res.ch:7070, appuyer sur F12 et afficher l'onglet "Network". L'appel à dice.js y est listé. Le sous-titre de la page doit changer toutes les 2 secodes.
Ou
http://demo.res.ch:7070/api/students/

La démo ne fonctionnerait pas sans reverse proxy car le navigateur (pour des raisons de sécurité) n'exécutera pas un script se trouvant sur un serveur différent du site visité.

## Task 5
Manipulations effectuées :
- Copier le dossier contenu de task4/task3/ dans task5/.
- Créer le script apache2-foreground en récupérant son contenu de https://github.com/docker-library/php/blob/master/5.6/apache/apache2-foreground. Le rendre exécutable avec "chmod 755 apache2-foreground". L'éditer pour ajouter l'affichage de deux nouvelles variables d'environnement (ip des applications dynamiques et statiques).
- Editer le dockerfile de task3 pour copier apache2-foreground dans /usr/local/bin/.
- Dans task3/templates/ créer un fichier config-template.php qui génère notre 001-reverse-proxy.conf avec les adresses ip récupérées des variables d'environnement.
- Editer le dockerfile de task3 pour copier ce template dans la config d'apache.
- Ajouter la ligne "php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf" au script apache2-foreground pour que le template écrase notre configuration après qu'il soit généré.

Test :
- Build les containers task4-1 et task4-2.
- Lancer le script "test.sh" et noter les deux adresses IP des containers static et dynamic qui s'affichent.
- Lancer la commande "docker run -d -e STATIC_APP=[STATIC]:80 -e DYNAMIC_APP=[DYNAMIC]:3000 --name apache_rp -p 8080:80 task5". Le site demo.res.ch:8080 devrait être accessible.
