import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import * as users from './db/db.json';
import { Friend, User, UserType } from './graphql/types';

// interface Friend {
//   id: string;
//   name: string;
//   age: number;
// }

// @ObjectType()
// class ProviderResponseType implements ProviderResponse {
//   @Field({ nullable: true })
//   id: string;

//   @Field({ nullable: true })
//   status: string;

//   @Field({ nullable: true })
//   message: string;
// }

// @ObjectType()
// class FriendType implements Friend {
//   @Field({nullable: true})
//   id: string;

//   @Field({nullable: true})
//   name: string;

//   @Field({nullable: true})
//   age: number;

//   @Field({nullable: true})
//   friend;
// }

// @ObjectType()
// class UserType implements User {
//   @Field({nullable: true})
//   id: string;

//   @Field({nullable: true})
//   name: string;

//   @Field({nullable: true})
//   age: number;

//   @Field(() => [FriendType],{nullable: true})
//   friends: FriendType[];

//   @Field(() => ProviderResponseType,{nullable: true})
//   providerResponse: ProviderResponseType;
// }

// @Resolver(() => UserType)
// export class UserResolver {
//   @Query(() => [UserType])
//   users() {
//     return users;
//   }

//   @ResolveField()
//   friends(@Parent() user: User): any {
//     return user.friends.map((friend) => {
//       const friendData = users.find((u) => u.id === friend.id);
//       return {
//         ...friend,
//         friends: friendData ? friendData.friends : [],
//       };
//     });
//   }
// }

@Resolver(() => UserType)
export class UserResolver {
  @Query(() => [UserType])
  users() {
    return users;
  }

  @ResolveField()
  friends(@Parent() user: User): Friend[] {
    return user.friends.map((friend) => {
      const friendData = users.find((u) => u.id === friend.id);
      if (!friendData) {
        throw new Error(`Could not find friend with ID ${friend.id}`);
      }
      // Check if the friend is the user itself
      if (friendData.id === user.id) {
        // Continue mapping the friends of the user instead
        return {
          ...friendData,
          friends: user.friends
            .filter((f) => f.id !== user.id)
            .map((f) => {
              const fData = users.find((u) => u.id === f.id);
              if (!fData) {
                throw new Error(`Could not find friend with ID ${f.id}`);
              }
              return {
                ...fData,
                friends: [],
              };
            }),
        };
      }
      // If friend is not the user itself, continue mapping the friend as normal
      return {
        ...friend,
        friends: friendData.friends.map((f) => {
          const fData = users.find((u) => u.id === f.id);
          if (!fData) {
            throw new Error(`Could not find friend with ID ${f.id}`);
          }
          return {
            ...fData,
            friends: [],
          };
        }),
      };
    });
  }
}

@Resolver(() => Friend)
export class FriendResolver {
  @ResolveField(() => UserType)
  friend(@Parent() friend: Friend): any {
    // let friendData: any = users.find((u) => u.id === friend.id);
    // console.log(friendData);
    // if (!friendData) {
    //   throw new Error(`Could not find friend with ID ${friend.id}`);
    // }
    // // return friendData;
    // friendData =
    //   friendData.friends.map((f) => {
    //     const fData = users.find((u) => u.id === f.id);
    //     if (!fData) {
    //       throw new Error(`Could not find friend with ID ${f.id}`);
    //     }
    //     return {
    //       ...fData,
    //       friends: [],
    //     };
    //   }) ?? friendData;
    // return friendData;

    let friendData: any = users.find((u) => u.id === friend.id);
    console.log(friendData);
    if (!friendData) {
      throw new Error(`Could not find friend with ID ${friend.id}`);
    }

    if (!friendData.friends) {
      return friendData;
    }

    friendData = {
      ...friendData,
      friends: friendData.friends.map((f) => {
        const fData = users.find((u) => u.id === f.id);
        if (!fData) {
          throw new Error(`Could not find friend with ID ${f.id}`);
        }
        return {
          ...fData,
          friends: fData.friends
            ? fData.friends.map((ff) => {
                const ffData = users.find((u) => u.id === ff.id);
                if (!ffData) {
                  throw new Error(`Could not find friend with ID ${ff.id}`);
                }
                return {
                  ...ffData,
                  friends: ffData.friends
                    ? ffData.friends.map((fff) => {
                        const fffData = users.find((u) => u.id === fff.id);
                        if (!fffData) {
                          throw new Error(
                            `Could not find friend with ID ${fff.id}`,
                          );
                        }
                        return {
                          ...fffData,
                          friends: [],
                        };
                      })
                    : [],
                };
              })
            : [],
        };
      }),
    };

    return friendData;

    return {
      ...friendData,
      friends: friendData.friends.map((f) => {
        const fData = users.find((u) => u.id === f.id);
        if (!fData) {
          throw new Error(`Could not find friend with ID ${f.id}`);
        }
        return {
          ...fData,
          friends: [],
        };
      }),
    };
  }
}
// @Resolver(() => FriendType)
// export class FriendResolver {
//   @ResolveField(() => [FriendType]) // Add type annotation for the friends field
//   friends(@Parent() friend: FriendType): FriendType[] {
//     const friendData = users.find((u) => u.id === friend.id);
//     return friendData ? friendData.friends : [];
//   }
// }
