import { LightningElement,track } from 'lwc';

export default class TestingNavigationBar extends LightningElement {
 tutorialValue=false;
    integrationValue = false;
    currentContent=true;
  connectedCallback(){
    this.tutorialValue=true;
  }
   
    clickme2(){
        this.tutorialValue=true;
        this.integrationValue=false;
        this.currentContent=false;
    }
   
    clickmeAuth(){
        this.integrationValue=true;
        this.tutorialValue=false;
        this.currentContent=false;
    }
}