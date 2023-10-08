import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = ''
  subTitle = ''
  contentText = ''
  buttonName = ""
  redirectLink = ''
  alertText = "" 
  firstClicked = false;

  ngOnInit(): void {
      fetch(window.location.href + "assets/data.json").then(async (data) => {
        const parsedData = await data.json()
          this.title = parsedData.title
          this.subTitle = parsedData.subTitle
          this.contentText = parsedData.contentText
          this.buttonName = parsedData.buttonName
          this.redirectLink = parsedData.redirectLink
          this.alertText = parsedData.alertText
      }).catch(err => alert("Bruh, did you break it again?"))
  }

  buttonClick = () => {
    if(!this.firstClicked){
      alert(this.alertText)
      this.firstClicked = true
    }
    else 
      window.location.href = this.redirectLink
  }
}
