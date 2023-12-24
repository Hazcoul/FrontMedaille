import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Tableau de bord',
    url: '/dashboard'
  },
  {
    title: true,
    name: 'Mouvement de stock'
  },
  {
    name: 'Entree',
    url: '/mouvement/entree'
  },
  {
    name: 'Sortie',
    url: '/mouvement/sortie'
  },
  {
    name: 'parametresétrage',
    title: true
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
    name: 'Ordonnateurs',
    url: '/parametres/ordonateurs'
  },
  {
    name: 'Distinctions',
    url: '/parametres/distinctions'
  },
  {
    name: 'Dépôt',
    url: '/parametres/dépots'
  },
  {
    name: 'Magasins',
    url: '/parametres/magasins'
  },
  {
    name: 'Détenteurs',
    url: '/parametres/detenteurs'
  },
  {
    name: 'Structure bénéficiaire',
    url: '/parametres/beneficiaire'
  },
  {
    name: 'Statisques',
    title: true
  },
  {
    name: 'Statistiques',
    url: '/parametres/statistiques'
  },
  {
    name: 'États',
    url: '/parametres/etats'
  },
  {
    name: 'Sécurtié',
    title: true
  },
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
];
