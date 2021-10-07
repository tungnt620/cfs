import React from 'react';
import styles from './SubMenus.module.scss';
import SortByMenu from './SortByMenu';
import DataTypeMenu from './DataTypeMenu';

const SubMenus = ({ dataType, setDataType }) => {
  return (
    <div className={styles.homePageListMenu}>
      <SortByMenu />
      <DataTypeMenu dataType={dataType} setDataType={setDataType} />
    </div>
  );
};

export default SubMenus;
