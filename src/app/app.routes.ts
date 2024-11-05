import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TipoComponent } from './tipo/tipo.component';
import { FacultadComponent } from './facultad/facultad.component';
import { EscuelaComponent } from './escuela/escuela.component';
import { MarcaComponent } from './producto/marca.component';
import { CocheComponent } from './categoria/coche.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        title:'Home'
    },
    {
        path:'coche',
        component:CocheComponent,
        title:'Coche'
    },
    {
        path:'tipo',
        component: TipoComponent,
        title:'Tipo'
    },
    {
        path:'marca',
        component: MarcaComponent,
        title:'Marca'
    },
    {
        path:'facultad',
        component:FacultadComponent,
        title:'Facultad'
    }
    ,
    {
        path:'escuela',
        component:EscuelaComponent,
        title:'Escuela'
    }

];
