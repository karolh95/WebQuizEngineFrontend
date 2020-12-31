import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedQuizzesComponent } from './solved-quizzes.component';

describe('SolvedQuizzesComponent', () => {
  let component: SolvedQuizzesComponent;
  let fixture: ComponentFixture<SolvedQuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolvedQuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvedQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
