import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/suppliers.service';
import { Supplier } from '../models/Supplier';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../models/Product';


@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.css']
})
export class OrderTypeComponent implements OnInit {
  public productForm: FormGroup;
  supplierDetails:any =  [];
  ansFromServerRemoveSup: any;
  arr: any = [];
  public stopLoading = false;
  selectedSup : Supplier = new Supplier;
  alertType: string;
  alertMsgremovesup: string;
  products: Product[] = [];
  insertProduct:any =[new Product({product_name:'מוצר',amount:0,comments:'אין'})];

  constructor(private _supplierService:SupplierService,private fb: FormBuilder) { 
    const product = [];
        product.push(this.fb.group({
            productName: [],
            amount: [],
            comments: []
        }));

        this.productForm = this.fb.group({
            details: this.fb.array( product )
        });
  }
  addProduct(product){
    this.insertProduct.push(new Product({product_name:'',amount:0,comments:''}));
    this.products.push(new Product({product_name:'',amount:0,comments:''}));
    console.log(this.products[0].product_name);
  }
  ngOnInit() {
    this.supplierDetails = [];
 
    this.products.push(new Product({product_name:'',amount:0,comments:''}));
      this._supplierService.getSupplierName().subscribe((data: {}) => {
       console.log(data[0].companyName);
        this.supplierDetails = data;
      });
      console.log(this.supplierDetails.companyName);
  }
  onChange(supplierId) {
    this.stopLoading = true;
    console.log(supplierId);
    this._supplierService.getSupplier(supplierId).subscribe((data: {}) => {
      this.stopLoading = false;
       this.selectedSup = new Supplier(data);
       console.log(this.selectedSup.companyName);      
    });
}
addRow() {
  const details = this.productForm.get('details') as FormArray;
  details.push(this.createItem());
}

createItem(): FormGroup {
  console.log("Printing "+ this.productForm.get('details.product'));
  return this.fb.group({
    productName: [],
    amount: [],
    comments: []
  });
}
  

}
