
export interface Appareil {
    plateforme: string
    plateformeVersion: string
    appVersion: string
    uuid: string
    modele: string
    session: number
}

export interface LoginResponseHeaders {
    authorization: string
    authToken: string
    login: string
}

export interface LoginResponseBody {
    codeRetour: number
    messageReour: string
    messageTitre: string
    candidat: {
        login: string
        identite: string
        peutCreerMessage: boolean
        g_cn_pn: number
        g_cn_app: number
        g_cn_pc: number
    }
    rubriques: null | object
}

export interface TokenResponse {
    codeRetour: number
    messageRetour: string
    messageTitre: string
    tokenId: number
    token: string | null
    session: number
}

export interface Authentication {
    loginResponseHeaders: LoginResponseHeaders
    loginResponseBody?: LoginResponseBody
}
