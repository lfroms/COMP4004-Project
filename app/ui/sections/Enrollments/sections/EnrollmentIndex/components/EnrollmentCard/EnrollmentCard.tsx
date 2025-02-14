import React from 'react';
import { LoginOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Card, Popconfirm, Space, Tag } from 'antd';
import { createCourseColor } from 'helpers';

interface Props {
  entityId: string;
  title?: string;
  subtitle?: string;
  role?: string;
  canUnenroll?: boolean;
  confirmMessage?: string;
  onClick?: () => void;
  onConfirmUnenroll?: () => void;
  loading?: boolean;
}

export default function EnrollmentCard(props: Props) {
  const {
    title,
    entityId,
    subtitle,
    role,
    canUnenroll = false,
    confirmMessage = 'Are you sure you want to unenroll in this course?',
    onClick,
    onConfirmUnenroll,
    loading,
  } = props;

  return (
    <Card
      hoverable
      onClick={onClick}
      cover={
        <div
          style={{
            backgroundColor: createCourseColor(title),
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
                  title={confirmMessage}
                  placement="top"
                  okText="Confirm"
                  onConfirm={onConfirmUnenroll}
                  okButtonProps={{ loading }}
                  cancelText="Cancel"
                >
                  <UserDeleteOutlined id={`unenroll_button_${entityId}`} />
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
            <Tag color={role === 'Student' ? 'default' : 'purple'} style={{ cursor: 'pointer' }}>
              {role}
            </Tag>
            <span>{subtitle}</span>
          </Space>
        }
      />
    </Card>
  );
}
