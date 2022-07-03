
// import { UserEntity } from "../../entities/users";
// import { RefreshTokenEntity } from "../../entities/refresh_token";
// import {
//   IGetManyAccessTokenArgs,
//   IAccessToken,
// } from "./types";
// import { entityToOutType } from "./entityToOutType";
// import { AccessTokenEntity } from "../../entities/movie";


// export async function getMany(args: IGetManyAccessTokenArgs): Promise<IAccessToken[]> {
//   const {
//     user_id,
//     token,
//   } = args;

//   const query = AccessTokenEntity.Repository.createQueryBuilder('acc_token');

//   query.leftJoinAndMapOne(
//     'acc_token.user',
//     UserEntity,
//     'user',
//     'acc_token.user_id = user.id',
//   );

//   query.leftJoinAndMapOne(
//     'acc_token.refresh_token',
//     RefreshTokenEntity,
//     'refresh_token',
//     'acc_token.refresh_token_id = refresh_token.id',
//   );

//   if (user_id !== undefined) {
//     query.andWhere("user.id = :user_id", { user_id });
//   }

//   if (token !== undefined) {
//     query.andWhere("acc_token.value = :token", { token });
//   }

//   const tokens = await query.getMany();

//   return tokens.map(entityToOutType);
// }
