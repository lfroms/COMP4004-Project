import React from 'react';
import { Button, Modal } from 'antd';
import { OfferingEditForm, OfferingEditFormData } from '..';

const FORM_NAME = 'offeringCreateForm';

interface Props {
  visible: boolean;
  onRequestClose?: () => void;
  initialCourseId?: string;
  initialTermId?: string;
}

export default function OfferingCreateModal(props: Props) {
  const { visible, onRequestClose, initialCourseId, initialTermId } = props;

  const handleFormSubmit = (data: OfferingEditFormData) => {
    console.log(data);
    // run mutation
    // refetchqueries on all queries that fetch offerings (directly and indirectly)
    onRequestClose?.();
  };

  return (
    <Modal
      title="New course offering"
      visible={visible}
      onCancel={onRequestClose}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onRequestClose}>
          Cancel
        </Button>,
        <Button form={FORM_NAME} key="submit" htmlType="submit" type="primary">
          Create
        </Button>,
      ]}
    >
      <OfferingEditForm
        name={FORM_NAME}
        onSubmit={handleFormSubmit}
        initialCourseId={initialCourseId}
        initialTermId={initialTermId}
      />
    </Modal>
  );
}
