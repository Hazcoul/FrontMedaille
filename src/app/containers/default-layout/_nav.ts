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
    name: 'Paramétrage',
    title: true
  },
  {
    name: 'Médailles',
    url: '/param/medailles'
  },
  {
    name: 'Grades/Dignités',
    url: '/param/grades-dignites'
  },
  {
    name: 'Fournisseurs',
    url: '/param/fournisseurs'
  },
  {
    name: 'Ordonnateurs',
    url: '/param/ordonateurs'
  },
  {
    name: 'Distinctions',
    url: '/param/distinctions'
  },
  {
    name: 'Dépôt',
    url: '/param/dépots'
  },
  {
    name: 'Magasins',
    url: '/param/magasins'
  },
  {
    name: 'Détenteurs',
    url: '/param/detenteurs'
  },
  {
    name: 'Structure bénéficiaire',
    url: '/param/structure-beneficiaire'
  },
  {
    name: 'Statisques',
    title: true
  },
  {
    name: 'Statistiques',
    url: '/param/statistiques'
  },
  {
    name: 'États',
    url: '/param/etats'
  },
  {
    name: 'Sécurtié',
    title: true
  },
  {
    name: 'Profils',
    url: '/param/profils'
  },
  {
    name: 'Utilisateurs',
    url: '/param/utilisateurs'
  },
  {
    name: 'Droits',
    url: '/param/droits'
  },
  {
    name: 'Audit',
    url: '/param/audit'
  }
];
