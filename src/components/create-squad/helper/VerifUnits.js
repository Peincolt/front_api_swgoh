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
    let exist = false;
    if (currentList.length) {
        currentList.forEach(element => {
            if (element.name == unitName) {
                exist = true;
                return true;
            }
        });
    }
    return exist;
}