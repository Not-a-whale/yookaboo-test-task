import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Product} from "../../models/product";
import {ProductForm} from "../../models/forms/product-form";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {StoreService} from "../../../core/services/store.service";
import {AsyncPipe, NgForOf, NgStyle} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow, MatChipsModule} from "@angular/material/chips";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {
  ProductFiltersDialogComponent
} from "../../../features/store/product-filters-dialog/product-filters-dialog.component";
import {AddTagDialogComponent} from "./add-tag-dialog/add-tag-dialog.component";
import {Tag} from "../../models/tag";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    MatCard,
    MatAutocompleteTrigger,
    MatButton,
    MatError,
    MatLabel,
    MatChipGrid,
    MatChipsModule,
    MatChipRow,
    MatIconModule,
    MatChipInput,
    NgForOf,
    NgStyle
  ],
  templateUrl: './create-edit-form.component.html',
  styleUrl: './create-edit-form.component.scss'
})
export class CreateEditFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() isEdit = !!this.product;
  @Output() created: EventEmitter<Omit<Product, 'id'>> = new EventEmitter<Omit<Product, 'id'>>();
  @Output() updated: EventEmitter<Product> = new EventEmitter<Product>();

  fb = inject(FormBuilder);
  storeService = inject(StoreService);
  announcer = inject(LiveAnnouncer);
  dialogService = inject(MatDialog);
  toastrService = inject(ToastrService);

  productForm!: FormGroup<ProductForm>;

  readonly pictureUrls = signal([...this.product?.pictureUrls || []]);



  ngOnInit() {
    this.productForm = this.fb.nonNullable.group({
      name: [this.product?.name || "", [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      description: [this.product?.description || "", [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
      year: [this.product?.year || 0, Validators.required],
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      pictureUrls: [this.product?.pictureUrls.length ? this.product?.pictureUrls : [], Validators.required],
      genre: [this.product?.genre || "", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      author: [this.product?.author || "", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      quantityInStock: [this.product?.quantityInStock || 0, [Validators.required, Validators.min(0)]],
      tags: [!!this.product?.tags?.length ? this.product.tags : []]
    });

    if (this.product && this.product.pictureUrls.length) {
      this.pictureUrls.update(() => [...this.productForm.controls.pictureUrls.value]);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (!this.isEdit) {
        this.created.emit(this.productForm.value as Omit<Product, 'id'>);
        this.productForm.reset();
        this.pictureUrls.update(() => [] as string[]);
      } else {
        if (this.product) {
          this.updated.emit({...this.productForm.value as Product, id: this.product.id});
        }
      }
    }
  }

  addReactiveKeyword($event: MatChipInputEvent) {
    const value = ($event?.value || '').trim();

    if (value && this.productForm.controls.pictureUrls.value.length < 4) {
      this.productForm.controls.pictureUrls.value.push(value);
      this.pictureUrls.update(pictureUrls => [...this.productForm.controls.pictureUrls.value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }
    $event.chipInput!.clear();
  }

  removeReactiveKeyword(pictureUrl: string) {
    const index = this.productForm.controls.pictureUrls.value.indexOf(pictureUrl);

    if (index >= 0) {
      this.productForm.controls.pictureUrls.value.splice(index, 1);
      this.pictureUrls.update(pictureUrls => [...this.productForm.controls.pictureUrls.value]);
      this.announcer.announce(`removed ${pictureUrl} from reactive form`);
    }
  }

  openAddTagDialog() {
    const dialogRef = this.dialogService.open(AddTagDialogComponent, {
      minWidth: '500px',
      maxHeight: '80vh',
    });
    dialogRef.afterClosed().subscribe({
      next: (result: Tag) => {
        if (result) {
          if (this.productForm.controls.tags.value.length < 4
            && !this.productForm.controls.tags.value.find(tag => tag.name === result.name)) {
            this.productForm.controls.tags.value.push(result);
          } else {
            this.toastrService.error('Не можна додати більше 4 тегів або тег з такою назвою вже існує!');
          }
        }
      },
    });
  }
}
