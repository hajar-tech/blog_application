import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "blog-app-5d285", appId: "1:891879746875:web:c68a78e043949e8d55db1e", storageBucket: "blog-app-5d285.firebasestorage.app", apiKey: "AIzaSyDleoIDUsechtJUOUAgFtPAyFfAqt3D3QA", authDomain: "blog-app-5d285.firebaseapp.com", messagingSenderId: "891879746875" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
