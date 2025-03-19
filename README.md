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
 via react Native et utilise la l'api huggingface avec le modèle gemma-2-2b-pt

1. se mettre dans le répertoire ./servBack

2. créer un fichier .env

3. dans le fichier .env écrire HF_API_KEY=VOTRE_API_KEY

4. lancer le serveur avec
   ```bash
    npx ts-node serverback.tsx
   ```