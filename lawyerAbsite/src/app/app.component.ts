import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lawyerAbsite';

  constructor(private router:Router){}

  selectedCategory:string='0';
  searchValue:string='';

  searching(){
    console.log(this.selectedCategory+": "+this.searchValue)
    this.router.navigate(['/search',this.searchValue])
  }

 
}
