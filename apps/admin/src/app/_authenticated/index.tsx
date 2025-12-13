import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "../../lib/auth-server";

const getSession = createServerFn().handler(async () => {
  return auth.api.getSession({ headers: getRequestHeaders() });
});

export const Route = createFileRoute("/_authenticated/")({
  beforeLoad: async () => {
    const session = await getSession();

    if (session === null) {
      throw redirect({ to: "/sign-in" });
    }
  },
  component: App,
});

function App() {
  return <h1>Component Vista Admin</h1>;
}
