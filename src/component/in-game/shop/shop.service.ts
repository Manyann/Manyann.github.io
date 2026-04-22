import { Item } from '../../model/item';
import { Ville } from '../../model/villes';

export class ShopService {
  public static getStatStatut(stat: string): string {
    if (stat === '0') {
      return 'stat-middle';
    }
    if (stat.startsWith('-')) {
      return 'stat-down';
    }
    if (stat.indexOf('-') !== -1) {
      let statNumber = parseInt(stat.charAt(2));
      if (statNumber > 3) {
        return 'stat-down';
      }
      if (statNumber === 3) {
        return 'stat-middle';
      }
    }
    return 'stat-up';
  }

  public static refreshItems<T extends Item, V>(
    allItems: V[],
    villes: Ville[],
    selectedVilleType: string,
    activeCategorieCodes: Array<string>,
    getItem: (vente: V) => T,
  ): V[] {
    const ville = villes.find((x) => x.type === selectedVilleType);

    let items = allItems.filter((vente) =>
      this.estPresent(getItem(vente), ville),
    );

    return this.applyCategoryFilter(items, activeCategorieCodes, getItem);
  }

  public static mapToVente<
    T extends Item,
    V extends { promotion: number; prixReel: number },
  >(
    items: T[],
    createVente: () => V,
    setItem: (vente: V, item: T) => void,
  ): V[] {
    return items.map((item) => {
      const random = Math.floor(Math.random() * 20);
      let oldValue = item.prix;
      let newValue = item.prix;
      let promotion = 0;

      if (random === 0) {
        newValue *= 0.8;
        promotion = -20;
      } else if (random === 1) {
        newValue *= 0.9;
        promotion = -10;
      } else if (random === 18) {
        newValue *= 1.1;
        promotion = 10;
      } else if (random === 19) {
        newValue *= 1.2;
        promotion = 20;
      }

      const itemVente = createVente();

      setItem(itemVente, {
        ...item,
        prix: Math.floor(newValue),
      });

      itemVente.promotion = promotion;
      itemVente.prixReel = oldValue;

      return itemVente;
    });
  }

  private static applyCategoryFilter<T extends Item, V>(
    items: V[],
    activeCategorieCodes: string[],
    getItem: (vente: V) => T,
  ): V[] {
    if (activeCategorieCodes.length === 0) {
      return items;
    }

    return items.filter((vente) =>
      activeCategorieCodes.includes(getItem(vente).categorie.code),
    );
  }

  private static estPresent<T extends Item>(
    item: T,
    ville: Ville | undefined,
  ): boolean {
    if (!ville) {
      return true;
    }

    const random = Math.floor(Math.random() * 101);
    let handicap = item.basePourcentage - ville.handicap;

    if (handicap < 2) {
      handicap = 2;
    }

    return random < handicap;
  }
}
