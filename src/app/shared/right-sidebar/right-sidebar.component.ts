import { Component } from '@angular/core';
import { TokensCardComponent } from "../tokens-card/tokens-card.component";

@Component({
    selector: 'app-right-sidebar',
    imports: [TokensCardComponent],
    templateUrl: './right-sidebar.component.html',
    styleUrl: './right-sidebar.component.scss'
})
export class RightSidebarComponent {

}
