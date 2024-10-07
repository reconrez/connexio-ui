import { Component } from '@angular/core';

@Component({
  selector: 'app-tokens-card',
  standalone: true,
  imports: [],
  templateUrl: './tokens-card.component.html',
  styleUrl: './tokens-card.component.scss'
})
export class TokensCardComponent {

  tokensLeft : number = 0;
  currentUser = localStorage.getItem('current_user')
  
  getTokens(){
    
  }

  buyTokens(){
    
  }
}
