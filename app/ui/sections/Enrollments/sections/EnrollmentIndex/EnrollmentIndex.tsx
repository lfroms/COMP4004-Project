import React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Spin } from 'antd';
import { gql, useQuery } from '@apollo/client';

import { EnrollmentIndexQuery } from './graphql/EnrollmentIndexQuery';
import { TitleBar } from 'components';
import { EnrollmentCard } from './components';

import * as styles from './EnrollmentIndex.module.scss';

const ENROLLMENTS = gql`
  query EnrollmentIndexQuery {
    currentUser {
      id
      enrollments {
        nodes {
          id
          role
          offering {
            id
            section
            course {
              id
              name
              code
            }
          }
        }
      }
    }
  }
`;

export default function EnrollmentIndex() {
  const { data, loading } = useQuery<EnrollmentIndexQuery>(ENROLLMENTS);
  const history = useHistory();

  if (!data || loading) {
    return (
      <div className={styles.Loading}>
        <Spin size="large" />
      </div>
    );
  }

  const items = data.currentUser?.enrollments.nodes?.map((enrollment, index) => {
    const role = `${enrollment?.role[0].toUpperCase()}${enrollment?.role.substr(1).toLowerCase()}`;

    return (
      <Col key={`enrollment-${index}`} xs={12} sm={11} md={9} lg={7}>
        <EnrollmentCard
          title={enrollment?.offering.course.name}
          subtitle={`${enrollment?.offering.course.code} ${enrollment?.offering.section}`}
          role={role}
          onClick={() => history.push(`/courses/${enrollment?.offering.id}`)}
          onConfirmUnenroll={() => {}}
        />
      </Col>
    );
  });

  return (
    <div className={styles.Content}>
      <TitleBar title="Courses" />
      <Row gutter={16} wrap>
        {items}
      </Row>
    </div>
  );
}
