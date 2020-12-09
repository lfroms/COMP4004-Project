import React from 'react';
import { Spin } from 'antd';

import * as styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.Loading}>
      <Spin size="large" />
    </div>
  );
}
