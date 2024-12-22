import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  // categoryList: any[] = [];
  //Instead of making API call and storing data in variable
  //Lets create an Observable

  products$: Observable<any>;

  constructor(private productsrv: ProductService) {
    this.products$ = this.productsrv.getAllCategory().pipe(
      map((item: any) => {
        return item.data;
      })
    );
  }

  onEdit() {}

  onDelete(item: number) {
    const isDelete = confirm('Do you really want to delete');
    if (isDelete) {
      this.productsrv.deleteCategory(item).subscribe((res: any) => {
        if (res.result) {
          alert('Category Deleted');
          this.products$;
        } else {
          alert('Wrong Credentials');
        }
      });
    }
  }
}
