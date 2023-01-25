export const cutTooLongString = (string: string, howMuch: number) => {
    return string?.length > howMuch ?
    string?.slice(0, howMuch) + '...':
    string
}