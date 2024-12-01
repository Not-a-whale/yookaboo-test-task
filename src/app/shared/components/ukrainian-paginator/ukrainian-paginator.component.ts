import {Component, Injectable} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {Subject} from "rxjs";

@Injectable()
export class UkrainianPaginatorIntl implements MatPaginatorIntl  {
  changes = new Subject<void>();

  itemsPerPageLabel = 'Елементів на сторінці:';
  nextPageLabel = 'Наступна сторінка';
  previousPageLabel = 'Попередня сторінка';
  lastPageLabel = 'Остання сторінка';
  firstPageLabel = 'Перша сторінка';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 з ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} з ${length}`;
  };
}


@Component({
  selector: 'app-ukrainian-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  providers: [{provide: MatPaginatorIntl, useClass: UkrainianPaginatorIntl}],
  templateUrl: './ukrainian-paginator.component.html',
  styleUrl: './ukrainian-paginator.component.scss'
})
export class UkrainianPaginatorComponent  extends MatPaginatorIntl {
}
