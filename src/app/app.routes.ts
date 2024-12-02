import {Routes} from "@angular/router";
import {StoreComponent} from "./features/store/store.component";
import {ProductCreateComponent} from "./features/store/product-create/product-create.component";
import {ProductEditComponent} from "./features/store/product-edit/product-edit.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";

export const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'create', component: ProductCreateComponent },
  { path: 'edit/:id', component: ProductEditComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
