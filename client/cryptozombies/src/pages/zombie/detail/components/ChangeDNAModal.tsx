import { Input, Modal, notification } from "antd";
import { useCallback, useState } from "react";
import { useZombieDetailContext } from "../context/ZombieDetailContextProvider";
import { debounce, isEmpty } from "lodash";

interface IChangeDNAModal {
    showChangeDNAModal: boolean;
    setShowChangeDNAModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeDNAModal: React.FC<IChangeDNAModal> = ({ showChangeDNAModal, setShowChangeDNAModal }) => {
    const { zombie, changeDna, loading } = useZombieDetailContext();
    const [newDna, setNewDna] = useState<string>('');

    const handleOk = useCallback(async () => {
        if (isEmpty(newDna)) {
            notification.error({
                message: 'Error in change dna',
                description: 'New dna is empty',
            });
            return;
        }

        if (newDna === zombie?.dna) {
            notification.error({
                message: 'Error in change dna',
                description: 'New dna equal to current dna',
            });
            return;
        }

        await changeDna(+newDna);
        handleCancel();
    }, [newDna]);

    const handleCancel = useCallback(() => {
        setShowChangeDNAModal(false);
    }, []);

    return (
        <Modal title="Change DNA" open={showChangeDNAModal} onOk={debounce(handleOk, 200)} onCancel={handleCancel} loading={loading}>
            Current dna: {zombie?.dna}
            <Input placeholder="New DNA" value={newDna} onChange={e => setNewDna(e.target.value)} />
        </Modal>
    );
}

export default ChangeDNAModal;
