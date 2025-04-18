import ISettings from "src/store/interface/admin/ISettings";
import MarketService from "./MarketService";

class AdminService extends MarketService {

    public async getSettings(): Promise<ISettings> {
        const settingsList = await Promise.all([
            this.getCooldownTimeAttack(),
            this.getCooldownTimeFeeding(),
            this.getCreateZombieFee(),
            this.getTotalAttackVictoryToGetReward(),
            this.getTotalFedToGetReward(),
            this.getLevelUpFee(),
            this.getChangeNameFee(),
            this.getChangeDNAFee(),
            this.getBaseUrlTokenURI(),
            this.getTax(),
            this.getMinPrice(),
        ]);

        return {
            cooldownTimeAttack: parseInt(settingsList[0]),
            cooldownTimeFeeding: parseInt(settingsList[1]),
            createZombieFee: settingsList[2],
            totalAttackVictoryToGetReward: parseInt(settingsList[3]),
            totalFedToGetReward: parseInt(settingsList[4]),
            levelUpFee: settingsList[5],
            changeNameFee: settingsList[6],
            changeDNAFee: settingsList[7],
            baseUrlTokenURI: settingsList[8],
            tax: settingsList[9],
            minPrice: settingsList[10],
        };
    }
}

export default AdminService;
