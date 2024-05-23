import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComServiceService } from './com-service.service';
import { TokenService } from './token.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [ComServiceService, TokenService],
})
export class ServicesModule {}
