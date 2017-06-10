## Rapport
# Task 1
Nous avons créé un dockerfile qui copie le contenu de ./html vers /var/www/html pour remplir l'image docker (qui n'a pas de contenu html au démarrage). ./html contient un one-page téléchargé depuis https://startbootstrap.com/template-overviews/grayscale/.
Commande de build : "docker build -t task1 ."
Commande de run : "docker run -p 9090:80 task1"
"docker ps" puis "docker inspect [nom du container]" pour obtenir l'ip du container.
Test de fonctionnement : entrer l'adresse ip du container dans la barre d'adresse du navigateur internet. Le one-page devrait s'afficher.

Les fichiers de configuration d'apache se trouvent dans /etc/apache2, dans le container. Pour y accéder, il faut lancer "docker exec -it [nom du container] /bin/bash".
