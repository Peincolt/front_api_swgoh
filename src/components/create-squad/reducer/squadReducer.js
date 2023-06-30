export default function squadReducer(squad, action)
{
    console.log(action)
    switch (action.type) {
        case 'add':
            return [
                ...squad, {
                    id : action.id,
                    name : action.name
                }
            ]

        case 'edit':
            /*squad.map(element => {
                if (element.id === action.id) {
                    element.
                }
            })*/
            break;
        case 'remove':
            return squad.filter(element => element.id !== action.id);
        default:
            return squad;
    }
}