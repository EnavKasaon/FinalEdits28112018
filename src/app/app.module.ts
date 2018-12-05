import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FamilyComponent } from './family/family.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { PackagesComponent } from './packages/packages.component';
import { FilesComponent } from './files/files.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { EditFamilyComponent } from './edit-family/edit-family.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { EditPackagesComponent } from './edit-packages/edit-packages.component';
import { EditSuppliersComponent } from './edit-suppliers/edit-suppliers.component';
import { EditVolunteersComponent } from './edit-volunteers/edit-volunteers.component';
import { RemoveFamilyComponent } from './remove-family/remove-family.component';
import { RemoveFilesComponent } from './remove-files/remove-files.component';
import { RemoveInventoryComponent } from './remove-inventory/remove-inventory.component';
import { RemovePackagesComponent } from './remove-packages/remove-packages.component';
import { RemoveSuppliersComponent } from './remove-suppliers/remove-suppliers.component';
import { RemoveVolunteersComponent } from './remove-volunteers/remove-volunteers.component';
import { MyCommonModule } from './common/mycommon.mudule';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import {SupplierService} from './services/suppliers.service';
import { HttpClientModule  } from '@angular/common/http';
import { appSettings } from './app.settings';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FamilyComponent,
    NavbarComponent,
    SuppliersComponent,
    VolunteersComponent,
    InventoryManagementComponent,
    PackagesComponent,
    FilesComponent,
    LoginComponent,
    FooterComponent,
    EditFamilyComponent,
    EditInventoryComponent,
    EditPackagesComponent,
    EditSuppliersComponent,
    EditVolunteersComponent,
    RemoveFamilyComponent,
    RemoveFilesComponent,
    RemoveInventoryComponent,
    RemovePackagesComponent,
    RemoveSuppliersComponent,
    RemoveVolunteersComponent
    
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    MyCommonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    HttpClientModule ,
    RouterModule.forRoot([
   
      // the root path
      {  path: '', 
      component: AppComponent  },
      
      // family path
      {  path: 'family',
        component: FamilyComponent  },

      // suppliers path
      {  path: 'suppliers',
        component: SuppliersComponent  },

      // Volunteers path
      { path: 'volunteers',
        component: VolunteersComponent },
         
      // inventory-management path
      { path: 'inventory-management',
        component: InventoryManagementComponent },        
        
      // Packages path
      { path: 'packages',
        component: PackagesComponent }, 
        
      // files path
      { path: 'files',
        component: FilesComponent  },  
        
      // login path
      { path: 'login',
        component: LoginComponent },  
        
      // edit-family path
      { path: 'edit-family',
        component: EditFamilyComponent }, 
        
      // edit-inventory path
      {  path: 'edit-inventory',
        component: EditInventoryComponent  }, 
        
      // edit-packages path
      { path: 'edit-packages',
        component: EditPackagesComponent }, 
        
      // edit-suppliers path
      { path: 'edit-suppliers',
        component: EditSuppliersComponent  }, 
        
      // edit-volunteers path
      { path: 'edit-volunteers',
        component: EditVolunteersComponent },
        
      // remove-family path
      { path: 'remove-family',
        component: RemoveFamilyComponent },
        
      // remove-files path
      { path: 'remove-files',
        component: RemoveFilesComponent },
        
      // remove-inventory path
      { path: 'remove-inventory',
        component: RemoveInventoryComponent },
        
      // remove-packages path
      { path: 'remove-packages',
        component: RemovePackagesComponent },
        
      // remove-suppliers path
      { path: 'remove-suppliers',
        component: RemoveSuppliersComponent }, 
        
      // remove-volunteers path
      { path: 'remove-volunteers',
        component: RemoveVolunteersComponent },    
     
      // home path
      {
          path: 'home',
          component: HomeComponent
       },     

  ]) ],
  providers: [
    SupplierService,
    appSettings
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }


