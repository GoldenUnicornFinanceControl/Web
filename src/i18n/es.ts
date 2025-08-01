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
    gohome: 'Volver al inicio',
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
    addItem: 'Agregar Artículo',
    editItem: 'Editar Artículo',
    name: 'Nombre',
    barcode: 'Código de Barras',
    expirationDate: 'Vencimiento',
    quantity: 'Cantidad',
    unit: 'Unidad',
    paidPrice: 'Precio Pagado',
    purchaseDate: 'Fecha de Compra',
    storageLocation: 'Ubicación',
    scanBarcode: 'Escanear Código',
    itemCreated: 'Artículo guardado',
    productCreated: 'Producto guardado',
    expired: 'Vencido',
    expiringSoon: 'Próximo a vencer',
    thisWeek: 'Esta semana',
    thisMonth: 'Este mes',
    valid: 'Válido',
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
    toggleEncryption: (disabled: boolean) => disabled ? 'Habilitar Cifrado (DEV only)' : 'Deshabilitar Cifrado (DEV only)',
    resavingWithEncryption: (filename: string, current: string, max: string) => `Guardando nuevamente ${filename} (${current}/${max})...`,
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
