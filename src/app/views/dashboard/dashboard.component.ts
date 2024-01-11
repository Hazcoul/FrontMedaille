import {Component, OnInit} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {UtilisateurService} from "../../services/utilisateur.service";

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data1: any[] = [];
  chartOptions: any;
  listeEntrees = [12,13,15,18,56,23,11,10,56,98,90,76];
  listeSorties = [12,13,15,18,56,23,11,10,56,98,90,76];
  stocks = [2,4,15,8,76,11,6,10,56,98,5,32];
  constructor(private chartsData: DashboardChartsData,
              private utilisateurService: UtilisateurService) {
  }


  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.intialiser();
  }

  intialiser(): void{
    this.data1 = [
      {
        name: 'Entree',
        data: this.listeEntrees

      },
      {
        name: 'Sortie',
        data: this.listeSorties

      },
      {
        name: 'Stock',
        data: this.stocks

      },
    ];

    this.chartOptions = {
      chart: {
        // type: "bar",
        type: 'column',
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false
        }
      },

      title: {
        text: "Mouvement des stocks par mois"
      },
      yAxis: {
        title: {
          text: "Medailles"
        }
      },
      xAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      series: this.data1
    };
  }






}
