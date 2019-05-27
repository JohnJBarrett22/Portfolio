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

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.newUser = {firstName: "", lastName: "", email: "", organization: "", password: ""};
    
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

