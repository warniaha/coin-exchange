import { calculateCostBasis } from "./costBasis";

describe('calculate basis costs', () => {
    const currentShares = 10;
    const currentCostBasis = 4;
    const newShares = 7;
    const newPrice = 5;
    const calculatedCostBasis = 4.411764705882353;
    const comparePrecision = 8;
    
    it('should properly calculate cost basis for adding initial shares', () => {
        const costBasis = calculateCostBasis(0, 0, currentShares, currentCostBasis);
        expect(costBasis).toEqual(currentCostBasis);
    });
    it('should properly calculate cost basis for adding new shares', () => {
        const costBasis = calculateCostBasis(currentShares, currentCostBasis, newShares, newPrice);
        expect(costBasis.toFixed(comparePrecision)).toEqual(calculatedCostBasis.toFixed(comparePrecision));
    });
    it('should properly calculate cost basis for selling shares', () => {
        const costBasis = calculateCostBasis(currentShares + newShares, calculatedCostBasis, -newShares, newPrice);
        expect(costBasis.toFixed(comparePrecision)).toEqual(currentCostBasis.toFixed(comparePrecision));
    });
    it('should properly calculate cost basis passing in 0 as new shares', () => {
        const costBasis = calculateCostBasis(currentShares, currentCostBasis, 0, newPrice);
        expect(costBasis).toEqual(currentCostBasis);
    });
    it('should properly calculate cost basis passing in 0 as new & old shares', () => {
        const costBasis = calculateCostBasis(0, currentCostBasis, 0, newPrice);
        expect(costBasis).toEqual(0);
    });
});