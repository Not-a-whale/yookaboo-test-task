import {Component, inject, OnInit} from "@angular/core";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatDialog} from "@angular/material/dialog";
import {StoreService} from "../../core/services/store.service";
import {Pagination} from "../../shared/models/pagination";
import {Product} from "../../shared/models/product";
import {StoreParams} from "../../shared/models/storeParams";
import {FiltersDialogComponent} from "./filters-dialog/filters-dialog.component";
import {UkrainianPaginatorComponent} from "../../shared/components/ukrainian-paginator/ukrainian-paginator.component";

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    MatPaginatorModule,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatSelectionList,
    MatListOption,
    UkrainianPaginatorComponent
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  private storeService = inject(StoreService);
  private dialogService = inject(MatDialog);

  products?: Pagination<Product>;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price Low-High', value: 'priceAsc' },
    { name: 'Price Hight-Low', value: 'priceDesc' },
  ];
  storeParams = new StoreParams();
  pageSizeOptions = [5, 10, 15, 20];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.storeService.getAuthors();
    this.storeService.getGenres();
    this.getProducts();
  }

  getProducts() {
    this.storeService.getProducts(this.storeParams).subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      maxHeight: '80vh',
      data: {
        selectedBrands: this.storeParams.authors,
        selectedTypes: this.storeParams.genres,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          console.log(result);
          this.storeParams.authors = result.selectedAuthors;
          this.storeParams.genres = result.selectedGenres;
          this.storeParams.pageNumber = 1;
          this.getProducts();
        }
      },
    });
  }

  onSortChange($event: MatSelectionListChange) {
    const selectedOption = $event.options[0];

    if (selectedOption) {
      this.storeParams.sort = selectedOption.value;
      this.storeParams.pageNumber = 1;
      this.getProducts();
    }
  }

  onSearchChange() {
    this.storeParams.pageNumber = 1;
    this.getProducts();
  }

  handlePageEvent($event: PageEvent) {
    this.storeParams.pageNumber = $event.pageIndex + 1;
    this.storeParams.pageSize = $event.pageSize;
    this.getProducts();
  }
}