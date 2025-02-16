import { gql } from "@apollo/client";

export const UserResolvers = {
  GET_USERS: gql`
    query GetUsers {
      getUsers {
        id
        name
        email
        phone
        storeId
        role
        active
        status
      }
    }
  `,
  CREATE_USER: gql`
    mutation CreateUser($input: UpsertUserDTO!) {
      createUser(input: $input) {
        name
        email
        phone
        login
        role
        storeId
      }
    }
  `,
  UPDATE_USER: gql`
    mutation UpdateUser($input: UpsertUserDTO!) {
      updateUser(input: $input) {
        name
        email
        phone
        login
        role
        storeId
      }
    }
  `,
  INACTIVE_USER: gql`
    mutation InactiveUser($userId: Int!) {
      inactiveUser(userId: $userId)
    }
  `,
  ACTIVE_USER: gql`
    mutation ActiveUser($userId: Int!) {
      activeUser(userId: $userId)
    }
  `,
};

export default UserResolvers;
