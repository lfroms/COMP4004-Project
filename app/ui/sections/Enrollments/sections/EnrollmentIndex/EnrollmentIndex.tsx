import React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, message } from 'antd';
import { gql, useMutation, useQuery } from '@apollo/client';

import { EnrollmentIndexQuery } from './graphql/EnrollmentIndexQuery';
import {
  EnrollmentIndexUnenrollMutation,
  EnrollmentIndexUnenrollMutationVariables,
} from './graphql/EnrollmentIndexUnenrollMutation';
import { Loading, TitleBar } from 'components';
import { EnrollmentCard } from './components';

import * as styles from './EnrollmentIndex.module.scss';
import { createTermName } from 'helpers';

const ENROLLMENTS = gql`
  query EnrollmentIndexQuery {
    currentUser {
      id
      enrollments {
        nodes {
          id
          role
          deletedAt
          finalGrade
          offering {
            id
            section
            course {
              id
              name
              code
            }
            term {
              id
              startDate
              endDate
              registrationDeadline
            }
          }
        }
      }
    }
  }
`;

const UNENROLL = gql`
  mutation EnrollmentIndexUnenrollMutation($id: ID!) {
    deleteEnrollment(input: { id: $id }) {
      enrollment {
        id
        deletedAt
      }
      errors {
        message
      }
    }
  }
`;

export default function EnrollmentIndex() {
  const { data, loading } = useQuery<EnrollmentIndexQuery>(ENROLLMENTS);
  const history = useHistory();

  const [unenroll, { loading: unenrollLoading }] = useMutation<
    EnrollmentIndexUnenrollMutation,
    EnrollmentIndexUnenrollMutationVariables
  >(UNENROLL, {
    refetchQueries: ['EnrollmentIndexQuery'],
  });

  const handleConfirmUnenroll = (enrollmentId?: string) => async () => {
    if (enrollmentId) {
      const { data } = await unenroll({ variables: { id: enrollmentId } });
      data?.deleteEnrollment?.errors.forEach(error => message.error(error.message));
    }
  };

  if (!data || loading) {
    return <Loading />;
  }

  const items = data.currentUser?.enrollments.nodes?.map((enrollment, index) => {
    if (!enrollment) {
      return null;
    }

    const role = `${enrollment.role[0].toUpperCase()}${enrollment.role.substr(1).toLowerCase()}`;

    return (
      <Col key={`enrollment-${index}`} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
        <EnrollmentCard
          entityId={enrollment.id}
          title={enrollment.offering.course.name}
          subtitle={`${enrollment.offering.course.code} ${
            enrollment.offering.section
          } (${createTermName(
            enrollment.offering.term.startDate,
            enrollment.offering.term.endDate
          )})`}
          role={role}
          confirmMessage={
            new Date() < new Date(enrollment.offering.term.registrationDeadline)
              ? 'Are you sure you want to drop this course? You will receive a refund and your gpa will not be affected.'
              : 'Are you sure you want to drop this course? You will not receive a refund and you will have a final grade of WDN.'
          }
          onClick={() => history.push(`/courses/${enrollment.offering.id}`)}
          canUnenroll={enrollment.role === 'student' && !enrollment.finalGrade}
          onConfirmUnenroll={handleConfirmUnenroll(enrollment.id)}
          loading={unenrollLoading}
        />
      </Col>
    );
  });

  return (
    <div className={styles.Content}>
      <TitleBar title="Courses" />
      <Row gutter={[16, 16]} wrap>
        {items}
      </Row>
    </div>
  );
}
