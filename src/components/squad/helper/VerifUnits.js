export function checkUnitNotPresent(unitName, squad)
{
    let present = false;
    if (squad.length) {
        squad.forEach(element => {
            if (element.name === unitName) {
                present = true;
                return true;
            }
        });
    }
    return present;
}

export function unitExist(unitName, currentList)
{
    let baseId = false;
    if (currentList.length) {
        currentList.forEach(element => {
            if (element.name === unitName) {
                baseId = element.baseId;
                return true;
            }
        });
    }
    return baseId;
}

export function getNameByBaseId(baseId, currentList)
{
    let name = false;
    if (currentList.length) {
        currentList.forEach(element => {
            if (element.baseId === baseId) {
                name = element.name;
                return true;
            }
        });
    }
    return name;
}

export function getIndexByNextId(squad, nextId)
{
    return squad.findIndex(element => element.id === nextId);
}