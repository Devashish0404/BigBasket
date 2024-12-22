import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  isSidePanelVissible: boolean = false;

  productObj: any = {
    productId: 0,
    productSku: '',
    productName: '',
    productPrice: 0,
    productShortName: '',
    productDescription: '',
    createdDate: new Date(),
    deliveryTimeSpan: '',
    categoryId: 0,
    productImageUrl: '',
    userId: 0,
  };

  categoryList: any[] = [];
  productsList: any[] = [];

  constructor(private productSrv: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategory();
  }

  onUpdate() {
    this.productSrv.updateProduct(this.productObj).subscribe((res: any) => {
      if (res.result) {
        alert('Product Updated');
      } else {
        alert(res.message);
      }
    });
  }

  onEdit(item: any) {
    this.productObj = item;
    this.openSidePanel();
  }

  onDelete(product: any) {
    const isDelete = confirm('Are you Sure Want to Delete');
    console.log(product.productId);
    if (isDelete) {
      this.productSrv.deleteProduct(product.productId).subscribe((res: any) => {
        if (res.result) {
          alert('Product Deleted');
        } else {
          alert(res.message);
        }
      });
    }
  }

  getAllCategory() {
    this.productSrv.getAllCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    });
  }

  getAllProducts() {
    this.productSrv.getAllProducts().subscribe((res: any) => {
      this.productsList = res.data;
    });
  }

  onSave() {
    this.productSrv.saveProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert('Product Created');
        this.getAllProducts();
      } else {
        alert(res.message);
      }
    });
  }

  resetForm() {
    this.productObj = this.productObj;
  }

  openSidePanel() {
    this.isSidePanelVissible = true;
  }

  closeSidePanel() {
    this.isSidePanelVissible = false;
  }
}
