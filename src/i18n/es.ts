import Translation from './base';

const es: Translation = {
  commons: {
    search: 'Buscar',
    loading: 'Cargando...',
    fillAllFields: 'Rellene todos los campos',
    cancel: 'Cancelar',
    save: 'Guardar',
    currentPath: 'Ruta Actual',
    params: 'Parámetros',
    selectOption: (label: string) => `Seleccione la opción para ${label}`,
    default: 'Predeterminado',
  },
  timeline: {
    title: 'Cronología',
    balance: 'Saldo',
    clearFilter: 'Mostrar todo',
    registryCount: 'Registros',
  },
  accounts: {
    title: 'Cuentas',
    showArchived: 'Mostrar Archivados',
    noAccounts: 'No hay cuentas registradas aún.',
    addAccount: 'Agregar Cuenta',
    editAccount: 'Editar Cuenta',
    accountName: 'Nombre de la Cuenta',
    bank: 'Banco',
    initialBalance: 'Saldo Inicial',
    accountColor: 'Color de la Cuenta',
    includeInTotal: 'Incluir en el Total',
    accountUpdated: 'Cuenta actualizada con éxito',
    accountCreated: 'Cuenta creada con éxito',
    types: {
      label: 'Tipos',
      current: 'Corriente',
      savings: 'Ahorros',
      investment: 'Inversión',
      cash: 'Efectivo',
    },
  },
  creditcards: {
    title: 'Tarjetas de Crédito',
    noCreditCards: 'No hay tarjetas de crédito registradas aún.',
    addCreditCard: 'Agregar Tarjeta de Crédito',
    selectedInvoice: 'Factura Seleccionada',
  },
  categories: {
    title: 'Categorías',
    addCategory: 'Agregar Categoría',
    categoryName: 'Nombre de la Categoría',
    parentCategory: 'Categoría Principal',
    categoryCreated: 'Categoría creada con éxito',
  },
  groceries: {
    title: 'Supermercado',
  },
  login: {
    loginWithGoogle: 'Iniciar sesión con Google',
    loginWithApple: 'Iniciar sesión con Apple ID',
  },
  settings: {
    title: 'Configuraciones',
    data: 'Datos',
    privacy: 'Privacidad',
    exportData: 'Exportar Mis Datos',
    exportingData: (filename: string, current: string, max: string) =>
      `Exportando ${filename} (${current}/${max})%`,
    databaseUsage: 'Uso de la Base de Datos',
    auth: 'Autenticación',
    logout: 'Cerrar sesión',
    clearLocalCaches: 'Borrar cachés locales',
    theme: 'Tema',
    density: 'Densidad',
    loadingDatabaseUsage: 'Cargando uso de la base de datos...',
    language: 'Idioma',
  },
  dashboard: {
    title: 'Tablero',
    messages: {
      hello: 'Hola',
      otherThings: 'Otras cosas',
      ideasWelcome: 'Las ideas son bienvenidas',
    },
  },
  registry: {
    title: 'Registro',
    description: 'Descripción',
    value: 'Valor',
    date: 'Fecha',
    account: 'Cuenta',
    paid: 'Pagado',
    messages: {
      saved: 'Registro guardado con éxito',
    },
  },
};

export default es;
