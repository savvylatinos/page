import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
  	   public router: Router,
    private location: Location
    ) { }

  ngOnInit() {
  }

}
