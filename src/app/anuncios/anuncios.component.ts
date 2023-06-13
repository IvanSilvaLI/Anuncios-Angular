import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Anuncio } from '../anuncio';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnuncioComponent implements OnInit {
  anuncioForm: FormGroup;
  anuncios: Anuncio[] = [];
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.anuncioForm = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      dataValidade: ['', Validators.required],
      imagem: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAnuncios();
  }

  getAnuncios() {
    this.dataService.getAnuncios().subscribe((anuncios: Anuncio[]) => {
      this.anuncios = anuncios;
    });
  }

  criarAnuncio() {
    this.submitted = true;
    if(this.anuncioForm.valid)
    {

    if (this.isEditing) {
      this.dataService.editarAnuncio(this.anuncioForm.value).subscribe({
        next: () => {
          this.getAnuncios();
          this.anuncioForm.reset();
          this.isEditing = false;
        },
      });
    } else {
      this.dataService.adicionarAnuncio(this.anuncioForm.value).subscribe({
        next: (data) => {
          this.anuncios.push(data);
          this.anuncioForm.reset();
        },
      });
    }

    this.submitted = false;
  }
  }


  editarAnuncio(anuncio: Anuncio) {
    this.anuncioForm.setValue(anuncio);
    this.isEditing = true;
  }

  deletarAnuncio(id: number) {
    if (confirm('Deseja realmente deletar este anúncio?')) {
      this.dataService.deletarAnuncio(id).subscribe(() => {
        // Remove o anúncio da lista local
        this.anuncios = this.anuncios.filter(anuncio => anuncio.id !== id);
        console.log('Anúncio deletado com sucesso!');
      });
    }
  }


  get title(): any {
    return this.anuncioForm.get('titulo');
  }

  get price(): any {
    return this.anuncioForm.get('preco');
  }

  get description(): any {
    return this.anuncioForm.get('descricao');
  }


  get date(): any {
    return this.anuncioForm.get('dataValidade');
  }

  get status(): any {
    return this.anuncioForm.get('status');
  }

  get image(): any {
    return this.anuncioForm.get('imagem');
  }
}
