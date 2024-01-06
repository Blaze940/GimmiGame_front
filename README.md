# Prerequisites (local mode only)

Run the server in local available at `https://github.com/Blaze940/GimmiGame_back` and follow the instructions in the README.md file.

# Project Theme

**Plateforme de jeux en ligne**
Le but du projet est de créer une plateforme de jeux tour par tour en ligne.
Les jeux seront fournis sous forme d’un programme de moteur de jeu dans un ou plusieurs langages par
des utilisateurs.
Un protocole devra être respecté pour l’interaction et l’interface graphique.
La communication avec le moteur de jeu se fera par entrées sorties standard.

**Plusieurs systèmes devront être mis en place** :
- partie sociale : permettre d’ajouter des amis
- classement des joueurs sur les différents jeux
- création de partie, par invitation ou en créant des salons
- on devra pouvoir sauvegarder une partie en cours et la recharger ultérieurement
- on devra pouvoir rejouer les parties, ou les reprendre à un tour précis
  
L’interface de partie devra contenir au moins l’affichage de jeu, un chat, et un système d’émojis, et la
possibilité de communiquer par caméra et micro

**Améliorations possibles **:
- possibilité de coder des IA pour jouer
- possibilité de streamer
  
**Protocole** :
Le déroulement d’une partie se fait de la façon suivante :
 - On envoie les paramètres INITIALISATION au moteur de jeu
 - En boucle :
  - le moteur de jeu nous envoie des INSTRUCTIONS
  - on transfert les INSTRUCTIONS aux joueurs concernés
  - on attend les ACTIONS des joueurs concernés
  - a chaque réception d’ACTION, on la transmet au moteur
    
**INITIALISATION**
Un json contenant les paramètres nécessaires au lancement d’une partie (nombre de joueurs, taille de la
carte, etc…)

**INSTRUCTIONS**
Trois parties : l’affichage, les actions requises, et l’état de la partie
L’affichage sera décrit par un dictionnaire (format JSON) reprenant les balises SVG et leurs paramètres
habituels

Les actions peuvent être :
- clic souris, avec optionnellement :
   - la définition de quel bouton peut être utilisé,
   - les zones cliquables
   - la demande de confirmation du clic
- touche pressée, avec optionnellement:
  - la liste des touches prises en compte
  - la demande de confirmation de la touche
  - saisie de texte, avec optionnellement :
  - l’indication du format (regex)


# GimmiFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.

## Installation
Run `npm i` to install all dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
