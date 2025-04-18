import  { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'

export interface IBank {
    id?: string;
    name: string;
    fullName: string;
    logoUrl?: string;
}

export default class Bank implements IBank {
    constructor(
        public id: string,
        public name: string,
        public fullName: string,
        public logoUrl?: string
    ) {}

    static firestoreConverter: FirestoreDataConverter<Bank> = {
        toFirestore(bank: Bank): DocumentData {
            const data = { ...bank } as any;
            delete data.id
            return data;
        },
        fromFirestore(
            snapshot: QueryDocumentSnapshot,
            options: SnapshotOptions
        ): Bank {
            const data = snapshot.data(options)!;
            return new Bank(
                snapshot.id,
                data.name,
                data.fullName,
                data.logoUrl
            );
        }
    }
}