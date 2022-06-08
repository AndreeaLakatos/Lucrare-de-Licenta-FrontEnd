import { Component, OnInit } from '@angular/core';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { Statistics } from './models/statistics.model';

@Component({
  selector: 'app-ngo-statistics',
  templateUrl: './ngo-statistics.component.html',
  styleUrls: ['./ngo-statistics.component.scss'],
})
export class NgoStatisticsComponent implements OnInit {
  public statistics?: Statistics;
  constructor(
    public ngoService: NgoService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getStatistics();
  }

  public getStatistics() {
    if (window.navigator.onLine) {
      this.ngoService.getStatistics().subscribe((res) => {
        this.statistics = res;
        console.log(res);
      });
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }
}
