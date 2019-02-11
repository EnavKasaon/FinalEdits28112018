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
import { MustMatch } from './_helpers/must-match.validator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { ManageUsersComponent } from './manageUsers/manageUsers.component';


// inserts 
import { HomeComponent } from './home/home.component';
import { FamilyComponent } from './family/family.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { FilesComponent } from './files/files.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// edit
import { EditFamilyComponent } from './edit-family/edit-family.component';
import { EditSuppliersComponent } from './edit-suppliers/edit-suppliers.component';
import { EditVolunteersComponent } from './edit-volunteers/edit-volunteers.component';

// remove
import { RemoveFamilyComponent } from './remove-family/remove-family.component';
import { RemoveFilesComponent } from './remove-files/remove-files.component';
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
import { ViewOrdersByTypeComponent } from './view-orders-by-type/view-orders-by-type.component';
import { EditOrderTypeComponent } from './edit-order-type/edit-order-type.component';

//login and register
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { ReportsComponent } from './reports/reports.component';
import { OrdersReportComponent } from './reports/orders-report/orders-report.component';
import { FamiliesReportComponent } from './reports/families-report/families-report.component';
import { VolunteersReportComponent } from './reports/volunteers-report/volunteers-report.component';
import { SuppliersReportComponent } from './reports/suppliers-report/suppliers-report.component';
import { SelectboxPipe } from './reports/orders-report/SelectboxPipe.pipe';
import { FamilyPipe } from './reports/families-report/FamilyPipe.pipe';
import { SupplierPipe } from './reports/suppliers-report/SupplierPipe.pipe';
import { VolunteerPipe } from './reports/volunteers-report/VolunteerPipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SelectboxPipe,
    VolunteerPipe,
    SupplierPipe,
    FamilyPipe,
    HomeComponent,
    FamilyComponent,
    NavbarComponent,
    SuppliersComponent,
    VolunteersComponent,
    FilesComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    EditFamilyComponent,
    EditSuppliersComponent,
    EditVolunteersComponent,
    RemoveFamilyComponent,
    RemoveFilesComponent,
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
    ViewOrdersByTypeComponent,
    EditOrderTypeComponent,
    ReportsComponent,
    OrdersReportComponent,
    FamiliesReportComponent,
    VolunteersReportComponent,
    SuppliersReportComponent,
    ManageUsersComponent,
    
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    MyCommonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatNativeDateModule,
    DateValueAccessorModule,
    HttpClientModule,
    MatDatepickerModule,
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

        // edit-order type path
      { path: 'edit-type',
      component: EditOrderTypeComponent }, 
       
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
    
      // remove-suppliers path
      { path: 'remove-suppliers',
        component: RemoveSuppliersComponent }, 
        
      // remove-volunteers path
      { path: 'remove-volunteers',
        component: RemoveVolunteersComponent }, 

          // View-Supplier path
      { path: 'view-suppliers',
      component: ViewSuppliersComponent },    
      // reports path
      { path: 'reports',
      component: ReportsComponent }, 
     
  // View-Family path
  { path: 'view-family',
  component: ViewFamilyComponent }, 

  // View-orders by type path
  { path: 'view-orders-type',
  component: ViewOrdersByTypeComponent }, 

    // View-volunteer path
    { path: 'view-volunteers',
    component: ViewVolunteersComponent }, 
    // View- orders type path
    { path: 'view-orders',
    component: ViewOrdersTypesComponent }, 

      // home path
      { path: 'home',
          component: HomeComponent  }, 
          
     // manage users path
    { path: 'manageUsers',
    component: ManageUsersComponent }, 

  ]) ],
  providers: [
    SupplierService,
    VolunteerService,
    FamilyService,
    LoginService,
    TodoService,
    RegisterService,
    ExcelService,
    AuthenticationService,
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'IL-ISR'},
    appSettings
  ],
  bootstrap: [AppComponent]
 // exports: [AngularCalendarComponent]
})
export class AppModule { }


