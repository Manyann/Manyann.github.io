import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeTableModule } from 'primeng/treetable';
import { CreationHelper, Metier } from '../../../model/creation';
import { TreeNode } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule  } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-metier',
  standalone: true,
  imports: [RouterOutlet, InputSwitchModule, FormsModule , CommonModule, TreeTableModule,SidebarModule, ButtonModule],
  templateUrl: './metier.component.html',
  styleUrl: './metier.component.css'
})
export class MetierComponent {
  title = 'nhbk';
  metiersBase: Array<Metier>=[];
  metiers: Array<Metier>=[];
  treeNodes : Array<TreeNode>=[];
  metierToSee : Metier;
  sidebarVisible : boolean = false;

  @Input() restrictions:Array<string>=[];

  constructor(){
    this.metierToSee = CreationHelper.getDefaultMetier();
    this.setAll();
  }

setAll():void{
  this.metiersBase = CreationHelper.getAllMetier();
  this.metiers = this.metiersBase
    .filter(x=>
      x.shortCodeParents.length == 0 || x.shortCodeParents.includes("*")
    );
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
    metiers.forEach(x=>{
      x.isForbidden = this.restrictions.includes(x.shortCode);
      nodes.push({
        label:x.nom,
        data : x,
        children : this.metierToTreeNode(x.subMetiers)
      })
    });

    return nodes;
  }

  openInformations(shortCode:string){
    this.metierToSee = this.metiersBase.find(x=>x.shortCode == shortCode)??CreationHelper.getDefaultMetier();
    this.sidebarVisible = true;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.setAll();
  }

}