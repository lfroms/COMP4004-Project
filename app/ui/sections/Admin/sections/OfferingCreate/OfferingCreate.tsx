import React from 'react';

import { Typography } from 'antd';

import { OfferingEditForm } from 'sections/Admin/components';

export default function OfferingCreate() {
  return (
    <>
      <Typography.Title level={2}>New offering</Typography.Title>
      <OfferingEditForm onFinish={() => null} />
    </>
  );
}
