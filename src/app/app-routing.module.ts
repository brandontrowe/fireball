import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';
import { CategoryDetailComponent }      from './components/category-detail/category-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'category/:id', component: CategoryDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
