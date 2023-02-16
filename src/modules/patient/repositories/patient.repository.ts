import { Patient } from './../entities/patient.entity';

export interface IPatientRepository {
    
    save(data: Patient): Promise<Patient>
    findByDocument(document: string): Promise<Patient | null>
    findById(id: string): Promise<Patient | null>
    findByUserId(userId: string): Promise<Patient | null>
    findByDocumentOrEmail(document: string, email: string): Promise<Patient | null>
}