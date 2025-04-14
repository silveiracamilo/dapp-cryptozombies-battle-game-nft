import ISettings from "src/store/interface/admin/ISettings";
import MarketService from "./MarketService";

class AdminService extends MarketService {

    public async getSettings(): Promise<ISettings> {
        const settingsList = await Promise.all([
            this.getCooldownTime(),
            this.getLevelUpFee(),
            this.getChangeNameFee(),
            this.getChangeDNAFee(),
            this.getBaseUrlTokenURI(),
            this.getTax(),
            this.getMinPrice(),
        ]);

        return {
            cooldownTime: parseInt(settingsList[0]),
            levelUpFee: settingsList[1],
            changeNameFee: settingsList[2],
            changeDNAFee: settingsList[3],
            baseUrlTokenURI: settingsList[4],
            tax: settingsList[5],
            minPrice: settingsList[6],
        };
    }
}

export default AdminService;
