import React, { useEffect, useState } from 'react';
import { CfsList } from '@cfs/ui';
import styles from './HomePage.module.scss';
import { Tabs } from 'antd';
import { useHomePageAllCategoriesQuery, useHomePageQuery } from '@cfs/graphql';
import { useReactiveVar } from '@apollo/react-hooks';
import {
  setCurrentUser,
  setNewCfsCreatedByMe,
  setNewDeletedCfsByMe,
} from '@cfs/helper';
import SubMenus from './SubMenus';
import CommentList from '../../CommentList';
import { useRouter } from 'next/router';

const { TabPane } = Tabs;

const HomePage = () => {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState(router.query.cat || '0');
  const [dataType, setDataType] = useState(
    router.query.dataType || 'confession'
  );
  const newCfsCreatedByMe = useReactiveVar(setNewCfsCreatedByMe);
  const newCfsDeletedByMe = useReactiveVar(setNewDeletedCfsByMe);

  const currentUser = useReactiveVar(setCurrentUser);
  const { data: allCategories } = useHomePageAllCategoriesQuery();

  const { data: queryData, fetchMore, refetch } = useHomePageQuery({
    variables: { offset: 0, catId: parseInt(selectedCat) },
  });

  const confessions = queryData?.getCfsByCat?.nodes ?? [];
  const categories = [...(allCategories?.categories?.nodes ?? [])];
  categories.unshift({ id: 0, name: 'Tất cả' });

  useEffect(() => {
    const cat = router.query.cat || '0';
    if (cat !== selectedCat) {
      setSelectedCat(cat);
      fetchMore({ variables: { offset: 0, catId: parseInt(cat) } });
    }
  }, [fetchMore, router, selectedCat]);

  // Re-fetch to get data relative user
  useEffect(() => {
    if (currentUser?.id) {
      refetch();
    }
  }, [currentUser, refetch]);

  useEffect(() => {
    if (newCfsCreatedByMe) {
      setSelectedCat('0');
      refetch();
    }
  }, [refetch, newCfsCreatedByMe]);

  useEffect(() => {
    if (newCfsDeletedByMe) {
      setSelectedCat('0');
      refetch();
    }
  }, [refetch, newCfsDeletedByMe]);

  const onChangeCat = (newCat) => {
    fetchMore({ variables: { offset: 0, catId: parseInt(newCat) } });
    setSelectedCat(newCat);
    router.query.cat = newCat;
    router.push(router);
  };

  return (
    <div className="ml-2 mr-2 mb-6 bg-color1">
      <div className="block mt-4 bg-white pb-4">
        <SubMenus dataType={dataType} setDataType={setDataType} />
        <main className={styles.homePageListCategories}>
          {dataType === 'confession' ? (
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
          ) : (
            <CommentList />
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
