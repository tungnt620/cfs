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
import { usePagination } from '@cfs/helpers';

const { TabPane } = Tabs;

const HomePage = () => {
  const router = useRouter();
  const [dataType, setDataType] = useState(
    router.query.dataType || 'confession'
  );
  const { offset } = usePagination();
  const cat = router.query.cat || '0';

  const newCfsCreatedByMe = useReactiveVar(setNewCfsCreatedByMe);
  const newCfsDeletedByMe = useReactiveVar(setNewDeletedCfsByMe);

  const currentUser = useReactiveVar(setCurrentUser);
  const { data: allCategories } = useHomePageAllCategoriesQuery();

  const { data: queryData, fetchMore, refetch } = useHomePageQuery({
    variables: { offset, catId: parseInt(cat) },
  });

  const confessions = queryData?.getCfsByCat?.nodes ?? [];
  const categories = [...(allCategories?.categories?.nodes ?? [])];
  categories.unshift({ id: 0, name: 'Tất cả' });

  useEffect(() => {
    fetchMore({ variables: { offset, catId: parseInt(cat) } });
  }, [cat, fetchMore, offset, router]);

  // Re-fetch to get data relative user
  useEffect(() => {
    if (currentUser?.id) {
      refetch();
    }
  }, [currentUser, refetch]);

  useEffect(() => {
    if (newCfsCreatedByMe) {
      router.query.cat = '0';
      router.push(router);
      refetch();
    }
  }, [refetch, newCfsCreatedByMe, router]);

  useEffect(() => {
    if (newCfsDeletedByMe) {
      router.query.cat = '0';
      router.push(router);
      refetch();
    }
  }, [refetch, newCfsDeletedByMe, router]);

  const onChangeCat = (newCat) => {
    router.query.cat = newCat;
    router.query.offset = '0';
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
              activeKey={cat}
              onChange={onChangeCat}
            >
              {categories.map((cat) => (
                <TabPane tab={cat.name} key={cat.id}>
                  <CfsList cfsList={confessions} />
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
