import { Marca } from "../../producto/models/marca";
import { Tipo } from "../../tipo/models/tipo";

export class Coche {
        id:number;
        matricula:string;
        numpuertas:number;
        marca:Marca;
        tipo:Tipo;
        constructor(id: number = 0, matricula: string = '', numpuertas: number = 0, marca: Marca = new Marca(), tipo: Tipo = new Tipo()) {
          this.id = id;
          this.matricula = matricula;
          this.numpuertas = numpuertas;
          this.marca = marca;
          this.tipo = tipo;
        } 
}
