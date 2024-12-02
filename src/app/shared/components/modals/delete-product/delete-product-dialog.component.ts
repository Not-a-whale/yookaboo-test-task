import {Component, Inject, inject, Input} from '@angular/core';
import {Product} from "../../../models/product";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [
    MatDivider,
    MatButton
  ],
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.scss'
})
export class DeleteProductDialogComponent {
  private dialogRef = inject(MatDialogRef<DeleteProductDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  deleteProduct() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
