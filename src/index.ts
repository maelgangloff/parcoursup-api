import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Appareil, Authentication, TokenResponse, LoginResponseHeaders } from './entities/Auth/Login'
import { VoeuxResponse } from './entities/Voeux/VoeuxResponse'
import { MenuCountResponse } from './entities/Menu/MenuCountResponse'
import { VoeuResponse } from './entities/Voeux/VoeuResponse'
import { MessagesResponse } from './entities/Messages/MessagesResponse'

const BASE_URL = 'https://mobile.parcoursup.fr/NotificationsService/services'

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
export class Parcoursup {
    private readonly username: string
    private readonly password: string
    private readonly appareil: Appareil
    private authentication?: Authentication

    /**
     * @param {string} username Numéro de dossier
     * @param {string} password Mot de passe
     * @param {Appareil} appareil Informations sur le terminal mobile
     */
    public constructor (username: string, password: string, appareil: Appareil) {
      this.username = username
      this.password = password
      this.appareil = appareil
    }

    /**
     * Détail des vœux formulés sur la plateforme avec le détail de leur statut
     */
    public async getVoeux (): Promise<VoeuxResponse> {
      return (await this.makeRequest({
        url: BASE_URL + '/voeux'
      })).data
    }

    /**
     * Détail d'un vœu
     * @param {string} voeuId Identifiant du vœu
     */
    public async getVoeu (voeuId: string): Promise<VoeuResponse> {
      return (await this.makeRequest({
        url: BASE_URL + '/voeux/' + voeuId
      })).data
    }

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
    public async getCompteursMenu (): Promise<MenuCountResponse> {
      return (await this.makeRequest({
        url: BASE_URL + '/menu/count'
      })).data
    }

    /**
     * Boîte de réception du candidat
     * @param {boolean} full
     */
    public async getMessages (full = true): Promise<MessagesResponse> {
      return (await this.makeRequest({
        url: BASE_URL + `/menu/count?full=${full ? 'true' : 'false'}`
      })).data
    }

    /**
     *
     * @param {AxiosRequestConfig} axiosRequestConfig Requête à effectuer
     * @private
     */
    private async makeRequest (axiosRequestConfig: AxiosRequestConfig): Promise<AxiosResponse> {
      if (!this.authentication) this.authentication = await Parcoursup.login(this.username, this.password, this.appareil)
      try {
        return axios.request(Parcoursup.addAuthHeaders(axiosRequestConfig, this.authentication))
      } catch {
        this.authentication = await Parcoursup.login(this.username, this.password, this.appareil)
        return axios.request(Parcoursup.addAuthHeaders(axiosRequestConfig, this.authentication))
      }
    }

    /**
     * Ajouter les en-têtes HTTP d'authentification
     * @param {AxiosRequestConfig} axiosRequestConfig Requête à effectuer
     * @param {Authentication} auth Informations d'authentification
     * @private
     */
    private static addAuthHeaders (axiosRequestConfig: AxiosRequestConfig, auth: Authentication): AxiosRequestConfig {
      return {
        ...axiosRequestConfig,
        headers: {
          Authorization: auth.loginResponseHeaders.authorization,
          'X-Auth-Token': auth.loginResponseHeaders.authToken,
          'X-Auth-Login': auth.loginResponseHeaders.login
        }
      }
    }

    /**
     * Obtenir des jetons d'authentification
     * @param {string} username Numéro de dossier
     * @param {string} password Mot de passe
     * @param {Appareil} appareil Informations sur l'appareil mobile utilisé
     * @static
     */
    public static async login (username: string, password: string, appareil: Appareil): Promise<Authentication> {
      const { tokenId } = await this.getTokenId(appareil)
      const response = await axios.post(BASE_URL + '/login', {
        tokenId, login: username, code: password
      })
      if (response.data.codeRetour !== 0) throw new Error(response.data.messageRetour)
      const loginResponseHeaders: LoginResponseHeaders = {
        authorization: response.headers.authorization,
        login: response.headers['x-auth-login'],
        authToken: response.headers['x-auth-token']
      }
      return { loginResponseHeaders, loginResponseBody: response.data }
    }

    public static async getTokenId (appareil: Appareil): Promise<TokenResponse> {
      return (await axios.post(BASE_URL + '/token', appareil)).data
    }
}
