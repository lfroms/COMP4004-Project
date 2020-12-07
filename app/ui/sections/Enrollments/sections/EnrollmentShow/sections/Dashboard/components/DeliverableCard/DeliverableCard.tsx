import React from 'react';
import { Card, Typography } from 'antd';
import { createFriendlyDate } from 'helpers';

interface Props {
  title: string;
  description: string;
  dueDate: string;
  onClick: () => void;
}

export default function DeliverableCard(props: Props) {
  const { title, description, dueDate, onClick } = props;

  const titleMarkup = (
    <>
      <Typography.Text>{title}</Typography.Text>
      <Typography.Text type="secondary"> - Due {createFriendlyDate(dueDate)}</Typography.Text>
    </>
  );

  return (
    <Card
      cover={<div style={{ backgroundColor: '#ddd', height: 70 }} />}
      onClick={onClick}
      hoverable
    >
      <Card.Meta title={titleMarkup} description={description} />
    </Card>
  );
}
