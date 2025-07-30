import { CommonModule } from '@angular/common';
import { Component, Output,EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeTableModule } from 'primeng/treetable';
import { CreationHelper, Origine } from '../../../model/creation';
import { TreeNode } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../../../common/sidebar/sidebar.component';

@Component({
  selector: 'app-origine',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TreeTableModule,SidebarComponent, ButtonModule],
  templateUrl: './origine.component.html',
  styleUrl: './origine.component.css'
})
export class OrigineComponent {
  title = 'nhbk';
  originesBase: Array<Origine>;
  treeNodes : Array<TreeNode>;
  origineToSee : Origine;
  sidebarVisible = false;
  @Output() openMetier:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  constructor(){
    this.originesBase = CreationHelper.getAllOrigine();
    this.treeNodes = this.metierToTreeNode();
    this.origineToSee = CreationHelper.getDefaultOrigine();
}

  metierToTreeNode():Array<TreeNode>
  {
    let nodes : Array<TreeNode> = [];

    this.originesBase.forEach(x=>nodes.push({
        label:x.nom,
        data : x,
    }));

    return nodes;
  }

  openInformations(event:MouseEvent,nomOrigine:string){
    event.stopPropagation();
    this.origineToSee = this.originesBase.find(x=>x.nom == nomOrigine)??CreationHelper.getDefaultOrigine();
    this.sidebarVisible = true;
  }

  openMetiers(restrictions:Array<string>){
    this.openMetier.emit(restrictions);
  }

}