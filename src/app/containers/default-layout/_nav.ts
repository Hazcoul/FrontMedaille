import {INavData} from "../../entities/nav-data.model";

export const navItems: INavData[] = [
  {
    name: 'Tableau de bord',
    url: '/dashboard',
    children: [],
    authorities: ['ADD_MVT','VIEW_MVT','ADD_PARAM','VIEW_PARAM','ADD_USER','VIEW_USER','ADD_MVT','VIEW_MVT','VIEW_STAT'],
  },
  {
    name: 'Mouvement de stock',
    url:'#',
    authorities: ['ADD_MVT','VIEW_MVT'],
    children: [
      {
        name: 'Entree',
        url: '/mouvement/entree',
        authorities: ['ADD_MVT','VIEW_MVT'],
      },
      {
        name: 'Sortie',
        url: '/mouvement/sortie',
        authorities: ['ADD_MVT','VIEW_MVT'],
      },
     /* {
        name: 'Représentant',
        url: '/parametre/detenteur',
        authorities: ['ADD_MVT','VIEW_MVT'],
      },*/
    ]
  },
  {
    name: 'Paramétrage',
    url:'#',
    authorities: ['ADD_PARAM','VIEW_PARAM'],
    children: [
      {
        name: 'Structure bénéficiaire',
        url: '/parametre/beneficiaire',
        authorities: ['ADD_PARAM','VIEW_PARAM'],
      },
      {
        name: 'Représentant',
        url: '/parametre/detenteur',
        authorities: ['ADMIN','GEST'],
      },
      {
        name: 'Ordonnateur',
        url: '/parametre/ordonnateur',
        authorities: ['ADD_PARAM','VIEW_PARAM'],
      },
      {
        name: 'Médaille',
        url: '/parametre/medaille',
        authorities: ['ADD_PARAM','VIEW_PARAM'],
      },
      {
        name: 'Grade/Dignité',
        url: '/parametre/grade',
        authorities: ['ADD_PARAM','VIEW_PARAM'],
      },
      {
        name: 'Fournisseur',
        url: '/parametre/fournisseur',
        authorities: ['ADD_PARAM','VIEW_PARAM'],
      },
      {
        name: 'Distinction honorifique',
        url: '/parametre/distinction',
        authorities: ['ADD_PARAM','VIEW_PARAM'],
      },
      {
        name: 'Dépôt',
        url: '/parametre/depot',
        authorities: ['ADD_PARAM','VIEW_PARAM'],
      },
      {
        name: 'Magasin',
        url: '/parametre/magasin',
        authorities: ['ADD_PARAM','VIEW_PARAM'],
      },
    ]
  },

  {
    name: 'Statistiques',
    url:'#',
    authorities: ['VIEW_STAT'],
    children: [
      {
        name: 'Entrees',
        url: '/statistiques/commande',
        authorities: ['VIEW_STAT'],
      },
      {
        name: 'Sorties',
        url: '/statistiques/sorties',
        authorities: ['VIEW_STAT'],
      },
      {
        name: 'Sorties par période',
        url: '/statistiques/sorties/periode',
        authorities: ['VIEW_STAT'],
      },
    ]
  },

  {
    name: 'Sécurtié',
    url:'#',
    authorities: ['ADD_USER','VIEW_USER'],
    children: [
      {
        name: 'Profils',
        url: '/pages/securite/profils',
        authorities: ['ADD_USER','VIEW_USER'],
      },
      {
        name: 'Utilisateurs',
        url: '/pages/securite/utilisateurs',
        authorities: ['ADD_USER','VIEW_USER'],
      },
      {
        name: 'Droits',
        url: '/pages/securite/droits',
        authorities: ['ADD_USER','VIEW_USER'],
      },
      /*{
        name: 'Audit',
        url: '/pages/securite/audits',
        authorities: ['ADMIN'],
      }*/
    ]
  },
];
