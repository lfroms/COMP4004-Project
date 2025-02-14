import React, { NamedExoticComponent } from 'react';
import Button, { ButtonType } from 'antd/lib/button';
import { Col, Divider, Row, Space, Typography } from 'antd';
import Popconfirm, { PopconfirmProps } from 'antd/lib/popconfirm';

import * as styles from './TitleBar.module.scss';

interface Action {
  elementId?: string;
  disabled?: boolean;
  danger?: boolean;
  hidden?: boolean;
  icon?: React.ReactNode;
  text?: string;
  type?: ButtonType;
  onClick?: () => void;
  popConfirm?: PopconfirmProps;
}

interface Props {
  title?: string;
  actions?: Action[];
}

function mapButtons(actions: Action[]) {
  return actions.map((action, index) => {
    if (action.hidden) {
      return null;
    }

    const button = (
      <Button
        key={`titlebar-action-${index}`}
        id={action.elementId}
        icon={action.icon}
        type={action.type}
        disabled={action.disabled}
        onClick={action.onClick}
        danger={action.danger}
      >
        {action.text}
      </Button>
    );

    if (action.popConfirm) {
      return <Popconfirm {...action.popConfirm}>{button}</Popconfirm>;
    }

    return button;
  });
}

function Secondary(props: Props) {
  const { title, actions = [] } = props;

  if (actions.length === 0) {
    return <Divider orientation="left">{title}</Divider>;
  }

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
