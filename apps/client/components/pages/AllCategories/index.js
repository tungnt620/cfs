import React from 'react';
import { Badge, PageHeader, Tag } from 'antd';
import { useGoBack } from '@cfs/common';
import style from './style.module.scss';
import { useAllCategoriesPageQuery } from '@cfs/graphql';
import { useRouter } from 'next/router';

const AllCategoriesPage = () => {
  const router = useRouter();
  const goBack = useGoBack();
  const { data } = useAllCategoriesPageQuery();

  const categories = data?.categories?.nodes ?? [];

  return (
    <PageHeader onBack={goBack} title="Tất cả mục confession con">
      <main>
        {categories.map((cat) => {
          return (
            <div className={style.cat} key={cat.id}>
              <Badge
                onClick={() => router.push(`/category/${cat.slug}`)}
                className="cursor-pointer"
                count={cat.confessionCategories.totalCount}
              >
                <Tag>{cat.name}</Tag>
              </Badge>
            </div>
          );
        })}
      </main>
    </PageHeader>
  );
};

export default AllCategoriesPage;
