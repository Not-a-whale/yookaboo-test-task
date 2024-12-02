import {FormControl} from "@angular/forms";
import {Tag} from "../tag";


export interface ProductForm {
  name: FormControl<string>;
  description: FormControl<string>;
  year: FormControl<number>;
  price: FormControl<number>;
  pictureUrls: FormControl<string[]>;
  genre: FormControl<string>;
  author: FormControl<string>;
  quantityInStock: FormControl<number>;
  tags: FormControl<Tag[]>;
}
