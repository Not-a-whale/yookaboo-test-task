import {Component, inject, Input} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Product} from "../../../shared/models/product";
import {CurrencyPipe, NgForOf, NgStyle} from "@angular/common";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {ProductFiltersDialogComponent} from "../product-filters-dialog/product-filters-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProductDialogComponent} from "../../../shared/components/modals/delete-product/delete-product-dialog.component";
import {StoreService} from "../../../core/services/store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatButton,
    NgStyle,
    CurrencyPipe,
    MatChipSet,
    MatChip,
    NgForOf
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  dialogService = inject(MatDialog);
  storeService = inject(StoreService);
  router = inject(Router);
  @Input() product: Product | null = null;

  openDeleteDialog() {
    const dialogRef = this.dialogService.open(DeleteProductDialogComponent, {
      data: this.product,
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.storeService.deleteProduct(this.product?.id || '');
        }
      },
    });
  }

  onEdit() {
    this.router.navigate(['edit', this.product?.id]);
  }
}
