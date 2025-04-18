import Bank from '../models/Bank'
import { Collections } from '../../data/firebase/Collections'
import BaseRepository from './BaseRepository';

class BanksRepository extends BaseRepository<Bank> {
    
    protected cacheDuration = 30 * 24 * 60 * 60 * 1000;

    constructor() {
        super(Collections.Banks, Bank.firestoreConverter, true)
    }

    public getFiltered = async (search: string) => {
        return this.getCache().filter(bank =>
            bank.name.prepareCompare().includes(search.prepareCompare()) ||
            bank.fullName.prepareCompare().includes(search.prepareCompare())
        )
    }

}

export default BanksRepository
