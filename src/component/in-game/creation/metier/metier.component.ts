import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeTableModule } from 'primeng/treetable';
import { CreationHelper, Metier } from '../../../model/creation';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-metier',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TreeTableModule],
  templateUrl: './metier.component.html',
  styleUrl: './metier.component.css'
})
export class MetierComponent {
  title = 'nhbk';
  metiersBase: Array<Metier>;
  metiers: Array<Metier>;
  treeNodes : Array<TreeNode>;

  constructor(){
    this.metiersBase = CreationHelper.getAllMetier();
    this.metiers = this.metiersBase.filter(x=>x.shortCodeParents.length == 0 || x.shortCodeParents.includes("*"));
    this.metiers.forEach(x=>x.subMetiers = this.fillSubMetier(x.shortCode));
    this.treeNodes = this.metierToTreeNode(this.metiers);
}

  fillSubMetier(code:string) : Array<Metier>
  {
    let subMetiers : Array<Metier> = this.metiersBase.filter(x=>x.shortCodeParents.includes(code));
    subMetiers.forEach(x=>x.subMetiers = this.fillSubMetier(x.shortCode));
    return subMetiers;
  }

  metierToTreeNode(metiers: Array<Metier>):Array<TreeNode>
  {
    let nodes : Array<TreeNode> = [];

    metiers.forEach(x=>nodes.push({
        label:x.nom,
        data : x,
        children : this.metierToTreeNode(x.subMetiers)
    }));

    return nodes;
  }

}