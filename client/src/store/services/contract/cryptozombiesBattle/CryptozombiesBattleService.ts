import AdminService from "./AdminService";

class CryptozombiesBattleService extends AdminService {
    static _instance: CryptozombiesBattleService;

    public static get instance(): CryptozombiesBattleService {
        return this._instance || (this._instance = new CryptozombiesBattleService());
    }
}

export default CryptozombiesBattleService;
