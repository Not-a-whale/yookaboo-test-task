import {Component, Inject, inject} from '@angular/core';
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {StoreService} from "../../../core/services/store.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AsyncPipe} from "@angular/common";
import {Product} from "../../../shared/models/product";

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [
    MatSelectionList,
    MatDivider,
    FormsModule,
    MatListOption,
    MatButton,
    AsyncPipe
  ],
  templateUrl: './product-filters-dialog.component.html',
  styleUrl: './product-filters-dialog.component.scss'
})
export class ProductFiltersDialogComponent {
  shopService = inject(StoreService);
  private dialogRef = inject(MatDialogRef<ProductFiltersDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedAuthors: string[], selectedGenres: string[] }) {
    this.selectedAuthors = data.selectedAuthors;
    this.selectedGenres = data.selectedGenres;
  }

  selectedAuthors: string[] = [];
  selectedGenres: string[] = [];

  applyFilters() {
    this.dialogRef.close({
      selectedAuthors: this.selectedAuthors,
      selectedGenres: this.selectedGenres,
    });
  }
}
