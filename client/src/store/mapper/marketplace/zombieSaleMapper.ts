import IZombieSale from "@/store/interface/marketplace/IZombieSale";

export const zombieSaleMapper = (zombieSale: (string | number | bigint)[]): IZombieSale => ({
    seller: zombieSale[0] as string,
    zombieId: zombieSale[1] as number,
    price: zombieSale[2] as bigint,
});