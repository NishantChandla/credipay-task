export const convertPriceFromCentsToUSD = (cents: number) => {
    return (cents / 100).toFixed(2);
}