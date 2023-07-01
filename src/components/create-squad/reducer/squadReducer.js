export default function squadReducer(squad, action)
{
    switch (action.type) {
        case 'add':
            return [
                ...squad, {
                    id : action.id,
                    name : action.name
                }
            ]
        case 'remove':
            return squad.filter(element => element.id !== action.id);
        case 'clean':
            return []
        default:
            return squad;
    }
}