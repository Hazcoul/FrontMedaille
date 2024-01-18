import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { IEntree } from 'src/app/entities/entree.model';
import { EntreeService } from 'src/app/services/entree.service';

@Component({
  selector: 'app-entree-detail',
  templateUrl: './entree-detail.component.html',
  styleUrl: './entree-detail.component.scss'
})
export class EntreeDetailComponent implements OnInit {

  entree: IEntree | null = null;
  active = 1;

  constructor(
    private entreeService: EntreeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({entree}) =>{
      console.log('ENTRE RESOLVE : ', entree.body);
      this.entree = entree.body;
      this.entree!.dateEntree = moment(this.entree?.dateEntree).format('DD/MM/yyyy');
      this.entree!.dateReception = moment(this.entree?.dateReception).format('DD/MM/yyyy');
    })
    // const idEntree = +this.activatedRoute.snapshot.paramMap.get('id')!;
    // if(idEntree) {
    //   this.entreeService.find(idEntree).subscribe({
    //     next: (res: HttpResponse<IEntree>) => {
    //       if(res.body) {
    //         this.entree = res.body
    //         console.log('ENTREE : ', this.entree);
    //       }
    //     },
    //     error: (e) => console.log('ERROR : ', e)
    //   })
    // }
  }

  goBack(): void {
    this.router.navigate(['/mouvement/entree']);
  }

  valider(entree: IEntree): void {
    
  }
}
