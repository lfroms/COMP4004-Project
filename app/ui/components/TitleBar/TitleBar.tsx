import React from 'react';
import Button, { ButtonType } from 'antd/lib/button';
import { Col, Row, Space, Typography } from 'antd';

import * as styles from './TitleBar.module.scss';

interface Action {
  elementId?: string;
  icon?: React.ReactNode;
  text?: string;
  type?: ButtonType;
  onClick: () => void;
}

interface Props {
  title: string;
  actions?: Action[];
}

export default function TitleBar(props: Props) {
  const { title, actions = [] } = props;

  const buttons = actions.map((action, index) => (
    <Button
      key={`titlebar-action-${index}`}
      id={action.elementId}
      icon={action.icon}
      type={action.type}
      onClick={action.onClick}
    >
      {action.text}
    </Button>
  ));

  return (
    <Row align="middle" gutter={12}>
      <Col flex={1}>
        <Typography.Title level={2}>{title}</Typography.Title>
      </Col>
      <Col>
        <Space className={styles.Actions}>{buttons}</Space>
      </Col>
    </Row>
  );
}
