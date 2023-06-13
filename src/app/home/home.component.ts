import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Anuncio } from '../anuncio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  anuncios: Anuncio[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAnuncios();
  }

  getAnuncios(): void {
    this.dataService.getAnuncios().subscribe(anuncios => {
      this.anuncios = anuncios;
    });
  }
}
