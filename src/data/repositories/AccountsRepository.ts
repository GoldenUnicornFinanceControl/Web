import getRepositories from '.';
import RepositoryWithCrypt from './RepositoryWithCrypt';
import { Collections } from '../../data/firebase/Collections'

import { Account, InvoiceRegistry, RegistryWithDetails } from '@models';

export default class AccountsRepository extends RepositoryWithCrypt<Account> {

  private static balanceCache: { [key: string]: number } = {};

  constructor() {
    super(`${Collections.Users}/{userId}/${Collections.Accounts}`, Account);
  }

  public getAccountBalance(accountId?: string, showArchived: boolean = false): number {
    if (AccountsRepository.balanceCache[accountId || '']) {
      return AccountsRepository.balanceCache[accountId || ''];
    }
    return this.getAccountItems(accountId, showArchived).balance;
  }

  public getAccountItems(
    accountId?: string,
    showArchived: boolean = false,
    startDate?: Date,
    endDate?: Date,
  ): {
    registries: RegistryWithDetails[],
    balance: number
  } {
    const { categories, accountRegistries, creditCards, creditCardsInvoices } = getRepositories();

    const debit = accountRegistries.getCache()
      .filter(registry => accountId
          ? registry.accountId === accountId
          : showArchived || !this.getLocalById(registry.accountId)?.archived
      )
      .map<RegistryWithDetails>((registry) => ({
        registry,
        category: categories.getLocalById(registry.categoryId),
        sourceName: this.getLocalById(registry.accountId)?.name || 'Unknown Source',
      }));

    const credit = creditCardsInvoices.getCache()
      .filter(registry => !accountId || registry.paymentAccountId === accountId)
      .map<RegistryWithDetails>((invoice) => ({
        registry: new InvoiceRegistry(invoice, creditCards.getLocalById(invoice.cardId)!),
        category: categories.getLocalById(InvoiceRegistry.categoryId),
        sourceName: this.getLocalById(invoice.paymentAccountId)?.name || 'Unknown Source',
      }));

    const allRegistries = ([...debit, ...credit])
      .filter((item) => !endDate || item.registry.date.getTime() <= endDate.getTime())
      .sort(({registry: {date: a}}, {registry: {date: b}}) => b.getTime() - a.getTime());

    const registries = allRegistries
      .filter(item => !startDate || item.registry.date.getTime() >= startDate.getTime());

    return {
      registries,
      balance: AccountsRepository.balanceCache[accountId || ''] = allRegistries.reduce((acc, item) =>
        item.registry.paid ? acc + item.registry.value : acc,
        this.getLocalById(accountId)?.initialBalance ?? 0
      )
    };
  }

  public getCache(showArchived: boolean = false): Account[] {
    return super.getCache().filter(account => showArchived || !account.archived);
  }
}
