import { Voeu } from './Voeu';
export interface VoeuResponse {
    codeRetour: number;
    messageRetour: string;
    messageTitre: string;
    voeu: Voeu;
}
