import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestManagementComponent } from './friend-request-management.component';

describe('FriendRequestManagementComponent', () => {
  let component: FriendRequestManagementComponent;
  let fixture: ComponentFixture<FriendRequestManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendRequestManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendRequestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
