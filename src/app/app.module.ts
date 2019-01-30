import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MyCommonModule } from './common/mycommon.mudule';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import { HttpClientModule  } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { appSettings } from './app.settings';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AngularCalendarComponent } from './calendar-home-page/calendar-home-page.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { TodolistComponent } from './todolist/todolist.component';
import { AgoraComponent } from './agora/agora.component';
import { NgxLoadingModule } from 'ngx-loading';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';

// inserts
import { HomeComponent } from './home/home.component';
import { FamilyComponent } from './family/family.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { FilesComponent } from './files/files.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// edit
import { EditFamilyComponent } from './edit-family/edit-family.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { EditSuppliersComponent } from './edit-suppliers/edit-suppliers.component';
import { EditVolunteersComponent } from './edit-volunteers/edit-volunteers.component';

// remove
import { RemoveFamilyComponent } from './remove-family/remove-family.component';
import { RemoveFilesComponent } from './remove-files/remove-files.component';
import { RemoveInventoryComponent } from './remove-inventory/remove-inventory.component';
import { RemoveSuppliersComponent } from './remove-suppliers/remove-suppliers.component';
import { RemoveVolunteersComponent } from './remove-volunteers/remove-volunteers.component';

//service
import {SupplierService} from './services/suppliers.service';
import {VolunteerService} from './services/volunteers.service';
import {LoginService} from './services/login.service';
import {RegisterService} from './services/register.service';
import {ExcelService} from './services/excel.service';
import { FamilyService } from './services/families.service';
import { TodoService } from './services/todo-service.service';

//view
import { ViewSuppliersComponent } from './view-suppliers/view-suppliers.component';
import { ViewFamilyComponent } from './view-family/view-family.component';
import { ViewVolunteersComponent } from './view-volunteers/view-volunteers.component';
import { ViewOrdersTypesComponent } from './view-orders-types/view-orders-types.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { OrderTypeComponent } from './order-type/order-type.component';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidatorComponent } from './custom-validator/custom-validator.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FamilyComponent,
    NavbarComponent,
    SuppliersComponent,
    VolunteersComponent,
    InventoryManagementComponent,
    FilesComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    EditFamilyComponent,
    EditInventoryComponent,
    EditSuppliersComponent,
    EditVolunteersComponent,
    RemoveFamilyComponent,
    RemoveFilesComponent,
    RemoveInventoryComponent,
    RemoveSuppliersComponent,
    ViewSuppliersComponent,
    ViewFamilyComponent,
    ViewVolunteersComponent,
    RemoveVolunteersComponent,
    AngularCalendarComponent,
    TodolistComponent,
    ViewOrdersTypesComponent,
    AgoraComponent,
    ViewTableComponent,
    OrderTypeComponent,
    CustomValidatorComponent,
    
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    MyCommonModule,
    //FormBuilder,
    BrowserAnimationsModule,
    MatMenuModule,
    MatDatepickerModule,
    DateValueAccessorModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModalModule,
    DataTablesModule,
    NgxLoadingModule.forRoot({}),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forRoot([
   
      // the root path
      {  path: '', 
      component: AppComponent  },
       // agora path
       {  path: 'agora', 
       component: AgoraComponent  },
        // agora path
        {  path: 'order-type', 
        component: OrderTypeComponent  },
      
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
        
      // files path
      { path: 'files',
        component: FilesComponent  },  
        
      // login path
      { path: 'login',
        component: LoginComponent }, 

        // register path
      { path: 'register',
      component: RegisterComponent }, 

       //calendar path
        { path: 'calendar',
        component: AngularCalendarComponent }, 
        
      // edit-family path
      { path: 'edit-family',
        component: EditFamilyComponent }, 
        
      // edit-inventory path
      {  path: 'edit-inventory',
        component: EditInventoryComponent  }, 

        
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
        
      // remove-suppliers path
      { path: 'remove-suppliers',
        component: RemoveSuppliersComponent }, 
        
      // remove-volunteers path
      { path: 'remove-volunteers',
        component: RemoveVolunteersComponent }, 

          // View-Supplier path
      { path: 'view-suppliers',
      component: ViewSuppliersComponent },    
     
  // View-Family path
  { path: 'view-family',
  component: ViewFamilyComponent }, 

    // View-volunteer path
    { path: 'view-volunteers',
    component: ViewVolunteersComponent }, 
    // View- orders type path
    { path: 'view-orders',
    component: ViewOrdersTypesComponent }, 

      // home path
      {
          path: 'home',
          component: HomeComponent
       },     

  ]) ],
  providers: [
    SupplierService,
    VolunteerService,
    FamilyService,
    LoginService,
    TodoService,
    RegisterService,
    ExcelService,
    appSettings
  ],
  bootstrap: [AppComponent]
 // exports: [AngularCalendarComponent]
})
export class AppModule { }


