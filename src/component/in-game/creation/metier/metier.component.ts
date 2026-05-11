import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';

import { TreeNode } from 'primeng/api';
import { SidebarComponent } from '../../../common/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { CompetenceListComponent } from '../../../common/competence-list/competence-list.component';
import {
  Caracteristique,
  CreationHelper,
  Metier,
  Origine,
} from '../../../../services/creation';

@Component({
  selector: 'app-metier',
  standalone: true,
  imports: [
    CommonModule,
    TreeTableModule,
    SidebarComponent,
    ButtonModule,
    CompetenceListComponent,
  ],
  templateUrl: './metier.component.html',
  styleUrls: [
    './metier.component.css',
    '../../../../assets/css/badge.css',
    '../../../../assets/css/sidebar-stats.css',
    '../../../../assets/css/table.css',
  ],
})
export class MetierComponent {
  title = 'nhbk';
  metiersBase: Array<Metier> = [];
  metiers: Array<Metier> = [];
  treeNodes: Array<TreeNode> = [];
  metierToSee: Metier;
  sidebarVisible: boolean = false;
  sidebarVisibleComplete: boolean = false;

  mobileCurrentNodes: Array<TreeNode> = [];
  mobileParentStack: Array<TreeNode> = [];
  mobileCurrentLevel: number = 1;
  metierToSeeHeritage: Array<Metier> = [];

  @Input() origineName: string = '';
  origine: Origine = CreationHelper.getDefaultOrigine();

  constructor() {
    this.metierToSee = CreationHelper.getDefaultMetier();
    this.setAll();
  }

  setAll(): void {
    this.origine =
      CreationHelper.getOrigineByName(this.origineName) ??
      CreationHelper.getDefaultOrigine();
    this.metiersBase = CreationHelper.getAllMetier();
    this.metiers = this.metiersBase.filter(
      (x) =>
        x.shortCodeParents.length === 0 || x.shortCodeParents.includes('*'),
    );

    this.metiers.forEach(
      (x) => (x.subMetiers = this.fillSubMetier(x.shortCode)),
    );
    this.treeNodes = this.metierToTreeNode(this.metiers, 1);

    this.resetMobileNavigation();
  }

  private resetMobileNavigation(): void {
    this.mobileCurrentNodes = this.treeNodes;
    this.mobileParentStack = [];
    this.mobileCurrentLevel = 1;
  }

  fillSubMetier(code: string): Array<Metier> {
    let subMetiers: Array<Metier> = this.metiersBase.filter((x) =>
      x.shortCodeParents.includes(code),
    );
    subMetiers.forEach((x) => (x.subMetiers = this.fillSubMetier(x.shortCode)));
    return subMetiers;
  }

  metierToTreeNode(
    metiers: Array<Metier>,
    level: number,
    parentStats?: Pick<
      Metier,
      'courage' | 'intelligence' | 'charisme' | 'adresse' | 'force' | 'chance'
    >,
    parentHeritage: Array<Metier> = [],
  ): Array<TreeNode> {
    let nodes: Array<TreeNode> = [];

    metiers.forEach((x) => {
      const mergedStats = this.getMergedStats(x, parentStats);
      const heritage = [...parentHeritage, x];

      let node = {
        label: x.nom,
        data: {
          ...x,
          ...mergedStats,
          heritage,
          isForbidden: this.origine.restrictionsMetierShortCode.includes(
            x.shortCode,
          ),
          treeLevel: level,
        },
        children: this.metierToTreeNode(
          x.subMetiers,
          level + 1,
          mergedStats,
          heritage,
        ),
      };
      nodes.push(node);
    });

    return nodes;
  }

  private getMergedStats(
    metier: Metier,
    parentStats?: Pick<
      Metier,
      'courage' | 'intelligence' | 'charisme' | 'adresse' | 'force' | 'chance'
    >,
  ): Pick<
    Metier,
    'courage' | 'intelligence' | 'charisme' | 'adresse' | 'force' | 'chance'
  > {
    const statsSource = parentStats ?? this.origine;

    return {
      courage: this.getStat(
        this.getStatNombre(statsSource.courage),
        this.getStatNombre(metier.courage),
      ),
      intelligence: this.getStat(
        this.getStatNombre(statsSource.intelligence),
        this.getStatNombre(metier.intelligence),
      ),
      charisme: this.getStat(
        this.getStatNombre(statsSource.charisme),
        this.getStatNombre(metier.charisme),
      ),
      adresse: this.getStat(
        this.getStatNombre(statsSource.adresse),
        this.getStatNombre(metier.adresse),
      ),
      force: this.getStat(
        this.getStatNombre(statsSource.force),
        this.getStatNombre(metier.force),
      ),
      chance: this.getStat(
        this.getStatNombre(statsSource.chance),
        this.getStatNombre(metier.chance),
      ),
    };
  }

  private getStatNombre(caracteristique: Caracteristique): string {
    if (caracteristique.type === 'min') {
      return `+${caracteristique.nombre}`;
    }

    if (caracteristique.type === 'max') {
      return `-${caracteristique.nombre}`;
    }

    return caracteristique.nombre;
  }

