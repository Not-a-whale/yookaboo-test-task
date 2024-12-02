import {Component, inject} from '@angular/core';
import {CreateEditFormComponent} from "../../../shared/components/create-edit-form/create-edit-form.component";
import {Product} from "../../../shared/models/product";
import {ProductDetailComponent} from "../product-detail/product-detail.component";
import {StoreService} from "../../../core/services/store.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CreateEditFormComponent,
    ProductDetailComponent
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  toastrService = inject(ToastrService);
  storeService = inject(StoreService);
  product: Omit<Product, 'id'> | null = null;

  onCreated($event: Omit<Product, "id">) {
    this.product = $event;
    this.storeService.addProduct(this.product);
    this.toastrService.success('Продукт додано успішно!');
  }
}
