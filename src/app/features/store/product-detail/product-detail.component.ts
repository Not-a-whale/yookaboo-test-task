import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Product} from "../../../shared/models/product";
import {MatCard} from "@angular/material/card";
import {CurrencyPipe, NgForOf, NgOptimizedImage, NgStyle} from "@angular/common";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    MatCard,
    NgOptimizedImage,
    CurrencyPipe,
    NgStyle,
    NgForOf
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  @Input() product: Omit<Product, 'id'> | null = null;
}
