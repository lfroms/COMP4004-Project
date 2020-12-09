import React, { NamedExoticComponent } from 'react';
import Button, { ButtonType } from 'antd/lib/button';
import { Col, Divider, Row, Space, Typography } from 'antd';

import * as styles from './TitleBar.module.scss';

interface Action {
  elementId?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  text?: string;
  type?: ButtonType;
  onClick: () => void;
}

interface Props {
  title?: string;
  actions?: Action[];
}

function mapButtons(actions: Action[]) {
  return actions.map((action, index) => (
    <Button
      key={`titlebar-action-${index}`}
      id={action.elementId}
      icon={action.icon}
      type={action.type}
      disabled={action.disabled}
      onClick={action.onClick}
    >
      {action.text}
    </Button>
  ));
}

function Secondary(props: Props) {
  const { title, actions = [] } = props;

  return (
    <Row align="middle" gutter={12}>
      <Col flex={1}>
        <Divider orientation="left">{title}</Divider>
      </Col>
      <Col>
        <Space>{mapButtons(actions)}</Space>
      </Col>
    </Row>
  );
}

const TitleBar = function TitleBar(props: Props) {
  const { title, actions = [] } = props;

  return (
    <Row align="middle" gutter={12}>
      <Col flex={1}>
        <Typography.Title level={2}>{title}</Typography.Title>
      </Col>
      <Col>
        <Space className={styles.Actions}>{mapButtons(actions)}</Space>
      </Col>
    </Row>
  );
} as NamedExoticComponent<Props> & {
  Secondary: typeof Secondary;
};

TitleBar.Secondary = Secondary;

export default TitleBar;
