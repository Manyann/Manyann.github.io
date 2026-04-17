import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { CreationHelper, Metier, Origine } from '../../../model/creation';
import { TreeNode } from 'primeng/api';
import { SidebarComponent } from '../../../common/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { CompetenceListComponent } from '../../../common/competence-list/competence-list.component';
import { StatistiqueComponent } from '../../../statistique/statistique.component';
import { StatistiqueMergeComponent } from '../statistique-merge/statistique-merge.component';

@Component({
  selector: 'app-metier',
  standalone: true,
  imports: [
    CommonModule,
    TreeTableModule,
    SidebarComponent,
    ButtonModule,
    CompetenceListComponent,
    StatistiqueMergeComponent,
  ],
  templateUrl: './metier.component.html',
  styleUrl: './metier.component.css',
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

  metierToTreeNode(metiers: Array<Metier>, level: number): Array<TreeNode> {
    let nodes: Array<TreeNode> = [];

    metiers.forEach((x) => {
      nodes.push({
        label: x.nom,
        data: {
          ...x,
          isForbidden: this.origine.restrictionsMetierShortCode.includes(
            x.shortCode,
          ),
          treeLevel: level,
        },
        children: this.metierToTreeNode(x.subMetiers, level + 1),
      });
    });

    return nodes;
  }

  openInformations(event: MouseEvent, shortCode: string): void {
    event.stopPropagation();
    this.metierToSee =
      this.metiersBase.find((x) => x.shortCode === shortCode) ??
      CreationHelper.getDefaultMetier();
    this.sidebarVisible = true;
  }

  openInformationsComplete(event: MouseEvent, shortCode: string): void {
    event.stopPropagation();
    this.metierToSee =
      this.metiersBase.find((x) => x.shortCode === shortCode) ??
      CreationHelper.getDefaultMetier();
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
