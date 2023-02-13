export interface RegistroStudente{
    listaVoti_materie: {
        materia: [{
            voto: number;
            data: Date;
        }]
    }
}