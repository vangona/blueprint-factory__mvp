import { dbService } from "fBase";

export default async function saveTarget(targetId, targetData) {
  await dbService
    .collection('targets')
    .doc(targetId)
    .set(targetData);
}