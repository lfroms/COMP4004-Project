import React from 'react';
import { Button, Modal } from 'antd';
import { OfferingEditForm } from '..';

interface Props {
  visible: boolean;
  onRequestClose?: () => void;
  initialCourseId?: string;
  initialTermId?: string;
}

export default function OfferingCreateModal(props: Props) {
  const { visible, onRequestClose, initialCourseId, initialTermId } = props;

  const handleFormSubmit = () => {
    // run mutation
    // refetchqueries on all queries that fetch offerings (directly and indirectly)
    onRequestClose?.();
  };

  return (
    <Modal
      title="New course offering"
      visible={visible}
      onOk={handleFormSubmit}
      onCancel={onRequestClose}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onRequestClose}>
          Cancel
        </Button>,
        <Button form="offeringEdit" key="submit" htmlType="submit" type="primary">
          Create
        </Button>,
      ]}
    >
      <OfferingEditForm initialCourseId={initialCourseId} initialTermId={initialTermId} />
    </Modal>
  );
}
