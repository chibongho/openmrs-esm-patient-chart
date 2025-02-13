import { Button, Loading } from '@carbon/react';
import { showModal, useVisit } from '@openmrs/esm-framework';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './visit-context-header.scss';
import VisitContextInfo from './visit-context-info.component';

interface VisitContextHeaderProps {
  patientUuid: string;
}

const VisitContextHeader: React.FC<VisitContextHeaderProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { visitInContext, isLoading } = useVisit(patientUuid);
  const isActiveVisit = !Boolean(visitInContext?.stopDatetime);

  const openVisitSwitcherModal = () => {
    const dispose = showModal('visit-context-switcher-modal', {
      patientUuid,
      closeModal: () => dispose(),
      size: 'sm',
    });
  };

  if (isLoading) {
    return (
      <div className={styles.visitContextHeader}>
        <Loading small />;
      </div>
    );
  }
  return (
    <div
      className={classNames(styles.visitContextHeader, isActiveVisit ? styles.activeVisit : styles.retroactiveVisit)}
    >
      <div className={styles.addingTo}>{t('addingToVisit', 'Adding to:')}</div>
      <div className={styles.visitType}>{visitInContext?.visitType?.display}</div>
      <div className={styles.changeVisitButton}>
        <Button kind="ghost" size="sm" onClick={openVisitSwitcherModal}>
          {t('change', 'Change')}
        </Button>
      </div>
      <div className={styles.visitInfo}>
        <VisitContextInfo visit={visitInContext} />
      </div>
    </div>
  );
};

export default VisitContextHeader;
