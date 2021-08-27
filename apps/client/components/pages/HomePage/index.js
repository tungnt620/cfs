import React, { useEffect, useState } from 'react';
import { CfsList } from '@cfs/ui';
import styles from './HomePage.module.scss';
import { Tabs } from 'antd';
import { useHomePageQuery } from '@cfs/graphql';
import { useReactiveVar } from '@apollo/react-hooks';
import { setNewCfsCreatedByMe } from '../../../../../libs/helper/src/reactiveVars';

const { TabPane } = Tabs;

const HomePage = () => {
  const [selectedCat, setSelectedCat] = useState('0');
  const newCfsCreatedByMe = useReactiveVar(setNewCfsCreatedByMe);
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

  useEffect(() => {
    if (newCfsCreatedByMe) {
      setSelectedCat('0');
      fetchMore({ variables: { offset: 0, catId: 0 } });
    }
  }, [fetchMore, newCfsCreatedByMe]);

  return (
    <div className="ml-2 mr-2 mb-6 bg-color1">
      <div className="block mt-4 bg-white pb-4">
        <div className={styles.homePageListMenu}>
          {/*<Dropdown btnText={'Chọn'} />*/}
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
