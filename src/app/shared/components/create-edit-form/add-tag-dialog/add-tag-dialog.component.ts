import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {Product} from "../../../models/product";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StoreService} from "../../../../core/services/store.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ProductForm} from "../../../models/forms/product-form";
import {TagForm} from "../../../models/forms/tag-form";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {AsyncPipe} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ColorPickerModule} from "primeng/colorpicker";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-tag-dialog',
  standalone: true,
  imports: [
    MatDivider,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    ColorPickerModule
  ],
  templateUrl: './add-tag-dialog.component.html',
  styleUrl: './add-tag-dialog.component.scss'
})
export class AddTagDialogComponent implements OnInit {
  fb = inject(FormBuilder);
  storeService = inject(StoreService);
  private dialogRef = inject(MatDialogRef<AddTagDialogComponent>);

  tagForm!: FormGroup<TagForm>;


  ngOnInit() {
    this.tagForm = this.fb.nonNullable.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      hexColor: ["", [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]]
    });
  }

  onSubmit() {
    this.dialogRef.close({
      name: this.tagForm.value.name,
      hexColor: this.tagForm.value.hexColor
    });
  }

  close() {
    this.dialogRef.close();
  }
}
