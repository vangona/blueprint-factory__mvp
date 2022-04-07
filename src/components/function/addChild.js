import { dbService, firebaseInstance } from "fBase";

export default async function addChild(parentId, childId) {
  
  await dbService
    .collection('targets')
    .doc(parentId)
    .update({
      childs:
        firebaseInstance.firestore.FieldValue.arrayUnion(childId)
    });
}