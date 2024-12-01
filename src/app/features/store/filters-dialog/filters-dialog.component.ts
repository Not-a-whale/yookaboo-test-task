import {Component, inject} from '@angular/core';
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {StoreService} from "../../../core/services/store.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AsyncPipe} from "@angular/common";

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
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent {
  shopService = inject(StoreService);
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  selectedAuthors: string[] = [];
  selectedGenres: string[] = [];

  applyFilters() {
    this.dialogRef.close({
      selectedAuthors: this.selectedAuthors,
      selectedGenres: this.selectedGenres,
    });
  }
}
