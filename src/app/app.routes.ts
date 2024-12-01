import {Routes} from "@angular/router";
import {StoreComponent} from "./features/store/store.component";
import {CreateBookComponent} from "./features/store/create-book/create-book.component";
import {EditBookComponent} from "./features/store/edit-book/edit-book.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";

export const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'create', component: CreateBookComponent },
  { path: 'edit/:id', component: EditBookComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
