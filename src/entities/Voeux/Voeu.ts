export interface Voeu {
    voeuId: string
    etablissement: {
        etablissementId: string
        nom: string
        ville: string
        departementPays: string
    }
    formation: string
    formationEnApparentissage: boolean
    situation: {
        code: number
        libelle: string
        picto: string
        objet: any
    }
    dateLimiteReponse: string
    alerteDateLimiteReponse: boolean
    infosComplementaires: string
    reponsesPossibles: {
        codeReponse: number
        libelleReponse: string
        couleur: string
        couleurTexte: string
        messageConfirmation: string
        motifDemissionRequis: boolean
        motifsDemission: string[]
    }[]
    peutMaintenir: boolean
    a_sv_cod: number
    a_sv_flg_aff: number
    a_sv_flg_oui: number
    a_sv_flg_att: number
    a_sv_flg_abd: number
    a_sv_flg_ref: number
    a_sv_flg_clo: number
    a_ve_ord: number
    autresInformations: any[]
    maintenirParDefaut: boolean
    lienDocument: string
    titreLien: string
}
