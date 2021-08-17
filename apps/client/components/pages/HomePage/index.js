import React, { useEffect, useState } from 'react';
import { CfsList, Dropdown } from '@cfs/ui';
import styles from './HomePage.module.scss';
import { Tabs } from 'antd';
import { useHomePageQuery } from '@cfs/graphql';

const { TabPane } = Tabs;

const HomePage = () => {
  const [selectedCat, setSelectedCat] = useState('0');
  const { data: queryData, fetchMore } = useHomePageQuery({
    variables: { offset: 0, catId: 0 },
  });

  const confessions = queryData?.getCfsByCat?.nodes ?? [];
  const categories = [...(queryData?.categories?.nodes ?? [])];
  categories.unshift({ id: 0, name: 'Tất cả' });

  const onChangeCat = (newCat) => {
    fetchMore({ variables: { offset: 0, catId: parseInt(newCat) } });
    setSelectedCat(newCat);
  };

  return (
    <div className="ml-4 mr-4 mb-6 bg-color1">
      <div className="block mt-4 bg-white pb-4">
        <div className={styles.homePageListMenu}>
          <Dropdown btnText={'Chọn'} />
        </div>
        <div className={styles.homePageListCategories}>
          <Tabs
            defaultActiveKey="0"
            activeKey={selectedCat}
            onChange={onChangeCat}
          >
            {categories.map((cat) => (
              <TabPane tab={cat.name} key={cat.id}>
                <CfsList
                  cfsList={confessions}
                  fetchMore={fetchMore}
                  selectedCat={selectedCat}
                />
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
