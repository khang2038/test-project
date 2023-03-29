import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export interface GetOption<Entity extends ObjectLiteral> {
  id?: string;
  unlimited?: boolean;
  extraBuilder?: (
    // eslint-disable-next-line prettier/prettier
    query: SelectQueryBuilder<Entity>
  ) => SelectQueryBuilder<Entity>;
}
