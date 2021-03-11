import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { routes } from './app-routing.module';

import { IgxNavigationDrawerComponent,
         CloseScrollStrategy ,
         ConnectedPositioningStrategy,
         HorizontalAlignment,
         IgxDropDownComponent,
         VerticalAlignment } from 'igniteui-angular';
import { DataGenService } from './services/data-gen.service';
import { RecordKeepingService } from './services/recordkeeping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public topNavLinks: Array<{
    path: string,
    name: string,
    time: string,
    cols: number
  }> = [];
  public rowCount = 100;
  public rowCountText = 'Rows: ${rowCount}';
  public rowCounts = [100, 1000, 10000, 100000, 1000000];

  @ViewChild('ddRowCount', { read: IgxDropDownComponent })
  public ddRowCount: IgxDropDownComponent;
  @ViewChild(IgxNavigationDrawerComponent)
  public navdrawer: IgxNavigationDrawerComponent;
  @ViewChild('contentHolder')
  public content: ElementRef;

  private _positionSettings = {
    horizontalStartPoint: HorizontalAlignment.Left,
    verticalStartPoint: VerticalAlignment.Bottom
  };
  private docChangedTimeout;
  private viewName;
  public navTitle;

  private startTime;
  private _overlaySettings = {
    closeOnOutsideClick: true,
    modal: false,
    positionStrategy: new ConnectedPositioningStrategy(this._positionSettings),
    scrollStrategy: new CloseScrollStrategy()
  };

  constructor(private router: Router, private finDataService: DataGenService, private entries: RecordKeepingService) {
    for (const route of routes) {
      if (route.path && route.data && route.path.indexOf('*') === -1) {
        this.topNavLinks.push({
          name: route.data.text,
          path: '/' + route.path,
          time: null,
          cols: route.data.cols
        });
      }
    }
  }

  public subTreeChangeHandler() {
    if (this.viewName && String(this.viewName).includes('Grid')) {
      if (this.docChangedTimeout) {
        clearTimeout(this.docChangedTimeout);
      }

      this.docChangedTimeout = setTimeout(() => {

        // measure elapsed time when DOM stops changing for a while
        const endTime = new Date();
        const elapsed = (endTime.getTime() - this.startTime.getTime()) / 1000;
        console.log('Time to load View ' + this.viewName + ': ' +  elapsed.toFixed(2) + ' s');

        const route = this.topNavLinks.find((item) => {
          return item.name === this.viewName;
        });
        route.time = elapsed.toFixed(2) + ' s';
        this.entries.addEntry(this.viewName, this.rowCount, route.cols, elapsed);
        this.viewName = null;
      }, 10);
    }
  }

  public ngOnInit(): void {
    this.router.events.pipe(
      filter((x) => x instanceof NavigationStart)
    )
      .subscribe((event: NavigationStart) => {
          if (event.url !== '/' && !this.navdrawer.pin) {
              // Close drawer when selecting a view on mobile (unpinned)
              this.navdrawer.close();
          }
      });

      this.router.events.pipe(
        filter((x) => x instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.startTime = new Date();
        const route = routes.find((item) => {
          return '/' + item.path === event.url;
        });
        this.viewName = route && route.data ? route.data.text : null;
        this.navTitle = this.viewName;
      });

      const target = this.content.nativeElement;

      const observer = new MutationObserver(() => { this.subTreeChangeHandler(); });
      observer.observe(target, {subtree: true, childList: true });

      this.generateData();
  }

  public toggleDropDown(eventArgs) {
    this._overlaySettings.positionStrategy.settings.target = eventArgs.target;
    this.ddRowCount.toggle(this._overlaySettings);
}
  public generateData() {
    this.finDataService.getData(this.rowCount);
  }

}
