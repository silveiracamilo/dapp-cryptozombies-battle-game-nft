import { useMemo } from "react";
import { Button, Dropdown, MenuProps } from "antd";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { addressFormat } from "utils/formatter";

const AccountDropdown = () => {
    const { address } = useAuthContext();
    const items: MenuProps['items'] = useMemo(() => [
        // {
        //   key: '1',
        //   label: (
        //     <a rel="noopener noreferrer" href="#">
        //       Logout
        //     </a>
        //   ),
        // },
    ], []);

    const addressFormatted = useMemo(() => {
        return addressFormat(address);
    }, [address]);

    return (
        <Dropdown menu={{ items }}>
            <Button>
                <FontAwesomeIcon icon={faGear} />
                {addressFormatted}
            </Button>
        </Dropdown>
    )
}

export default AccountDropdown;
