import { Tabs, TabsProps } from "antd";
import FactoryForm from "./forms/FactoryForm";
import HelperForm from "./forms/HelperForm";
import OwnershipForm from "./forms/OwnershipForm";
import MarketForm from "./forms/MarketForm";
import { useMemo } from "react";
import DashboardForm from "./forms/DashboardForm";

const SettingsTabs = () => {
    const items: TabsProps['items'] = useMemo(() =>[
        {
          key: 'dashboard',
          label: 'Dashboard',
          children: <DashboardForm />,
        },
        {
          key: 'factory',
          label: 'Factory',
          children: <FactoryForm />,
        },
        {
          key: 'helper',
          label: 'Helper',
          children: <HelperForm />,
        },
        {
          key: 'ownership',
          label: 'Ownership',
          children: <OwnershipForm />,
        },
        {
          key: 'market',
          label: 'Market',
          children: <MarketForm />,
        },
    ], []);

    return (
        <Tabs style={{ width: '100%' }} items={items} defaultActiveKey="dashboard" />
    )
}

export default SettingsTabs;
