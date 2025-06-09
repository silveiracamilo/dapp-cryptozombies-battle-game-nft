import ISettings from "@/store/interface/admin/ISettings";
import OwnershipService from "./OwnershipService";
import CryptozombiesBattleMarketService from "../cryptozombiesBattleMarket/CryptozombiesBattleMarketService";

class AdminService extends OwnershipService {

    public async getSettings(): Promise<ISettings> {
        const settingsList = await Promise.all([
            this.getCooldownTimeAttack(),
            this.getCooldownTimeFeeding(),
            this.getMintFee(),
            this.getTotalAttackVictoryToGetReward(),
            this.getTotalFedToGetReward(),
            this.getLevelUpFee(),
            this.getChangeNameFee(),
            this.getChangeDNAFee(),
            this.getBaseUrlTokenURI(),
            this.getMerkleRoot(),
            CryptozombiesBattleMarketService.instance.getTax(),
            CryptozombiesBattleMarketService.instance.getMinPrice(),
            CryptozombiesBattleMarketService.instance.getBalance(),
        ]);

        return {
            cooldownTimeAttack: parseInt(settingsList[0]),
            cooldownTimeFeeding: parseInt(settingsList[1]),
            mintFee: settingsList[2],
            totalAttackVictoryToGetReward: parseInt(settingsList[3]),
            totalFedToGetReward: parseInt(settingsList[4]),
            levelUpFee: settingsList[5],
            changeNameFee: settingsList[6],
            changeDNAFee: settingsList[7],
            baseUrlTokenURI: settingsList[8],
            merkleRoot: settingsList[9],
            tax: settingsList[10],
            minPrice: settingsList[11],
            balanceMarket: settingsList[12],
        };
    }
}

export default AdminService;
