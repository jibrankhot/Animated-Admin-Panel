import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  readonly isSidebarCollapsed = signal<boolean>(false);

  private readonly mediaQuery =
    window.matchMedia('(max-width: 900px)');

  private readonly mediaQueryListener = (
    e: MediaQueryListEvent
  ) => this.onMediaChange(e);

  ngOnInit(): void {
    this.isSidebarCollapsed.set(this.mediaQuery.matches);
    this.mediaQuery.addEventListener(
      'change',
      this.mediaQueryListener
    );
  }

  ngOnDestroy(): void {
    this.mediaQuery.removeEventListener(
      'change',
      this.mediaQueryListener
    );
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed.update((v) => !v);
  }

  private onMediaChange(
    event: MediaQueryListEvent
  ): void {
    this.isSidebarCollapsed.set(event.matches);
  }
}
