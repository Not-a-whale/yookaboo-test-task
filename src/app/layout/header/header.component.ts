import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  routerSub: Subscription = new Subscription();

  private router = inject(Router);

  isCreate: boolean = false;

  ngOnInit() {
    this.routerSub = this.router.events.subscribe((event) => {
      this.isCreate = this.router.url === '/create';
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
