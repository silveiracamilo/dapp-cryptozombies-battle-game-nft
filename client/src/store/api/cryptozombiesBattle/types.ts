export const nameState = "cryptozombiesBattle";

export interface ICryptozombiesBattleReducer {
  proofRoot: IGetProofRootResponse | undefined;
  proofAddress: IGetProofAddressResponse | undefined;
}

export const initialState: ICryptozombiesBattleReducer = {
  proofRoot: undefined,
  proofAddress: undefined
};

export interface IGetProofRootResponse {
  root: string;
}

export interface IGetProofAddressResponse {
  valid: boolean;
  proof: string[];
  root: string;
}
