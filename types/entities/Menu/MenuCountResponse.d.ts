export interface MenuCountResponse {
    codeRetour: number;
    messageRetour: string;
    messageTitre: string;
    counts: {
        propositions: number;
        enAttente: number;
        total: number;
        messagesNonLus: number;
        demissionGeneraleAutorisee: boolean;
    };
}
