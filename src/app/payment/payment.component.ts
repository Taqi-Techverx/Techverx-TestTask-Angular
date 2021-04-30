import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'app/apiservice.service';
import { EmpList } from 'app/model/get-emp-list';
import { PaymentList } from 'app/model/get-payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  listOfData: PaymentList[];
  id : string;

  constructor(private apiService:ApiserviceService,private router : ActivatedRoute) { }

  ngOnInit() {
    
    this.router.params.subscribe(param=>{
      this.id = param['id'];
      this.apiService.getPaymentByClientId(this.id).subscribe(res=>{
        this.listOfData = res.data;
        });
    });
  }
 
}
