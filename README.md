# Bienvenu au projet TWEB#
</br>
## But du projet ##
Sujet 2: Développer une application AngularJS pour afficher du contenu obtenu via l'API GitHub.</br>

Vous trouvez le projet déployer sur heroku [ici](http://twebangulargithub.herokuapp.com/#/)

## TODO liste du projet : ##

- Étudier l'API offerte par GitHub.
- Choisir et spécifier la fonctionnalité, en étant créatif et original.
- Intégrer une visualisation de données dans votre UI (choisissez une librairie de visualisation à votre convenance).
- Soigner la présentation (IHM)
déployer l'application sur heroku.
- Écrire un rapport pour expliquer comment l'application a été réalisée.
- Publier l'ensemble dans un repo GitHub

## Fonctionnalités qui ont été implémenté : ##

- Récuperer les informations d'un utilisateur saisi.
- Récupérer les statistiques d'un répértoire (saisi ou séléctionner via l'interface des répértoires de l'utilisateur).
- Publier sur Github.
- Déployer sur Heroku.
- Utilisation de chartJS pour la visualisation de données dans mon UI.


## Technologies utilisées : ##

- Bootstrap
- AngularJS
- ChartJS
- NodeJS
- Express


## Lancer le projet localement : ##

Voici la marche à suivre pour faire fonctionner le projet localement.
 
1. Cloner le projet github localement.
2. Aller avec votre terminal préférer à la racine du projet que vous venez de cloner.
3. Lancer le serveur node avec la commande : "node app.js"
4. Ouvrir [ce lien](http://localhost:8080/#/) avec votre navigateur préféré.

Il est important d'avoir télécharger et installer nodeJS, que vous trouvez ici : [nodejs](https://nodejs.org/en/)


## Comment le projet a-t-il été implémenté :##

Voici step by step comment le projet a été implémenter :

1. Récupérer mon ancien projet angular de [ce repo.](https://github.com/younTheory/angular)
2. Lecture de la documentation de l'api Github.
3. Récuperer des informations d'un utilisateur via l'api github.
4. Récupérer les statistiques d'un répértoire via l'api github.
5. Afficher les statistiques avec ChatJS.
6. Publier sur github le projet.
7. Déployer sur Heroku le projet.

### 1. Récupérer mon ancien projet angular ###

Pour avoir une bonne structure du projet j'ai cloné mon ancien projet angulareJS. Ceci m'a permis de directement me retrouver. Il suffisait simplement de suprimer le dossier node_modules puis de modifier les dépendances du fichier package.json et de faire un node install dans le terminal pour avoir uniquement les dépendances nécessaire.

### 2. Lecture de la documentation de l'api Github ###

Pour comprendre le fonctionnement de l'api Github il m'a été important de lire cette documentation :

- Pour les utilisateurs : [ici]( https://developer.github.com/v3/users/)
- Pour les répértoires : [ici](https://developer.github.com/v3/repos/)

### 3. Récuperer des informations d'un utilisateur via l'api github ###

Pour recevoir les informations d'un utilisateur Github, une saisie du nom d'utilisateur doit être faite dans l'onglet users. Ceci est gérer directement par mon contrôleur "user" qui fait 2 requêtes HTTP sur l'api github.

- La première requête sert à recevoir les informations de l'utilisateur. Elle se fait sur cette addresse [https://api.github.com/users/:username"](https://api.github.com/users/yountheory") ou :username est le champ saisie par l'utilisateur dans le formulaire. ![information utilisateur](Image/infouser.png)


- La deuxième requête sert à recevoir les informations du répertoires de l'utilisateur. Elle se fait sur cette addresse [https://api.github.com/users/:username/repos"](https://api.github.com/users/yountheory/repos") ou :username est le champ saisie par l'utilisateur dans le formulaire. </br>
![information repo](Image/inforepo.png)

Les informations sont affichées grâce à un tableau. A noter que vous pouvez voir les statistiques du répértoire en clicant sur statistics.

### 4. Récupérer les statistiques d'un répértoire via l'api github ###

Pour récuperer les statistiques d'un répértoire il y'a deux moyens :

1. Aller dans l'onglet Repository et donner l'url complète du répertoire. Exemple : https://github.com/younTheory/angularGithub. Dans ce cas c'est la fonction getRepository() dans mon contrôleur "repository" qui va être appelé.

2. Lors d'une saisie d'un utilisateur, dans les informations du répertoire il est possible de consulter les statistiques du répertoire. Grâce au routing mon contrôleur "repositoryUrl" sera appelé.

Dans les 2 cas la fonction getStatistics($scope, $http, $dir) sera appelée ce qui permetra de récupérer les statistiques du répértoire. Il y' a deux différentes statistiques :

1. Si il y'a plusieurs contributeurs au projet vous aurez une statistique à propos du nombre de commit et de ligne de code ajoutée. La requête HTTP est faite sur cette url :
["https://api.github.com/repos/:dir/stats/contributors"](https://api.github.com/repos/angular/angular/stats/contributors) ou dir est le nom utilisateur/nom du répertoire.
  Voici en image la statistique affichée: 
![information repo](Image/comitrepo.png)
Attention le chargement de ces statistiques peut parfois être lent.

2. Sinon vous aurez une statistique du nombre de ligne de chaque différent language utilisé pour le projet. La requête HTTP est faite sur cette url :
["https://api.github.com/repos/:dir/languages"](https://api.github.com/repos/yountheory/angularGithub/languages) ou dir est le nom utilisateur/nom du répertoire. Voici le donut affiché:
![information repo](Image/donutrepo.png)


### 5. Afficher les statistiques avec ChatJS ###

Toutes les statistiques sont affichées avec la librairie ChartJS pour angular que vous trouvez [ici](http://jtblin.github.io/angular-chart.js/).

### 6. Publier sur github le projet ###
Pour publier mon projet sur github les commandes suivantes ont été faites : </br>
1. git init </br>
2. git remote add origin https://github.com/younTheory/angularGithub.git </br>
3. git push -u origin master

### 7. Déployer sur Heroku le projet ###
Pour déployer mon projet sur heroku les commandes suivantes ont été faites : </br>

1. heroku login </br>
2. heroku create twebangulargithub </br>
3. git push heroku master
4. heroku open

Le projet est donc accessible [ici](http://twebangulargithub.herokuapp.com/#/).

## Difficultés rencontrées  ##

- Quelques tricks avec angularJS.
- Problème avec ngroute pour affiché les statistiques du répertoire via l'interface utilisateur, il a fallut crée un troisième contrôleur "repositoryUrl" pour contourner ce problème.


## Problème persistant  ##

- Heroku n'affiche pas toujours les statistiques alors que en local tout fonctionne correctement.

## Conclusion  ##

C'était un bon exercice pour comprendre le fonctionnement de l'api github. Au final, je trouve que c'est exercice fut très important pour mettre en pratique les notions apprises en cours. Je pense que cet exercice individuel devrait être renouveller.