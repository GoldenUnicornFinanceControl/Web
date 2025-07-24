export default interface Translation {
  commons: {
    search: string;
    save: string;
    cancel: string;
    loading: string;
    fillAllFields: string;
    currentPath: string;
    params: string;
    selectOption: (label: string) => string;
    default: string;
  };
  timeline: {
    title: string;
    balance: string;
    clearFilter: string;
    registryCount: string;
  };
  registry: {
    title: string;
    description: string;
    value: string;
    date: string;
    account: string;
    paid: string;
    messages: {
      saved: string;
    };
  }
  accounts: {
    title: string;
    showArchived: string;
    noAccounts: string;
    addAccount: string;
    editAccount: string;
    accountName: string;
    bank: string;
    initialBalance: string;
    accountColor: string;
    types: {
      label: string;
      current: string;
      savings: string;
      investment: string;
      cash: string;
    }
    accountUpdated: string;
    accountCreated: string;
    includeInTotal: string;
  };
  creditcards: {
    title: string;
    noCreditCards: string;
    addCreditCard: string;
    selectedInvoice: string;
  };
  categories: {
    title: string;
    addCategory: string;
    categoryName: string;
    parentCategory: string;
    categoryCreated: string;
  };
  login: {
    loginWithGoogle: string;
    loginWithApple: string;
  };
  groceries: {
    title: string;
    addItem: string;
    editItem: string;
    name: string;
    barcode: string;
    expirationDate: string;
    quantity: string;
    unit: string;
    paidPrice: string;
    purchaseDate: string;
    storageLocation: string;
    scanBarcode: string;
    itemCreated: string;
    productCreated: string;
  };
  settings: {
    title: string;
    data: string;
    privacy: string;
    exportData: string;
    exportingData: (filename: string, current: string, max: string) => string;
    databaseUsage: string;
    auth: string;
    logout: string;
    clearLocalCaches: string;
    theme: string;
    density: string;
    loadingDatabaseUsage: string;
    language: string;
    toggleEncryption: (isDisabled: boolean) => string;
    resavingWithEncryption: (filename: string, current: string, max: string) => string;
  };
  dashboard: {
    title: string;
    messages: {
      hello: string;
      otherThings: string;
      ideasWelcome: string;
    };
  };
}
