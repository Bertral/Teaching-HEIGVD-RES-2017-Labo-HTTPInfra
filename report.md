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
- dans task2/ -> "docker build -t task2 ." puis "docker run task2"

Dans src/ :
- "npm install --save express" pour installer express, qui nous permettra de répondre aux requêtes de la ressource "/".
- Edition de index.js pour utiliser express.

Test du fonctionnement : build et run l'image docker, s'y connecter par browser ("docker inspect" pour obtenir l'ip !) sur le port 3000. Il devrait s'afficher "{"type":"d6","result":X}".

## Task 3
La configuration statique est "fragile" car l'adresse de redirection du proxy est codée en dur, alors que les adresses cibles peuvent changer à chaque démarrage des containers (à corriger à chaque fois dans 001-reverse-proxy.conf).

Manipulations effectuées :
- Création du dockerfile. Il copie les fichiers du dossier conf/ dans /etc/apache2, puis lance le module proxy, proxy_http, et active les sites 000-* et 001-*.
- Build l'image avec "docker build -t task3 ."

Configuration à effectuer pour les tests (à chque fois à cause de la config statique) :
- Démarrer les containers task1 et task2.
- Faire des docker inspect pour obtenir les ip de task1 et task2.
- Configuration (dans conf/sites-available/001-reverse-proxy.conf) avec les ip des containers task1 et task2.
- Démarrer le container task3 avec "docker run -d -p 8080:80 task3".
- Trouver l'adresse ip de la vm docker (avec ifconfig ou équivalent)
- Ajouter la ligne "[ip de la vm] demo.res.ch" au fichier hosts (/etc/hosts sur linux).
- Se connecter à "demo.res.ch:8080" ou "demo.res.ch:8080/api/students/" avec un navigateur internet. Les deux sites doivent fonctionner.

## Task 4


## Task 5
