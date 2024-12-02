import {Routes} from "@angular/router";
import {StoreComponent} from "./features/store/store.component";
import {ProductCreateComponent} from "./features/store/product-create/product-create.component";
import {ProductEditComponent} from "./features/store/product-edit/product-edit.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {
  ProductEditDialogComponent
} from "./features/store/product-edit/product-edit-dialog/product-edit-dialog.component";

export const routes: Routes = [
  { path: '', component: StoreComponent, children: [
    {
      path: 'edit/:id',
      component: ProductEditDialogComponent,
      data: { component: ProductEditComponent }
    }]
  },
  { path: 'create', component: ProductCreateComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
