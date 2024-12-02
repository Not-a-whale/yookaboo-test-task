import {ChangeDetectorRef, Component, Inject, inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {StoreService} from "../../../core/services/store.service";
import {Product} from "../../../shared/models/product";
import {CreateEditFormComponent} from "../../../shared/components/create-edit-form/create-edit-form.component";
import {ProductDetailComponent} from "../product-detail/product-detail.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  DeleteProductDialogComponent
} from "../../../shared/components/modals/delete-product/delete-product-dialog.component";
import {MatButton} from "@angular/material/button";
import {take} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    CreateEditFormComponent,
    ProductDetailComponent,
    MatButton,
    AsyncPipe
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {
  toastrService = inject(ToastrService);
  storeService = inject(StoreService);
  dialogService = inject(MatDialog);
  router = inject(Router);
  route = inject(ActivatedRoute);

  product:  Product | null = null;
  id: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }) {
    this.id = data.id;
  }

  onUpdated($event: Product) {
    this.product = $event;
    this.storeService.updateProduct(this.product as Product);
    this.toastrService.success('Продукт відредаговано успішно!');
  }

  ngOnInit() {
    if (this.id) {
      this.storeService.getProduct(String(this.id)).pipe(take(1)).subscribe(product => {
        if (product && !this.product) {
          this.product = product;
        }
      });
    }
  }

  openDeleteDialog() {
    const dialogRef = this.dialogService.open(DeleteProductDialogComponent, {
      data: this.product,
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.storeService.deleteProduct(this.id || '');
          this.router.navigate(['/'], { relativeTo: this.route });
        }
      },
    });
  }
}
