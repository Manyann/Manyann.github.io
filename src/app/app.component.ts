import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously  } from 'firebase/auth';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true,
  imports: [HomeComponent,RouterModule],
})
export class AppComponent {
}
