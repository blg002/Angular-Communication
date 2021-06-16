import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    private _listFilter: string;
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    @ViewChild('filterElement') filterElementRef: ElementRef;

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {
      
      
    }

    get listFilter(): string {
      return this._listFilter;
    }

    set listFilter(value: string) {
      this._listFilter = value;
      this.performFilter(this.listFilter);
    }

    ngAfterViewInit(): void {
      this.filterElementRef.nativeElement.focus();
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
