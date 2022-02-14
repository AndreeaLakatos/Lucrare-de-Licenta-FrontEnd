import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarType } from './snackbar-type';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  public constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

  public success(message: string) {
    this.openSnackBar(message, SnackBarType.success);
  }

  public warn(message: string) {
    this.openSnackBar(message, SnackBarType.warn);
  }

  public info(message: string) {
    this.openSnackBar(message, SnackBarType.info);
  }

  public error(message: string) {
    this.openSnackBar(message, SnackBarType.error, 5000);
  }

  private openSnackBar(message: string, className: SnackBarType, duration?: number) {
    this.zone.run(() => {
      const snackBar = this.snackBar.open(message, 'Close', {
        duration: duration ?? 2000,
        panelClass: [className],
      });
      snackBar.onAction().subscribe(() => snackBar.dismiss());
    })
  }
}
