import { Input, Modal, notification } from "antd";
import { useCallback, useState } from "react";
import { useZombieDetailContext } from "../context/ZombieDetailContextProvider";
import { debounce, isEmpty } from "lodash";

interface IChangeNameModal {
    showChangeNameModal: boolean;
    setShowChangeNameModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeNameModal: React.FC<IChangeNameModal> = ({ showChangeNameModal, setShowChangeNameModal }) => {
    const { zombie, changeName, loading } = useZombieDetailContext();
    const [newName, setNewName] = useState<string>('');

    const handleOk = useCallback(async () => {
        if (isEmpty(newName)) {
            notification.error({
                message: 'Error in change name',
                description: 'New name is empty',
            });
            return;
        }

        if (newName === zombie?.name) {
            notification.error({
                message: 'Error in change name',
                description: 'New name equal to current name',
            });
            return;
        }

        await changeName(newName);
        handleCancel();
    }, [newName]);

    const handleCancel = useCallback(() => {
        setShowChangeNameModal(false);
    }, []);

    return (
        <Modal title="Change Name" open={showChangeNameModal} onOk={debounce(handleOk, 200)} onCancel={handleCancel} loading={loading}>
            Current name: {zombie?.name}
            <Input placeholder="New name" value={newName} onChange={e => setNewName(e.target.value)} />
        </Modal>
    );
}

export default ChangeNameModal;
