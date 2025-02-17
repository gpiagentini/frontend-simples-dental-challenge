import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'albums', component: HomeComponent },
    { path: 'albums/:id', component: AlbumPageComponent },
];
