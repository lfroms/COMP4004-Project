import React from 'react';
import { LoginOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Card, Popconfirm, Space, Tag } from 'antd';
import { blue, green, purple, red } from '@ant-design/colors';

interface Props {
  title?: string;
  subtitle?: string;
  role?: string;
  canUnenroll?: boolean;
  onClick?: () => void;
  onConfirmUnenroll?: () => void;
}

const COLORS = [red[3], green[4], blue[3], purple[3]];

export default function EnrollmentCard(props: Props) {
  const { title, subtitle, role, canUnenroll = false, onClick, onConfirmUnenroll } = props;

  const backgroundColor = COLORS[Math.round((title?.length ?? 0) % COLORS.length)];

  return (
    <Card
      hoverable
      onClick={onClick}
      cover={
        <div
          style={{
            backgroundColor,
            height: 230,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
      }
      actions={[
        <LoginOutlined key="view" />,
        ...(canUnenroll
          ? [
              <div onClick={e => e.stopPropagation()} key="unenroll">
                <Popconfirm
                  title="Are you sure you want to unenroll in this course?"
                  placement="top"
                  okText="Confirm"
                  onConfirm={onConfirmUnenroll}
                  cancelText="Cancel"
                >
                  <UserDeleteOutlined />
                </Popconfirm>
              </div>,
            ]
          : []),
      ]}
    >
      <Card.Meta
        title={title}
        description={
          <Space size="small">
            <Tag color={canUnenroll ? 'default' : 'purple'} style={{ cursor: 'pointer' }}>
              {role}
            </Tag>
            <span>{subtitle}</span>
          </Space>
        }
      />
    </Card>
  );
}
