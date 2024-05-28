Ce projet a été construit grâce à Angular et Ionic.

Déploiement en local de l'application :

- télécharger le dépôt Github
  
- installer les dépendances via la commande du terminal : npm install
  
- installer ionic si non présent : npm install -g @ionic/cli

Dans la configuration de .eslintrc.json : un chemin absolu a été inséré dans
"files": ["*.ts"],
"parserOptions": {
"project": "CHEMIN/ABSOLU/VERS/FICHIER/APPLICATION/tsconfig.json",
"createDefaultProgram": true
}
L'architecture de base ne renvoyait pas sur le bon chemin et l'utilisation de chemin relatif ne fonctionnait pas

- pour visuaiser le projet en mode développement utiliser : ionic serve

- pour déployer le projet, installer les plates-formes mobiles, localement, nous avons fait le choix d'utiliser capacitor.
Installer capacitor avec la commande du terminal : npm install @capacitor/core @capacitor/cli
puis pour Android : ionic capacitor add android
pour IOS : ionic capacitor add ios

- construire l'application pour générer les fichiers nécessaires à la synchronisation avec Capacitor : ionic build

- Synchroniser avec Capacitor : npx cap sync

- ouvrir le projet dans l'IDE native :
Pour Android : npx cap open android
Pour iOS : npx cap open ios

- pour un déploiement sur simulateur :
Créer un émulateur : dans Android Studio, ouvrir le Device Manager depuis la barre de menus Tools. Créer un nouvel émulateur en choisissant un appareil virtuel avec une version d'Android appropriée.
Exécuter la commande “run app” pour lancer notre application sur l'émulateur Android.

