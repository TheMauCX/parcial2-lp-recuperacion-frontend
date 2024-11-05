import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Coche } from './models/coche';
import { Marca } from '../producto/models/marca';
import { Tipo } from '../tipo/models/tipo';
import { CocheService } from './services/coche.service';
import { MarcaService } from '../producto/services/marca.service';
import { TipoService } from '../tipo/services/tipo.service';
declare var window:any;
@Component({
  selector: 'app-coche',
  standalone: true,
  imports: [CardComponent, NavbarComponent, CommonModule,FormsModule],
  templateUrl: './coche.component.html',
  styleUrl: './coche.component.css'
})
export class CocheComponent {
  titulo='Gestión de Escuelas';
  icono='fa-solid fa-shapes';

  tipos:Tipo[]=[];
  marcas:Marca[]=[];
  coches:Coche[]=[];

  title:string='';
  opc:string='';

  tipo= new Tipo();
  marca= new Marca();
  coche= new Coche();

  op = 0; 
  visible: boolean = false; 
  isDeleteInProgress: boolean = false;
  modal:any;
  forModal:any;
  
  constructor(
    private cocheService: CocheService,
    private tipoService: TipoService,
    private marcaService: MarcaService
  ){}
  ngOnInit():void{
    this.listarTipos();
    this.listarMarcas();
    this.listarCoches();
   this.forModal = new window.bootstrap.Modal(
    document.getElementById("exampleModal")
   );
  }
  listarTipos(){
    this.tipoService.getTipo().subscribe((data)=>{
      this.tipos=data;
    });
  }
  listarMarcas(){
    this.marcaService.getMarca().subscribe((data)=>{
      this.marcas=data;
    });
  }
  listarCoches(){
    this.cocheService.getCoches().subscribe((data)=>{
      this.coches=data;
    });
  }
  mostrar(){
    this.forModal.show();    
  }
  showDialogEdit(id:number) {
   this.cocheService.getCocheById(id).subscribe((data)=>{
      this.coche=data;  
      this.op=1;
      this.forModal.show();
   });
   this.visible = true;

  }
  deleteCoche(id: number) {
    this.cocheService.deleteCoche(id).subscribe({
        next:()=>{
          this.listarCoches();
        }
    });     
  }
  addCoche():void{ 
    this.cocheService.createCoche(this.coche).subscribe({
            next:()=>{
                  this.listarCoches();
            }
            
    });          
        this.forModal.hide();
  }
  editCoche(){
    this.cocheService.updateCoche(this.coche,this.coche.id).subscribe({
        });
        this.listarCoches();        
        this.op=0;    
        this.visible = false;
  }
  showDialogCreate() {
    this.coche = new Coche(); // Reinicia el objeto para que esté vacío
    this.op = 0; // Indica que estamos en modo de creación
    this.titulo = "Crear Coche"; // Cambia el título
    this.visible = true; // Asegura que el modal esté visible
    this.forModal.show(); // Muestra el modal
  }
  opcion(): void {
    if (this.op === 0) {
      this.addCoche();
    } else if (this.op === 1) {
      this.editCoche();
    }
    this.resetModalState(); // Reinicia el estado del modal después de cada operación
  }
  resetModalState() {
    this.coche = new Coche(); // Reinicia el objeto tipo
    this.op = 0; // Reinicia op al valor de creación
    this.visible = false; // Cierra el modal
    this.forModal.hide(); // Oculta el modal explícitamente
  }
}

