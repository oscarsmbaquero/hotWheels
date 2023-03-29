
export interface ICar{
    marca: string;
    imagen: string;
    image?:string;
    modelo: string;
    anio: number;
    tipo: TypeCar;
}
 export enum TypeCar {
    "4x4" = "4x4",
    "berlinas" = "berlinas",
    "electricos" = "electricos",
    "deportivos" = "deportivos",
    "muscle_cars" = "muscle cars",
    "emergencias" = "emergencias"
}
export const TypeOfCar = Object.values(TypeCar);
// export interface ISong{
//     title:string
// }


