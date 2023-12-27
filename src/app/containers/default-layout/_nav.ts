import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Tableau de bord',
    url: '/dashboard'
  },
  {
    name: 'Mouvement de stock',
    url:'#',
    children: [
      {
        name: 'Entree',
        url: '/mouvement/entree'
      },
      {
        name: 'Sortie',
        url: '/mouvement/sortie'
      },
    ]
  },
  {
    name: 'Paramétrage',
    url:'#',
    children: [
      {
        name: 'Bénéficiaire',
        url: '/parametre/beneficiaire'
      },
      {
        name: 'Détenteurs',
        url: '/parametre/detenteur'
      },
      {
        name: 'Ordonnateurs',
        url: '/parametre/ordonnateur'
      },
      {
        name: 'Médailles',
        url: '/parametre/medaille'
      },
      {
        name: 'Grades/Dignités',
        url: '/parametre/grade'
      },
      {
        name: 'Fournisseurs',
        url: '/parametre/fournisseur'
      },
      {
        name: 'Distinctions',
        url: '/parametre/distinction'
      },
      {
        name: 'Dépôt',
        url: '/parametre/depot'
      },
      {
        name: 'Magasins',
        url: '/parametre/magasin'
      },
    ]
  },

  {
    name: 'Statistiques',
    url:'#',
    children: [
      {
        name: 'Statistiques',
        url: '/stats/statistiques'
      },
      {
        name: 'États',
        url: '/stats/etats'
      },
    ]
  },

  {
    name: 'Sécurtié',
    url:'#',
    children: [
      {
        name: 'Profils',
        url: '/pages/securite/profils'
      },
      {
        name: 'Utilisateurs',
        url: '/pages/securite/utilisateurs'
      },
      {
        name: 'Droits',
        url: '/pages/securite/droits'
      },
      {
        name: 'Audit',
        url: '/pages/securite/audits'
      }
    ]
  },
];
