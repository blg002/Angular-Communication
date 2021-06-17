import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    showImage: boolean;
    includeDetail: boolean = true;
    @ViewChild(CriteriaComponent) filterCriteria: CriteriaComponent;
    parentListFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    
    @ViewChild(NgModel) filterInput: NgModel;
    
    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {}

    ngAfterViewInit(): void {
      this.parentListFilter = this.filterCriteria.listFilter;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.parentListFilter);
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
