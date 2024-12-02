import {FormControl} from "@angular/forms";
import {Tag} from "../tag";

export interface TagForm {
  name: FormControl<string>;
  hexColor: FormControl<string>;
}
