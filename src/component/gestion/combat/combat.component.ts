import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerosService } from '../../../app/services/hero.service';
import { DocumentData } from '@angular/fire/firestore';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Mob } from '../../model/ennemi';
import { MobsService } from '../../../app/services/mob.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toaster } from '../../../utils/toaster';

@Component({
  selector: 'app-combat',
  standalone: true,
  imports: [
    PanelModule,
    ToastModule,
    TableModule,
    CommonModule,
    AutoCompleteModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css', '../../../assets/css/button.css'],
})
export class CombatComponent {
  title = 'nhbk';
  heroSession$: Promise<DocumentData[]> | undefined;
  herosCode: string[] = [];

  allMobs$: Promise<Mob[]> | undefined;
  mobs: Mob[] = [];
  mobsToSearch: Mob[] = [];
  autoCompleteMobs: any;
  totalMobs: number = 0;

  addIntensite: number = 0;
  addDegats: number = 0;
  addSoins: number = 0;
  addMob: Mob | undefined;
  addMobNumber: number = 1;
  tour: number = 1;
  mobsCollapsed: boolean = false;
  heroDegats: Record<string, number> = {};
  heroSoins: Record<string, number> = {};

  currentDegats: { degats: number; type: string } | undefined;

  sidebarVisible: boolean;
  confirmationService: ConfirmationService;

  openMobMenuIndex: number | null = null;
  openMobMenuCategory: string | null = null;

  readonly critiqueRecuCategories: { label: string; icon: string }[] = [
    { label: 'Tranchant', icon: 'pi-times' },
    { label: 'Contondant', icon: 'pi-hammer' },
    { label: 'Distances', icon: 'pi-arrow-right' },
    { label: 'Mains nues', icon: 'pi-thumbs-up' },
  ];

  constructor(
    private herosService: HerosService,
    private mobsService: MobsService,
    confirmationService: ConfirmationService,
    private router: Router,
    private toaster: Toaster,
  ) {
    this.sidebarVisible = false;
    this.confirmationService = confirmationService;

    this.heroSession$ = herosService.getAllFromSession();
    this.heroSession$.then((heros) => {
      heros.forEach((hero) => {
        let code: string = hero['nom'];
        this.herosCode.push(code);
        this.heroDegats[code] = 0;
        this.heroSoins[code] = 0;
      });
    });

    this.allMobs$ = mobsService.getAll();

    this.allMobs$.then((m) => {
      this.mobsToSearch = m;
    });
  }

  endFirstTurn() {
    this.tour++;
  }

  toggleMobsCollapsed() {
    this.mobsCollapsed = !this.mobsCollapsed;
  }

  endCombat() {
    this.confirmationService.confirm({
      message: 'Fin ?',
      header: 'Fin du combat ?',
      icon: 'pi pi-question',
      accept: () => {
        if (this.totalMobs > 3) {
          this.herosService
            .addFinCombatStats(this.heroDegats)
            .then((trophes) => {
              this.handleTrophes(trophes);
            });
        }
        this.router.navigate(['/gestion']);
      },
    });
  }

  addMort(hero: string) {
    this.herosService.addMort(hero).then(() => {
      this.toaster.info('Mort ajoutée');
    });
  }

  addBonPoint(hero: string) {
    this.herosService.addBonPoint(hero).then((trophes) => {
      this.toaster.info('Bon point ajouté');
      this.handleTrophes(trophes);
    });
  }

  addCoupCritique(hero: string) {
    this.herosService
      .addCritique(hero, this.addIntensite, this.getFakeTour(hero))
      .then((trophes) => {
        this.addIntensite = 0;
        this.toaster.info('Coup critique ajouté');
        this.handleTrophes(trophes);
      });
  }

  addEchecCritique(hero: string) {
    this.herosService
      .addEchecCritique(hero, this.addIntensite, this.getFakeTour(hero))
      .then((trophes) => {
        this.addIntensite = 0;
        this.toaster.info('Echec critique ajouté');
        this.handleTrophes(trophes);
      });
  }

  addParadeCritique(hero: string) {
    this.herosService
      .addParade(hero, this.addIntensite, this.getFakeTour(hero))
      .then((trophes) => {
        this.addIntensite = 0;
        this.toaster.info('Parade critique ajouté');
        this.handleTrophes(trophes);
      });
  }

  addEntropique(hero: string) {
    this.herosService
      .addEntropique(hero, this.addIntensite, this.getFakeTour(hero))
      .then((trophes) => {
        this.addIntensite = 0;
        this.toaster.info('Sort entropique ajouté');
        this.handleTrophes(trophes);
      });
  }

  addEntropiqueMJ() {
    this.herosService.addEntropiqueMJ(this.addIntensite).then(() => {
      this.addIntensite = 0;
      this.toaster.info('Sort entropique MJ ajouté');
    });
  }

  addCoupCritiqueMJ() {
    this.herosService.addCritiqueMJ(this.addIntensite).then(() => {
      this.addIntensite = 0;
      this.toaster.info('Coup critique MJ ajouté');
    });
  }

  addParadeCritiqueMJ() {
    this.herosService.addParadeMJ(this.addIntensite).then(() => {
      this.addIntensite = 0;
      this.toaster.info('Parade critique MJ ajouté');
    });
  }

  addEchecCritiqueMJ() {
    this.herosService.addEchecCritiqueMJ(this.addIntensite).then(() => {
      this.addIntensite = 0;
      this.toaster.info('Echec critique MJ ajouté');
    });
  }

  updateDegatsDealt(hero: string, type: string) {
    this.currentDegats = {
      degats: this.addDegats,
      type: type,
    };

    if (hero !== 'autre') {
      this.herosService
        .updateDegatsDealt(hero, this.addDegats, this.getFakeTour(hero))
        .then((trophes) => {
          this.toaster.info(`${this.addDegats} ajouté(s)`);
          this.handleTrophes(trophes);
          this.addDegats = 0;
        });
    }
  }

  handleMobClicked(mob: Mob) {
    if (this.currentDegats !== undefined) {
      switch (this.currentDegats.type) {
        case 'normal':
          mob.vie -= Math.max(this.currentDegats.degats - mob.armure, 0);
          break;
        case 'magique':
          mob.vie -= Math.max(
            this.currentDegats.degats - (mob.armureMagique ?? 0),
          );
          break;
        case 'brut':
          mob.vie -= this.currentDegats.degats;
          break;
        default:
      }
      this.currentDegats = undefined;
    }
  }

  toggleMobMenu(mobIndex: number): void {
    if (this.openMobMenuIndex === mobIndex) {
      this.closeMobMenu();
    } else {
      this.openMobMenuIndex = mobIndex;
      this.openMobMenuCategory = null;
    }
  }

  closeMobMenu(): void {
    this.openMobMenuIndex = null;
    this.openMobMenuCategory = null;
  }

  toggleMobMenuCategory(category: string): void {
    this.openMobMenuCategory =
      this.openMobMenuCategory === category ? null : category;
  }

  getCritiqueRecuSubItems(category: string): string[] {
    return Object.keys(CombatComponent.CRITIQUE_RECU_TABLE[category] ?? {});
  }

  selectCritiqueRecu(itemLabel: string, subItemLabel: string, mob: Mob): void {
    this.handleCritiqueRecu(itemLabel, subItemLabel, mob);
    this.closeMobMenu();
  }

  private static readonly CRITIQUE_RECU_TABLE: Record<
    string,
    Record<string, { armure?: number; attaque?: number; parade?: number }>
  > = {
    Tranchant: {
      '7-8': { armure: 1 },
      '9-10': { armure: 2 },
      '11': { armure: 5 },
      '12': { attaque: 1, parade: 2 },
      '13': { attaque: 5, parade: 6 },
      '14': { attaque: 3, parade: 3 },
      '15': { attaque: 5, parade: 6 },
      '16': { attaque: 4, parade: 6 },
      '17': { attaque: 2, parade: 2 },
    },
    Contondant: {
      '7-8': { armure: 1 },
      '9-10': { armure: 2 },
      '11': { armure: 5 },
      '12': { attaque: 1, parade: 2 },
      '13': { attaque: 5, parade: 6 },
      '14': { attaque: 2, parade: 2 },
      '15': { attaque: 5, parade: 6 },
      '16': { attaque: 4, parade: 6 },
      '17': { attaque: 2, parade: 2 },
    },
    Distances: {
      '5-6': { attaque: 2, parade: 2 },
      '7-8': { attaque: 2, parade: 2 },
      '9-11': { attaque: 1, parade: 1 },
      '17': { attaque: 2, parade: 2 },
      '18': { attaque: 2, parade: 2 },
    },
    'Mains nues': {
      '12': { attaque: 1, parade: 2 },
      '13': { attaque: 5, parade: 6 },
      '15': { attaque: 5, parade: 6 },
      '16-17': { attaque: 2, parade: 2 },
    },
  };

  handleCritiqueRecu(itemLabel: string, subItemLabel: string, mob: Mob) {
    const effect =
      CombatComponent.CRITIQUE_RECU_TABLE[itemLabel]?.[subItemLabel];
    if (!effect) {
      return;
    }

    if (effect.armure !== undefined) {
      mob.armure = Math.max(0, mob.armure - effect.armure);
    }
    if (effect.attaque !== undefined) {
      mob.attaque = Math.max(1, mob.attaque - effect.attaque);
    }
    if (effect.parade !== undefined) {
      mob.parade = Math.max(1, mob.parade - effect.parade);
    }
  }

  updateSoins(hero: string) {
    this.herosService
      .updateSoins(hero, this.addSoins, this.getFakeTour(hero))
      .then((trophes) => {
        this.toaster.info(`${this.addSoins} ajouté(s)`);
        this.handleTrophes(trophes);
        this.addSoins = 0;
      });
  }

  private getFakeTour(hero: string) {
    return (this.heroDegats[hero] !== undefined &&
      this.heroDegats[hero] !== 0) ||
      (this.heroSoins[hero] !== undefined && this.heroSoins[hero] !== 0)
      ? 2
      : 1;
  }

  removeDestin(hero: string) {
    this.herosService.removeDestin(hero).then((trophes) => {
      this.toaster.info('Point de destin retiré');
      this.handleTrophes(trophes);
      this.heroSession$ = this.herosService.getAllFromSession();
    });
  }

  generateMob() {
    let mobCode = this.addMob?.code ?? '';
    for (let i = 0; i < this.addMobNumber; i++) {
      this.totalMobs++;
      let mob =
        this.mobsToSearch.find((x) => x.code == mobCode) ??
        this.mobsToSearch[0];
      this.mobs.push({
        index: this.mobs.length,
        armure: mob.armure,
        armureMagique: mob.armureMagique,
        attaque: mob.attaque,
        code: mob.code,
        degats: mob.degats,
        experience: mob.experience,
        informations: mob.informations,
        libelle: mob.libelle,
        parade: mob.parade,
        vie: mob.vie,
        zone: mob.zone,
        apparition: 0,
      });
    }

    this.addMobNumber = 1;
    this.addMob = undefined;
  }

  generateCustomMob() {
    this.mobs.push({
      index: this.mobs.length,
      armure: 0,
      armureMagique: 0,
      attaque: 0,
      code: '*-' + this.mobs.length,
      degats: 'dégâts',
      experience: 0,
      informations: 'infos',
      libelle: 'nom',
      parade: 0,
      vie: 0,
      zone: '*',
      apparition: 0,
    });
    this.totalMobs++;
  }

  killMob(index: number, mobCode: string, mobLibelle: string) {
    let id = mobCode.startsWith('*') ? mobLibelle : mobCode;
    this.herosCode.forEach((hero) => {
      this.herosService
        .addMobCombattu(hero, id.toLowerCase(), 1)
        .then((trophes) => {
          this.handleTrophes(trophes);
        });
    });

    this.mobs = this.mobs.filter((x) => x.index != index);
  }

  revertMob(index: number) {
    this.mobs = this.mobs.filter((x) => x.index != index);
  }

  saveMob(index: number) {
    let mob = this.mobs.find((x) => x.index == index);
    if (mob != undefined) {
      this.mobsService.insert(mob).then(() => {
        this.toaster.success(`${mob.libelle} enregistré.`);
        this.allMobs$ = this.mobsService.getAll();
        this.allMobs$.then((m) => {
          this.mobsToSearch = m;
        });
      });
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    this.autoCompleteMobs = this.mobsToSearch ?? [];
    for (let i = 0; i < this.mobsToSearch.length; i++) {
      let type = this.mobsToSearch[i];
      if (type['libelle']?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(type);
      }
    }

    this.autoCompleteMobs = filtered;
  }

  handleTrophes(trophes: string[]) {
    for (let trophe of trophes.filter((x) => x != '')) {
      this.toaster.success(trophe, 'crown');
    }
  }
}
