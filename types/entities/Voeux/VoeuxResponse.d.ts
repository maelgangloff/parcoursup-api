import { Voeu } from './Voeu';
export interface VoeuxResponse {
    codeRetour: number;
    messageRetour: string;
    messageTitre: string;
    voeux: Voeu[];
    messagesVoeuxAdmissions: {
        liste: string;
        message: string | null;
    }[];
    messagesTableaux: {
        liste: string;
        message: string | null;
    }[];
    messageEnTeteVoeux: any;
}
