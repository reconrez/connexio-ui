import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensCardComponent } from './tokens-card.component';

describe('TokensCardComponent', () => {
  let component: TokensCardComponent;
  let fixture: ComponentFixture<TokensCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokensCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokensCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
