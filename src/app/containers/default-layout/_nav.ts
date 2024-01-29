import {INavData} from "../../entities/nav-data.model";

export const navItems: INavData[] = [
  {
    name: 'Tableau de bord',
    url: '/dashboard',
    children: [],
    authorities: ['ADMIN'],
  },
  {
    name: 'Mouvement de stock',
    url:'#',
    authorities: ['ADMIN'],
    children: [
      {
        name: 'Entree',
        url: '/mouvement/entree',
        authorities: ['ADMIN'],
      },
      {
        name: 'Sortie',
        url: '/mouvement/sortie',
        authorities: ['ADMIN'],
      },
    ]
  },
  {
    name: 'Paramétrage',
    url:'#',
    authorities: ['ADMIN'],
    children: [
      {
        name: 'Structure bénéficiaire',
        url: '/parametre/beneficiaire',
        authorities: ['ADMIN'],
      },
      {
        name: 'Représentant',
        url: '/parametre/detenteur',
        authorities: ['ADMIN'],
      },
      {
        name: 'Ordonnateur',
        url: '/parametre/ordonnateur',
        authorities: ['ADMIN'],
      },
      {
        name: 'Médaille',
        url: '/parametre/medaille',
        authorities: ['ADMIN'],
      },
      {
        name: 'Grade/Dignité',
        url: '/parametre/grade',
        authorities: ['ADMIN'],
      },
      {
        name: 'Fournisseur',
        url: '/parametre/fournisseur',
        authorities: ['ADMIN'],
      },
      {
        name: 'Distinction honnorifique',
        url: '/parametre/distinction',
        authorities: ['ADMIN'],
      },
      {
        name: 'Dépôt',
        url: '/parametre/depot',
        authorities: ['ADMIN'],
      },
      {
        name: 'Magasin',
        url: '/parametre/magasin',
        authorities: ['ADMIN'],
      },
    ]
  },

  {
    name: 'Statistiques',
    url:'#',
    authorities: ['ADMIN'],
    children: [
      {
        name: 'Entrees',
        url: '/statistiques/commande',
        authorities: ['ADMIN'],
      },
      {
        name: 'Sorties',
        url: '/statistiques/sorties',
        authorities: ['ADMIN'],
      },
      {
        name: 'Sorties par période',
        url: '/statistiques/sorties/periode',
        authorities: ['ADMIN'],
      },
    ]
  },

  {
    name: 'Sécurtié',
    url:'#',
    authorities: ['ADMIN'],
    children: [
      {
        name: 'Profils',
        url: '/pages/securite/profils',
        authorities: ['ADMIN'],
      },
      {
        name: 'Utilisateurs',
        url: '/pages/securite/utilisateurs',
        authorities: ['ADMIN'],
      },
      {
        name: 'Droits',
        url: '/pages/securite/droits',
        authorities: ['ADMIN'],
      },
      {
        name: 'Audit',
        url: '/pages/securite/audits',
        authorities: ['ADMIN'],
      }
    ]
  },
];
