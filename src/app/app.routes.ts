import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { TimerComponent } from './components/timer/timer.component';

export const routes: Routes = [
    // { path: 'home', component: AppComponent },
    // { path: 'time', component: TimerComponent},
    // { path: 'about', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
    // { path: 'blog',  redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
    // { path: 'services',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
    // { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
    // { path: '**', component: PageNotFoundComponentComponent },  // Wildcard route for a 404 page
];
