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
        url: '/parametres/medailles'
      },
      {
        name: 'Grades/Dignités',
        url: '/parametres/grades-dignites'
      },
      {
        name: 'Fournisseurs',
        url: '/parametres/fournisseurs'
      },
      {
        name: 'Distinctions',
        url: '/parametres/distinctions'
      },
      {
        name: 'Dépôt',
        url: '/parametre/depot'
      },
      {
        name: 'Magasins',
        url: '/parametres/magasins'
      },
    ]
  },
  
  {
    name: 'Statistiques',
    url:'#',
    children: [
      {
        name: 'Statistiques',
        url: '/parametre/statistiques'
      },
      {
        name: 'États',
        url: '/parametres/etats'
      },
    ]
  },
  
  {
    name: 'Sécurtié',
    url:'#',
    children: [
      {
        name: 'Profils',
        url: '/parametres/profils'
      },
      {
        name: 'Utilisateurs',
        url: '/parametres/utilisateurs'
      },
      {
        name: 'Droits',
        url: '/parametres/droits'
      },
      {
        name: 'Audit',
        url: '/parametres/audit'
      }
    ]
  },
];
