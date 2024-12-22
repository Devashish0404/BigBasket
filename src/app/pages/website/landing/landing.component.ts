import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit{

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
