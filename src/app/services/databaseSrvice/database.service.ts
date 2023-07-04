import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, docData, doc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { addDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: Firestore) { }

  // get data method
  getData(collectionName: any) {
    const users = collection(this.firestore, collectionName);
    return collectionData(users, { idField: 'id' });
  }

  // get data by id method
  getDataById(id: any, collectionName: any) {
    const query = doc(this.firestore, collectionName + `/${id}`);
    return docData(query, { idField: 'id' })
  }

  // insert data method
  async addData(data: any, collectionName: any) {
    const query = collection(this.firestore, collectionName);
    return addDoc(query, data)
  }

  // update data method
  async updateData(data: any, collectionName: any) {
    const query = doc(this.firestore, collectionName + `/${data.id}`);
    return updateDoc(query, data)
  }

  // delete data by id method
  async deleteData(id: any, collectionName: any) {
    const query = doc(this.firestore, collectionName + `/${id}`);
    return deleteDoc(query)
  }

  // get data by condition
  searchUserByEmailAndPassword(email: string, password: string, collectionName:any) {
    console.log("Inside Search Method======>", email, password)
    const usersCollection = collection(this.firestore, collectionName);
    // make condition 
    
    const q = query(usersCollection, where('Email', '==', email), where('Password', '==', password));
    return collectionData(q, { idField: 'id' });
  }

   checkEmail(email: string) {
    console.log("Inside Search Method======>", email)
    const usersCollection = collection(this.firestore, 'Users');
    const q = query(usersCollection, where('Email', '==', email));
    return collectionData(q, { idField: 'id' });
  }

  getDataByKey(value: string, key:any, collectionName:any) {
    console.log("Inside Search Method======>", value)
    const usersCollection = collection(this.firestore, collectionName);
    const q = query(usersCollection, where(key, '==', value));
    return collectionData(q, { idField: 'id' });
  }

  checkMobile(mobile: string) {
    console.log("Inside Search Method======>", mobile)
    const usersCollection = collection(this.firestore, 'Users');
    const mobileData = query(usersCollection, where('Mobile', '==', mobile));
    return collectionData(mobileData, { idField: 'id' });
  }

  getRoutes(userRole:any){
    console.log("Inside Search Method======>", userRole)
    const usersCollection = collection(this.firestore, 'routes');
    const q = query(usersCollection, where('userRole', '==', userRole));
    return collectionData(q, { idField: 'id' });
  }

}
