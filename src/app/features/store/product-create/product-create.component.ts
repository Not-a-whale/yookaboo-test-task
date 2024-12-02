import { Component } from '@angular/core';
import {CreateEditFormComponent} from "../../../shared/components/create-edit-form/create-edit-form.component";

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CreateEditFormComponent
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {

}
