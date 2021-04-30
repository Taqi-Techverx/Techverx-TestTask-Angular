import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from 'app/apiservice.service';
import { EmpList } from 'app/model/get-emp-list';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  listOfData: EmpList[];


  constructor(private modalService: NgbModal, private apiService:ApiserviceService
    ,private route : Router) { }

  ngOnInit() {
    this.apiService.getEmployees().subscribe(res=>{
      this.listOfData = res.data;
      });
  }
  showModal(id): void {
    const modalRef = this.modalService.open(PaymentModalComponent);
    modalRef.componentInstance.id = id;
  }
  navigateToPayment(id){
    this.route.navigate(['/payment',id] )
  }
}
