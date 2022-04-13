<a name="Parcoursup"></a>

## Parcoursup
Support non-officiel de l'API mobile Parcoursup\
La présente librairie ne permet pas d'accepter une proposition d'admission ou de démissionner d'un vœu.\
Il est néanmoins possible d'observer l'évolution des indicateurs pour chaque vœu formulé.

**Kind**: global class  

* [Parcoursup](#Parcoursup)
    * [new Parcoursup(username, password, appareil)](#new_Parcoursup_new)
    * _instance_
        * [.getVoeux()](#Parcoursup+getVoeux)
        * [.getVoeu(voeuId)](#Parcoursup+getVoeu)
        * [.getCompteursMenu()](#Parcoursup+getCompteursMenu)
        * [.getMessages(full)](#Parcoursup+getMessages)
    * _static_
        * [.login(username, password, appareil)](#Parcoursup.login)

<a name="new_Parcoursup_new"></a>

### new Parcoursup(username, password, appareil)

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | Numéro de dossier |
| password | <code>string</code> | Mot de passe |
| appareil | <code>Appareil</code> | Informations sur le terminal mobile |

**Example**  
```js
const { Parcoursup } = require('parcoursup-api')

const numeroDossier = '000000'
const motDePasseDossier = 'test'
const appareil = {
    plateforme: 'android',
    plateformeVersion: '10.0',
    appVersion: '2.1.7',
    uuid: `psup${Date.now()}`, // Identifiant aléatoire pour chaque appareil
    modele: 'PSUP-API',
    session: 2022
}
const candidat = new Parcoursup(numeroDossier, motDePasseDossier, appareil)
```
<a name="Parcoursup+getVoeux"></a>

### parcoursup.getVoeux()
Détail des vœux formulés sur la plateforme avec le détail de leur statut

**Kind**: instance method of [<code>Parcoursup</code>](#Parcoursup)  
<a name="Parcoursup+getVoeu"></a>

### parcoursup.getVoeu(voeuId)
Détail d'un vœu

**Kind**: instance method of [<code>Parcoursup</code>](#Parcoursup)  

| Param | Type | Description |
| --- | --- | --- |
| voeuId | <code>string</code> | Identifiant du vœu |

<a name="Parcoursup+getCompteursMenu"></a>

### parcoursup.getCompteursMenu()
Compteurs du candidat :
- Nombre de propositions d'admission
- Nombre de vœux en attente
- Nombre de vœux formulés
- Nombre de messages non lus

**Kind**: instance method of [<code>Parcoursup</code>](#Parcoursup)  
**Example**  
```js
const candidat = new Parcoursup(numeroDossier, motDePasseDossier, appareil)
candidat.getCompteursMenu().then(({counts}) => {
    console.log(`Le dossier contient ${counts.propositions} propositions et ${counts.enAttente} voeux en attente pour un total de ${counts.total} voeux formulés.`)
})
```
<a name="Parcoursup+getMessages"></a>

### parcoursup.getMessages(full)
Boîte de réception du candidat

**Kind**: instance method of [<code>Parcoursup</code>](#Parcoursup)  

| Param | Type | Default |
| --- | --- | --- |
| full | <code>boolean</code> | <code>true</code> | 

<a name="Parcoursup.login"></a>

### Parcoursup.login(username, password, appareil)
Obtenir des jetons d'authentification

**Kind**: static method of [<code>Parcoursup</code>](#Parcoursup)  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | Numéro de dossier |
| password | <code>string</code> | Mot de passe |
| appareil | <code>Appareil</code> | Informations sur l'appareil mobile utilisé |

