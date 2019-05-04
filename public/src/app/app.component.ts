import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';  
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
)]
})
export class AppComponent implements OnInit{
  
  constructor(@Inject(DOCUMENT) document) { }

  
  ngOnInit() {  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let navBar = document.getElementById('myNav');
    let topOfNavBar = navBar.offsetTop; 
      if (window.pageYOffset > topOfNavBar) {
        console.log(window.pageYOffset)
        let element = document.getElementById('myNav');
        element.classList.add('sticky');
      } else {
        let element = document.getElementById('myNav');
        element.classList.remove('sticky'); 
      }
  }
}
