import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { EditinfoComponent } from './editinfo/editinfo.component';
import { AuthGuard } from 'auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PostsComponent,
    LoginComponent,
    EditinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
