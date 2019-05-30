import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { HttpService } from './http.service';
import { WOW } from 'wowjs/dist/wow.min';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newUser: any;
  errors = [];
  navPosition: any;
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

    // document.addEventListener("DOMContentLoaded", function() { 
    //   var navi = document.getElementById('myNav');
    //   console.log(navi)
    //   this.moo = navi.offsetTop;
    //   console.log("Moo:", this.moo)
    // });

    this.myStyle = {
      'position': 'relative',
      'width': '100%',
      'height': '100%',
      'z-index': 2,
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

  ngAfterViewInit(){
    var navi = document.getElementById('myNav');
    this.navPosition = navi.offsetTop;

    var wow = new WOW(
      {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       300,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         false,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
      }
    );
    wow.init();

    document.addEventListener("DOMContentLoaded", function() { 
      wow.sync()
      console.log("Sync");
    });
    
  }

  // Sticky NavBar
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    // this.checkSlide(this.debounce)
    let navBar = document.getElementById('myNav');
    let topOfNavBar = navBar.offsetTop;
    // console.log("topOfNavBar:", topOfNavBar)
    // console.log("ScrollY:", window.scrollY)
    // console.log("navPosition:", this.navPosition)
    // console.log("BAR MEASUREMENTS:", navBar.offsetHeight)
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
  //       var slideInAt = (window.scrollY + window.innerHeight * 0.9) - sliderElement.clientHeight;  //DIVIDE BY 2
  //       var isHalfShown = slideInAt > sliderElement['offsetTop'];
  //       console.log(window.innerHeight)
  //       console.log(sliderElement.clientHeight)
  //       console.log("ScrollY:", window.scrollY)
  //       console.log("Sliderinat", slideInAt)
  //       console.log("Offsettop", sliderElement['offsetTop'])
  //       if(isHalfShown) {
  //         sliderElement.classList.remove("invisible");
  //         sliderElement.classList.add("bounceInLeft", "visible");	
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