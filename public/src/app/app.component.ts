import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newUser: any;
  errors = [];
  moo: any;
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;


  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.newUser = {firstName: "", lastName: "", email: "", organization: "", password: ""};
    
    // Skills Icon Animation
    const sliderElements = document.querySelectorAll('.bounceInLeft')
    sliderElements.forEach(sliderElement => {
  
      sliderElement.addEventListener('animationend', function() {
        sliderElement.classList.remove('bounceInLeft')
      });
    })
  
    // Skills Icon Animation
    const skillIcons = document.querySelectorAll('.boing')
    skillIcons.forEach(skillIcon => {
      skillIcon.addEventListener('mouseenter', function() {
        skillIcon.classList.add('rubberBand')
      });
  
      skillIcon.addEventListener('animationend', function() {
        skillIcon.classList.remove('rubberBand')
      });
    })

    // ~~NAV TEST~~
    document.addEventListener("DOMContentLoaded", function() { 
      var navi = document.getElementById('myNav');
      console.log(navi)
      this.moo = navi.offsetTop;
      console.log("Moo:", this.moo)
    });


    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 100,
        },
        color: {
          value: '#ff0000'
        },
        shape: {
          type: 'triangle',
        },
      }
    };

  }

  // Sticky NavBar
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let navBar = document.getElementById('myNav');
    let topOfNavBar = navBar.offsetTop;
    console.log("topOfNavBar:", topOfNavBar)
    console.log("ScrollY:", window.scrollY)
    console.log("moo:", this.moo)
      if (window.scrollY > topOfNavBar) {
        navBar.classList.add('sticky');
      } else {
        navBar.classList.remove('sticky');
      }
  }

  // debounce(func, wait = 5, immediate = true) {
  //   var timeout;
  //   return function() {
  //     var context = this, args = arguments;
  //     var later = function() {
  //       timeout = null;
  //       if(!immediate) func.apply(context.args);
  //     };
  //     var callNow = immediate && !timeout;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //     if(callNow) func.apply(context, args);
  //   };
  // };

  // checkSlide(event) {
  //   var sliderElements = document.querySelectorAll(".cardSlide");
  //     sliderElements.forEach(sliderElement => {
  //       var slideInAt = (window.scrollY + window.innerHeight) - sliderElement.clientHeight / 2;
  //       var isHalfShown = slideInAt > sliderElement.offsetTop;
  //       if(isHalfShown) {
  //         sliderElement.classList.add("active");	
  //         console.log("active")
  //       }
  //     })
  // }

  addUser(){
    console.log("~Component: addUser() initialzed~", this.newUser)
    this.errors = []
    var tempObs = this._httpService.postUser(this.newUser);
    tempObs.subscribe((data:any)=>{
      console.log("~Component: addUser() response~", data);
      if(data['errors']){
        for(var key in data["errors"]){
          console.log(data["errors"][key]["message"]);
          this.errors.push(data["errors"][key]["message"]);
        }
      }else if(data["message"] == "Email already registered!"){
        this.errors.push(data["message"]);
      }else{
        console.log("~Component: addUser() successful~")
        this.newUser = {firstName: "", lastName: "", email: "", organization: "", password: ""}
        // this._router.navigate(["/pets"]);
      }      
    })
  }
}