export default function updateLocalTarget(targetId, targetObj) {
  const localTargets = JSON.parse(localStorage.getItem('blueprint-factory_target'));

  for (let i = 0; i < localTargets.length; i++) {
    if (localTargets[i].id === targetId) {
      console.log(targetObj);
      localTargets[i] = targetObj;
    }
  }

  localStorage.setItem('blueprint-factory_target', JSON.stringify(localTargets));
}