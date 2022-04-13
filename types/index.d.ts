import { Appareil, Authentication, TokenResponse } from './entities/Auth/Login';
import { VoeuxResponse } from './entities/Voeux/VoeuxResponse';
import { MenuCountResponse } from './entities/Menu/MenuCountResponse';
import { VoeuResponse } from './entities/Voeux/VoeuResponse';
import { MessagesResponse } from './entities/Messages/MessagesResponse';
/**
 * Support non-officiel de l'API mobile Parcoursup\
 * La présente librairie ne permet pas d'accepter une proposition d'admission ou de démissionner d'un vœu.\
 * Il est néanmoins possible d'observer l'évolution des indicateurs pour chaque vœu formulé.
 * @example ```js
 * const { Parcoursup } = require('parcoursup-api')
 *
 * const numeroDossier = '000000'
 * const motDePasseDossier = 'test'
 * const appareil = {
 *     plateforme: 'android',
 *     plateformeVersion: '10.0',
 *     appVersion: '2.1.7',
 *     uuid: `psup${Date.now()}`, // Identifiant aléatoire pour chaque appareil
 *     modele: 'PSUP-API',
 *     session: 2022
 * }
 * const candidat = new Parcoursup(numeroDossier, motDePasseDossier, appareil)
 * ```
 */
export declare class Parcoursup {
    private readonly username;
    private readonly password;
    private readonly appareil;
    private authentication?;
    /**
     * @param {string} username Numéro de dossier
     * @param {string} password Mot de passe
     * @param {Appareil} appareil Informations sur le terminal mobile
     */
    constructor(username: string, password: string, appareil: Appareil);
    /**
     * Détail des vœux formulés sur la plateforme avec le détail de leur statut
     */
    getVoeux(): Promise<VoeuxResponse>;
    /**
     * Détail d'un vœu
     * @param {string} voeuId Identifiant du vœu
     */
    getVoeu(voeuId: string): Promise<VoeuResponse>;
    /**
     * Compteurs du candidat :
     * - Nombre de propositions d'admission
     * - Nombre de vœux en attente
     * - Nombre de vœux formulés
     * - Nombre de messages non lus
     * @example ```js
     * const candidat = new Parcoursup(numeroDossier, motDePasseDossier, appareil)
     * candidat.getCompteursMenu().then(({counts}) => {
     *     console.log(`Le dossier contient ${counts.propositions} propositions et ${counts.enAttente} voeux en attente pour un total de ${counts.total} voeux formulés.`)
     * })
     * ```
     */
    getCompteursMenu(): Promise<MenuCountResponse>;
    /**
     * Boîte de réception du candidat
     * @param {boolean} full
     */
    getMessages(full?: boolean): Promise<MessagesResponse>;
    /**
     *
     * @param {AxiosRequestConfig} axiosRequestConfig Requête à effectuer
     * @private
     */
    private makeRequest;
    /**
     * Ajouter les en-têtes HTTP d'authentification
     * @param {AxiosRequestConfig} axiosRequestConfig Requête à effectuer
     * @param {Authentication} auth Informations d'authentification
     * @private
     */
    private static addAuthHeaders;
    /**
     * Obtenir des jetons d'authentification
     * @param {string} username Numéro de dossier
     * @param {string} password Mot de passe
     * @param {Appareil} appareil Informations sur l'appareil mobile utilisé
     * @static
     */
    static login(username: string, password: string, appareil: Appareil): Promise<Authentication>;
    static getTokenId(appareil: Appareil): Promise<TokenResponse>;
}
