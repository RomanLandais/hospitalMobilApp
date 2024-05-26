attention dans la configuration de .eslintrc.json : un chemin absolu a été inséré dans
"files": ["*.ts"],
"parserOptions": {
"project": "C:/Users/User/Documents/doc travail/programmation/ECF/code2.0/frontEnd/hospitalMobilApp/hospitalApp/tsconfig.json",
"createDefaultProgram": true
}

L'architecture de base ne renvoyait pas sur le bon chemin et l'utilisation de chemin relatif ne fonctionnait pas
