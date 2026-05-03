# Refactor de `item.ts`

Découpage proposé :

- `models/item.model.ts` : modèles et types TypeScript.
- `constants/` : catégories, valeurs par défaut et table des origines.
- `data/` : listes d'armes, armures, potions, gemmes et accessoires.
- `utils/item-loot.util.ts` : logique de rareté/loot partagée.
- `item.helper.ts` : façade compatible avec l'API actuelle `ItemHelper`.
- `index.ts` : barrel export optionnel.

L’objectif est de garder les appels existants du type `ItemHelper.getAll()` tout en évitant un fichier unique de plus de 7000 lignes.

À vérifier dans ton projet :

1. Remplacer les imports de l’ancien `item.ts` par `item-refactor` ou déplacer ces fichiers à l’emplacement souhaité.
2. Lancer `ng test` / `ng build`.
3. Corriger si nécessaire les chemins relatifs selon ton arborescence Angular.

Note : la méthode `getAllAccesoire()` conserve volontairement la faute de frappe pour compatibilité. Tu peux ajouter ensuite un alias `getAllAccessoire()` si tu veux migrer progressivement.
