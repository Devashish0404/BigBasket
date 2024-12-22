import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-web-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './web-product.component.html',
  styleUrl: './web-product.component.css'
})
export class WebProductComponent {

   ProductList: any[] = [];
    categoryList: any[] = [];
    constructor(private productsrv: ProductService, private router: Router){
  
    }
  
    ngOnInit(): void {
        this.getAllCategory();
        this.getAllProduct();
    }
  
    navigateToProducts(id:number){
      this.router.navigate(['/products',id]);
    }
  
    getAllProduct(){
      this.productsrv.getAllProducts().subscribe((res:any)=>{
        this.ProductList = res.data;
      });
    }
    getAllCategory(){
      this.productsrv.getAllCategory().subscribe((res:any)=>{
        this.categoryList = res.data;
      });
    }
}
