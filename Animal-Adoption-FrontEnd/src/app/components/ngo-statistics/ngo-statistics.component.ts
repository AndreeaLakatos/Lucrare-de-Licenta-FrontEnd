import { Component, OnInit } from '@angular/core';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { Statistics } from './models/statistics.model';

@Component({
  selector: 'app-ngo-statistics',
  templateUrl: './ngo-statistics.component.html',
  styleUrls: ['./ngo-statistics.component.scss']
})
export class NgoStatisticsComponent implements OnInit {

  public statistics?: Statistics;
  constructor(public ngoService: NgoService) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  public getStatistics() {
    this.ngoService.getStatistics().subscribe((res) => {
      this.statistics = res;
      console.log(res);
    });
  }

}
