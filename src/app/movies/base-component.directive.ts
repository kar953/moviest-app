import { OnDestroy, Injectable, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseComponentDirective implements OnDestroy {
  protected destroyed$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
