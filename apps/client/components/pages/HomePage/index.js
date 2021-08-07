import React from 'react';
import { CfsList, Dropdown } from '@cfs/ui';
import styles from './HomePage.module.scss';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const categories = [
  {
    id: 1,
    name: 'Tất cả',
  },
  {
    id: 2,
    name: 'NEU confession',
  },
  {
    id: 3,
    name: 'KTX ĐHQG Confessions',
  },
  {
    id: 4,
    name: 'BK Confessions',
  },
  {
    id: 5,
    name: 'Confession Ngôn Tình',
  },
  {
    id: 6,
    name: 'GOT7 Vietnamese Confessions',
  },
];

const HomePage = () => {
  return (
    <div className="ml-4 mr-4 mb-6 bg-color1">
      <div className="block mt-4 bg-white pb-4">
        <div className={styles.homePageListMenu}>
          <Dropdown btnText={'Chọn'} />
        </div>
        <div className={styles.homePageListCategories}>
          <Tabs defaultActiveKey="1">
            {categories.map((cat) => (
              <TabPane tab={cat.name} key={cat.id}>
                <CfsList cfsList={Array(10).fill(1)} />
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
