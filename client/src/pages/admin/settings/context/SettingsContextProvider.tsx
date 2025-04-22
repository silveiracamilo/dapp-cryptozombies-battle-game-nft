import { notification, Spin } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import ISettings from "src/store/interface/admin/ISettings";
import CryptoZombiesService from "src/store/services/contract/cryptoZombies/CryptozombiesBattleService";

interface ISettingsContext {
    settings: ISettings
    withdraw: () => Promise<void>
    setCooldownTimeAttack: (cooldownTimeAttack: number) => Promise<void>
    setCooldownTimeFeeding: (cooldownTimeFeeding: number) => Promise<void>
    setMintFee: (mintFee: bigint) => Promise<void>
    setTotalAttackVictoryToGetReward: (totalAttackVictoryToGetReward: number) => Promise<void>
    setTotalFedToGetReward: (totalFedToGetReward: number) => Promise<void>
    setLevelUpFee: (fee: bigint) => Promise<void>
    setChangeNameFee: (fee: bigint) => Promise<void>
    setChangeDNAFee: (fee: bigint) => Promise<void>
    setBaseUrlTokenURI: (baseUrl: string) => Promise<void>
    setTax: (tax: bigint) => Promise<void>
    setMinPrice: (price: bigint) => Promise<void>
    balance: bigint
}

const SettingsContext = createContext<ISettingsContext>({} as ISettingsContext);

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettingsContext must be used within an SettingsContextProvider");
    }
    return context;
}

const SettingsContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<ISettings>({} as ISettings);
    const [balance, setBalance] = useState<bigint>(0n);

    useEffect(() => {
        loadSettings();
        getBalance();
    }, []);

    const loadSettings = useCallback(async () => {
        try {
            const settings = await CryptoZombiesService.instance.getSettings();
            setSettings(settings);
        } catch (error: any) {
            notification.error({
                message: 'Error in get settings',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    const getBalance = useCallback(async () => {
        try {
            const balance = await CryptoZombiesService.instance.getBalance();
            setBalance(balance);
        } catch (error: any) {
            notification.error({
                message: 'Error in get balance',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    const withdraw = useCallback(async () => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.withdraw();
            getBalance();
        } catch (error: any) {
            notification.error({
                message: 'Error in update Min Price',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setCooldownTimeAttack = useCallback(async (cooldownTimeAttack: number) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setCooldownTimeAttack(cooldownTimeAttack);
            setSettings(s => ({ ...s as ISettings, cooldownTimeAttack }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update cooldown time attack',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setCooldownTimeFeeding = useCallback(async (cooldownTimeFeeding: number) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setCooldownTimeFeeding(cooldownTimeFeeding);
            setSettings(s => ({ ...s as ISettings, cooldownTimeFeeding }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update cooldown time feeding',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setMintFee = useCallback(async (mintFee: bigint) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setMintFee(mintFee);
            setSettings(s => ({ ...s as ISettings, mintFee }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update create zombie fee',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setTotalAttackVictoryToGetReward = useCallback(async (totalAttackVictoryToGetReward: number) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setTotalAttackVictoryToGetReward(totalAttackVictoryToGetReward);
            setSettings(s => ({ ...s as ISettings, totalAttackVictoryToGetReward }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update total attack victory to get reward',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setTotalFedToGetReward = useCallback(async (totalFedToGetReward: number) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setTotalFedToGetReward(totalFedToGetReward);
            setSettings(s => ({ ...s as ISettings, totalFedToGetReward }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update total fed to get reward',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setLevelUpFee = useCallback(async (fee: bigint) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setLevelUpFee(fee);
            setSettings(s => ({ ...s as ISettings, levelUpFee: fee }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update Level Up Fee',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setChangeNameFee = useCallback(async (fee: bigint) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setChangeNameFee(fee);
            setSettings(s => ({ ...s as ISettings, changeNameFee: fee }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update Change Name Fee',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setChangeDNAFee = useCallback(async (fee: bigint) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setChangeDNAFee(fee);
            setSettings(s => ({ ...s as ISettings, changeDNAFee: fee }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update Change DNA Fee',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setBaseUrlTokenURI = useCallback(async (baseUrl: string) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setBaseUrlTokenURI(baseUrl);
            setSettings(s => ({ ...s as ISettings, baseUrlTokenURI: baseUrl }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update Base Url Token URI',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setTax = useCallback(async (tax: bigint) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setTax(tax);
            setSettings(s => ({ ...s as ISettings, tax }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update Tax',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const setMinPrice = useCallback(async (price: bigint) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setMinPrice(price);
            setSettings(s => ({ ...s as ISettings, minPrice: price }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update Min Price',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);


    const contextValue = useMemo(() => ({ 
        balance,
        settings,
        withdraw,
        setCooldownTimeAttack,
        setCooldownTimeFeeding,
        setMintFee,
        setTotalAttackVictoryToGetReward,
        setTotalFedToGetReward,
        setLevelUpFee,
        setChangeNameFee,
        setChangeDNAFee,
        setBaseUrlTokenURI,
        setTax,
        setMinPrice,
    }), [settings, balance]);

    return (
        <SettingsContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;
