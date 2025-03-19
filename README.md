# Installation

## Front

 # React Native :

 1.  Ici ce sera l'affichage de l'appli 
   ```bash
    npx expo start
   ```

## Back

 # express et axios

 serveur à part qui récupère le texte envoyé par l'utilisateur 
 via react Native et utilise la l'api huggingface avec le modèle gemma-3-4b-pt

1. se mettre dans le répertoire ./servBack
   ```bash
    npx ts-node serverback.tsx
   ```