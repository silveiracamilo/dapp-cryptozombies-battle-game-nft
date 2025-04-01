import { IKitty } from "../interface/cryptokitties/IKitty";

export const nameState = "cryptokitties";

export interface ICryptoKittiesReducer {
  kitties: IKitty[];
}

export const initialState: ICryptoKittiesReducer = {
  kitties: [],
};

export interface IGetKittiesResponse {
    kitties: IKitty[];
    limit: number;
    offset: number;
    total: number;
}
