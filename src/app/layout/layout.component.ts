import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AdminService } from '@app/service/admin.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public adminService: AdminService) {
  }

  ngOnInit(): void {

  }

}
