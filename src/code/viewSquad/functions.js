function colorSpan(gear_level)
{
    switch (gear_level) {
        case 13:
            return 'red';

        case 12 :
            return 'yellow';

        default:
            return 'violet';

    }
}

export { colorSpan }