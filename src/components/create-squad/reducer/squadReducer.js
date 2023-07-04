import { getIndexByNextId } from '../helper/VerifUnits'

export default function squadReducer(squad, action)
{
    switch (action.type) {
        case 'add':
            return [
                ...squad, {
                    id : action.id,
                    name : action.name,
                    baseId: action.baseId
                }
            ]
        case 'remove':
            return squad.filter(element => element.id !== action.id);
        case 'left': {
            const copySquad = [...squad]
            const indexElement = getIndexByNextId(squad, action.id);
            const elementToMove = copySquad[indexElement];
            copySquad[indexElement] = copySquad[indexElement-1];
            copySquad[indexElement-1] = elementToMove;
            return copySquad;
        }
        case 'right': {
            const copySquad = [ ...squad]   
            const indexElement = getIndexByNextId(squad, action.id)
            const elementToMove = copySquad[indexElement];
            copySquad[indexElement] = copySquad[indexElement+1];
            copySquad[indexElement+1] = elementToMove;
            return copySquad;
        }
        case 'clean':
            return []
        default:
            return squad;
    }
}