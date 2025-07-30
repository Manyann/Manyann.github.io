import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @ViewChild('sidebar', { static: true }) sidebarRef!: ElementRef;

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  // Ferme si clic en dehors
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    if (
      this.visible &&
      this.sidebarRef &&
      !this.sidebarRef.nativeElement.contains(event.target)
    ) {
      this.close();
    }
  }
}