  private getStat(
    origineValeur: string,
    metierValeur: string,
  ): Caracteristique {
    let minMax: string = '';
    let upDown: string = '';
    if (origineValeur.indexOf('+') != -1 && metierValeur.indexOf('+') != -1) {
      minMax = `${Math.max(
        parseInt(origineValeur.replace('+', '')),
        parseInt(metierValeur.replace('+', '')),
      )}+`;

      upDown = 'min';
    } else if (
      origineValeur.indexOf('-') != -1 &&
      metierValeur.indexOf('-') != -1
    ) {
      minMax = `${Math.min(
        parseInt(origineValeur.replace('-', '')),
        parseInt(metierValeur.replace('-', '')),
      )}-`;

      upDown = 'max';
    } else if (origineValeur.indexOf('-') != -1) {
      minMax = `${parseInt(origineValeur.replace('-', ''))}-`;
      upDown = 'max';
    } else if (metierValeur.indexOf('-') != -1) {
      minMax = `${parseInt(metierValeur.replace('-', ''))}-`;
      upDown = 'max';
    } else if (origineValeur.indexOf('+') != -1) {
      minMax = `${parseInt(origineValeur.replace('+', ''))}+`;
      upDown = 'min';
    } else if (metierValeur.indexOf('+') != -1) {
      minMax = `${parseInt(metierValeur.replace('+', ''))}+`;
      upDown = 'min';
    } else {
      return { nombre: '*', type: 'neutral' };
    }

    return { nombre: `${minMax}`, type: upDown };
  }

  getAllCaracteristiques(): string[] {
    return this.getAllStringValuesFromHeritage('caracteristiques');
  }

  getAllRestrictions(): string[] {
    return this.getAllStringValuesFromHeritage('restrictions');
  }

  getAllAutres(): string[] {
    return this.getAllStringValuesFromHeritage('competencesSpeciales');
  }

  getAllCompetencesHerites(): string[] {
    const origineCompetences = this.origine.competencesHerites ?? [];
    const metierCompetences = this.getMetierHeritage(this.metierToSee).flatMap(
      (metier) => metier.competencesHerites ?? [],
    );

    return [...new Set([...origineCompetences, ...metierCompetences])];
  }

  private getAllStringValuesFromHeritage(
    field: 'caracteristiques' | 'restrictions' | 'competencesSpeciales',
  ): Array<string> {
    const origineValues =
      field === 'competencesSpeciales' ? [] : (this.origine[field] ?? []);

    const metierValues = this.getMetierHeritage(this.metierToSee).reduce(
      (values: Array<string>, metier) => [...values, ...(metier[field] ?? [])],
      [],
    );

    return [...new Set([...origineValues, ...metierValues])];
  }

  private getMetierHeritage(
    metier: Metier,
    visitedShortCodes: Set<string> = new Set<string>(),
  ): Array<Metier> {
    if (!metier || !metier.shortCode) {
      return [];
    }

    if (visitedShortCodes.has(metier.shortCode)) {
      return [];
    }

    visitedShortCodes.add(metier.shortCode);

    const parentShortCodes = (metier.shortCodeParents ?? []).filter(
      (shortCode) => shortCode !== '*',
    );

    const parents = parentShortCodes.reduce(
      (heritage: Array<Metier>, parentShortCode) => {
        const parent = this.metiersBase.find(
          (metierBase) => metierBase.shortCode === parentShortCode,
        );

        if (!parent) {
          return heritage;
        }

        return [
          ...heritage,
          ...this.getMetierHeritage(parent, visitedShortCodes),
        ];
      },
      [],
    );

    return [...parents, metier];
  }

  openInformations(event: MouseEvent, shortCode: string): void {
    event.stopPropagation();
    this.metierToSee =
      this.metiersBase.find((x) => x.shortCode === shortCode) ??
      CreationHelper.getDefaultMetier();
    this.sidebarVisible = true;
  }

  openInformationsComplete(event: MouseEvent, node: TreeNode): void {
    event.stopPropagation();

    this.metierToSee = node.data as Metier;
    this.metierToSeeHeritage = node.data.heritage ?? [this.metierToSee];

    this.sidebarVisibleComplete = true;
  }

  openMobileNode(node: TreeNode): void {
    if (node.children && node.children.length > 0) {
      this.mobileParentStack.push(node);
      this.mobileCurrentNodes = node.children;
      this.mobileCurrentLevel = (node.data?.treeLevel ?? 1) + 1;
      return;
    }

    this.metierToSee =
      this.metiersBase.find((x) => x.shortCode === node.data.shortCode) ??
      CreationHelper.getDefaultMetier();
    this.sidebarVisible = true;
  }

  openMobileNodeComplete(node: TreeNode): void {
    if (node.children && node.children.length > 0) {
      this.mobileParentStack.push(node);
      this.mobileCurrentNodes = node.children;
      this.mobileCurrentLevel = (node.data?.treeLevel ?? 1) + 1;
      return;
    }

    this.metierToSee =
      this.metiersBase.find((x) => x.shortCode === node.data.shortCode) ??
      CreationHelper.getDefaultMetier();
    this.sidebarVisibleComplete = true;
  }

  goBackMobile(): void {
    this.mobileParentStack.pop();

    if (this.mobileParentStack.length === 0) {
      this.mobileCurrentNodes = this.treeNodes;
      this.mobileCurrentLevel = 1;
      return;
    }

    const parent = this.mobileParentStack[this.mobileParentStack.length - 1];
    this.mobileCurrentNodes = parent.children ?? [];
    this.mobileCurrentLevel = parent.data?.treeLevel + 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setAll();
  }
}
