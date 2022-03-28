import { dbService } from "fBase";
import { Navigate } from "react-router-dom";
import updateLocalTarget from "./updateLocalTarget";

export default async function updateTarget(targetId, targetData) {
  updateLocalTarget(targetId, targetData);
  await dbService
    .collection('targets')
    .doc(targetId)
    .update(targetData);
}