import AdminService from "./AdminService";

class CryptoZombiesService extends AdminService {
    static _instance: CryptoZombiesService;

    public static get instance(): CryptoZombiesService {
        return this._instance || (this._instance = new CryptoZombiesService());
    }
}

export default CryptoZombiesService;
