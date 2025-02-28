import type { SigninDTO } from "./Auth.dto";

export function AuthRepository() {
  async function signin(dto: SigninDTO) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Signin($input: SigninDTO!) {
            signin(input: $input) {
              access_token
            }
          }
        `,
        variables: {
          input: dto,
        },
      }),
    });

    const { data } = await response.json();

    return data.signin.access_token;
  }

  return {
    signin,
  };
}
