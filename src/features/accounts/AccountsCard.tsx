import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Card from "@components/visual/Card"
import BankInfo from "../banks/BankInfo"

import { Bank, Account } from "@models"
import getRepositories from "@repositories"

export interface WithInfoAccount extends Account {
  bank: Bank
}

const AccountsCard: React.FC<{}> = () => {
  const [accounts, setAccounts] = useState<WithInfoAccount[]>([])
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    const { accounts: accountsRepo, banks } = getRepositories();

    setAccounts(
      accountsRepo.getCache(showArchived).map(account => {
        return {
          ...account,
          bank: new Bank(
            account.bankId, account.name, '',
            banks.getLocalById(account.bankId)?.logoUrl
          )
        }
      })
    )
  }, [showArchived])

  return <>
    <div>
      <label><input onChange={() => setShowArchived(!showArchived)} type="checkbox" checked={showArchived} /> {Lang.accounts.showArchived}</label>
    </div>
    <Link to={'/accounts'}>{Lang.accounts.title}</Link>
    <Card>
      {accounts.map(account => 
        <AccountItem key={account.id} account={account} />
      )}
      {accounts.length === 0 && <div className="centerInfo">{Lang.accounts.noAccounts}</div>}
      <div style={{ textAlign: 'right' }}>
        <Link to={'/accounts/create'}>{Lang.accounts.addAccount}</Link>
      </div>
    </Card>
  </>
}

interface AccountItemParams {
  account: WithInfoAccount,
}
const AccountItem = ({ account }: AccountItemParams) => {

  const [balance, setBalance] = useState<number|true>(true)

  useEffect(() => {
      const { accounts } = getRepositories();
      setBalance(accounts.getAccountBalance(account.id))
  }, [account.id]);

  return <Link to={'/main/timeline/' + account.id} key={account.id}>
    <BankInfo bank={account.bank} balance={balance} />
  </Link>
}

export default AccountsCard
