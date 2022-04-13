export interface MessagesResponse {
    codeRetour: number
    messageRetour: string
    messageTitre: string
    messages: {
        id: string
        type: string
        titre: string
        texte: string
        estLu: boolean
        date: string
        auteur: string
        messageCandidat: boolean
        dateExpiration: number
        dateFormatee: string
    }[]
}
