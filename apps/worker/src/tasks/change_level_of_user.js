async function getUserIdsAtSilverRoleFromComment(withPgClient) {
  const { rows } = await withPgClient((pgClient) =>
    pgClient.query(
      `
SELECT
  user_id,
  count(*) as number_comment
FROM
  app_public.comment c
GROUP BY user_id
HAVING count(*) >= 10
      `,
      []
    )
  );

  return new Set(rows.map((row) => row.user_id).filter((userId) => !!userId))
}

async function getUserIdsAtSilverRoleFromConfession(withPgClient) {
  const { rows } = await withPgClient((pgClient) =>
    pgClient.query(
      `
SELECT
  user_id,
  count(*) as number_confession
FROM
  app_public.confession c
WHERE deleted_at IS NULL
GROUP BY user_id
HAVING count(*) >= 3
      `,
      []
    )
  );

  return new Set(rows.map((row) => row.user_id).filter((userId) => !!userId))
}

async function updateUserToSilverRole(withPgClient, userId) {
  await withPgClient((pgClient) =>
    pgClient.query(
      `
        update app_public.users set role='moderator' where id='${userId}'
      `,
      []
    )
  );
}

module.exports = async (inPayload, { withPgClient, logger }) => {
  const userIdsAtSilverRole = [...new Set([
    ...(await getUserIdsAtSilverRoleFromComment(withPgClient)),
    ...(await getUserIdsAtSilverRoleFromConfession(withPgClient)),
  ])]

  logger.info(`Have ${userIdsAtSilverRole.length} user can be silver role`)

  // TODO: consider batch update here
  for(let userId of userIdsAtSilverRole) {
    if (userId) {
      await updateUserToSilverRole(withPgClient, userId);
      logger.info(`Updated user ${userId} to silver role`)
    }
  }
};

