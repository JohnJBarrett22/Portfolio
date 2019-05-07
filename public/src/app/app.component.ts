import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor() { }

  ngOnInit() {
    
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let navBar = document.getElementById('myNav');
    let topOfNavBar = navBar.offsetTop; 
      if (window.pageYOffset > topOfNavBar) {
        console.log("Offset:", window.pageYOffset)
        console.log("ScrollY:", window.scrollY)
        let element = document.getElementById('myNav');
        element.classList.add('sticky');
      } else {
        let element = document.getElementById('myNav');
        element.classList.remove('sticky'); 
      }
  }


}
