import { notification, Spin } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import ISettings from "src/store/interface/admin/ISettings";
import CryptoZombiesService from "src/store/services/contract/cryptoZombie/CryptoZombiesService";

interface ISettingsContext {
    settings: ISettings
    setCooldownTime: (cooldownTime: number) => Promise<void>
    setLevelUpFee: (fee: bigint) => Promise<void>
    setChangeNameFee: (fee: bigint) => Promise<void>
    setChangeDNAFee: (fee: bigint) => Promise<void>
    setBaseUrlTokenURI: (baseUrl: string) => Promise<void>
    setTax: (tax: bigint) => Promise<void>
    setMinPrice: (price: bigint) => Promise<void>
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

    useEffect(() => {
        loadSettings();
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
    
    const setCooldownTime = useCallback(async (cooldownTime: number) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.setCooldownTime(cooldownTime);
            setSettings(s => ({ ...s as ISettings, cooldownTime }));
        } catch (error: any) {
            notification.error({
                message: 'Error in update cooldown time',
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
        settings,
        setCooldownTime,
        setLevelUpFee,
        setChangeNameFee,
        setChangeDNAFee,
        setBaseUrlTokenURI,
        setTax,
        setMinPrice,
    }), [settings]);

    return (
        <SettingsContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;
