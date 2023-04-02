interface IGetLimitAndoffset {
  limit?: number;
  offset?: number;
}

export const getLimitAndOffset = ({
  limit = 10,
  offset = 0,
}: IGetLimitAndoffset) => {
  const _limit = limit > 50 ? 10 : limit;
  const _offset = offset ?? 0;

  return {
    limit: _limit,
    offset: _offset,
  };
};
